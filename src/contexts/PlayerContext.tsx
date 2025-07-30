import React, { createContext, useState, useContext, useCallback } from 'react'

import { useAudioPlayer } from '../Hook/useProvidePlayer'
import { getSongInfo_MP3, getSongPLay } from '../services/song'
import { fetchDetailPlaylist } from '../services/spotifyService'
import { parseTrack } from '../utils/parseTrack'
import type { Track } from '../types/spotify'

const PlayerContext = createContext<any>(null)

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audio = useAudioPlayer()
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)

  // Function để load playlist từ API
  const loadPlaylistById = useCallback(async (playlistId: string) => {
    try {
      setIsLoading(true)
      const playlistData = await fetchDetailPlaylist(playlistId)

      // Ưu tiên load từ playlist trước
      if (playlistData?.data?.song?.items) {
        const songs = playlistData.data.song.items.map((item: any) => ({
          encodeId: item.encodeId,
          title: item.title,
          artistsNames: item.artistsNames,
          thumbnailM: item.thumbnailM,
          duration: item.duration
        }))

        // console.log('Loaded playlist songs:', songs)
        setPlaylist(songs)
        return songs
      }
      // Nếu có name và không có playlist data, thử load artist songs
      // console.warn('No songs found in playlist or artist data')
      return []
    } catch (error) {
      // console.error('Error loading playlist:', error)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])
  // Function để set playlist trực tiếp
  const setPlaylistSongs = useCallback((songs: Track[]) => {
    // console.log('Setting playlist songs:', songs)
    setPlaylist(songs)
    setCurrentIndex(0)
  }, [])

  // Function để play playlist từ đầu
  const playPlaylist = useCallback(
    async (playlistId: string, startIndex: number = 0) => {
      try {
        const songs = await loadPlaylistById(playlistId)
        if (songs && songs.length > 0) {
          setCurrentIndex(startIndex)
          playTrackById(songs[startIndex].encodeId)
          // console.log('Id playlist:', playlistId)
        } else {
          // console.warn('Khong co bai hat nao')
        }
      } catch (error) {
        // console.error('Error playing playlist:', error)
      }
    },
    [loadPlaylistById]
  )

  const togglePlayPause = useCallback(() => {
    if (!audio.audioRef.current) return

    if (audio.isPlaying) {
      audio.audioRef.current.pause()
    } else {
      audio.audioRef.current.play().catch(() => {
        // console.error('Play error:', error)
      })
    }
  }, [audio])
  const playTrackById = useCallback(
    async (encodeId: string) => {
      setIsLoading(true)
      try {
        const [info, stream] = await Promise.all([getSongInfo_MP3(encodeId), getSongPLay(encodeId)])

        if (stream.data['128']) {
          const track = parseTrack(info.data)
          setCurrentTrack(track)
          setStreamUrl(stream.data['128'])

          // Cập nhật index nếu track có trong playlist
          const trackIndex = playlist.findIndex((t) => t.encodeId === encodeId)
          // console.log('Track found at index:', trackIndex)
          if (trackIndex !== -1) {
            setCurrentIndex(trackIndex)
          }

          setTimeout(() => {
            if (audio.audioRef.current) {
              audio.audioRef.current.src = stream.data['128']
              audio.audioRef.current.play()
            }
          })
        }
      } catch (err) {
        // console.log('Playing track:')
        // console.error(err)
      } finally {
        setIsLoading(false)
      }
    },
    [audio.audioRef, playlist]
  )

  const nextTrack = useCallback(() => {
    // console.log('nextTrack called')
    // console.log('Playlist:', playlist)
    // console.log('Current Index:', currentIndex)

    if (playlist.length === 0) {
      // console.log('Playlist is empty')
      return
    }

    let nextIndex: number

    if (isShuffle) {
      do {
        nextIndex = Math.floor(Math.random() * playlist.length)
      } while (nextIndex === currentIndex && playlist.length > 1)
    } else {
      nextIndex = currentIndex + 1

      if (nextIndex >= playlist.length) {
        if (isRepeat) {
          nextIndex = 0
        } else {
          // console.log('End of playlist, no repeat')
          return
        }
      }
    }

    // console.log('Playing next track at index:', nextIndex)
    const nextTrackItem = playlist[nextIndex]
    if (nextTrackItem) {
      playTrackById(nextTrackItem.encodeId)
    }
  }, [playlist, currentIndex, isShuffle, isRepeat, playTrackById])

  const prevTrack = useCallback(() => {
    if (playlist.length === 0) return

    let prevIndex: number

    if (isShuffle) {
      do {
        prevIndex = Math.floor(Math.random() * playlist.length)
      } while (prevIndex === currentIndex && playlist.length > 1)
    } else {
      prevIndex = currentIndex - 1

      if (prevIndex < 0) {
        if (isRepeat) {
          prevIndex = playlist.length - 1
        } else {
          return
        }
      }
    }

    const prevTrackItem = playlist[prevIndex]
    if (prevTrackItem) {
      playTrackById(prevTrackItem.encodeId)
    }
  }, [playlist, currentIndex, isShuffle, isRepeat, playTrackById])

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev)
  }, [])

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev)
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        ...audio,
        currentTrack,
        isLoading,
        streamUrl,
        playlist,
        currentIndex,
        isRepeat,
        isShuffle,
        playTrackById,
        nextTrack,
        prevTrack,
        setPlaylist: setPlaylistSongs,
        loadPlaylistById,
        playPlaylist,
        toggleRepeat,
        toggleShuffle,
        togglePlayPause
      }}
    >
      <audio ref={audio.audioRef} preload='metadata' crossOrigin='anonymous' />
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}
