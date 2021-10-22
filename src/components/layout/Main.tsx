import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { FunctionComponent } from 'react'

import Footer from './Footer'
import Header from './Header'

const Main: FunctionComponent = ({ children }) => (
  <div id='wrapper'>
    <NextSeo
      titleTemplate='%s—Flathub'
      defaultTitle='Flathub'
      twitter={{ site: '@FlatpakApps' }}
    ></NextSeo>
    <Head>
      <base href='/' />

      <link rel='icon' type='image/png' href='./favicon.png' />
    </Head>
    <Header />

    <main>{children}</main>

    <Footer />
  </div>
)

export default Main
