import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getSongInfo_MP3, getSongLyrics } from '../services/song'
import Icon from '../component/Icon'
import { shareButton } from '../component/Button'
import type { LyricLine, Track } from '../types/spotify'
import { usePlayer } from '../contexts/PlayerContext'
export default function InforSong() {
  const { playTrackById, setPlaylist } = usePlayer()
  const [searchParams] = useSearchParams()
  const encodeId = searchParams.get('id')
  const [songInfo, setSongInfo] = useState<Track | any>(null)
  const [lyricSong, setLyricsSong] = useState<LyricLine | any>(null)
  const [loading, setLoading] = useState(true)
  const [isClickShare, setClickShare] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
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
        // console.error('Error loading artist:', err)
      } finally {
        setLoading(false)
      }
    }
    loadInforSong()
  }, [])

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

  if (loading) {
    return <div>Loading...</div>
  }
  const handlePlaySongById = async (encodeId: string, playlistData?: any[]) => {
    try {
      if (playlistData) {
        setPlaylist(playlistData)
      }
      await playTrackById(encodeId)
    } catch (error) {}
  }

  const LyricData = () => {
    if (!lyricSong?.data) {
      return (
        <div className='text-center text-gray-500 py-8'>
          <p>Không có lời bài hát</p>
        </div>
      )
    }

    if (lyricSong.data.sentences && lyricSong.data.sentences.length > 0) {
      return (
        <div className='space-y-4'>
          <p className='text-xl font-bold pb-10'>Lời bài hát:</p>
          {lyricSong.data.sentences.map((sentence: any, sentenceIndex: number) => (
            <div key={sentenceIndex} className='flex flex-wrap gap-1 leading-relaxed'>
              {sentence.words?.map((word: any, wordIndex: number) => (
                <span key={wordIndex} className='transition-all duration-200 hover:text-blue-400 cursor-pointer'>
                  {word.data}
                </span>
              ))}
            </div>
          ))}
        </div>
      )
    } else if (lyricSong.data.lyric) {
      return (
        <div className='flex flex-col gap-3'>
          <p className='text-xl font-bold pb-10'>Lời bài hát:</p>
          <pre className='whitespace-pre-line font-sans text-gray-300 leading-relaxed'>{lyricSong.data.lyric}</pre>
        </div>
      )
    }

    return (
      <div className='text-center text-gray-500 '>
        <p>Lời bài hát chưa có sẵn</p>
      </div>
    )
  }

  return (
    <div className='w-full h-full bg-black text-white'>
      <div className=' lg:flex  justify-between h-full w-full bg-black p-4'>
        {/* Thông tin bài hát - bên trái */}
        <section className='lg:w-1/3 h-full p-6 rounded-lg shadow-lg flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center justify-center  p-6 rounded-lg shadow-lg'>
            <img src={songInfo?.thumbnailM} alt='' className=' rounded-2xl' />
            <h1 className='text-white text-xl md:text-2xl font-bold'>{songInfo?.title}</h1>
            <p className=' flex text-sm text-gray-400 truncate'>{songInfo?.artistsNames}</p>
            <p className='text-gray-400'>{formatFollowers(songInfo?.like || 0)} người yêu thích</p>
            <div className='hidden lg:block'>
              <button
                className=' rounded-3xl bg-green-600 w-40 h-10 flex items-center justify-center'
                onClick={() => handlePlaySongById(songInfo?.encodeId)}
              >
                <p className='w-10 h-10'>
                  <Icon name='play' />
                </p>
                Phát tất cả
              </button>
              <div className='flex gap-4 mt-4 translate-x-1/4'>
                <button
                  className={`text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 w-7 h-7 hidden md:block ${
                    isLiked ? 'text-green-500' : ''
                  }`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Icon name={isLiked ? 'heart-filled' : 'heart'} className='text-3xl' />
                </button>
                <button className='w-8 h-8'>
                  <Icon name='more' />
                </button>
                <button className='w-6 h-6' onClick={() => setClickShare(!isClickShare)}>
                  <Icon name='share' />
                </button>
                {isClickShare && <div className=' absolute top-0 left-30'>{shareButton()}</div>}
              </div>
            </div>

            {/* Button play mobile */}
            <div className='flex md:hidden justify-around items-center gap-10 mt-5'>
              <button
                className={`text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 w-10 h-8 ${
                  isLiked ? 'text-green-500' : ''
                }`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Icon name={isLiked ? 'heart-filled' : 'heart'} className='text-5xl' />
              </button>
              <button
                className=' rounded-3xl bg-green-600 w-40 h-10 flex items-center justify-center'
                onClick={() => handlePlaySongById(songInfo?.encodeId)}
              >
                <p className='w-10 h-10'>
                  <Icon name='play' />
                </p>
                Phát tất cả
              </button>

              <button className='w-8 h-8' onClick={() => setClickShare(!isClickShare)}>
                <Icon name='share' />
              </button>
              {isClickShare && <div className=' absolute'>{shareButton()}</div>}
            </div>
          </div>
        </section>

        {/* Thông tin bài hát - bên phải */}
        <section className='w-full h-full p-6 my-10'>
          <div className='flex justify-between items-start mb-4'>
            <p> Bài hát</p>
            <p> Thời gian</p>
          </div>
          <div>
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center gap-4'>
                <img src={songInfo?.thumbnailM} alt='' className='w-10 h-10 hidden md:block rounded-2xl' />
                <div>
                  <p className='text-white'>{songInfo?.title}</p>
                  {songInfo?.artists && songInfo.artists.length > 0 && (
                    <div className=' flex text-sm text-gray-400 truncate w-60 line-clamp-1'>
                      {songInfo.artists.map((artist: any, i: number) => (
                        <p key={i} className='flex gap-1 items-center  '>
                          {i > 0 ? <span>, </span> : ' '}
                          <Link to={`/artist?name=${artist.alias}`} className='  hover:underline'>
                            {artist.name}
                          </Link>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className='text-gray-400'>{formatDuration(songInfo?.duration)}</p>
            </div>
          </div>
          <div className='flex flex-col  mb-2 max-md:bg-gray-900 max-md:rounded-2xl  max-md:items-center mt-10 p-5'>
            <h1 className=' text-xl'>Thông tin</h1>
            <div className='flex flex-col gap-2 mt-2'>
              <p className='text-gray-400'>Album: {songInfo?.album?.title}</p>
              <span className='text-gray-400'>
                {' '}
                {songInfo?.releaseDate && (
                  <p className='text-gray-500'>
                    Năm phát hành: {new Date(songInfo?.releaseDate * 1000).toLocaleDateString('vi-VN')}
                  </p>
                )}
              </span>
              <p className='text-gray-400'>Cung cấp bởi: {songInfo?.distributor || 'Không có'}</p>
            </div>
          </div>
        </section>
      </div>

      <section className='w-full h-full p-6 hidden md:block'>
        <div>
          <h1 className='text-3xl font-medium'>Nghệ sĩ liên quan</h1>
          <div className='w-full m-4 '>
            <div className='flex gap-6 '>
              {songInfo?.artists.slice(0, 5).map((artits: any) => (
                <Link to={`/artist?name=${artits.alias}`} key={artits.id} className='flex flex-col items-center'>
                  <div className=' justify-center items-center flex flex-col  '>
                    <div className='w-50 h-50 rounded-full shadow-lg overflow-hidden'>
                      <img src={artits.thumbnailM} alt='' className='w-50 h-50   hover:scale-110 ' />
                    </div>
                    <h1>{artits.name}</h1>
                    <p>{formatFollowers(artits.totalFollow)} người theo dõi</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Lyric */}
      <section className='w-full h-full p-6  md:hidden'>
        <LyricData />
      </section>
    </div>
  )
}
