import { useAppContext } from "../../contexts/AppContext"
import { Button } from "react-bootstrap"
import styles from './styles.module.css'


export default function WidgetsList() {
  const {
    storageData,
    deletePlaylist
  } = useAppContext()

  return (
    <>
      {storageData.map(item => {
        return (
          <div
            className={styles.deezerWidget}
            key={storageData.indexOf(item)}>
            <h2 className={styles.title}>{item.data}</h2>
            <iframe
              title="deezer-widget"
              src={`https://widget.deezer.com/widget/dark/playlist/${item.listaDeMusicas.replace(/\D/g, "")}`}
              width="100%"
              height="300"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media; clipboard-write">
            </iframe>
            <h2 className={styles.deleteText}>Deseja excluir a playlist?</h2>
            <Button
              variant="dark"
              onClick={() => {
                deletePlaylist(storageData.indexOf(item))
              }}
            >Excluir</Button>
          </div>
        )
      })}
    </>
  )

}
