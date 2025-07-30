import { useRef, useState, useEffect, useCallback } from 'react'

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  }, [])

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const update = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration || 0)
      setProgress((audio.currentTime / (audio.duration || 1)) * 100)
    }

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('timeupdate', update)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('timeupdate', update)
    }
  }, [])

  return {
    audioRef,
    isPlaying,
    duration,
    currentTime,
    progress,
    togglePlay,
    seekTo
  }
}
