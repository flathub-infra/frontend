import { GetStaticPaths, GetStaticProps } from 'next'

import ApplicationDetails from '../../../src/components/application/Details'
import Main from '../../../src/components/layout/Main'
import {
  fetchAppstream,
  fetchAppStats,
  fetchSummary,
  fetchAddons,
} from '../../../src/fetchers'
import { APPSTREAM_URL } from '../../../src/env'
import { NextSeo } from 'next-seo'
import {
  AddonAppstream,
  DesktopAppstream,
  pickScreenshot,
  Screenshot,
} from '../../../src/types/Appstream'
import { Summary } from '../../../src/types/Summary'
import { AppStats } from '../../../src/types/AppStats'

export default function Details({
  data,
  summary,
  stats,
  addons,
}: {
  data: DesktopAppstream
  summary: Summary
  stats: AppStats
  addons: AddonAppstream[]
}) {
  const screenshots = data.screenshots
    ? data.screenshots.filter(pickScreenshot).map((screenshot: Screenshot) => ({
      url: pickScreenshot(screenshot).url,
    }))
    : []

  return (
    <Main>
      <NextSeo
        title={data.name}
        description={data.summary}
        openGraph={{
          images: [
            {
              url: data.icon,
            },
            ...screenshots,
          ],
        }}
      />
      <ApplicationDetails data={data} summary={summary} stats={stats} addons={addons} />
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params: { appDetails },
}) => {
  console.log('Fetching data for app details: ', appDetails)
  const data = await fetchAppstream(appDetails as string)
  const summary = await fetchSummary(appDetails as string)
  const stats = await fetchAppStats(appDetails as string)
  const addons = await fetchAddons(appDetails as string)

  return {
    props: {
      data,
      summary,
      stats,
      addons
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apps = await fetch(APPSTREAM_URL)
  const appsData: string[] = await apps.json()
  const paths = appsData.map((app) => ({
    params: { appDetails: app },
  }))

  return {
    paths,
    fallback: false,
  }
}
