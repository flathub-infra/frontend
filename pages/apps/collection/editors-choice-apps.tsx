import { GetStaticProps } from 'next'

import ApplicationCollection from '../../../src/components/application/Collection'
import fetchCollection from '../../../src/fetchers'
import Collections from '../../../src/types/Collection'
import Appstream from '../../../src/types/Appstream'
import { NextSeo } from 'next-seo'

export default function EditorChoiceApps({ applications }) {
  return (
    <>
      <NextSeo title="Editor's Choice Apps" />
      <ApplicationCollection
        title="Editor's Choice Apps"
        applications={applications}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const applications: Appstream[] = await fetchCollection(
    Collections.editorsApps
  )
  applications.sort((a, b) => a.name.localeCompare(b.name))

  return {
    props: {
      applications,
    },
  }
}
