import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserForm from '../components/UserForm'
import DeezerWidget from '../components/DeezerWidget'
import { useAppContext } from '../contexts/AppContext'
import styles from '../styles/Home.module.css'


export default function Home() {
  const { displayWidget } = useAppContext()

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
          CliMusic
        </h1>

        <p className={styles.description}>
          Descubra músicas que combinam com o clima da sua cidade!
        </p>

        <UserForm />

        {displayWidget ?
          <DeezerWidget />
          : ''}
      </main>

      <Footer />
    </div>
  )
}
