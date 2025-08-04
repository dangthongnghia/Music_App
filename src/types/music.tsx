export interface Track {
  encodeId: string
  title: string
  artists: Artist[]
  thumbnailM: string
  duration: number
  album?: Album
  releaseDate?: number
  like?: number
  distributor?: string
}

export interface Artist {
  id?: string
  name: string
  alias?: string
  thumbnail?: string
  totalFollow?: number
  biography?: string
}

export interface Album {
  encodeId: string
  title: string
  thumbnail: string
  artists: Artist[]
  releaseDate?: number
}

export interface Playlist {
  encodeId: string
  title: string
  thumbnail: string
  description?: string
  songs: Track[]
  totalDuration?: number
}

export interface QueueTrack {
  encodeId: string
  title: string
  artists: Artist[]
  thumbnailM: string
  duration: number
}
export interface LyricLine {
  words: Array<{
    startTime: number
    endTime: number
    data: string
  }>
  startTime: number
  endTime: number
}
