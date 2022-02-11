import { GetStaticPaths, GetStaticProps } from 'next'

import ApplicationDetails from '../../../src/components/application/Details'
import Main from '../../../src/components/layout/Main'
import {
  fetchAppstream,
  fetchAppStats,
  fetchSummary,
  fetchDeveloperApps,
} from '../../../src/fetchers'
import { APPSTREAM_URL } from '../../../src/env'
import { NextSeo } from 'next-seo'
import {
  Appstream,
  pickScreenshot,
  Screenshot,
} from '../../../src/types/Appstream'
import { Summary } from '../../../src/types/Summary'
import { AppStats } from '../../../src/types/AppStats'
import { useEffect, useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'next-query-params'

export default function Details({
  app,
  summary,
  stats,
  developerApps,
}: {
  app: Appstream
  summary: Summary
  stats: AppStats
  developerApps: Appstream[]
}) {
  const [branchParam, setBranchParam] = useQueryParam(
    'branch',
    withDefault(StringParam, undefined)
  )

  function branchChange(event) {
    if (event.value === 'stable') {
      setBranchParam(undefined)
    } else {
      setBranchParam(event.value)
    }
  }

  function getBranch(branch: string | undefined) {
    return branch === 'beta' ? 'beta' : 'stable'
  }

  const options: { value: string; label: string }[] = []
  if (app['stable'] && summary['stable'] && app['beta'] && summary['beta']) {
    options.push({ value: 'stable', label: 'Stable' })
    options.push({ value: 'beta', label: 'Beta' })
  } else if (app['stable'] && summary['stable']) {
    options.push({ value: 'stable', label: 'Stable' })
  } else if (app['beta'] && summary['beta']) {
    options.push({ value: 'beta', label: 'Beta' })
  }

  const screenshots = app.screenshots
    ? app.screenshots.filter(pickScreenshot).map((screenshot: Screenshot) => ({
        url: pickScreenshot(screenshot).url,
      }))
    : []

  return (
    <Main>
      <NextSeo
        title={app?.name}
        description={app?.summary}
        openGraph={{
          images: [
            {
              url: app?.icon,
            },
            ...screenshots,
          ],
        }}
      />
      <ApplicationDetails
        app={app[getBranch(branchParam)]}
        summary={summary[getBranch(branchParam)]}
        stats={stats}
        branch={getBranch(branchParam)}
        setBranch={branchChange}
        options={options}
        developerApps={developerApps.filter((devApp) => devApp.id !== app.id)}
      />
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params: { appDetails: appId },
}) => {
  console.log('Fetching data for app details: ', appId)
  const app = await fetchAppstream(appId as string)
  const summary = await fetchSummary(appId as string)
  const stats = await fetchAppStats(appId as string)
  const developerApps = await fetchDeveloperApps(app?.developer_name)

  return {
    props: {
      app,
      summary,
      stats,
      developerApps: developerApps ?? [],
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apps = await fetch(`${APPSTREAM_URL}?type=stable_and_beta`)
  const appsData: string[] = await apps.json()
  const paths = appsData.map((app) => ({
    params: { appDetails: app },
  }))

  return {
    paths,
    fallback: false,
  }
}
