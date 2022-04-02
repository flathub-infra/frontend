import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ApplicationCollection from '../../src/components/application/Collection'
import Main from '../../src/components/layout/Main'
import Spinner from '../../src/components/Spinner'
import { generateTokens } from '../../src/context/actions'
import { APP_DETAILS } from '../../src/env'

const PERMITTED_REDIRECTS = [/^http:\/\/localhost:\d+\/$/, /^http:\/\/127.0.0.1:\d+\/$/];

export default function Purchase() {
  const { t } = useTranslation();
  const [waiting, setWaiting] = useState(false);
  const [token, setToken] = useState('');
  const [missingApps, setMissingApps] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    let redirect = router.query.return.toString();
    if (!PERMITTED_REDIRECTS.some(r => r.test(redirect))) {
      toast.error(t('incorrect-redirect'));
      return;
    }

    let refs = router.query.refs.toString().split(";");
    /* We get refs in the form app/<app ID>/<arch>/<branch>, we just want the app ID part */
    let appIDs = refs.map(ref => ref.split("/")[1]);

    setWaiting(true);
    generateTokens(setToken, appIDs)
      .then(result => {
        if (result.token) {
          setToken(result.token);
        } else if (result.detail == "not_logged_in") {
          router.push('/login');
        } else if (result.detail == "purchase_necessary") {
          Promise.all(
            result.missing_appids.map(id => fetch(`${APP_DETAILS(id)}`))
          )
          .then(responses => Promise.all(responses.map(res => res.json())))
          .then(apps => setMissingApps(apps.filter(app => app != null)));
        } else {
          throw 'network-error-try-again';
        }
      })
      .catch(err => toast.error(t(err)))
      .finally(() => setWaiting(false));
  }, [router]);

  useEffect(() => {
    if (token) {
      fetch(router.query.return.toString() + "success?token=" + encodeURIComponent(token))
      .then(() => {
        router.push('/purchase/finished');
      })
      .catch(() => toast.error(t('app-install-error-try-again')));
    }
  }, [token]);

  let content: ReactElement = null;

  if (waiting)
    content = <Spinner size={150} />;
  else if (missingApps.length) {
    content =
    <ApplicationCollection
      title={t('checkout-apps')}
      applications={missingApps}
    />;
  }

  return (
    <Main>
      <NextSeo title={t('purchase-apps-title')} noindex={true} />
      <div className='main-container'>
        {content}
      </div>
    </Main>
  )
}

// Need available login providers to show options on page
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    }
  }
}
