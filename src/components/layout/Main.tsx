import { FunctionComponent } from 'react'

import Footer from './Footer'
import Header from './Header'

const Main: FunctionComponent = ({ children }) => (
  <div id='wrapper'>
    <Header />

    <main>{children}</main>

    <Footer />
  </div>
)

export default Main
