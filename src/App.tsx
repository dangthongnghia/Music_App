import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import './index.css'

import { PlayerProvider } from './contexts/PlayerContext'
import { AuthProvider } from './contexts/AuthContext'
import Home from './page/Home'
import InfoSong from './page/InfoSong'
import PlaylistDetail from './page/Playlist'
import ArtistsId from './page/Artists'
import Profile from './page/Profile'
import Login from './page/auth/login'
import Signup from './page/auth/signup'
import { useEffect } from 'react'
import { Layout } from './component/Layout'

// import { Loading } from './component/Loading'
import { NewReleaseChart } from './page/NewReleaseChart'
import Top100 from './page/Top100'
import { SearchPage } from './page/SearchPage '

function AppContent() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <>
      {isAuthPage ? (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/top100' element={<Top100 />} />
            <Route path='/playlist/:id' element={<PlaylistDetail />} />
            <Route path='/artist' element={<ArtistsId />} />
            <Route path='/newreleasechart' element={<NewReleaseChart />} />
            <Route path='/infosong' element={<InfoSong />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/search' element={<SearchPage />} />
          </Routes>
        </Layout>
      )}
    </>
  )
}

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#121212'
  })

  return (
    <PlayerProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </PlayerProvider>
  )
}

export default App
