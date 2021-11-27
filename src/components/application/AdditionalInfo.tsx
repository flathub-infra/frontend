import { Appstream } from '../../types/Appstream'
import { Summary } from '../../types/Summary'
import ListBox from './ListBox'
import styles from './AdditionalInfo.module.scss'
import {
  MdCloudDownload,
  MdContactPage,
  MdDownload,
  MdHelp,
  MdOutlineBugReport,
  MdQuestionAnswer,
  MdTranslate,
  MdWeb,
} from 'react-icons/md'
import { BsHddFill, BsTextParagraph } from 'react-icons/bs'
import { MdLaptop } from 'react-icons/md'
import { AppStats } from '../../types/AppStats'
import spdxLicenseList from 'spdx-license-list/full'

const AdditionalInfo = ({
  data,
  summary,
  appId,
  stats,
}: {
  data: Appstream
  summary: Summary
  appId: string
  stats: AppStats
}) => {
  const license = getLicense(data.project_license)

  const licenseIsLink = data.project_license?.startsWith(
    'LicenseRef-proprietary='
  )

  return (
    <div className={styles.additionalInfo}>
      <ListBox
        appId={appId}
        items={[
          {
            icon: <BsHddFill />,
            header: 'Installed size',
            content: {
              type: 'text',
              text: Math.round(summary.installed_size / 1_000_000) + ' MB',
            },
          },
        ]}
      ></ListBox>
      <ListBox
        appId={appId}
        items={[
          {
            icon: <MdDownload />,
            header: 'Download size',
            content: {
              type: 'text',
              text: Math.round(summary.download_size / 1_000_000) + ' MB',
            },
          },
        ]}
      ></ListBox>
      {/* {data.content_rating} */}
      <ListBox
        appId={appId}
        items={[
          {
            icon: <MdLaptop />,
            header: 'Available architectures',
            content: { type: 'text', text: summary.arches.join(', ') },
          },
        ]}
      ></ListBox>
      <ListBox
        appId={appId}
        items={[
          {
            icon: <MdCloudDownload />,
            header: 'Downloads',
            content: {
              type: 'text',
              text: stats.downloads_total.toLocaleString(),
            },
          },
        ]}
      ></ListBox>
      {license && (
        <ListBox
          appId={appId}
          items={[
            {
              icon: <BsTextParagraph />,
              header: 'License',
              content: {
                type: licenseIsLink ? 'url' : 'text',
                text: license,
                trackAsEvent: 'License',
              },
            },
          ]}
        ></ListBox>
      )}
      {data.urls.homepage && (
        <ListBox
          appId={appId}
          items={[
            data.urls.homepage
              ? {
                  content: {
                    type: 'url',
                    text: data.urls.homepage,
                    trackAsEvent: 'Homepage',
                  },
                  icon: <MdWeb />,
                  header: 'Project website',
                }
              : undefined,
          ]}
        />
      )}
      {data.urls.contact && (
        <ListBox
          appId={appId}
          items={[
            data.urls.contact
              ? {
                  content: {
                    type: 'url',
                    text: data.urls.contact,
                    trackAsEvent: 'Contact',
                  },
                  icon: <MdContactPage />,
                  header: 'Contact',
                }
              : undefined,
          ]}
        />
      )}
      {data.urls.help && (
        <ListBox
          appId={appId}
          items={[
            data.urls.help
              ? {
                  content: {
                    type: 'url',
                    text: data.urls.help,
                    trackAsEvent: 'Help',
                  },
                  icon: <MdHelp />,
                  header: 'Help',
                }
              : undefined,
          ]}
        />
      )}
      {data.urls.faq && (
        <ListBox
          appId={appId}
          items={[
            data.urls.faq
              ? {
                  content: {
                    type: 'url',
                    text: data.urls.faq,
                    trackAsEvent: 'Faq',
                  },
                  icon: <MdQuestionAnswer />,
                  header: 'Frequently Asked Questions',
                }
              : undefined,
          ]}
        />
      )}
      {data.urls.translate && (
        <ListBox
          appId={appId}
          items={[
            data.urls.translate
              ? {
                  icon: <MdTranslate />,
                  header: 'Contribute translations',
                  content: {
                    type: 'url',
                    text: data.urls.translate,
                    trackAsEvent: 'Translate',
                  },
                }
              : undefined,
          ]}
        />
      )}
      {data.urls.bugtracker && (
        <ListBox
          appId={appId}
          items={[
            data.urls.bugtracker
              ? {
                  icon: <MdOutlineBugReport />,
                  header: 'Report an issue',
                  content: {
                    type: 'url',
                    text: data.urls.bugtracker,
                    trackAsEvent: 'Bugtracker',
                  },
                }
              : undefined,
          ]}
        />
      )}
    </div>
  )
}

function getLicense(project_license: string | undefined): string | undefined {
  if (!project_license) {
    return undefined
  }

  if (project_license?.startsWith('LicenseRef-proprietary=')) {
    return project_license?.replace(/LicenseRef-proprietary=/, '')
  }
  if (project_license?.startsWith('LicenseRef-proprietary')) {
    return 'Proprietary'
  }

  const splitLicense = project_license.split(' ')
  if (splitLicense.length <= 1) {
    return (
      spdxLicenseList[project_license]?.name ?? project_license ?? 'Unknown'
    )
  }

  return splitLicense
    .map((license) => {
      if (spdxLicenseList[license]) {
        return spdxLicenseList[license].name
      }
    })
    .join(', ')
}

export default AdditionalInfo
