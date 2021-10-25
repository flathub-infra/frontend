import { FunctionComponent } from 'react'
import { useRouter } from 'next/router'

import Appstream from '../../types/Appstream'

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
  const page = parseInt(router.query.page as string) ?? 1
  const totalPages = Math.ceil(applications.length / perPage)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const pagedApplications = applications.slice(
    (page - 1) * perPage,
    page * perPage
  )

  return (
    <Main>
      <div className='collection-wrapper'>
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
