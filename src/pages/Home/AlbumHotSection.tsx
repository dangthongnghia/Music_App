import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchHome_MP3 } from '../../services/spotifyService'
import { usePlayer } from '../../contexts/PlayerContext'
import type { ZingMP3HomeResponse } from '../../types/spotify'
import Icon from '../../components/common/Icon_1'

export function AlbumHotSection() {
  const [homeData, setHomeData] = useState<ZingMP3HomeResponse | null>(null)
  const { playTrackById, setPlaylist } = usePlayer()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadHome = async () => {
      try {
        setLoading(true)
        setError(false)
        const homepage = await fetchHome_MP3()
        setHomeData(homepage)
      } catch (error) {
        console.error('Error loading playlists:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadHome()
  }, [])

  const getNewReleaseSection = () => {
    return homeData?.data?.items?.find((item) => item.sectionType === 'new-release')
  }

  const getPlaylistSection = () => {
    return homeData?.data?.items?.find((item) => item.sectionType === 'playlist' && !item.title?.includes('Top 100'))
  }

  const handlePlaySongById = async (encodeId: string, playlistData?: any[]) => {
    try {
      if (playlistData) {
        setPlaylist(playlistData)
      }
      await playTrackById(encodeId)
    } catch (error) {
      console.error('Error playing song:', error)
    }
  }

  // Loading Skeleton
  if (loading) {
    return (
      <div className='max-w-7xl mx-auto'>
        {/* Header Skeleton */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <div className='h-10 bg-gray-700 rounded-lg w-64 mb-2 animate-pulse'></div>
            <div className='h-5 bg-gray-800 rounded w-80 animate-pulse'></div>
          </div>
        </div>

        {/* Playlist Grid Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='bg-gray-800/30 rounded-3xl p-6 animate-pulse'>
              <div className='flex items-center gap-6'>
                {/* Thumbnail Skeleton */}
                <div className='w-20 h-20 bg-gray-700 rounded-2xl flex-shrink-0'></div>

                {/* Content Skeleton */}
                <div className='flex-1 min-w-0 space-y-3'>
                  <div className='bg-gray-700 rounded w-full h-6'></div>
                  <div className='bg-gray-700 rounded w-3/4 h-4'></div>
                  <div className='bg-gray-700 rounded w-1/2 h-3'></div>
                </div>

                {/* Play Button Skeleton */}
                <div className='w-12 h-12 bg-gray-700 rounded-full flex-shrink-0'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className='max-w-7xl mx-auto text-center py-16'>
        <div className='bg-gray-800/30 rounded-3xl p-8'>
          <Icon name='alert' size={64} className='mx-auto mb-4 text-red-400' />
          <h3 className='text-xl font-bold text-white mb-2'>Không thể tải playlist</h3>
          <p className='text-gray-400 mb-4'>Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors'
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  // No Data State
  if (!getPlaylistSection()?.items?.length) {
    return (
      <div className='max-w-7xl mx-auto text-center py-16'>
        <div className='bg-gray-800/30 rounded-3xl p-8'>
          <Icon name='playlist' size={64} className='mx-auto mb-4 text-gray-500' />
          <h3 className='text-xl font-bold text-white mb-2'>Chưa có playlist nào</h3>
          <p className='text-gray-400'>Hãy quay lại sau để khám phá những playlist mới!</p>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-4xl font-black bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 bg-clip-text text-transparent mb-2'>
            {getPlaylistSection()?.title || 'Playlist nổi bật'}
          </h2>
          <p className='text-gray-400'>Khám phá những playlist được tuyển chọn</p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {Array.isArray(getPlaylistSection()?.items) &&
          getPlaylistSection()
            ?.items?.slice(0, 6)
            .map((playlist: any) => (
              <Link
                key={playlist.encodeId}
                to={`/playlist/${playlist.encodeId}`}
                className='group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-6 hover:from-green-500/20 hover:to-blue-500/20 transition-all duration-500 border border-white/10 hover:border-green-400/50'
              >
                <div className='flex items-center gap-6'>
                  <div className='relative'>
                    <img
                      src={playlist.thumbnail || playlist.thumbnailM}
                      alt={playlist.title}
                      className='w-20 h-20 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/img/default-playlist.jpg'
                      }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-br from-green-500/0 group-hover:from-green-500/30 to-transparent rounded-2xl transition-all duration-500' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <h3 className='font-bold text-white text-lg line-clamp-2 group-hover:text-green-300 transition-colors mb-2'>
                      {playlist.title}
                    </h3>
                    <p className='text-sm text-gray-400 line-clamp-1 mb-1'>
                      {playlist.sortDescription || 'Playlist tuyển chọn'}
                    </p>
                    <p className='text-xs text-gray-500'>{Math.floor(Math.random() * 500) + 50} bài hát</p>
                  </div>

                  <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <button
                      className='bg-green-500 text-white p-3 rounded-full hover:bg-green-400 transition-colors'
                      onClick={(e) => {
                        e.preventDefault()
                        handlePlaySongById(playlist.encodeId, getNewReleaseSection()?.items)
                      }}
                    >
                      <Icon name='play' size={20} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}
