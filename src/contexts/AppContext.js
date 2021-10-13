import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import axios from "axios"


export function AppContextProvider({ children }) {
  const [storageData, setStorageData] = useState([])
  const [city, setCity] = useState('')
  const [tempDisplay, setTempDisplay] = useState('')
  const [playlistNumber, setPlaylistNumber] = useState('')
  const [displayWidget, setDisplayWidget] = useState(false)
  const [isPlaylistSafe, setIsPlaylistSafe] = useState(false)
  const [updateWidgetsList, setUpdateWidgetsList] = useState(false)
  const [saveText, setSaveText] = useState('Deseja salvar a playlist?')
  const currentTemp = useRef('')
  const genreId = useRef('')
  const currentPlaylist = useRef('')
  const genrePlaylists = []



  useEffect(() => {
    let localStorageData = localStorage.getItem('listaSalva')
    if (localStorageData) {
      setStorageData(JSON.parse(localStorageData))
    }
  }, [])

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
  }

  function submitCity(e) {
    e.preventDefault()
    const appId = process.env.APP_ID

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${appId}`)
      .then(response => {
        currentTemp.current = Math.round(response.data.main.temp)
        setTempDisplay(currentTemp.current)
        if (currentTemp.current >= 32) {
          genreId.current = 'rock'
        }
        else if (currentTemp.current < 32 && currentTemp.current >= 24) {
          genreId.current = 'pop'
        }
        else if (currentTemp.current < 24 && currentTemp.current >= 16) {
          genreId.current = 'classical'
        }
        else if (currentTemp.current < 16) {
          genreId.current = 'lofi'
        }
        setDisplayWidget(true)
        setSaveText('Deseja salvar a playlist?')
        setIsPlaylistSafe(false)
        getPlaylist()
      })
      .catch(error => {
        console.log(error)
      })
  }

  function getPlaylist() {
    const rapidAPI = process.env.RAPID_API
    let playlistIndex = getRandomInt(0, 25)
    let deezerApiOptions = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/search/playlist',
      params: { q: genreId.current },
      headers: {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': rapidAPI
      }
    }

    axios.request(deezerApiOptions)
      .then(response => {
        response.data.data.map(playlist => {
          let link = playlist.link
          genrePlaylists.push({ link })
        })
        currentPlaylist.current = genrePlaylists[playlistIndex].link
        setPlaylistNumber(currentPlaylist.current.replace(/\D/g, ""))
      })
      .catch(error => {
        console.error(error)
      })
  }

  function savePlaylist() {
    const timeElapsed = Date.now()
    const dateNow = new Date(timeElapsed)

    let currentStorageData = {
      data: dateNow.toLocaleDateString(),
      listaDeMusicas: currentPlaylist.current,
      temperatura: currentTemp.current,
      cidade: city,
      categoriaMusical: genreId.current
    }
    storageData.push(currentStorageData)
    localStorage.setItem('listaSalva', JSON.stringify(storageData))
    setSaveText('Playlist salva!')
    setIsPlaylistSafe(true)
  }

  const deletePlaylist = useCallback(index => {
    storageData.splice(index, 1)
    localStorage.setItem('listaSalva', JSON.stringify(storageData))
    setUpdateWidgetsList(!updateWidgetsList)
  }, [storageData, updateWidgetsList])


  return (
    <AppContext.Provider
      value={{
        storageData,
        city,
        setCity,
        tempDisplay,
        playlistNumber,
        displayWidget,
        isPlaylistSafe,
        saveText,
        submitCity,
        savePlaylist,
        deletePlaylist,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const AppContext = createContext()

export const useAppContext = () => {
  return useContext(AppContext)
}


