import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo'
import ApplicationCollection from '../../../src/components/application/Collection'
import Main from '../../../src/components/layout/Main'
import fetchCollection from '../../../src/fetchers'
import { Appstream } from '../../../src/types/Appstream'
import { Collections } from '../../../src/types/Collection'


export default function PopularApps({ applications }) {
  const { t } = useTranslation()
  return (
    <Main>
      <NextSeo title={t('popular-apps')} />
      <ApplicationCollection title={t('popular-apps')} applications={applications} />
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const applications: Appstream[] = await fetchCollection(Collections.popular)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      applications,
    },
    revalidate: 3600,
  }
}
