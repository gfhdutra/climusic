import { useAppContext } from "../../contexts/AppContext"
import { Button } from "react-bootstrap"
import styles from './styles.module.css'


export default function DeezerWidget() {
  const {
    playlistNumber,
    saveText,
    isPlaylistSafe,
    savePlaylist
  } = useAppContext()

  return (
    <>
      <div className={styles.deezerWidget}>
        <h2 className={styles.title}>Confira as músicas que encontramos para você</h2>
        <iframe
          title="deezer-widget"
          src={`https://widget.deezer.com/widget/dark/playlist/${playlistNumber}`}
          width="100%"
          height="300"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media; clipboard-write">
        </iframe>
        <h2 className={styles.saveText}>{saveText}</h2>
        <Button
          variant="dark"
          disabled={isPlaylistSafe}
          onClick={savePlaylist} >
          Salvar
        </Button>
      </div>
    </>
  )
}
