import Main from '../src/components/layout/Main'
import Image from 'next/image'
import CodeCopy from '../src/components/application/CodeCopy'
import { IMAGE_BASE_URL } from '../src/env'
import { NextSeo } from 'next-seo'

const badgeExampleCode =
  "<a href='https://flathub.org/apps/details/org.gimp.GIMP'><img width='240' alt='Download on Flathub' src='https://flathub.org/assets/badges/flathub-badge-en.png'/></a>"
const badgeExampleCodeMoinMoin =
  '[[https://flathub.org/apps/details/org.gimp.GIMP|{{https://flathub.org/assets/badges/flathub-badge-en.png|Download on Flathub|width=240,align=middle}}]]'

const Badges = () => (
  <Main>
    <NextSeo
      title='Flathub Official Badges—Flathub'
      description='Official badges to promote your application on Flathub'
      openGraph={{
        images: [
          {
            url: `${IMAGE_BASE_URL}badges/flathub-badge-en.png`,
          },
        ],
      }}
    />
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}
      className='store-content-container-narrow badges'
    >
      <h1>Flathub official badges</h1>
      <p>You can use these badges to promote your application on Flathub</p>

      <h3>Preferred badge</h3>
      <Image
        width='240'
        height='80'
        objectFit='contain'
        alt='Download on Flathub'
        src='/img/badges/flathub-badge-en.png'
      />
      <h6 className='badge-info-svg'>
        Also available in{' '}
        <a href='/img/badges/flathub-badge-en.svg'>svg format</a>
      </h6>

      <h3>Alternative badge</h3>
      <Image
        width='240'
        height='80'
        objectFit='contain'
        alt='Download on Flathub'
        src='/img/badges/flathub-badge-i-en.png'
      />
      <h6 className='badge-info-svg'>
        Also available in{' '}
        <a href='/img/badges/flathub-badge-i-en.svg'>svg format</a>
      </h6>

      <p
        // this is a workaround for react not supporting it: https://github.com/facebook/react/issues/16563
        {...{
          'xmlns.dct': 'http://purl.org/dc/terms/',
          'xmlns.vcard': 'http://www.w3.org/2001/vcard-rdf/3.0#',
        }}
      >
        <a
          rel='license'
          href='http://creativecommons.org/publicdomain/zero/1.0/'
        >
          <img
            src='http://i.creativecommons.org/p/zero/1.0/88x31.png'
            style={{ borderStyle: 'none' }}
            alt='CC0'
          />
        </a>
        <br />
        To the extent possible under law,
        <a rel='dct:publisher' href='https://flathub.org/badges'>
          {' '}
          <span property='dct:title'>Jakub Steiner</span>{' '}
        </a>
        has waived all copyright and related or neighboring rights to
        <span property='dct:title'>Flathub Badges</span>. This work is published
        from: Czech Republic.
      </p>

      <h2>Code examples</h2>
      <div className='grid-container'>
        <h3 className='title'>HTML</h3>
        <CodeCopy text={badgeExampleCode}></CodeCopy>
        <div>
          <a href='https://flathub.org/apps/details/org.gimp.GIMP'>
            <img
              width='240'
              alt='Download on Flathub'
              src='/img/badges/flathub-badge-en.png'
            />
          </a>
        </div>
        <h3 className='title'>MoinMoin Wiki</h3>
        <CodeCopy text={badgeExampleCodeMoinMoin}></CodeCopy>
        <div>
          <a href='https://flathub.org/apps/details/org.gimp.GIMP'>
            <img
              width='240'
              alt='Download on Flathub'
              src='/img/badges/flathub-badge-en.png'
            />
          </a>
        </div>
      </div>
    </section>
  </Main>
)

export default Badges
