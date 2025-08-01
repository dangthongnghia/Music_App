import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { fetchArtists_MP3 } from '../services/spotifyService'
import { usePlayer } from '../contexts/PlayerContext'
import Icon from '../component/Icon'
import { getSongPLay } from '../services/song'
import type { Artist, Track } from '../types/spotify'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

interface PremiumStatus {
  [key: string]: boolean
}
export default function ArtistsId() {
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name')
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)

  const [artistSongs, setArtistSongs] = useState<Track[]>([])
  const [isCurrentArtistPlaylist, setIsCurrentArtistPlaylist] = useState(false)
  const [premiumStatus, setPremiumStatus] = useState<Record<string, boolean>>({})
  const [isShown, setIsShown] = useState<string | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const { playTrackById, setPlaylist, currentTrack, isPlaying, togglePlayPause } = usePlayer()

  useEffect(() => {
    const loadArtistData = async () => {
      if (!name) return
      try {
        setLoading(true)
        const artistData = await fetchArtists_MP3(name)

        // console.log('Full Artist Data:', artistData)

        // Set artist info
        setArtist(artistData.data)
        const songSection = artistData.data.sections.find((section: any) => section.sectionType === 'song')
        // console.log('Song section found:', songSection.items)
        // Extract và set songs từ sections
        if (songSection.items) {
          const songs = songSection.items.map((item: any) => ({
            encodeId: item.encodeId,
            title: item.title,
            artistsNames: item.artistsNames,
            thumbnailM: item.thumbnailM || item.thumbnail,
            duration: item.duration,
            artists: item.artists,
            album: item.album
          }))

          // console.log('Extracted songs:', songs)
          setArtistSongs(songs) // Set local state
          setPlaylist(songs) // Set vào context
        } else {
          // console.log('No songs found in sections[0]')
          // console.log('Available sections:', songSection())
        }
      } catch (err) {
        // console.error('Error loading artist:', err)
      } finally {
        setLoading(false)
      }
    }

    loadArtistData()
  }, [name])

  useEffect(() => {
    const checkAllPremium = async () => {
      if (!artist?.sections[0].items) return

      const checksPremium = await Promise.all(
        artist.sections[0].items.map(async (track) => {
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
  }, [artist?.sections[0].items])

  const handlePlayPlaylist = () => {
    if (artistSongs.length > 0) {
      // Nếu đang phát playlist này và đang play, thì pause
      if (isCurrentArtistPlaylist && isPlaying) {
        togglePlayPause()
      } else {
        // Nếu không phải playlist này hoặc đang pause, thì play từ đầu
        setPlaylist(artistSongs)
        playTrackById(artistSongs[0].encodeId)
        setIsCurrentArtistPlaylist(true)
      }
    }
  }
  useEffect(() => {
    // Kiểm tra xem track hiện tại có thuộc playlist artist không
    if (currentTrack && artistSongs.length > 0) {
      const isTrackInArtistPlaylist = artistSongs.some((song) => song.encodeId === currentTrack.encodeId)
      setIsCurrentArtistPlaylist(isTrackInArtistPlaylist)
    } else {
      setIsCurrentArtistPlaylist(false)
    }
  }, [currentTrack, artistSongs])

  const handlePlaySongById = async (encodeId: string) => {
    try {
      if (artistSongs.length > 0) {
        setPlaylist(artistSongs)
      }
      playTrackById(encodeId)
    } catch (error) {
      // console.error('Error playing song:', error)
    }
  }
  const handlePauseTrack = async (encodeId: string) => {
    try {
      if (currentTrack?.encodeId === encodeId && isPlaying) {
        togglePlayPause()
      } else {
        // console.log(`Pausing song with ID: ${encodeId}`)
      }
    } catch (error) {
      console.error('Error pausing track:', error)
    }
  }
  const handlePlayPauseTrack = async (encodeId: string) => {
    try {
      if (currentTrack?.encodeId === encodeId && isPlaying) {
        handlePauseTrack(encodeId)
      } else {
        handlePlaySongById(encodeId)
      }
    } catch (error) {
      // console.error('Error handling play/pause track:', error)
    }
  }

  const isCurrentTrackPlaying = (trackId: string) => {
    return currentTrack?.encodeId === trackId && isPlaying
  }

  const formatDuration = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatFollowers = (count: number) => {
    if (!count) return '0'
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  // Set background image
  useEffect(() => {
    if (artist?.thumbnailM || artist?.thumbnail) {
      const imageUrl = artist.thumbnailM || artist.thumbnail
      document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${imageUrl})`
      document.body.style.backgroundSize = 'cover'
      document.body.style.backgroundPosition = 'center'
      document.body.style.backgroundAttachment = 'fixed'
    }

    return () => {
      document.body.style.background = 'black'
    }
  }, [artist])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4'></div>
          <p className='text-white text-xl'>Đang tải nghệ sĩ...</p>
        </div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900'>
        <div className='text-center'>
          <Icon name='user' className='text-gray-600 text-6xl mx-auto mb-4' />
          <div className='text-white text-2xl mb-4'>Không tìm thấy nghệ sĩ</div>
          <p className='text-gray-400'>Nghệ sĩ có thể đã bị xóa hoặc không tồn tại</p>
        </div>
      </div>
    )
  }

  return (
    <div className='text-white w-full min-h-screen pb-24'>
      {/* Hero Section */}
      <div className='relative overflow-hidden'>
        {/* Background Blur */}
        <div className='absolute inset-0'>
          {(artist.thumbnailM || artist.thumbnail) && (
            <img
              src={artist.thumbnailM || artist.thumbnail}
              alt=''
              className='w-full h-full object-cover filter blur-3xl opacity-30 scale-110'
            />
          )}
        </div>

        {/* Gradient Overlays */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10'></div>
        <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10'></div>

        <div className='pt-20 pb-16 px-8 flex flex-col md:flex-row items-center lg:items-end gap-8 relative z-20'>
          {/* Artist Avatar */}
          <div className='shrink-0 group'>
            <div className='relative'>
              {(artist.thumbnailM || artist.thumbnail) && (
                <img
                  src={artist.thumbnailM || artist.thumbnail}
                  alt={artist.name}
                  className='w-64 h-64 md:w-80 md:h-80 rounded-full shadow-2xl object-cover transform group-hover:scale-105 transition-all duration-500 border-4 border-white/20'
                />
              )}

              {/* Verified Badge */}
              <div className='absolute bottom-0 right-4 rounded-full p-3 w-20 h-15'>
                <Icon name='verified' className='text-white text-2xl' />
              </div>

              {/* Glow Effect */}
              {/* <div className='absolute -inset-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div> */}
            </div>
          </div>

          {/* Artist Info */}
          <div className='flex flex-col justify-end space-y-6 flex-1'>
            {/* Badges */}
            <div className='flex items-center max-md:justify-center gap-3 flex-wrap'>
              <span className='bg-gradient-to-r from-green-500 to-blue-500 text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide'>
                Nghệ sĩ
              </span>
              {artist.national && (
                <span className='bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold'>
                  {artist.national}
                </span>
              )}
              <span className='bg-blue-500/40 text-green-400 px-3 py-1 rounded-full text-xs font-semibold'>
                &#x1F5D3;{artist.birthday}
              </span>
              <span className='bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold'>♪ ZingMP3</span>
            </div>

            {/* Artist Name */}
            <h1 className='text-4xl md:text-6xl lg:text-8xl font-black mb-4 line-clamp-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent'>
              {artist.name}
            </h1>

            {/* Bio */}
            {artist.sortBiography && (
              <p className='text-gray-300 text-lg line-clamp-3 max-w-3xl leading-relaxed'>{artist.sortBiography}</p>
            )}

            {/* Stats */}
            <div className='flex items-center gap-6 text-lg text-gray-300 flex-wrap'>
              <div className='flex items-center gap-2'>
                <Icon name='users' className='text-green-400' />
                <span className='font-semibold'>{formatFollowers(artist.totalFollow || 0)} người theo dõi</span>
              </div>
              {artistSongs.length > 0 && (
                <>
                  <span>•</span>
                  <div className='flex items-center gap-2'>
                    <div className='text-blue-400 w-5 h-5'>
                      <Icon name='music' className='text-blue-400' />
                    </div>
                    <span>{artistSongs.length} bài hát</span>
                  </div>
                </>
              )}
              {artist.sections[2].items.length > 0 && (
                <>
                  <span className='md:flex hidden'>•</span>
                  <div className='md:flex items-center gap-2 hidden'>
                    <div className='text-blue-400 w-5 h-5'>
                      <Icon name='album' className='text-blue-400' />
                    </div>
                    <span>{artist.sections[2].items.length} album</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-6 pt-6 flex-wrap'>
              <button
                className='bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold rounded-full flex items-center justify-center w-16 h-16 transition-all duration-300 shadow-lg hover:shadow-green-500/25 hover:scale-110'
                onClick={handlePlayPlaylist}
              >
                {isCurrentArtistPlaylist && isPlaying ? (
                  <Icon name='pause' className='text-2xl' />
                ) : (
                  <Icon name='play' className='text-2xl' />
                )}
              </button>

              <button
                className={`px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 ${
                  isFollowing
                    ? 'bg-white/20 text-white border-2 border-white/30 hover:bg-white/30'
                    : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black'
                }`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
              </button>

              <button className='text-gray-400 hover:text-white hover:scale-110 hover:bg-white/10 p-4 rounded-full transition-all duration-300'>
                <Icon name='heart' className='text-2xl' />
              </button>

              <button className='text-gray-400 hover:text-white hover:scale-110 hover:bg-white/10 p-4 rounded-full transition-all duration-300'>
                <Icon name='share' className='text-2xl' />
              </button>

              <button className='text-gray-400 hover:text-white hover:scale-110 hover:bg-white/10 p-4 rounded-full transition-all duration-300'>
                <Icon name='more' className='text-2xl' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Songs Section */}
      <div className='md:px-8 mt-8'>
        <div className='bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
              Bài hát nổi bật
            </h2>
            {artist.sections[0].items.length > 10 && (
              <button className='text-green-400 hover:text-green-300 font-semibold md:flex items-center gap-2 group hidden '>
                <span>Xem tất cả</span>
                <Icon name='arrow-right' className='text-lg group-hover:translate-x-1 transition-transform' />
              </button>
            )}
          </div>

          {artist.sections[0].items.length > 0 ? (
            <div className='space-y-2'>
              {artist.sections[0].items.slice(0, 10).map((song, index) => (
                <div
                  key={song.encodeId}
                  className='group grid grid-cols-7 md:grid-cols-9 lg:grid-cols-12 gap-4 items-center px-4 py-3 hover:bg-white/10 cursor-pointer rounded-xl transition-all duration-300'
                  onMouseEnter={() => setIsShown(song.encodeId)}
                  onMouseLeave={() => setIsShown(null)}
                  onClick={() => handlePlayPauseTrack(song.encodeId)}
                >
                  {/* Track Number / Play Button */}
                  <div className='col-span-1 flex justify-center'>
                    <button className='w-8 h-8 flex items-center justify-center'>
                      {isCurrentTrackPlaying(song.encodeId) ? (
                        isShown === song.encodeId ? (
                          <Icon name='pause' className='text-white text-lg' />
                        ) : (
                          <div className='loading-wave flex gap-[2px] h-4 items-end'>
                            {/* <div className='loading-bar w-[2px] h-2 bg-green-500 rounded-full animate-bounce'></div>
                            <div className='loading-bar w-[2px] h-3 bg-green-500 rounded-full animate-bounce delay-100'></div>
                            <div className='loading-bar w-[2px] h-2 bg-green-500 rounded-full animate-bounce delay-200'></div> */}
                          </div>
                        )
                      ) : isShown === song.encodeId ? (
                        <Icon name='play' className='text-white text-lg' />
                      ) : (
                        <span className='text-gray-400 text-sm font-medium'>{index + 1}</span>
                      )}
                    </button>
                  </div>

                  {/* Track Info */}
                  <div className='col-span-6 flex items-center gap-4'>
                    <div className='relative group/img'>
                      <img
                        src={song.thumbnail || song.thumbnailM}
                        alt={song.title}
                        className='w-12 h-12 max-md:hidden rounded-lg object-cover group-hover/img:shadow-lg transition-shadow duration-300'
                      />
                      <div className='absolute inset-0 bg-black/20 rounded-lg group-hover/img:bg-black/0 transition-all duration-300'></div>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-4'>
                        <h3 className='font-medium text-white line-clamp-1 group-hover:text-green-400 transition-colors'>
                          {song.title}
                        </h3>
                        <div className='flex items-center justify-between text-xs text-gray-400'>
                          {premiumStatus[song.encodeId] === true ? (
                            <span className='text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded-full'>
                              Premium
                            </span>
                          ) : (
                            premiumStatus[song.encodeId] === false && <span className=''></span>
                          )}
                        </div>
                      </div>
                      <p className='text-sm text-gray-400 line-clamp-1 group-hover:text-gray-300 transition-colors'>
                        {Array.isArray(song.artists)
                          ? song.artists.map((artist: any) => artist.name).join(', ')
                          : song.artistsNames || 'Unknown Artist'}
                      </p>
                    </div>
                  </div>

                  {/* Album */}
                  <div className='col-span-3 hidden lg:block text-gray-400 text-sm line-clamp-1 group-hover:text-gray-300 transition-colors'>
                    {song.album?.title || 'Single'}
                  </div>

                  {/* Duration & Actions */}
                  <div className='col-span-2 text-right hidden md:flex items-center justify-end gap-3 group'>
                    <div className='flex items-center justify-end gap-3'>
                      <button className='opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-white/10'>
                        <Icon name='heart' className='text-gray-400 hover:text-green-400 text-sm transition-colors' />
                      </button>
                      <span className='text-gray-400 text-sm font-mono'>{formatDuration(song.duration || 0)}</span>
                      <button className='opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-white/10'>
                        <Icon name='more' className='text-gray-400 hover:text-white text-sm transition-colors' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-12 w-15 h-15'>
              <Icon name='music' className='text-gray-600 text-6xl mx-auto mb-4' />
              <p className='text-gray-400 text-lg'>Không tìm thấy bài hát nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Albums Section */}
      <div className='md:px-8 mt-8'>
        <div className='bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
              Album & Playlist
            </h2>
            {artist.sections[2].items.length > 6 && (
              <button className='text-green-400 hover:text-green-300 font-semibold flex items-center gap-2 group'>
                <span>Xem tất cả</span>
                <Icon name='arrow-right' className='text-lg group-hover:translate-x-1 transition-transform' />
              </button>
            )}
          </div>

          {artist.sections[2].items.length > 0 ? (
            <Swiper
              spaceBetween={24}
              slidesPerView={2}
              loop={artist.sections[2].items.length > 2}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
              className='albums-swiper'
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 }
              }}
            >
              {artist.sections[2].items.map((album) => (
                <SwiperSlide key={album.encodeId}>
                  <div className='group bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer h-70'>
                    <div className='relative mb-4'>
                      <img
                        src={album.thumbnailM || album.thumbnail}
                        alt={album.title}
                        className='w-full aspect-square object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-500'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-green-500/0 group-hover:from-green-500/20 to-transparent rounded-xl transition-all duration-500' />

                      <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        <button
                          className='bg-green-500/90 backdrop-blur-sm text-black p-3 rounded-full hover:bg-green-400 hover:scale-110 transition-all duration-300 shadow-xl w-12 h-12'
                          onClick={() => {
                            window.location.href = `/playlist/${album.encodeId}`
                          }}
                        >
                          <Icon name='play' className='text-lg ml-0.5' />
                        </button>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Link
                        to={`/playlist/${album.encodeId}`}
                        className='block group-hover:text-green-300 transition-colors'
                      >
                        <h3 className='font-bold text-white line-clamp-2 group-hover:text-green-300 transition-colors leading-tight'>
                          {album.title}
                        </h3>
                      </Link>

                      <p className='text-xs text-gray-500'>
                        {album.textType || 'Album'} • {Math.floor(Math.random() * 20) + 5} bài hát
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className='text-center py-12'>
              <Icon name='album' className='text-gray-600 text-6xl mx-auto mb-4' />
              <p className='text-gray-400 text-lg'>Không tìm thấy album nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Artist Stats */}
      <div className='md:px-8 md:mt-8'>
        <div className='bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-sm md:text-2xl lg:text-3xl'>
          <h3 className='text-base md:text-2xl lg:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
            Thống kê nghệ sĩ
          </h3>
          <div className='grid grid-cols-4 gap-6 text-center text-sm md:text-xl lg:text-2xl'>
            <div className='group hover:scale-105 transition-transform duration-300'>
              <div className=' text-base md:text-2xl lg:text-3xl font-black text-green-400 mb-3 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text '>
                {artist.sections[0].items.length}
              </div>
              <div className='text-base md:text-2xl lg:text-3xl text-gray-400 group-hover:text-gray-300 transition-colors '>
                Bài hát
              </div>
            </div>
            <div className='group hover:scale-105 transition-transform duration-300'>
              <div className='text-base md:text-2xl lg:text-3xl font-black text-blue-400 mb-3 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text '>
                {artist.sections[2].items.length}
              </div>
              <div className='text-gray-400 group-hover:text-gray-300 transition-colors'>Album</div>
            </div>
            <div className='group hover:scale-105 transition-transform duration-300'>
              <div className=' text-base md:text-2xl lg:text-3xl font-black text-purple-400 mb-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text '>
                {formatFollowers(artist.totalFollow || 0)}
              </div>
              <div className='text-gray-400 group-hover:text-gray-300 transition-colors'>Người theo dõi</div>
            </div>
            <div className='group hover:scale-105 transition-transform duration-300'>
              <div className='text-base md:text-2xl lg:text-3xl font-black text-orange-400 mb-3 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text '>
                {Math.floor(Math.random() * 50) + 50}%
              </div>
              <div className='text-gray-400 group-hover:text-gray-300 transition-colors'>Độ phổ biến</div>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Biography */}
      {artist.biography && (
        <div className='px-8 mt-8'>
          <div className='bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
            <h3 className='text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
              Tiểu sử
            </h3>
            <div className='text-gray-300 leading-relaxed'>
              <div className='whitespace-pre-line font-sans text-gray-300 leading-relaxed'>
                {artist.biography.split('<br>').map((line, index) => (
                  <p key={index}>{line.trim()}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
