import React, { useState, useEffect } from 'react'
import { usePlayer } from '../contexts/PlayerContext'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import '../App.css'

interface QueueTrack {
  encodeId: string
  title: string
  artists: Array<{ name: string; alias?: string }>
  thumbnailM: string
  duration: number
  // Bỏ property 'track' vì không cần thiết
}

interface Artist {
  name: string
  alias?: string
}

interface Track {
  encodeId: string
  title: string
  artists?: Artist[]
  thumbnailM: string
  duration: number
}

export const Now_Playing: React.FC = () => {
  const { currentTrack, playlist, isPlaying, playTrackById, playNextTrack, playPreviousTrack } = usePlayer()

  const [showQueue, setShowQueue] = useState(true)
  const [upcomingTracks, setUpcomingTracks] = useState<QueueTrack[]>([])

  // Tính toán bài hát tiếp theo trong playlist
  useEffect(() => {
    if (!currentTrack || !playlist) {
      setUpcomingTracks([])
      return
    }

    // Kiểm tra playlist có phải là array không
    if (!Array.isArray(playlist) || playlist.length === 0) {
      setUpcomingTracks([])
      return
    }

    const currentIndex = playlist.findIndex((track: Track) => track.encodeId === currentTrack.encodeId)

    if (currentIndex !== -1) {
      // Lấy 5 bài tiếp theo trong playlist
      const nextTracks: QueueTrack[] = []
      for (let i = 1; i <= 5; i++) {
        const nextIndex = (currentIndex + i) % playlist.length
        const nextTrack = playlist[nextIndex]
        if (nextTrack) {
          nextTracks.push({
            encodeId: nextTrack.encodeId,
            title: nextTrack.title,
            artists: nextTrack.artists || [],
            thumbnailM: nextTrack.thumbnailM,
            duration: nextTrack.duration
          })
        }
      }
      setUpcomingTracks(nextTracks)
    }
  }, [currentTrack, playlist])

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const handleTrackClick = async (encodeId: string) => {
    try {
      await playTrackById(encodeId)
    } catch (error) {
      console.error('Error playing track:', error)
    }
  }

  if (!currentTrack) {
    return (
      <div className='w-80 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 h-fit'>
        <div className='text-center text-gray-400'>
          <span className='w-5 h-5'>
            <Icon name='music' className='w-12 h-12 mx-auto mb-3 opacity-50' />
          </span>
          <p className='text-sm'>Chưa có bài hát nào đang phát</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-80 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50'>
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b border-gray-700/50'>
        <h3 className='text-white font-semibold text-sm'>Đang phát </h3>
        <button
          onClick={() => setShowQueue(!showQueue)}
          className={`p-1.5 rounded-md transition-colors ${
            showQueue
              ? 'bg-green-500/20 text-green-400 w-7 h-7'
              : 'text-gray-400 hover:text-white hover:bg-gray-700 w-7 h-7'
          }`}
        >
          <Icon name='list' className='w-4 h-4' />
        </button>
      </div>

      {/* Current Track */}
      <div className='p-4 border-b border-gray-700/30'>
        <div className='flex items-center gap-3'>
          <div className='relative flex-shrink-0'>
            <img src={currentTrack.thumbnailM} alt={currentTrack.title} className='w-14 h-14 rounded-lg object-cover' />
            <div className='absolute inset-0 flex items-center justify-center'>
              {isPlaying && (
                <div className='flex gap-0.5'>
                  <div className='w-1 h-3 bg-white rounded-full animate-pulse'></div>
                  <div className='w-1 h-4 bg-white rounded-full animate-pulse delay-75'></div>
                  <div className='w-1 h-2 bg-white rounded-full animate-pulse delay-150'></div>
                </div>
              )}
            </div>
          </div>

          <div className='flex-1 min-w-0'>
            <h4 className='text-white font-medium text-sm line-clamp-1 mb-1'>{currentTrack.title}</h4>
            <p className='text-gray-400 text-xs line-clamp-1'>
              {currentTrack.artists?.map((artist: Artist) => artist.name).join(', ') || 'Unknown Artist'}
            </p>
            <div className='flex items-center gap-2 mt-1'>
              <span className='px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full'>Đang phát</span>
              <span className='text-gray-500 text-xs'>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Queue Section */}
      {showQueue && (
        <div className='max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hide-scrollbar'>
          {upcomingTracks.length > 0 ? (
            <>
              <div className='p-3 border-b border-gray-700/30'>
                <h4 className='text-gray-400 text-xs font-semibold uppercase tracking-wider'>
                  Tiếp theo ({upcomingTracks.length})
                </h4>
              </div>

              <div className='space-y-1'>
                {upcomingTracks.map((track, index) => (
                  <div
                    key={track.encodeId}
                    onClick={() => handleTrackClick(track.encodeId)}
                    className='flex items-center gap-3 p-3 hover:bg-gray-800/50 cursor-pointer transition-colors group'
                  >
                    <div className='flex-shrink-0 text-gray-500 text-xs w-4'>{index + 1}</div>

                    <div className='relative flex-shrink-0'>
                      <img
                        src={track.thumbnailM}
                        alt={track.title}
                        className='w-10 h-10 rounded object-cover'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = 'https://via.placeholder.com/40x40/333/fff?text=♪'
                        }}
                      />
                      <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center'>
                        <Icon name='play' className='w-4 h-4 text-white' />
                      </div>
                    </div>

                    <div className='flex-1 min-w-0'>
                      <h5 className='text-white text-sm line-clamp-1 group-hover:text-green-400 transition-colors'>
                        {track.title}
                      </h5>
                      <p className='text-gray-400 text-xs line-clamp-1'>
                        {track.artists.map((artist: Artist) => artist.name).join(', ')}
                      </p>
                    </div>

                    <div className='flex-shrink-0 text-gray-500 text-xs'>{formatTime(track.duration)}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='p-4 text-center'>
              <Icon name='music' className='w-8 h-8 text-gray-600 mx-auto mb-2' />
              <p className='text-gray-400 text-xs'>Không có bài hát tiếp theo</p>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className='p-3 border-t border-gray-700/30'>
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={playPreviousTrack}
            className='p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors'
            title='Bài trước'
          >
            <Icon name='prev' className='w-4 h-4' />
          </button>

          <button
            onClick={playNextTrack}
            className='p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors'
            title='Bài tiếp theo'
          >
            <Icon name='next' className='w-4 h-4' />
          </button>

          <div className='flex-1' />

          <Link
            to={`/playlist/${playlist?.[0]?.album?.encodeId || 'current'}`}
            className='p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors'
            title='Xem playlist'
          >
            <Icon name='external-link' className='w-4 h-4' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Now_Playing
