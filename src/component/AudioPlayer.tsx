import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../contexts/PlayerContext'
import Icon from './Icon'
import Lyrics from './Lyrics'
import '../App.css'
import Now_Playing from './Now_Playing'

const AudioPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [previousVolume, setPreviousVolume] = useState(0.5) // Lưu volume trước khi mute
  const [isRepeat, setIsRepeat] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)
  const [showQueue, setShowQueue] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  // Refs
  const queueRef = useRef<HTMLDivElement>(null)
  const volumeRef = useRef<HTMLDivElement>(null)
  const { currentTrack, isPlaying, progress, audioRef, nextTrack } = usePlayer()

  // Handle click outside to close queue
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (queueRef.current && !queueRef.current.contains(event.target as Node)) {
        setShowQueue(false)
      }
      if (volumeRef.current && !volumeRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false)
      }
    }

    if (showQueue || showVolumeSlider) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showQueue, showVolumeSlider])

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume, audioRef])

  // Format thời gian từ giây thành mm:ss
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'

    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)

    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  // Xử lý khi tua bài hát
  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value
      setCurrentTime(value)
    }
  }

  // Xử lý play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  // Xử lý previous track
  const handlePrev = () => {
    // TODO: Implement previous track functionality
    console.log('Previous track')
  }

  // Xử lý next track

  // Xử lý repeat mode
  const handleRepeat = () => {
    setIsRepeat(!isRepeat)
    if (audioRef.current) {
      audioRef.current.loop = !isRepeat
    }
  }

  // Xử lý thay đổi âm lượng
  const handleVolumeChange = (newVolume: number) => {
    const clampedVolume = Math.min(1, Math.max(0, newVolume))
    setVolume(clampedVolume)
    if (clampedVolume > 0) {
      setPreviousVolume(clampedVolume)
    }
  }

  // Toggle mute/unmute
  const handleMuteToggle = () => {
    if (volume === 0) {
      // Unmute: restore previous volume
      setVolume(previousVolume > 0 ? previousVolume : 0.5)
    } else {
      // Mute: set volume to 0
      setPreviousVolume(volume)
      setVolume(0)
    }
  }

  // Show/hide volume slider
  const handleVolumeHover = () => {
    setShowVolumeSlider(true)
  }

  const handleVolumeLeave = () => {
    // Delay hide to allow mouse movement to slider
    setTimeout(() => {
      if (!volumeRef.current?.matches(':hover')) {
        setShowVolumeSlider(false)
      }
    }, 300)
  }

  const handleToggleLyrics = () => {
    setShowLyrics(!showLyrics)
    if (showQueue) setShowQueue(false)
  }

  const handleToggleQueue = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowQueue(!showQueue)
    if (showLyrics) setShowLyrics(false)
  }

  // Lấy icon âm lượng phù hợp
  const getVolumeIcon = () => {
    if (volume === 0) return 'volume-mute'
    return 'volume'
  }

  // Get volume percentage for display
  const getVolumePercentage = () => {
    return Math.round(volume * 100)
  }

  if (!currentTrack) return null

  return (
    <>
      {/* Lyrics Overlay */}
      {showLyrics && (
        <div className='fixed inset-0 z-50 bg-black/95 backdrop-blur-sm'>
          <div className='h-full flex flex-col'>
            <div className='flex items-center justify-between p-4 border-b border-gray-700/50'>
              <h2 className='text-white text-lg font-bold'>Lời bài hát</h2>
              <button
                onClick={handleToggleLyrics}
                className='text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 w-6 h-6'
              >
                <Icon name='x' className='w-6 h-6' />
              </button>
            </div>
            <div className='flex-1 overflow-hidden'>
              <Lyrics />
            </div>
          </div>
        </div>
      )}

      {/* Queue Overlay */}
      {showQueue && (
        <div className='fixed inset-0 z-40 bg-black/20 backdrop-blur-sm'>
          <div ref={queueRef} onClick={handleToggleQueue} className='fixed top-20 right-4 z-50'>
            <Now_Playing />
          </div>
        </div>
      )}

      {/* Audio Player */}
      <div className='fixed bottom-0 left-0 right-0 z-50 audio-player-glass shadow-2xl'>
        {/* Progress Bar */}
        <div className='absolute top-0 left-0 right-0 h-1 bg-gray-700/30 hover:h-2 transition-all duration-200 group'>
          <div
            className='h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-300 ease-out progress-glow'
            style={{ width: `${progress}%` }}
          />
          <input
            type='range'
            min='0'
            max={currentTrack.duration || 0}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
          />
        </div>

        <div className='flex items-center justify-between px-4 md:px-6 py-3 md:py-4 h-16 md:h-20'>
          {/* Left: Song Info */}
          <div className='flex items-center gap-3 md:gap-4 w-2/5 md:w-1/3 min-w-0'>
            <div className='relative group flex-shrink-0'>
              {currentTrack.thumbnailM && (
                <div className='relative overflow-hidden rounded-lg md:rounded-xl shadow-lg'>
                  <img
                    src={currentTrack.thumbnailM}
                    alt={currentTrack.title || 'Song cover'}
                    className='w-8 h-8 md:w-14 md:h-14 object-cover transition-transform duration-300 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300' />
                </div>
              )}
            </div>

            <div className='min-w-0 flex-1'>
              <h3 className='text-white font-semibold text-xs md:text-sm line-clamp-1 hover:text-green-400 transition-colors cursor-pointer'>
                {currentTrack?.title || 'Untitled'}
              </h3>
              <p className='text-gray-400 text-xs line-clamp-1 hover:text-gray-300 transition-colors cursor-pointer'>
                {currentTrack?.artists && Array.isArray(currentTrack.artists)
                  ? currentTrack.artists.map((artist: any, i: number) => (
                      <span key={i} className='inline'>
                        {i > 0 && ', '}
                        <Link to={`/artist?name=${artist.alias}`} className='hover:underline'>
                          {artist.name}
                        </Link>
                      </span>
                    ))
                  : currentTrack?.artistsNames || 'Unknown Artist'}
              </p>
            </div>

            <button
              className={`text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 w-8 h-8 hidden md:flex ${
                isLiked ? 'text-green-500' : ''
              }`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Icon name={isLiked ? 'heart-filled' : 'heart'} />
            </button>
          </div>

          {/* Center: Controls */}
          <div className='flex flex-col md:items-center items-end gap-2 md:gap-3 w-3/5 md:w-1/3'>
            {/* Control Buttons */}
            <div className='flex items-center gap-2 md:gap-4'>
              <button
                onClick={handlePrev}
                className='text-gray-400 hover:text-white transition-all duration-200 p-1.5 md:p-2 rounded-full hover:bg-white/10 hover:scale-110 w-10 h-10'
              >
                <Icon name='prev' className='w-4 h-4 md:w-5 md:h-5' />
              </button>

              <button
                onClick={togglePlayPause}
                className='text-gray-400 hover:text-white transition-all duration-200 p-1.5 md:p-2 rounded-full hover:bg-white/10 hover:scale-110 w-10 h-10'
              >
                {isPlaying ? <Icon name='pause' /> : <Icon name='play' />}
              </button>

              <button
                onClick={nextTrack}
                className='text-gray-400 hover:text-white transition-all duration-200 p-1.5 md:p-2 rounded-full hover:bg-white/10 hover:scale-110 w-10 h-10'
              >
                <Icon name='next' className='w-4 h-4 md:w-5 md:h-5' />
              </button>

              <button
                onClick={handleRepeat}
                className={`transition-all duration-200 p-1.5 md:p-2 rounded-full hover:bg-white/10 hover:scale-110 hidden md:flex w-10 h-10 ${
                  isRepeat ? 'text-green-400' : 'text-gray-400 hover:text-white '
                }`}
              >
                <Icon name='repeat' className='w-3.5 h-3.5 md:w-4 md:h-4' />
              </button>
            </div>

            {/* Time Display - Desktop only */}
            <div className='md:flex items-center gap-2 md:gap-3 w-full max-w-xs md:max-w-md hidden'>
              <span className='text-xs text-gray-400 font-mono min-w-[35px] text-right'>{formatTime(currentTime)}</span>

              <div className='flex-1 group'>
                <div className='relative h-2 bg-gray-600/30 rounded-full overflow-hidden hover:h-3 transition-all duration-200'>
                  <div
                    className='h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-100 ease-out'
                    style={{ width: `${progress}%` }}
                  />
                  <input
                    type='range'
                    min='0'
                    max={currentTrack.duration || 0}
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                  />
                </div>
              </div>

              <span className='text-xs text-gray-400 font-mono min-w-[35px]'>
                {formatTime(currentTrack.duration || 0)}
              </span>
            </div>
          </div>

          {/* Right: Volume & Additional Controls */}
          <div className='hidden md:flex items-center gap-4 w-1/3 justify-end'>
            {/* Enhanced Volume Control */}
            <div
              ref={volumeRef}
              className='flex items-center gap-2 group volume-control relative'
              onMouseEnter={handleVolumeHover}
              onMouseLeave={handleVolumeLeave}
            >
              <button
                onClick={handleMuteToggle}
                className='text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 relative w-10 h-10'
                title={`Volume: ${getVolumePercentage()}%`}
              >
                <Icon name={getVolumeIcon()} className='w-5 h-5' />
              </button>

              {/* Volume Slider - Always visible on desktop */}
              <div className='w-24 lg:w-28 group-hover:w-32 lg:group-hover:w-36 transition-all duration-300'>
                <div className='relative h-1 bg-gray-600/30 rounded-full overflow-hidden hover:h-2 transition-all duration-200 group'>
                  <div
                    className='h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-100'
                    style={{ width: `${volume * 100}%` }}
                  />
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                    title={`Volume: ${getVolumePercentage()}%`}
                  />

                  {/* Volume indicator dot */}
                  <div
                    className='absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'
                    style={{ left: `calc(${volume * 100}% - 6px)` }}
                  />
                </div>
              </div>

              {/* Volume percentage tooltip */}
              {showVolumeSlider && (
                <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap'>
                  {getVolumePercentage()}%
                </div>
              )}
            </div>

            {/* Queue Button */}
            <button
              onClick={handleToggleQueue}
              className={`transition-colors p-2 rounded-full hover:bg-white/10 w-10 h-10 ${
                showQueue ? 'text-green-400' : 'text-gray-400 hover:text-white'
              }`}
              title='Hiển thị hàng đợi phát'
            >
              <Icon name='list' className='w-5 h-5' />
            </button>

            {/* Lyrics Button */}
            <button
              onClick={handleToggleLyrics}
              className={`transition-colors p-2 rounded-full hover:bg-white/10 w-10 h-10 ${
                showLyrics ? 'text-green-400' : 'text-gray-400 hover:text-white'
              }`}
              title='Hiển thị lời bài hát'
            >
              <Icon name='text' className='w-5 h-5' />
            </button>

            {/* Fullscreen Button */}
            <button
              className='text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 w-10 h-10'
              title='Toàn màn hình'
            >
              <Icon name='expand' className='w-5 h-5' />
            </button>
          </div>

          {/* Mobile: Quick Access Controls */}
          <div className='md:hidden flex items-center gap-2'>
            <button
              onClick={handleToggleQueue}
              className={`transition-colors p-2 rounded-full hover:bg-white/10 w-10 h-10 ${
                showQueue ? 'text-green-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon name='list' className='w-4 h-4' />
            </button>

            <button
              onClick={handleToggleLyrics}
              className={`transition-colors p-2 rounded-full hover:bg-white/10 w-10 h-10 ${
                showLyrics ? 'text-green-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon name='text' className='w-4 h-4' />
            </button>
          </div>
        </div>

        {/* Ambient Glow Effect */}
        <div className='absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-transparent pointer-events-none' />

        {/* Playing Animation */}
        {isPlaying && (
          <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse' />
        )}
      </div>
    </>
  )
}

export default AudioPlayer
