import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchHome_MP3 } from '../../services/spotifyService'
import { usePlayer } from '../../contexts/PlayerContext'
import { getSongPLay } from '../../services/song'
import type { ZingMP3HomeResponse } from '../../types/spotify'
import Icon from '../../components/common/Icon_1'

interface PremiumStatus {
  [key: string]: boolean
}

export function ChartSection() {
  const [homeData, setHomeData] = useState<ZingMP3HomeResponse | null>(null)
  const [hoveredItemChart, setHoveredItemChart] = useState<string | null>(null)
  const [premiumStatus, setPremiumStatus] = useState<Record<string, boolean>>({})
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
        console.error('Error loading chart data:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadHome()
  }, [])

  useEffect(() => {
    const checkAllPremium = async () => {
      if (!getNewReleaseChartSection()?.items) return

      const checksPremium = await Promise.all(
        getNewReleaseChartSection()?.items.map(async (track: any) => {
          try {
            const result = await getSongPLay(track.encodeId)
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

    if (homeData && !loading) {
      checkAllPremium()
    }
  }, [homeData, loading])

  const getNewReleaseChartSection = () => {
    return homeData?.data?.items?.find((item) => item.sectionType === 'newReleaseChart')
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
        <div className='flex items-center justify-between mb-8'>
          <div>
            <div className='h-10 bg-gray-700 rounded-lg w-48 mb-2 animate-pulse'></div>
            <div className='h-5 bg-gray-800 rounded w-64 animate-pulse'></div>
          </div>
        </div>

        {/* Featured Chart Item Skeleton */}
        <div className='bg-gray-800/30 rounded-3xl p-8 mb-8 animate-pulse'>
          <div className='flex items-center gap-8'>
            <div className='w-20 h-20 md:h-24 md:w-24 bg-gray-700 rounded-2xl'></div>
            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='bg-gray-700 rounded-full w-24 h-6'></div>
                <div className='bg-gray-700 rounded w-12 h-6'></div>
              </div>
              <div className='bg-gray-700 rounded w-64 h-8 mb-2'></div>
              <div className='bg-gray-700 rounded w-48 h-5'></div>
            </div>
            <div className='w-16 h-16 bg-gray-700 rounded-full hidden md:block'></div>
          </div>
        </div>

        {/* Chart List Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='bg-gray-800/30 rounded-2xl p-4 animate-pulse'>
              <div className='flex items-center gap-4'>
                <div className='w-8 h-8 bg-gray-700 rounded'></div>
                <div className='w-16 h-16 bg-gray-700 rounded-xl'></div>
                <div className='flex-1'>
                  <div className='bg-gray-700 rounded w-full h-5 mb-2'></div>
                  <div className='bg-gray-700 rounded w-3/4 h-4'></div>
                </div>
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
          <h3 className='text-xl font-bold text-white mb-2'>Không thể tải bảng xếp hạng</h3>
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
  if (!getNewReleaseChartSection()?.items?.length) {
    return (
      <div className='max-w-7xl mx-auto text-center py-16'>
        <div className='bg-gray-800/30 rounded-3xl p-8'>
          <Icon name='music' size={64} className='mx-auto mb-4 text-gray-500' />
          <h3 className='text-xl font-bold text-white mb-2'>Chưa có dữ liệu bảng xếp hạng</h3>
          <p className='text-gray-400'>Hãy quay lại sau để xem những bài hát hot nhất!</p>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-4xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-clip-text text-transparent mb-2'>
            {getNewReleaseChartSection()?.title || 'BXH Nhạc Mới'}
          </h2>
          <p className='text-gray-400'>Những bài hát đang thịnh hành nhất</p>
        </div>
      </div>

      {/* Featured Chart Item */}
      {getNewReleaseChartSection()?.items?.[0] && (
        <div className='bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-orange-400/30'>
          <div className='flex items-center gap-8'>
            <div className='relative group'>
              <img
                src={getNewReleaseChartSection()?.items?.[0]?.thumbnailM || '/img/default-music.jpg'}
                alt={getNewReleaseChartSection()?.items?.[0]?.title || 'Song'}
                className='w-15 h-15 md:h-24 md:w-24 object-cover rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300'
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/img/default-music.jpg'
                }}
              />
              <div className='absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-transparent transition-all duration-300' />
            </div>

            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-2'>
                <span className='bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs md:text-sm font-bold'>
                  #1 TRENDING
                </span>
                <div className='flex items-center gap-1 text-orange-400'>
                  <Icon name='fire' className='text-lg' />
                  <span className='text-xs md:text-sm font-medium'>HOT</span>
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                <Link
                  to={`/infosong?id=${getNewReleaseChartSection()?.items?.[0]?.encodeId}`}
                  className='block mb-1 hover:underline'
                >
                  <h3 className='text-sm line-clamp-1 md:text-2xl font-bold text-white mb-1'>
                    {getNewReleaseChartSection()?.items?.[0]?.title || 'Untitled Song'}
                  </h3>
                </Link>
                <div className='flex items-center justify-between text-xs text-gray-400'>
                  {premiumStatus[getNewReleaseChartSection()?.items?.[0]?.encodeId] === true && (
                    <span className='text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded-full'>Premium</span>
                  )}
                </div>
              </div>
              <div className='text-xs sm:text-sm text-gray-400 line-clamp-1'>
                {Array.isArray(getNewReleaseChartSection()?.items?.[0]?.artists)
                  ? getNewReleaseChartSection()?.items?.[0]?.artists?.map((artist: any, i: number) => (
                      <span key={i} className='inline'>
                        {i > 0 && ', '}
                        <Link to={`/artist?name=${artist.alias}`} className='hover:underline'>
                          {artist.name}
                        </Link>
                      </span>
                    ))
                  : getNewReleaseChartSection()?.items?.[0]?.artists || 'Unknown Artist'}
              </div>
            </div>

            <button
              onClick={() => handlePlaySongById(getNewReleaseChartSection()?.items?.[0]?.encodeId)}
              className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white p-4 rounded-full hover:scale-110 transition-all duration-300 shadow-xl hidden md:block'
            >
              <Icon name='play' size={30} className='text-white' />
            </button>
          </div>
        </div>
      )}

      {/* Chart List */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {Array.isArray(getNewReleaseChartSection()?.items) &&
          getNewReleaseChartSection()
            ?.items?.slice(1, 11)
            .map((song: any, index: number) => (
              <div
                key={song.encodeId}
                className='group bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 cursor-pointer border border-white/10 hover:border-orange-400/50'
                onMouseEnter={() => setHoveredItemChart(song.encodeId)}
                onMouseLeave={() => setHoveredItemChart(null)}
              >
                <div className='flex items-center gap-4'>
                  {/* Ranking */}
                  <div className='flex-shrink-0 w-8 text-center'>
                    <span className={`text-2xl font-black ${index + 2 <= 3 ? 'text-orange-400' : 'text-gray-400'}`}>
                      {index + 2}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className='relative'>
                    <img
                      src={song.thumbnail || song.thumbnailM}
                      alt={song.title}
                      className='w-12 h-12 object-cover rounded-xl shadow-lg'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/img/default-music.jpg'
                      }}
                    />
                    {/* Play Button */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl transition-all duration-300 ${
                        hoveredItemChart === song.encodeId ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <button
                        className='hover:scale-110 transition-all duration-300'
                        onClick={() => handlePlaySongById(song.encodeId, getNewReleaseChartSection()?.items)}
                      >
                        <Icon name='play' size={24} className='text-white' />
                      </button>
                    </div>
                  </div>

                  {/* Song Info */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex gap-3 items-center'>
                      <Link to={`/infosong?id=${song.encodeId}`} className='block mb-1 hover:underline'>
                        <h4 className='text-sm line-clamp-1 md:text-2xl font-bold text-white mb-1'>
                          {song.title}
                        </h4>
                      </Link>
                      <div className='flex items-center justify-between text-xs text-gray-400'>
                        {premiumStatus[song.encodeId] === true && (
                          <span className='text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded-full'>
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='text-xs sm:text-sm text-gray-400 line-clamp-1'>
                      {Array.isArray(song.artists)
                        ? song.artists.map((artist: any, i: number) => (
                            <span key={i} className='inline'>
                              {i > 0 && ', '}
                              <Link to={`/artist?name=${artist.alias}`} className='hover:underline'>
                                {artist.name}
                              </Link>
                            </span>
                          ))
                        : song.artists}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
