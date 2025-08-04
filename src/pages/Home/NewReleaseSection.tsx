import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchHome_MP3 } from '../../services/spotifyService'
import { getSongPLay } from '../../services/song'
import { usePlayer } from '../../contexts/PlayerContext'
import type { ZingMP3HomeResponse } from '../../types/spotify'
import Icon from '../../components/common/Icon_1'

interface PremiumStatus {
  [key: string]: boolean
}
export function NewReleaseSection() {
  const [homeData, setHomeData] = useState<ZingMP3HomeResponse | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [premiumStatus, setPremiumStatus] = useState<Record<string, boolean>>({})
  const { playTrackById, setPlaylist } = usePlayer()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const loadHome = async () => {
      try {
        const homepage = await fetchHome_MP3()
        setHomeData(homepage)
        setLoading(true)
        console.log('Home data loaded:', homepage)
      } catch (error) {
        setLoading(true)
      } finally {
        setLoading(false)
      }
    }
    loadHome()
  }, [])
  // Lấy dữ liệu từ song nếu không có data thì hiển thị chữ premium
  useEffect(() => {
    const checkAllPremium = async () => {
      if (!getNewReleaseSection()?.items) return

      const checksPremium = await Promise.all(
        getNewReleaseSection()?.items.all.map(async (track: any) => {
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

    checkAllPremium()
  }, [homeData])
  const getNewReleaseSection = () => {
    return homeData?.data?.items?.find((item) => item.sectionType === 'new-release')
  }

  const handlePlaySongById = async (encodeId: string, playlistData?: any[]) => {
    try {
      if (playlistData) {
        setPlaylist(playlistData)
      }
      await playTrackById(encodeId)
    } catch (error) {}
  }
  if (loading) {
    return (
      <div className='max-w-7xl mx-auto'>
        {/* Header Skeleton */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <div className='h-10 bg-gray-700 rounded-lg w-56 mb-2 animate-pulse'></div>
            <div className='h-5 bg-gray-800 rounded w-72 animate-pulse'></div>
          </div>
          <div className='h-10 bg-gray-700 rounded-lg w-32 animate-pulse'></div>
        </div>

        {/* Featured Song Skeleton */}
        <div className='bg-gray-800/30 rounded-3xl p-8 mb-8 animate-pulse'>
          <div className='flex items-center gap-8'>
            <div className='w-32 h-32 bg-gray-700 rounded-2xl flex-shrink-0'></div>
            <div className='flex-1 space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-gray-700 rounded-full w-20 h-6'></div>
                <div className='bg-gray-700 rounded w-16 h-6'></div>
              </div>
              <div className='bg-gray-700 rounded w-3/4 h-8'></div>
              <div className='bg-gray-700 rounded w-1/2 h-5'></div>
              <div className='bg-gray-700 rounded w-2/3 h-4'></div>
            </div>
            <div className='w-16 h-16 bg-gray-700 rounded-full flex-shrink-0'></div>
          </div>
        </div>

        {/* Songs Grid Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className='bg-gray-800/30 rounded-2xl p-4 animate-pulse'>
              <div className='flex items-center gap-4'>
                <div className='w-16 h-16 bg-gray-700 rounded-xl flex-shrink-0'></div>
                <div className='flex-1 space-y-2'>
                  <div className='bg-gray-700 rounded w-full h-5'></div>
                  <div className='bg-gray-700 rounded w-3/4 h-4'></div>
                  <div className='bg-gray-700 rounded w-1/2 h-3'></div>
                </div>
                <div className='w-10 h-10 bg-gray-700 rounded-full flex-shrink-0'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent mb-2'>
            {getNewReleaseSection()?.title || 'Mới phát hành'}
          </h2>
          <p className='text-gray-400'>Những bài hát mới nhất và hot nhất</p>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center'>
        {Array.isArray(getNewReleaseSection()?.items.all) &&
          getNewReleaseSection()
            ?.items?.all.slice(0, 12)
            .map((song: any, index: number) => {
              return (
                <div
                  key={song.encodeId}
                  className='group items-center justify-center max-md:flex max-md:gap-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-4 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-500 cursor-pointer border border-white/10 hover:border-purple-400/50'
                  onMouseEnter={() => setHoveredItem(song.encodeId)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className='relative mb-4'>
                    {/* Ranking Badge for Top 3 */}
                    {index < 3 && (
                      <div
                        className={`absolute -top-2 -left-2 w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                          index === 0
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black'
                            : index === 1
                              ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black'
                              : 'bg-gradient-to-br from-orange-400 to-red-500 text-white'
                        }`}
                      >
                        {index + 1}
                      </div>
                    )}

                    <img
                      src={song.thumbnailM}
                      alt={song.title}
                      className='w-15 md:w-full lg:w-full  lg:h-full  items-center aspect-square object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-500'
                    />

                    {/* Glow Effect */}
                    <div className='absolute inset-0 bg-gradient-to-t from-purple-500/0 group-hover:from-purple-500/30 to-transparent rounded-xl transition-all duration-500' />

                    {/* Play Button */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        hoveredItem === song.encodeId ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <button
                        className='bg-green-500/90 backdrop-blur-sm text-black p-3 rounded-full hover:bg-green-400 hover:scale-110 transition-all duration-300 shadow-xl hidden lg:block'
                        onClick={() => handlePlaySongById(song.encodeId, getNewReleaseSection()?.items)}
                      >
                        <Icon name='play' size={30} className='text-white' />
                      </button>
                    </div>
                  </div>

                  <div className='space-y-2 w-[90%]'>
                    <div className=' items-center gap-2'>
                      <Link to={`/infosong?id=${song.encodeId}`} className='block mb-1 hover:underline'>
                        <h3 className='font-bold text-white line-clamp-1 group-hover:text-purple-300 transition-colors '>
                          {song.title}
                        </h3>
                      </Link>
                      <div className='text-xs sm:text-sm text-gray-400 line-clamp-1'>
                        {song.artists.map((artist: any, i: number) => (
                          <span key={i} className='inline'>
                            {i > 0 && ', '}
                            <Link to={`/artist?name=${artist.alias}`} className='hover:underline'>
                              {artist.name}
                            </Link>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className='text-xs text-gray-500 flex justify-between'>
                      {song.releaseDate && (
                        <p className='text-xs text-gray-500 hidden md:block'>
                          {new Date(song.releaseDate * 1000).toLocaleDateString('vi-VN')}
                        </p>
                      )}
                      <div className='flex items-center justify-between text-xs text-gray-400'>
                        {premiumStatus[song.encodeId] === true ? (
                          <span className='text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded-full'>
                            Premium
                          </span>
                        ) : premiumStatus[song.encodeId] === false ? (
                          <span></span>
                        ) : (
                          <span className=''></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}
