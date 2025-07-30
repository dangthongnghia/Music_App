import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { apisearch } from '../services/spotifyService' // Sử dụng function có sẵn
// import { usePlayer } from '../contexts/PlayerContext'
import Icon from './Icon'

interface SearchSuggestion {
  encodeId: string
  title: string
  artists: Array<{ name: string }>
  thumbnail: string
  thumbnailM: string
  alias: string
  type: 'song' | 'artist' | 'playlist'
}

export const Search = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // const { playTrackById } = usePlayer()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Khởi tạo giá trị search từ URL params
  useEffect(() => {
    const keyword = searchParams.get('keyword')
    if (keyword) {
      setSearch(keyword)
      setShowSearch(true)
    }
  }, [searchParams])

  // Debounce search để tránh gọi API quá nhiều
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim().length > 0) {
        fetchSuggestions(search.trim())
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 200) // Delay 500ms

    return () => clearTimeout(timeoutId)
  }, [search])

  // Click outside để đóng suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchSuggestions = async (keyword: string) => {
    try {
      setIsLoading(true)
      const response = await apisearch(keyword)

      console.log('Search response:', response)
      if (response?.data) {
        const suggestions: SearchSuggestion[] = []

        // Lấy bài hát từ response
        if (response.data.songs) {
          suggestions.push(
            ...response.data.songs.slice(0, 5).map((song: any) => ({
              encodeId: song.encodeId,
              title: song.title,
              artists: song.artists || [],
              thumbnail: song.thumbnail,
              type: 'song' as const
            }))
          )
        }

        // Lấy nghệ sĩ từ response
        if (response.data.artists) {
          suggestions.push(
            ...response.data.artists.slice(0, 3).map((artist: any) => ({
              alias: artist.alias || artist.alias,
              title: artist.name,
              artists: [],
              thumbnail: artist.thumbnail,
              type: 'artist' as const
            }))
          )
        }

        // Lấy playlist từ response
        if (response.data.playlists) {
          suggestions.push(
            ...response.data.playlists.slice(0, 2).map((playlist: any) => ({
              encodeId: playlist.encodeId,
              title: playlist.title,
              artists: playlist.artists || [],
              thumbnail: playlist.thumbnail,
              type: 'playlist' as const
            }))
          )
        }

        setSuggestions(suggestions.slice(0, 8)) // Giới hạn 8 gợi ý
        setShowSuggestions(suggestions.length > 0)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
      setShowSuggestions(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    setSelectedIndex(-1)

    if (value.trim().length > 0) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  const handleSearch = (keyword?: string) => {
    const searchKeyword = keyword || search.trim()
    if (searchKeyword !== '') {
      navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`)
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  const handleSuggestionClick = async (suggestion: SearchSuggestion) => {
    setSearch(suggestion.title)
    setShowSuggestions(false)
    setSelectedIndex(-1)

    // Xử lý dựa trên loại suggestion
    switch (suggestion.type) {
      case 'song':
        {
          navigate(`/infosong?id=${suggestion.encodeId}`)
        }
        break
      case 'artist':
        navigate(`artist?name=${suggestion.alias}`)
        break
      case 'playlist':
        navigate(`/playlist/${suggestion.encodeId}`)
        break
      default:
        navigate(`/search?keyword=${encodeURIComponent(suggestion.title)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        handleSearch()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else {
          handleSearch()
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'song':
        return 'Bài hát'
      case 'artist':
        return 'Nghệ sĩ'
      case 'playlist':
        return 'Playlist'
      default:
        return ''
    }
  }

  return (
    <div className='relative' ref={searchRef}>
      <div
        className={`flex items-center ${showSearch ? 'bg-white/10' : 'bg-black/40'} rounded-full overflow-hidden transition-all duration-300 border border-transparent hover:border-gray-700 focus-within:border-white/30 ${showSearch ? 'w-35' : 'w-10 md:w-48'}`}
      >
        <div className='flex-shrink-0 p-2'>
          <button
            onClick={() => {
              if (showSearch) {
                handleSearch()
              } else {
                setShowSearch(true)
                setTimeout(() => inputRef.current?.focus(), 100)
              }
            }}
            className='w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors'
          >
            <Icon name='search' />
          </button>
        </div>

        <input
          ref={inputRef}
          placeholder='Tìm kiếm bài hát, nghệ sĩ, playlist...'
          className='w-full bg-transparent border-none py-2 pr-3 text-white placeholder-gray-500 focus:outline-none text-sm'
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true)
            }
          }}
          aria-label='Search'
          type='search'
          autoComplete='off'
        />

        {isLoading && (
          <div className='flex-shrink-0 p-2'>
            <div className='w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin'></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className='absolute top-full lg:-right-15 -right-20 mt-2 w-80  bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-700/50 z-50 max-h-80 overflow-y-auto hide-scrollbar '>
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.encodeId || suggestion.alias || suggestion.title}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 ${
                index === selectedIndex ? 'bg-white/20 border-l-2 border-green-500' : 'hover:bg-white/10'
              } ${index === 0 ? 'rounded-t-lg' : ''} ${index === suggestions.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-700/30'}`}
            >
              <div className='flex-shrink-0'>
                <img
                  src={suggestion.thumbnailM || suggestion.thumbnail}
                  alt={suggestion.title}
                  className='w-10 h-10 rounded object-cover'
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/40x40/333/fff?text=Music'
                  }}
                />
              </div>

              <div className='flex-grow min-w-0'>
                <div className='flex items-center gap-2 mb-1'>
                  <span className='text-xs text-gray-400 uppercase tracking-wider'>
                    {getTypeLabel(suggestion.type)}
                  </span>
                </div>
                <h4 className='text-white font-medium truncate'>{suggestion.title}</h4>
                {suggestion.artists && suggestion.artists.length > 0 && (
                  <p className='text-sm text-gray-400 truncate'>
                    {suggestion.artists.map((artist) => artist.name).join(', ')}
                  </p>
                )}
              </div>

              {/* Arrow icon */}
              <div className='flex-shrink-0 text-gray-500'>
                <Icon name='arrow-right' className='w-4 h-4' />
              </div>
            </div>
          ))}

          {/* View all results */}
          <div
            onClick={() => handleSearch()}
            className='flex items-center justify-center gap-2 p-3 text-green-400 hover:text-green-300 cursor-pointer border-t border-gray-700/30 hover:bg-white/5 transition-colors rounded-b-lg'
          >
            <p className='w-5 h-5'>
              <Icon name='search' className='w-4 h-4' />
            </p>
            <span className='text-sm font-medium'>Xem tất cả kết quả cho "{search}"</span>
          </div>
        </div>
      )}

      {/* Khong co ket qua */}
      {showSuggestions && suggestions.length === 0 && !isLoading && search.trim().length > 0 && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-700/50 z-50'>
          <div className='p-4 text-center text-gray-400'>
            <Icon name='search' className='w-8 h-8 mx-auto mb-2 opacity-50' />
            <p>Không tìm thấy kết quả nào</p>
            <p className='text-sm mt-1'>Thử tìm kiếm với từ khóa khác</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
