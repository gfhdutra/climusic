import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WidgetsList from '../components/WidgetsList'
import styles from '../styles/Playlists.module.css'


export default function Playlists() {

  return (
    <div className={styles.container}>
      <Head>
        <title>CliMusic</title>
        <meta name="description" content="climusic app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Playlists
        </h1>

        <p className={styles.description}>
          As suas músicas preferidas
        </p>

        <WidgetsList />

      </main>

      <Footer />
    </div>
  )
}