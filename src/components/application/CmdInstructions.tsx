import { useTheme } from 'next-themes'
import styles from './CmdInstructions.module.scss'
import CodeCopy from './CodeCopy'

const CmdInstructions = ({
  appId,
  isStable,
}: {
  appId: string
  isStable: boolean
}) => {
  const { resolvedTheme } = useTheme()
  return (
    <div className={styles.instructions}>
      <h3>Manual install</h3>
      <p>
        Make sure to follow the{' '}
        <a href='https://flatpak.org/setup/' target='_blank' rel='noreferrer'>
          setup guide
        </a>{' '}
        before installing
      </p>
      {isStable ? (
        <CodeCopy
          text={`flatpak install flathub ${appId}`}
          nested={resolvedTheme === 'dark'}
        ></CodeCopy>
      ) : (
        <>
          <p>
            This is a beta version, so you will need to have the flathub-beta
            repo setup
          </p>
          <CodeCopy
            text={`flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo`}
            nested={resolvedTheme === 'dark'}
          ></CodeCopy>
          <p>Then install the app with:</p>
          <CodeCopy
            text={`flatpak install flathub-beta ${appId}`}
            nested={resolvedTheme === 'dark'}
          ></CodeCopy>
        </>
      )}

      <h3>Run</h3>
      <CodeCopy
        text={`flatpak run ${appId}`}
        nested={resolvedTheme === 'dark'}
      />
    </div>
  )
}

export default CmdInstructions
