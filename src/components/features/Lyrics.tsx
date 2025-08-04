import React, { useState, useEffect, useRef } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import { getSongLyrics } from '../../services/song'
import Icon from '../../components/common/Icon_1'

interface LyricLine {
  words: Array<{
    startTime: number
    endTime: number
    data: string
  }>
  startTime: number
  endTime: number
}

interface LyricsData {
  file: string
  enabledVideoBG: boolean
  sentences: LyricLine[]
}

const Lyrics: React.FC = () => {
  const { currentTrack, isPlaying, audioRef } = usePlayer()
  const [lyrics, setLyrics] = useState<LyricsData | null>(null)
  const [currentLineIndex, setCurrentLineIndex] = useState(-1)
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLyrics, setShowLyrics] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const lyricsContainerRef = useRef<HTMLDivElement>(null)
  const activeLyricRef = useRef<HTMLDivElement>(null)

  // Fetch lyrics khi bài hát thay đổi
  useEffect(() => {
    if (currentTrack?.encodeId) {
      fetchLyrics(currentTrack.encodeId)
    } else {
      setLyrics(null)
      setError(null)
    }
  }, [currentTrack?.encodeId])

  // Update current time từ audio player
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
  }, [audioRef])

  // Tìm và highlight lyric hiện tại
  useEffect(() => {
    if (!lyrics?.sentences || !isPlaying) return

    const currentTimeMs = currentTime * 1000
    let foundLineIndex = -1
    let foundWordIndex = -1

    // Tìm câu lyric hiện tại
    for (let i = 0; i < lyrics.sentences.length; i++) {
      const sentence = lyrics.sentences[i]
      if (currentTimeMs >= sentence.startTime && currentTimeMs <= sentence.endTime) {
        foundLineIndex = i

        // Tìm từ hiện tại trong câu
        for (let j = 0; j < sentence.words.length; j++) {
          const word = sentence.words[j]
          if (currentTimeMs >= word.startTime && currentTimeMs <= word.endTime) {
            foundWordIndex = j
            break
          }
        }
        break
      }
    }

    setCurrentLineIndex(foundLineIndex)
    setCurrentWordIndex(foundWordIndex)
  }, [currentTime, lyrics, isPlaying])

  // Auto scroll to active lyric
  useEffect(() => {
    if (activeLyricRef.current && lyricsContainerRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [currentLineIndex])

  const fetchLyrics = async (encodeId: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await getSongLyrics(encodeId)

      if (response.err === 0 && response.data) {
        setLyrics(response.data)
      } else {
        setError('Không tìm thấy lời bài hát')
      }
    } catch (error) {
      // console.error('Error fetching lyrics:', error)
      setError('Lỗi khi tải lời bài hát')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSeekToLine = (startTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime / 1000
    }
  }

  const renderLyricLine = (sentence: LyricLine, lineIndex: number) => {
    const isActiveLine = lineIndex === currentLineIndex

    return (
      <div
        key={lineIndex}
        ref={isActiveLine ? activeLyricRef : null}
        className={`lyric-line py-2 px-4 rounded-lg cursor-pointer transition-all duration-300 ${
          isActiveLine
            ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white scale-105'
            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
        }`}
        onClick={() => handleSeekToLine(sentence.startTime)}
      >
        <div className='flex flex-wrap gap-1'>
          {sentence.words.map((word, wordIndex) => {
            const isActiveWord = isActiveLine && wordIndex === currentWordIndex

            return (
              <span
                key={wordIndex}
                className={`transition-all duration-200 ${
                  isActiveWord
                    ? 'text-green-400 font-bold text-lg transform scale-110'
                    : isActiveLine
                      ? 'text-white'
                      : 'text-gray-400'
                }`}
              >
                {word.data}
              </span>
            )
          })}
        </div>
      </div>
    )
  }

  if (!currentTrack) {
    return (
      <div className='flex items-center justify-center h-full text-gray-400'>
        <div className='text-center'>
          <Icon name='music' className='w-12 h-12 mx-auto mb-4 opacity-50' />
          <p>Chưa có bài hát nào đang phát</p>
        </div>
      </div>
    )
  }

  return (
    <div className='h-full flex flex-col bg-gradient-to-b from-gray-900 to-black text-white'>
      {/* Header */}
      <div className='flex items-center justify-between p-6 border-b border-gray-700/50'>
        <div className='flex items-center gap-4'>
          <img src={currentTrack.thumbnailM} alt={currentTrack.title} className='w-12 h-12 rounded-lg object-cover' />
          <div>
            <h2 className='text-lg font-bold'>{currentTrack.title}</h2>
            <p className='text-gray-400'>{currentTrack.artists?.map((artist: any) => artist.name).join(', ')}</p>
          </div>
        </div>

        <button
          onClick={() => setShowLyrics(!showLyrics)}
          className={`p-2 rounded-full transition-colors w-10 h-10 ${
            showLyrics ? 'bg-green-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600 '
          }`}
        >
          <Icon name='lyric' className='w-5 h-5' />
        </button>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-hidden'>
        {isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <div className='text-center'>
              <div className='w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
              <p className='text-gray-400'>Đang tải lời bài hát...</p>
            </div>
          </div>
        ) : error ? (
          <div className='flex items-center justify-center h-full'>
            <div className='text-center'>
              <Icon name='alert-circle' className='w-12 h-12 mx-auto mb-4 text-red-500' />
              <p className='text-red-400'>{error}</p>
              <button
                onClick={() => fetchLyrics(currentTrack.encodeId)}
                className='mt-4 px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-colors'
              >
                Thử lại
              </button>
            </div>
          </div>
        ) : lyrics?.sentences ? (
          <div
            ref={lyricsContainerRef}
            className='h-full overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'
          >
            {lyrics.sentences.map((sentence, index) => renderLyricLine(sentence, index))}

            {/* Padding bottom để lyric cuối không bị che */}
            <div className='h-32'></div>
          </div>
        ) : (
          <div className='flex items-center justify-center h-full'>
            <div className='text-center'>
              <Icon name='music' className='w-12 h-12 mx-auto mb-4 text-gray-500' />
              <p className='text-gray-400'>Không có lời bài hát</p>
              <p className='text-sm text-gray-500 mt-2'>Bài hát này chưa có lời hoặc là nhạc không lời</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {lyrics?.sentences && (
        <div className='p-4 border-t border-gray-700/50 bg-gray-900/50'>
          <div className='flex items-center justify-center gap-4'>
            <button
              onClick={() => {
                const prevLine = Math.max(0, currentLineIndex - 1)
                handleSeekToLine(lyrics.sentences[prevLine].startTime)
              }}
              disabled={currentLineIndex <= 0}
              className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              <Icon name='chevron-up' className='w-4 h-4' />
            </button>

            <div className='text-center'>
              <p className='text-sm text-gray-400'>
                Dòng {currentLineIndex + 1} / {lyrics.sentences.length}
              </p>
            </div>

            <button
              onClick={() => {
                const nextLine = Math.min(lyrics.sentences.length - 1, currentLineIndex + 1)
                handleSeekToLine(lyrics.sentences[nextLine].startTime)
              }}
              disabled={currentLineIndex >= lyrics.sentences.length - 1}
              className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              <Icon name='chevron-down' className='w-4 h-4' />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Lyrics
