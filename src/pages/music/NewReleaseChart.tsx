import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { NewReleaseChartRespone } from '../../types/spotify'
import { fetchNewRelease } from '../../services/spotifyService'
import { usePlayer } from '../../contexts/PlayerContext'
import Icon from '../../components/common/Icon_1'
import { Button } from '../../components/ui/Button'
import { Loading } from '../../components/ui/Loading'
import { formatDuration } from '../../utils/formatters'

interface PremiumStatus {
  [key: string]: boolean
}
export function NewReleaseChart() {
  const [newReleaseData, setNewReleaseData] = useState<NewReleaseChartRespone | any>()
  const [loading, setLoading] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  // const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set())
  const { playTrackById, currentTrack, isPlaying, setPlaylist } = usePlayer()
  const [premiumStatus, setPremiumStatus] = useState<Record<string, boolean>>({})
  useEffect(() => {
    const loadNewRelease = async () => {
      try {
        setLoading(true)
        const newRl = await fetchNewRelease()
        console.log('New Release Data:', newRl)
        setNewReleaseData(newRl)
      } catch (error) {
        console.error('Error loading new releases:', error)
      } finally {
        setLoading(false)
      }
    }
    loadNewRelease()
  }, [])

  useEffect(() => {
    const checkAllPremium = async () => {
      if (!newReleaseData?.data.items) return

      const checksPremium = await Promise.all(
        newReleaseData?.data.items.map(async (track: any) => {
          try {
            const result = await fetchNewRelease()
            return { encodeId: track.encodeId, isPremium: result.err === -1110 || result.err === -1150 }
          } catch (error) {
            return { encodeId: track.encodeId, isPremium: false }
          }
        })
      )

      const newPremiumStatus: PremiumStatus = {}
      checksPremium.forEach(({ encodeId, isPremium }) => {
        newPremiumStatus[encodeId] = isPremium
      })

      setPremiumStatus(newPremiumStatus)
    }

    checkAllPremium()
  }, [newReleaseData?.data.items])

  const handlePlaySong = async (song: any) => {
    try {
      if (newReleaseData?.data?.items) {
        setPlaylist(newReleaseData.data.items)
      }
      await playTrackById(song.encodeId)
    } catch (error) {
      console.error('Error playing song:', error)
    }
  }

  const handlePlayAll = async () => {
    try {
      if (newReleaseData?.data?.items?.length > 0) {
        setPlaylist(newReleaseData.data.items)
        await playTrackById(newReleaseData.data.items[0].encodeId)
      }
    } catch (error) {
      console.error('Error playing all songs:', error)
    }
  }

  // const handleLike = (songId: string) => {
  //   setLikedSongs(prev => {
  //     const newSet = new Set(prev)
  //     if (newSet.has(songId)) {
  //       newSet.delete(songId)
  //     } else {
  //       newSet.add(songId)
  //     }
  //     return newSet
  //   })
  // }

  const getRankingIcon = (rakingStatus: number) => {
    if (rakingStatus > 0) {
      return (
        <div className='flex flex-col items-center gap-1'>
          <Icon name='uparrow' size={16} className='text-green-500 ' />
          <span className='text-xs font-bold text-green-500'>{Math.abs(rakingStatus)}</span>
        </div>
      )
    } else if (rakingStatus < 0) {
      return (
        <div className='flex flex-col items-center gap-1'>
          <Icon name='downarrow' size={16} className='text-red-500' />
          <span className='text-xs font-bold text-red-500'>{Math.abs(rakingStatus)}</span>
        </div>
      )
    } else {
      return (
        <div className='flex items-center justify-center'>
          <span className='text-gray-500 text-sm'>━</span>
        </div>
      )
    }
  }

  const isCurrentlyPlaying = (songId: string) => {
    return currentTrack?.encodeId === songId && isPlaying
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black'>
        <Loading size='lg' text='Đang tải bảng xếp hạng...' />
      </div>
    )
  }

  if (!newReleaseData?.data) {
    return (
      <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white'>
        <div className='text-center'>
          <Icon name='music' size={64} className='mx-auto mb-4 text-gray-600' />
          <p className='text-xl'>Không thể tải dữ liệu bảng xếp hạng</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900'>
      {/* Header Section */}
      <div className='relative overflow-hidden'>
        {/* Background gradient */}
        <div className='absolute inset-0 bg-gradient-to-r from-purple-600 via-green-600 to-blue-600 opacity-80' />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/80' />

        <div className='relative z-10 container mx-auto px-4 py-12'>
          <div className='text-center space-y-6'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
              <Icon name='fire' size={20} className='text-orange-400' />
              <span className='text-white font-medium'>Mới phát hành</span>
            </div>

            {/* Title */}
            <h1 className='text-white text-4xl lg:text-6xl font-bold leading-tight'>
              {newReleaseData?.data?.title || 'Bảng Xếp Hạng Mới'}
            </h1>

            {/* Subtitle */}
            <p className='text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed'>
              Những ca khúc mới nhất và hot nhất được cập nhật liên tục
            </p>

            {/* Action Buttons */}
            <div className='flex items-center justify-center gap-4 pt-4 '>
              <Button variant='secondary' size='lg' onClick={handlePlayAll} className='px-8 max-md:text-sm '>
                <Icon name='play' size={20} />
                Phát tất cả
              </Button>

              <Button variant='ghost' size='lg' className='max-md:text-sm '>
                <Icon name='shuffle' size={20} />
                Phát ngẫu nhiên
              </Button>
            </div>

            {/* Stats */}
            <div className='flex items-center justify-center gap-3 md:gap-6 text-sm text-gray-400'>
              <span>{newReleaseData?.data?.items?.length || 0} bài hát</span>
              <span>•</span>
              <span>Cập nhật hàng ngày</span>
              <span>•</span>
              <span>Xu hướng âm nhạc</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='bg-gray-800/30 rounded-xl backdrop-blur-sm overflow-hidden'>
          {/* Header */}
          <div className='grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-700 text-gray-400 text-sm font-medium'>
            <div className='col-span-1 text-center'>#</div>
            <div className='col-span-6 md:col-span-5'>Bài hát</div>
            <div className='hidden md:block md:col-span-3'>Album</div>
            <div className='col-span-5 md:col-span-2 text-center'>Thời gian</div>
          </div>

          {/* Song List */}
          <div className='divide-y divide-gray-700/50'>
            {newReleaseData?.data?.items?.map((song: any, index: number) => (
              <div
                key={song.encodeId || index}
                className={`group grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-700/30 transition-all duration-200 ${
                  isCurrentlyPlaying(song.encodeId) ? 'bg-green-500/10' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Rank & Play Button */}
                <div className='col-span-1 flex items-center justify-center'>
                  {hoveredIndex === index ? (
                    <Button variant='ghost' size='sm' onClick={() => handlePlaySong(song)}>
                      <Icon
                        name={isCurrentlyPlaying(song.encodeId) ? 'pause' : 'play'}
                        size={16}
                        className='text-white'
                      />
                    </Button>
                  ) : isCurrentlyPlaying(song.encodeId) ? (
                    <div className='w-4 h-4 flex items-center justify-center'>
                      <div className='flex gap-1'>
                        <div className='w-1 h-4 bg-green-500 animate-pulse rounded-full'></div>
                        <div
                          className='w-1 h-4 bg-green-500 animate-pulse rounded-full'
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className='w-1 h-4 bg-green-500 animate-pulse rounded-full'
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className='text-gray-400 font-medium text-sm'>{index + 1}</div>
                  )}
                </div>

                {/* Song Info */}
                <div className='col-span-6 md:col-span-5 flex items-center gap-3 min-w-0'>
                  <div className='relative flex-shrink-0'>
                    <img src={song.thumbnailM} alt={song.title} className='w-12 h-12 rounded-lg object-cover' />
                    {isCurrentlyPlaying(song.encodeId) && (
                      <div className='absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center'>
                        <Icon name='volume' size={16} className='text-green-400' />
                      </div>
                    )}
                  </div>

                  <div className='flex-1 min-w-0'>
                    <Link
                      to={`/song?id=${song.encodeId}`}
                      className={`block font-medium truncate transition-colors ${
                        isCurrentlyPlaying(song.encodeId) ? 'text-green-400' : 'text-white hover:text-green-400'
                      }`}
                    >
                      <div className='flex items-center gap-5'>
                        <p className='text-white font-semibold line-clamp-1'>{song.title}</p>
                        <div className='flex items-center justify-between text-xs text-gray-400'>
                          {premiumStatus[song.encodeId] === true ? (
                            <span className='text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded-full'>
                              Premium
                            </span>
                          ) : premiumStatus[song.encodeId] === false ? (
                            <span className=''></span>
                          ) : (
                            <span className='text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded-full'>
                              Premium
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className='flex items-center gap-2 mt-1'>
                      <span className='text-gray-400 text-sm truncate'>{song.artistsNames}</span>
                      {song.streamingStatus === 1 && <Icon name='verified' size={14} className='text-blue-400' />}
                    </div>
                  </div>

                  {/* Ranking Status */}
                  <div className='hidden sm:flex items-center'>{getRankingIcon(song.rakingStatus || 0)}</div>
                </div>

                {/* Album */}
                <div className='hidden md:flex md:col-span-3 items-center'>
                  <Link
                    to={`/album?id=${song.album?.encodeId}`}
                    className='text-gray-400 hover:text-white transition-colors truncate text-sm'
                  >
                    {song.album?.title || 'Single'}
                  </Link>
                </div>

                {/* Duration */}
                <div className='col-span-5  md:col-span-2 flex items-center justify-center'>
                  <span className='text-gray-400 text-sm'>{formatDuration(song.duration)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
