import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getSongInfo_MP3, getSongLyrics } from '../../services/song'
import Icon from '../../components/common/Icon_1'
import { ShareButton } from '../../components/features/ShareButton'
import { Loading } from '../../components/ui/Loading'
import { Button } from '../../components/ui/Button'
import type { LyricLine, Track } from '../../types/music'
import { usePlayer } from '../../contexts/PlayerContext'
import { formatDuration, formatFollowers } from '../../utils/formatters'

export default function InfoSong() {
  const { playTrackById, setPlaylist } = usePlayer()
  const [searchParams] = useSearchParams()
  const encodeId = searchParams.get('id')
  const [songInfo, setSongInfo] = useState<Track | any>(null)
  const [lyricSong, setLyricsSong] = useState<LyricLine | any>(null)
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState<'lyrics' | 'info'>('lyrics')

  useEffect(() => {
    const loadInforSong = async () => {
      if (!encodeId) return
      try {
        setLoading(true)
        const inforSong = await getSongInfo_MP3(encodeId)
        const lyricSong = await getSongLyrics(encodeId)
        setSongInfo(inforSong.data)
        setLyricsSong(lyricSong)
      } catch (err) {
        console.error('Error loading song info:', err)
      } finally {
        setLoading(false)
      }
    }
    loadInforSong()
  }, [encodeId])

  // Helper functions để format dữ liệu an toàn
  const safeFormatDuration = (duration: any): string => {
    if (!duration || isNaN(Number(duration))) return '0:00'
    return formatDuration(Number(duration))
  }

  const safeFormatFollowers = (count: any): string => {
    if (!count || isNaN(Number(count))) return '0'
    return formatFollowers(Number(count))
  }

  const safeFormatYear = (timestamp: any): string => {
    if (!timestamp || isNaN(Number(timestamp))) return 'Không có'
    try {
      return new Date(Number(timestamp) * 1000).getFullYear().toString()
    } catch {
      return 'Không có'
    }
  }

  const safeFormatDate = (timestamp: any): string => {
    if (!timestamp || isNaN(Number(timestamp))) return 'Không có'
    try {
      return new Date(Number(timestamp) * 1000).toLocaleDateString('vi-VN')
    } catch {
      return 'Không có'
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black'>
        <Loading size='lg' text='Đang tải thông tin bài hát...' />
      </div>
    )
  }

  if (!songInfo) {
    return (
      <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white'>
        <div className='text-center'>
          <Icon name='music' size={64} className='mx-auto mb-4 text-gray-600' />
          <p className='text-xl'>Không tìm thấy thông tin bài hát</p>
        </div>
      </div>
    )
  }

  const handlePlaySongById = async (encodeId: string, playlistData?: any[]) => {
    try {
      if (playlistData) {
        setPlaylist(playlistData)
      }
      await playTrackById(encodeId)
    } catch (error) {
      console.error('Error playing track:', error)
    }
  }

  const LyricData = () => {
    if (!lyricSong?.data) {
      return (
        <div className='text-center text-gray-500 py-12'>
          <Icon name='lyric' size={48} className='mx-auto mb-4 text-gray-600' />
          <p className='text-lg'>Không có lời bài hát</p>
        </div>
      )
    }

    if (lyricSong.data.sentences && Array.isArray(lyricSong.data.sentences) && lyricSong.data.sentences.length > 0) {
      return (
        <div className='space-y-6'>
          <h3 className='text-2xl font-bold text-white mb-6'>Lời bài hát</h3>
          <div className='bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm'>
            {lyricSong.data.sentences.map((sentence: any, sentenceIndex: number) => (
              <div key={sentenceIndex} className='flex flex-wrap gap-1 leading-relaxed mb-3'>
                {sentence.words?.map((word: any, wordIndex: number) => (
                  <span
                    key={wordIndex}
                    className='transition-all duration-200 hover:text-green-400 cursor-pointer text-gray-300'
                  >
                    {word.data || ''}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )
    } else if (lyricSong.data.lyric) {
      return (
        <div className='space-y-6'>
          <h3 className='text-2xl font-bold text-white mb-6'>Lời bài hát</h3>
          <div className='bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm'>
            <pre className='whitespace-pre-line font-sans text-gray-300 leading-relaxed'>
              {String(lyricSong.data.lyric)}
            </pre>
          </div>
        </div>
      )
    }

    return (
      <div className='text-center text-gray-500 py-12'>
        <Icon name='lyric' size={48} className='mx-auto mb-4 text-gray-600' />
        <p className='text-lg'>Lời bài hát chưa có sẵn</p>
      </div>
    )
  }

  const SongInfo = () => (
    <div className='space-y-6'>
      <h3 className='text-2xl font-bold text-white mb-6'>Thông tin bài hát</h3>
      <div className='bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm space-y-4'>
        <div className='flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg'>
          <img
            src={songInfo?.thumbnailM || ''}
            alt={songInfo?.title || ''}
            className='w-16 h-16 rounded-lg object-cover'
          />
          <div className='flex-1'>
            <h4 className='text-white font-semibold text-lg'>{songInfo?.title || 'Không có tên'}</h4>
            <p className='text-gray-400'>{songInfo?.artistsNames || 'Không có nghệ sĩ'}</p>
            <p className='text-green-400 text-sm'>{safeFormatDuration(songInfo?.duration)}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-3'>
            <div>
              <label className='text-gray-400 text-sm'>Album</label>
              <p className='text-white'>{songInfo?.album?.title || 'Không có'}</p>
            </div>
            <div>
              <label className='text-gray-400 text-sm'>Năm phát hành</label>
              <p className='text-white'>{safeFormatDate(songInfo?.releaseDate)}</p>
            </div>
          </div>
          <div className='space-y-3'>
            <div>
              <label className='text-gray-400 text-sm'>Lượt thích</label>
              <p className='text-white'>{safeFormatFollowers(songInfo?.like)}</p>
            </div>
            <div>
              <label className='text-gray-400 text-sm'>Cung cấp bởi</label>
              <p className='text-white'>{songInfo?.distributor || 'Không có'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900'>
      {/* Header với background blur */}
      <div className='relative overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 blur-xl scale-110'
          style={{
            backgroundImage: `url(${songInfo?.thumbnailM || ''})`
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/50 to-black/80' />

        <div className='relative z-10 container mx-auto px-4 py-8'>
          <div className='flex flex-col lg:flex-row items-center lg:items-end gap-8'>
            {/* Song Image */}
            <div className='flex-shrink-0'>
              <div className='relative group'>
                <img
                  src={songInfo?.thumbnailM || ''}
                  alt={songInfo?.title || ''}
                  className='w-72 h-72 rounded-2xl shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                  <Button
                    variant='secondary'
                    size='lg'
                    onClick={() => handlePlaySongById(songInfo?.encodeId)}
                    className='shadow-xl'
                  >
                    <Icon name='play' size={24} />
                    Phát nhạc
                  </Button>
                </div>
              </div>
            </div>

            {/* Song Details */}
            <div className='flex-1 text-center lg:text-left space-y-4'>
              <div>
                <p className='text-green-400 font-medium text-sm uppercase tracking-wide'>Bài hát</p>
                <h1 className='text-white text-4xl lg:text-6xl font-bold leading-tight'>
                  {songInfo?.title || 'Không có tên'}
                </h1>
              </div>

              <div className='flex flex-wrap items-center justify-center lg:justify-start gap-2 text-gray-300'>
                {Array.isArray(songInfo?.artists) && songInfo.artists.length > 0 ? (
                  songInfo.artists.map((artist: any, i: number) => (
                    <span key={i} className='flex items-center gap-1'>
                      {i > 0 && <span className='text-gray-500'>•</span>}
                      <Link
                        to={`/artist?name=${artist.alias || ''}`}
                        className='hover:text-white hover:underline transition-colors font-medium'
                      >
                        {artist.name || 'Nghệ sĩ không có tên'}
                      </Link>
                    </span>
                  ))
                ) : (
                  <span>{songInfo?.artistsNames || 'Không có nghệ sĩ'}</span>
                )}
              </div>

              <div className='flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400'>
                <span>{safeFormatFollowers(songInfo?.like)} lượt thích</span>
                <span>•</span>
                <span>{safeFormatDuration(songInfo?.duration)}</span>
                {songInfo?.releaseDate && (
                  <>
                    <span>•</span>
                    <span>{safeFormatYear(songInfo.releaseDate)}</span>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className='flex items-center justify-center lg:justify-start gap-4 pt-4'>
                <Button
                  variant='secondary'
                  size='lg'
                  onClick={() => handlePlaySongById(songInfo?.encodeId)}
                  className='px-8'
                >
                  <Icon name='play' size={20} />
                  Phát nhạc
                </Button>

                <Button variant={isLiked ? 'default' : 'ghost'} size='lg' onClick={() => setIsLiked(!isLiked)}>
                  <Icon name={isLiked ? 'heart-filled' : 'heart'} size={20} />
                  {isLiked ? 'Đã thích' : 'Thích'}
                </Button>

                <Button variant='ghost' size='lg'>
                  <Icon name='more' size={20} />
                </Button>

                <ShareButton title={songInfo?.title || ''} artist={songInfo?.artistsNames || ''} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Content Area */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Tabs */}
            <div className='flex gap-4 border-b border-gray-700'>
              <button
                onClick={() => setActiveTab('lyrics')}
                className={`pb-3 px-1 font-medium transition-colors relative ${
                  activeTab === 'lyrics'
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Lời bài hát
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`pb-3 px-1 font-medium transition-colors relative ${
                  activeTab === 'info' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                Thông tin
              </button>
            </div>

            {/* Tab Content */}
            <div className='min-h-[400px]'>{activeTab === 'lyrics' ? <LyricData /> : <SongInfo />}</div>
          </div>

          {/* Sidebar */}
          <div className='space-y-8'>
            {/* Related Artists */}
            {Array.isArray(songInfo?.artists) && songInfo.artists.length > 0 && (
              <div className='bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm'>
                <h3 className='text-xl font-bold text-white mb-6'>Nghệ sĩ</h3>
                <div className='space-y-4'>
                  {songInfo.artists.slice(0, 3).map((artist: any, index: number) => (
                    <Link
                      to={`/artist?name=${artist.alias || ''}`}
                      key={artist.id || index}
                      className='flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/50 transition-colors group'
                    >
                      <div className='relative'>
                        <img
                          src={artist.thumbnailM || artist.thumbnail || ''}
                          alt={artist.name || ''}
                          className='w-12 h-12 rounded-full object-cover'
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/default-avatar.png' // fallback image
                          }}
                        />
                        <div className='absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='text-white font-medium group-hover:text-green-400 transition-colors truncate'>
                          {artist.name || 'Nghệ sĩ không có tên'}
                        </h4>
                        <p className='text-gray-400 text-sm'>
                          {safeFormatFollowers(artist.totalFollow)} người theo dõi
                        </p>
                      </div>
                      <Icon
                        name='arrow-right'
                        size={16}
                        className='text-gray-500 group-hover:text-white transition-colors'
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Album Info */}
            {songInfo?.album && (
              <div className='bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm'>
                <h3 className='text-xl font-bold text-white mb-4'>Album</h3>
                <div className='flex items-start gap-4'>
                  <img
                    src={songInfo.album.thumbnail || songInfo.thumbnailM || ''}
                    alt={songInfo.album.title || ''}
                    className='w-16 h-16 rounded-lg object-cover'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/default-album.png' // fallback image
                    }}
                  />
                  <div className='flex-1'>
                    <h4 className='text-white font-medium'>{songInfo.album.title || 'Không có tên album'}</h4>
                    <p className='text-gray-400 text-sm'>
                      {Array.isArray(songInfo.album.artists)
                        ? songInfo.album.artists
                            .map((artist: any) => artist.name || '')
                            .filter(Boolean)
                            .join(', ')
                        : 'Không có nghệ sĩ'}
                    </p>
                    {songInfo.album.releaseDate && (
                      <p className='text-gray-500 text-sm'>{safeFormatYear(songInfo.album.releaseDate)}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
