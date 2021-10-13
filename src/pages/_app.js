import { AppContextProvider } from '../contexts/AppContext'
import 'bootstrap/dist/css/bootstrap.min.css'


function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default MyApp
