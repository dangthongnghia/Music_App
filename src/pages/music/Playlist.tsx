import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { fetchDetailPlaylist } from '../../services/spotifyService'
import { getSongPLay } from '../../services/song'
import type { DetailplaylistData } from '../../types/spotify'
import Icon from '../../components/common/Icon_1'
import { usePlayer } from '../../contexts/PlayerContext'
import { Button } from '../../components/ui/Button'
import { formatListen_Like } from '../../utils/formatters'
interface PremiumStatus {
  [key: string]: boolean
}
export default function PlaylistDetail() {
  const { id } = useParams<{ id: any }>()
  const [searchParams] = useSearchParams()
  const playlistId = id || searchParams.get('id')
  const [premiumStatus, setPremiumStatus] = useState<Record<string, boolean>>({})
  const [playlistData, setPlaylistData] = useState<DetailplaylistData | null>()
  const [trackplaylist, setTrackPlaylist] = useState<DetailplaylistData | null>()
  const [isShown, setIsShown] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  const { loadPlaylistById, playPlaylist, playTrackById, currentTrack, isPlaying, togglePlayPause } = usePlayer()

  useEffect(() => {
    if (playlistId) {
      loadPlaylistById(playlistId)
    }
  }, [playlistId, loadPlaylistById])

  useEffect(() => {
    const loadPlaylist = async () => {
      if (!playlistId) return
      try {
        setLoading(true)
        const detailPlaylist = await fetchDetailPlaylist(playlistId)
        console.log(detailPlaylist)
        setPlaylistData(detailPlaylist)

        setTrackPlaylist(detailPlaylist)

        // Set background gradient
        if (detailPlaylist?.data.thumbnailM) {
          document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgb(18, 18, 18) 100%), 
                                            url(${detailPlaylist.data.thumbnailM})`
          document.body.style.backgroundSize = 'cover'
          document.body.style.backgroundPosition = 'center'
          document.body.style.backgroundAttachment = 'fixed'
        }
      } catch (error) {
        console.error('Error fetching playlist:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPlaylist()

    return () => {
      document.body.style.background = 'black'
    }
  }, [playlistId])

  useEffect(() => {
    const checkAllPremium = async () => {
      if (!trackplaylist?.data.song.items) return

      const checksPremium = await Promise.all(
        trackplaylist.data.song.items.map(async (track) => {
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
  }, [trackplaylist])
  const handlePlayPlaylist = () => {
    if (playlistId) {
      if (isThisPlaylistPlaying && isPlaying) {
        togglePlayPause()
      } else {
        // Nếu không phải playlist này hoặc đang pause, thì play từ đầu
        playPlaylist(playlistId, 0)
      }
    }
  }
  const isThisPlaylistPlaying =
    currentTrack && trackplaylist?.data.song.items?.some((track: any) => track.encodeId === currentTrack.encodeId)

  const handlePlayFromPlaylist = (encodeId: string) => {
    try {
      // Nếu đang phát track này và đang play, thì pause
      if (currentTrack?.encodeId === encodeId && isPlaying) {
        togglePlayPause()
      } else {
        // Nếu không phải track này hoặc đang pause, thì play track này
        playTrackById(encodeId)
      }
    } catch (error) {
      // console.error('Error playing from playlist:', error)
    }
  }

  const isCurrentTrackPlaying = (trackId: string) => {
    return currentTrack?.encodeId === trackId && isPlaying
  }

  const formatDuration = (ms: number) => {
    if (!ms || isNaN(ms)) return '0:00'
    const minutes = Math.floor(ms / 60)
    const seconds = ms % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getTotalDuration = () => {
    if (!trackplaylist?.data.song.items) return '0 phút'
    const totalSeconds = trackplaylist.data.song.items.reduce((total, item) => total + (item.duration || 0), 0)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)

    if (hours > 0) {
      return `${hours} giờ ${minutes} phút`
    }
    return `${minutes} phút`
  }
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  return (
    <div className='text-white w-full min-h-screen pb-24'>
      {/* Hero Section */}
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10'></div>
        <div className='pt-20 pb-16 px-8 flex flex-col md:flex-row items-center gap-8 relative z-20'>
          <div className='shrink-0 group'>
            {playlistData && (
              <div className='relative'>
                <img
                  src={playlistData?.data.thumbnailM || playlistData?.data.thumbnail}
                  alt={playlistData?.data.title}
                  className='w-50 h-50 lg:w-72 lg:h-72 md:w-60 md:h-60 items-center rounded-2xl shadow-2xl object-cover transform group-hover:scale-105 transition-all duration-500'
                />
                <div className='absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-black/0 transition-all duration-500'></div>
              </div>
            )}
          </div>
          <div className='flex flex-col justify-end space-y-4'>
            <div className='flex items-center max-md:justify-center gap-2'>
              <span className='bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide'>
                Playlist
              </span>
              <span className='text-xs text-gray-300'>{trackplaylist?.data.song.total} bài hát</span>
            </div>
            <h1 className='text-xl md:text-3xl lg:text-5xl xl:text-7xl  font-black mb-2 line-clamp-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
              {playlistData?.data.title}
            </h1>
            <div className='flex text-base md:text-lg lg:text-3xl gap-0.5'>
              <p className='text-sm'>{playlistData?.data.artistsNames}</p>
            </div>
            <div className='text-xs md:text-sm text-gray-400 flex items-center max-md:justify-center'>
              <span className='flex items-center gap-2'>
                <Icon name='heart' size={20} />

                {formatListen_Like(trackplaylist?.data.like ?? 0) || 0}
              </span>
              <span className='mx-2'>•</span>
              <span className='flex items-center gap-2'>
                <Icon name='play' size={30} className='text-white' />

                {formatListen_Like(trackplaylist?.data.listen ?? 0) || 0}
              </span>
            </div>

            <div className=' hidden md:flex items-center max-md:justify-center gap-6 pt-6'>
              <Button variant='secondary' size='lg' onClick={() => handlePlayPlaylist()} className='px-8'>
                <Icon name='play' size={20} />
                Phát nhạc
              </Button>

              <Button variant={isLiked ? 'default' : 'ghost'} size='lg' onClick={() => setIsLiked(!isLiked)}>
                <Icon name={isLiked ? 'heart-filled' : 'heart'} size={20} />
                {isLiked ? 'Đã thích' : 'Thích'}
              </Button>

              <button className='text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 w-5 h-5 md:w-7 md:h-7'>
                <Icon name='download' className='text-3xl' />
              </button>

              <button className='text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 w-5 h-5 md:w-7 md:h-7 rotate-90'>
                <Icon name='more' className='text-3xl' />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Button play mobile */}
      <div className=' bg-black/70 w-full h-20 flex md:hidden justify-around items-center'>
        <button
          className={`text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 w-5 h-5 md:w-7 md:h-7 ${
            isLiked ? 'text-green-500' : ''
          }`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Icon name={isLiked ? 'heart-filled' : 'heart'} size={30} className='text-3xl' />
        </button>
        <button
          className='bg-green-500 hover:bg-green-400 hover:scale-110 text-white font-bold rounded-full flex items-center justify-center px-5 h-13 md:w-14 md:h-14 transition-all duration-300 shadow-lg hover:shadow-green-500/25'
          onClick={handlePlayPlaylist}
        >
          <div className='w-10 h-10'>
            <Icon name={isPlaying && isThisPlaylistPlaying ? 'pause' : 'play'} className='text-black text-xl' />
          </div>
          <p>Nghe tất cả</p>
        </button>
        <button className='text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 w-5 h-5 md:w-7 md:h-7 '>
          <Icon name='share' className='text-3xl' />
        </button>
      </div>
      {/* Track List */}
      <div className='md:px-8 md:mt-8'>
        <div className='bg-black/30 backdrop-blur-sm md:rounded-2xl p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold hidden md:block'>Danh sách bài hát</h2>
            <div className='flex items-center gap-4'>
              <select className='bg-transparent text-gray-400 text-sm outline-none cursor-pointer hidden md:block'>
                <option>Tùy chỉnh</option>
                <option>Tiêu đề</option>
                <option>Nghệ sĩ</option>
                <option>Album</option>
                <option>Ngày thêm</option>
              </select>
            </div>
          </div>

          {/* Header */}
          <div className='md:grid grid-cols-12 gap-4 px-4 py-3 text-sm text-gray-400 border-b border-white/10 mb-4 hidden '>
            <div className='col-span-1 text-center'>#</div>
            <div className='col-span-6'>Tên bài hát</div>
            <div className='col-span-3 hidden lg:block'>Album</div>
            <div className='col-span-2 text-right'>Thời lượng</div>
          </div>

          {/* Track List */}
          <div className='space-y-2'>
            {trackplaylist?.data.song.items.map((track, index) => (
              <div
                key={track.encodeId}
                className='group grid grid-cols-7 md:grid-cols-12 gap-4 items-center px-4 py-3 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-300'
                onMouseEnter={() => setIsShown(track.encodeId)}
                onMouseLeave={() => setIsShown(null)}
                // onClick={() => handlePlayFromPlaylist(track.encodeId, trackplaylist.data.song.items)}
              >
                {/* Track Number / Play Button */}
                <div className='col-span-1 flex justify-center '>
                  <button
                    className='w-8 h-8 flex items-center justify-center'
                    onClick={() => handlePlayFromPlaylist(track.encodeId)}
                  >
                    {isCurrentTrackPlaying(track.encodeId) ? (
                      isShown === track.encodeId ? (
                        <Icon name='pause' className='text-white text-lg' />
                      ) : (
                        <div className='flex flex-row gap-1'>
                          <div className='w-[2px] h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]'></div>
                          <div className='w-[2px] h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.3s]'></div>
                          <div className='w-[2px] h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]'></div>
                        </div>
                      )
                    ) : isShown === track.encodeId ? (
                      <Icon name='play' size={30} className='text-white' />
                    ) : (
                      <span className='text-gray-400 text-sm font-medium'>{index + 1}</span>
                    )}
                  </button>
                </div>

                {/* Track Info */}
                <div className='col-span-6 flex items-center gap-4'>
                  <img
                    src={track.thumbnailM}
                    alt={track.title}
                    className='hidden md:block w-12 h-12 rounded-lg object-cover'
                  />
                  <div className='flex-1 min-w-0 w-full'>
                    <div className='flex gap-5 items-center'>
                      <Link to={`/infosong?id=${track.encodeId}`} className='hover:underline'>
                        <h3
                          key={track.encodeId}
                          className={`font-medium text-xs  line-clamp-1 hover:text-green-400 transition-colors w-full `}
                        >
                          {track.title}
                        </h3>
                      </Link>
                      <div className='flex items-center justify-between text-xs text-gray-400'>
                        {premiumStatus[track.encodeId] === true ? (
                          <span className='text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded-full'>
                            Premium
                          </span>
                        ) : (
                          premiumStatus[track.encodeId] === false && <span className=''></span>
                        )}
                      </div>
                    </div>
                    <p className='text-sm text-gray-400 line-clamp-1'>
                      {track.artists?.map((artist: any, i: number) => (
                        <span key={artist.id} className='hover:underline'>
                          {i > 0 ? <span>, </span> : ' '}
                          <Link to={`/artist?name=${artist.alias}`} className='hover:text-green-400'>
                            {artist.name}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Album (Hidden on mobile) */}
                <div className='col-span-3 hidden lg:block text-gray-400 text-sm line-clamp-1'>
                  {track.album?.title || 'Single'}
                </div>

                {/* Duration & Actions */}
                <div className='col-span-2 text-right hidden'>
                  <div className='flex items-center justify-end gap-4'>
                    <button className='opacity-0 group-hover:opacity-100 transition-opacity'>
                      <Icon name='heart' size={20} className='text-gray-400 hover:text-green-400 text-lg' />
                    </button>
                    <span className='text-gray-400 text-sm '>{formatDuration(track.duration)}</span>
                    <button className='opacity-0 group-hover:opacity-100 transition-opacity'>
                      <Icon name='more' className='text-gray-400 hover:text-white text-lg' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Playlist Stats */}
      <div className='md:px-8 md:mt-8'>
        <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6'>
          <div className='grid grid-cols-3 gap-6 text-center text-sm md:text-xl lg:text-2xl'>
            <div>
              <div className='text-base md:text-2xl lg:text-3xl font-bold text-green-400 mb-2'>
                {trackplaylist?.data.song.total || 0}
              </div>
              <div className='text-gray-400'>Bài hát</div>
            </div>
            <div>
              <div className='text-base md:text-2xl lg:text-3xl font-bold text-blue-400 mb-2'>{getTotalDuration()}</div>
              <div className='text-gray-400'>Tổng thời lượng</div>
            </div>
            <div>
              <div className='text-base md:text-2xl lg:text-3xl font-bold text-purple-400 mb-2'>
                {Math.floor(Math.random() * 1000)}K
              </div>
              <div className='text-gray-400'>Lượt nghe</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
