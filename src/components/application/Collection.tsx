import { FunctionComponent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Appstream from '../../types/Appstream'
import Category from '../../types/Category'

import ApplicationCard from '../application/Card'
import Main from '../layout/Main'
import Pagination from '../Pagination'

interface Props {
  applications: Appstream[]
  perPage?: number
  title: string
}

const ApplicationCollection: FunctionComponent<Props> = ({
  applications,
  title,
  perPage = 32,
}) => {
  const router = useRouter()
  const page = parseInt(router.query.page as string, 2) || 1
  const totalPages = Math.ceil(applications.length / perPage)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const pagedApplications = applications.slice(
    (page - 1) * perPage,
    page * perPage
  )

  return (
    <Main>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='collection-wrapper'>
        <aside>
          <section className='side-menu-section'>
            <h3>Discover</h3>
            <Link href='/apps/collection/popular' passHref>
              <span className='side-menu-link'>Popular</span>
            </Link>
            <Link href='/apps/collection/recently-updated' passHref>
              <span className='side-menu-link'>New &amp; Updated</span>
            </Link>
            <Link href='/apps/collection/editors-choice-apps' passHref>
              <span className='side-menu-link'>Editor&apos;s Choice</span>
            </Link>
            <Link href='/apps/collection/editors-choice-games' passHref>
              <span className='side-menu-link'>
                Editor&apos;s Choice Gamess
              </span>
            </Link>
          </section>
          <section className='side-menu-section'>
            <h3>Categories</h3>
            {Object.keys(Category).map((category) => (
              <Link href={`/apps/category/${category}`} key={category} passHref>
                <span className='side-menu-link'>{category}</span>
              </Link>
            ))}
          </section>
        </aside>
        <section className='applications-collection'>
          <div className='collection'>
            <h2>{title}</h2>
            <p>{applications.length} results</p>

            <div className='applications'>
              {pagedApplications.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}
            </div>

            <Pagination pages={pages} currentPage={page} />
          </div>
        </section>
      </div>
    </Main>
  )
}

export default ApplicationCollection
