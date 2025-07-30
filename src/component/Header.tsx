import '../index.css'
import Icon from './Icon'
import { useAuth } from '../contexts/AuthContext'

import { useState, useRef } from 'react'

import type { Artists } from '../types/spotify'
import { Link, useNavigate } from 'react-router-dom'
// import { apisearch } from '../services/spotifyService'
import { Search } from './Search'
function Header() {
  const [users, setUsers] = useState<Artists[]>([])
  const [loading] = useState(false)
  const [search] = useState('')
  const { user, logout, isAuthenticated } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  // Navigation
  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoForward = () => {
    navigate(1)
  }

  if (!isAuthenticated) {
    return (
      <header className='sticky top-0 z-50 backdrop-blur-md bg-black/70'>
        <div className='flex justify-between items-center h-16 px-6 text-white'>
          <div className='flex items-center gap-8'>
            <Link to='/' className='text-xl font-bold'>
              Music App
            </Link>
          </div>

          <div className='flex items-center gap-4'>
            <Link to='/login' className='text-sm text-white hover:underline'>
              Login
            </Link>
            <Link to='/signup' className='text-sm text-white hover:underline hidden md:block'>
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    )
  }
  return (
    <header className='sticky top-0 z-50 backdrop-blur-md bg-black/70'>
      <div className='flex justify-between items-center h-16 px-6 text-white'>
        {/* Left section: Logo and navigation */}
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-4'>
            <Link to='/' className='flex items-center'>
              {/* <div className='w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mr-3 shadow-lg'>
                <Icon name='music' className='w-4 h-4 text-white' />
              </div> */}
              <span className='font-bold text-xl  '>Music App</span>
            </Link>
          </div>

          <div className='hidden md:flex items-center gap-2'>
            <button
              onClick={handleGoBack}
              className='w-8 h-8 rounded-full bg-black/80 flex items-center justify-center hover:bg-gray-800 transition-colors '
            >
              <Icon name='arrow-left' />
            </button>
            <button
              onClick={handleGoForward}
              className='w-8 h-8 rounded-full bg-black/80 flex items-center justify-center hover:bg-gray-800 transition-colors'
            >
              <Icon name='arrow-right' />
            </button>
          </div>
        </div>
        {/* Right section: Search and user controls */}
        <div className='flex items-center gap-4'>
          {/* Search */}
          <div ref={searchRef} className='relative'>
            <Search />

            {/* Search Results Dropdown */}
            {(loading || users.length > 0) && (
              <div className='absolute top-full right-0 mt-2 w-72 bg-gray-900 rounded-lg overflow-hidden shadow-xl z-50 border border-gray-800 animate-fadeIn'>
                {loading ? (
                  <div className='p-4 text-center'>
                    <div className='animate-spin h-5 w-5 border-2 border-green-500 rounded-full border-t-transparent mx-auto'></div>
                    <p className='text-sm text-gray-400 mt-2'>Loading</p>
                  </div>
                ) : (
                  <>
                    <div className='px-4 py-3 border-b border-gray-800'>
                      <h3 className='font-bold text-sm text-gray-300'>Artists</h3>
                    </div>
                    <ul className='max-h-96 overflow-y-auto hide-scrollbar'>
                      {users.map((artist) => (
                        <li key={artist.id}>
                          <Link
                            to={`/artists/${artist.id}`}
                            className='flex items-center gap-3 p-3 hover:bg-gray-800/70 transition-colors'
                            onClick={() => setUsers([])}
                          >
                            {artist.images && artist.images[0] ? (
                              <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                className='w-10 h-10 rounded-full object-cover'
                              />
                            ) : (
                              <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center'>
                                <Icon name='user' />
                              </div>
                            )}
                            <div>
                              <p className='font-medium text-sm text-white'>{artist.name}</p>
                              <p className='text-xs text-gray-400'>
                                Artist • {artist.followers?.total?.toLocaleString() || '0'} followers
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className='p-3 border-t border-gray-800'>
                      <Link
                        to={`/search?q=${encodeURIComponent(search)}`}
                        className='block w-full text-center py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors'
                      >
                        See all results
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className='relative'>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className='flex items-center gap-2 bg-black/20 hover:bg-black/40 rounded-full p-1 transition-colors'
            >
              <img src={user?.avatar} alt={user?.name} className='w-8 h-8 rounded-full object-cover' />
              <span className='text-white text-sm font-medium pr-2 max-md:hidden'>{user?.name}</span>
              <Icon name='chevron-down' className='w-4 h-4 text-white' />
            </button>

            {showDropdown && (
              <div className='absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50'>
                <Link
                  to={`/profile/${user?.id}`}
                  className='block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors'
                >
                  <div className='px-4 py-2 border-b border-gray-700'>
                    <p className='text-white font-medium'>{user?.name}</p>
                    <p className='text-gray-400 text-sm line-clamp-1'>{user?.email}</p>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className='w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors'
                >
                  <Icon name='logout' className='w-4 h-4 inline mr-2' />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
