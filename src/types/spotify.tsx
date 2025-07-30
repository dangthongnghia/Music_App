export interface Artists {
  id: string
  external_urls: {
    spotify: string
  }
  followers: {
    href: null
    total: number
  }
  images: Array<{
    url: string
    height: number
    width: number
  }>
  genres: string[]
  href: string
  name: string
  popularity: number
  type: string
  uri: string

  error?: {
    status: number
    message: string
  }
}

export interface ArtistAlbums {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
  images: Array<{
    url: string
    height: number
    width: number
  }>
  name: string
  id: string
  items: Array<{
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: { spotify: string }
    href: string

    release_date: string
    release_date_precision: string
    restrictions: {
      reason: string
    }
    name: string
    type: string
    uri: string
    artists: Array<{
      external_urls: { spotify: string }
      href: string
      id: string
      name: string
      type: string
      uri: string
    }>
    album_group: string
  }>
}
export interface Search {
  q: string
  type: string
  market: string
  limit: number
  offset: number
  include_external: string
  track: {
    href: string
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
    items: Array<{
      album: {
        album_type: string
        total_tracks: number
        available_markets: string[]
        external_urls: { spotify: string }
        href: string
        id: string
        images: Array<{
          url: string
          height: number
          width: number
        }>
        name: string
        release_date: string
        release_date_precision: string
        restrictions: {
          reason: string
        }
        type: string
        uri: string
        artists: Array<{
          external_urls: { spotify: string }
          href: string
          id: string
          name: string
          type: string
          uri: string
        }>
      }
      artists: Array<{
        external_urls: { spotify: string }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }>
      available_markets: string[]
      disc_number: number
      duration_ms: number
      explicit: boolean
      external_ids: {
        isrc: string
        ean: string
        upc: string
      }
      external_urls: { spotify: string }
      href: string
      id: string
      is_playable: boolean
      linked_from: null | {}
      restrictions: {
        reason: string
        name: string
        popularity: number
        preview_url: string | null
        track_number: number
        type: string
        uri: string
        is_local: boolean
      }
    }>
  }
  artists: Array<{
    href: string
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
    items: Array<{
      external_urls: { spotify: string }
      followers: { href: null; total: number }
      genres: string[]
      href: string
      id: string
      images: Array<{
        url: string
        height: number
        width: number
      }>
      name: string
      popularity: number
      type: string
      uri: string
    }>
  }>
}
export interface Playback {
  device: {
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
    supports_volume: boolean
  }
  repeat_state: string
  shuffle_state: boolean
  timestamp: number
  currentSong: string | {}
  audio_url: string | null
  context: {
    external_urls: { spotify: string }
    href: string
    type: string
    uri: string
  }
  progress_ms: number

  item: {
    album: {
      album_type: string
      artists: Array<{
        external_urls: { spotify: string }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }>
      available_markets: string[]
      external_urls: { spotify: string }
      href: string
      id: string
      images: Array<{
        url: string
        height: number
        width: number
      }>
      name: string
      release_date: string
      release_date_precision: string
      total_tracks: number
      type: string
      uri: string
    }
    artists: Array<{
      external_urls: { spotify: string }
      href: string
      id: string
      name: string
      type: string
      uri: string
    }>
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
      isrc: string
    }
    external_urls: { spotify: string }
    href: string
    id: string
    is_playable: boolean
    linked_from: null | {}
    restrictions: { reason: string }
    name: string
    popularity: number
    preview_url: string | null
    track_number: number
    type: string
    uri: string
  }
  currently_playing_type: string
  actions: {
    interrupting_playback: boolean
    pausing: boolean
    resuming: boolean
    seeking: boolean
    skipping_next: boolean
    skipping_prev: boolean
    toggling_repeat_context: boolean
    toggling_shuffle: boolean
    toggling_repeat_track: boolean
    transferring_playback: boolean
  }
  is_playing: boolean
}

export interface Playlist {
  collaborative: boolean
  description: string
  external_urls: { spotify: string }
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  name: string
  owner: {
    display_name: string
    external_urls: { spotify: string }
    href: string
    id: string
    type: string
    uri: string
  }
  primary_color: null | string
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    total: number
    limit: number
    next: string | null
    offset: number
    previous: string | null
    items: Array<{
      added_at: string
      added_by: {
        external_urls: { spotify: string }
        href: string
        id: string
        type: string
        uri: string
      }
      is_local: boolean
      track: {
        album: {
          album_type: string
          total_tracks: number
          available_markets: string[]
          external_urls: { spotify: string }
          href: string
          id: string
          images: Array<{
            url: string
            height: number
            width: number
          }>
          name: string
          release_date_precision: string
          restrictions: { reason: string }
          type: string
          uri: string
          artists: Array<{
            external_urls: { spotify: string }
            href: string
            id: string
            name: string
            type: string
            uri: string
          }>
        }
        artistis: Array<{
          external_urls: { spotify: string }
          href: string
          id: string
          name: string
          type: string
          uri: string
        }>
        available_markets: string[]
        disc_number: number
        duration_ms: number
        explicit: boolean
        external_ids: {
          isrc: string
          ean: string
          upc: string
        }
        external_urls: { spotify: string }
        href: string
        id: string
        is_playable: boolean
        linked_from: null | {}
        restrictions: {
          reason: string
        }
        name: string
        popularity: number
        preview_url: string | null
        track_number: number
        type: string
        uri: string
        is_local: boolean
      }
      audio_preview_url: string | null
      description: string
      html_description: string
      duration_ms: number
      explicit: boolean
      external_urls: { spotify: string }
      href: string
      id: string
      images: Array<{
        url: string
        height: number
        width: number
      }>
      is_externally_hosted: boolean
      is_playable: boolean
      language: string
      languages: string[]
      name: string
      release_date: string
      release_date_precision: string
      resume_point: {
        fully_played: boolean
        resume_position_ms: number
      }
      type: string
      uri: string
      restrictions: { reason: string }
      show: {
        available_markets: string[]
        copyrights: Array<{
          text: string
          type: string
        }>
        description: string
        html_description: string
        explicit: boolean
        external_urls: { spotify: string }
        href: string
        id: string
        images: Array<{
          url: string
          height: number
          width: number
        }>
        is_externally_hosted: boolean
        languages: string[]
        media_type: string
        name: string
        publisher: string
        type: string
        uri: string
        total_episodes: number
      }
    }>
  }
  type: string
  uri: string
}

export interface Albums {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: { spotify: string }
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  name: string
  release_date: string
  release_date_precision: string
  restrictions: {
    reason: string
  }
  type: string
  uri: string
  artists: Array<{
    external_urls: { spotify: string }
    href: string
    id: string
    name: string
    type: string
    uri: string
  }>
  tracks: {
    href: string
    total: number
    limit: number
    next: string | null
    offset: number
    previous: string | null
    items: Array<{
      artists: Array<{
        external_urls: { spotify: string }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }>
      available_markets: string[]
      disc_number: number
      duration_ms: number
      explicit: boolean
      external_urls: { spotify: string }
      href: string
      id: string
      is_playable: boolean
      linked_from: {
        external_urls: { spotify: string }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }
      restrictions: { reason: string }
      name: string
      previrew_url: string | null
      track_number: number
      type: string
      uri: string
      is_local: boolean
    }>
  }
}

export interface Show {
  available_markets: string[]
  copyrights: Array<{
    text: string
    type: string
  }>
  episodes: {
    items: Array<{
      description: string
      audio_preview_url: string | null
      duration_ms: number
      explicit: string
      external_urls: { spotify: string }
      href: string
      id: string
      images: Array<{
        url: string
        height: number
        width: number
      }>
      is_externally_hosted: boolean
      is_playable: boolean
      language: string
      languages: string
      name: string
      release_date: string
      release_date_precision: string
      resume_point: {
        fully_played: boolean
        resume_position_ms: number
      }
      type: string
      uri: string
      restrictions: {
        reason: string
      }
    }>
  }
  description: string
  html_description: string
  explicit: boolean
  external_urls: { spotify: string }
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  is_externally_hosted: boolean
  languages: string[]
  media_type: string
  name: string
  publisher: string
  type: string
  uri: string
  total_episodes: number
}
export interface ProgressBarProps {
  currentSong?: {
    name?: string
    artist?: string
    image?: string
  }
  isPlaying?: boolean
  currentTime?: number
  duration?: number
  volume?: number
  onPlayPause?: () => void
  onNext?: () => void
  onPrev?: () => void
  onRepeat?: () => void
  onSeek?: (value: number) => void
  onVolumeChange?: (value: number) => void
}

export interface User {
  display_name: string
  external_urls: { spotify: string }
  followers: { href: null; total: number }
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  type: string
  uri: string
  email?: string
  product?: string
}
export interface Episodes {
  description: string
  audio_preview_url: string | null
  duration_ms: number
  explicit: string
  external_urls: { spotify: string }
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  is_externally_hosted: boolean
  is_playable: boolean
  language: string
  languages: string
  name: string
  release_date: string
  release_date_precision: string
  resume_point: {
    fully_played: boolean
    resume_position_ms: number
  }
  type: string
  uri: string
  restrictions: {
    reason: string
  }
  show: {
    available_markets: string[]
    copyrights: Array<{
      text: string
      type: string
    }>
  }
}
// Main response interface
export interface ZingMP3HomeResponse {
  err: number
  msg: string
  data: HomeData
  timestamp: number
}

export interface HomeData {
  items: HomeSection[]
  hasMore: boolean
  total: number
}

// Home section types
export interface HomeSection {
  sectionType: string
  encodeId: string
  sectionId?: string
  title?: string
  link?: string
  viewType?: string
  items?: any // This varies by section type
  songsPerCol?: number
  isPlayAll?: boolean
  isRefresh?: boolean
  promotes?: Track[]
  options?: SectionOptions
  banner?: string
  type?: string
  chartType?: string
  chart?: ChartData
  adId?: string
  pageType?: string
}

export interface SectionOptions {
  autoSlider?: boolean
  hideArrow?: boolean
}

// Banner section
export interface BannerItem {
  type: number
  banner: string
  cover: string
  target: string
  title: string
  description: string
  ispr: number
  encodeId: string
  link: string
}

// New release section
export interface NewReleaseSection {
  all: Track[]
  vPop: Track[]
  others: Track[]
}

// Top 100 section
export interface ZingMP3Top100Response {
  data: ZingMP3Top100Data[]
  status: number
  statusText: string
  headers: {
    'content-length': string
    'content-type': string
  }
  config: any
  request: any
}
export interface ZingMP3Top100Data {
  sectionType: string
  viewType: string
  title: string
  link: string
  sectionId: string
  items: Album[]
  genre: {
    name: string
  }
}

// New Release
export interface NewReleaseChartRespone {
  data: NewReleaseChartData[]
  status: number
  statusText: string
  headers: {
    'content-length': string
    'content-type': string
  }
  config: any
  request: any
}
export interface NewReleaseChartData {
  sectionType: string
  viewType: string
  title: string
  link: string
  sectionId: string
  items: Playlist[]
  genre: {
    name: string
  }
}

export interface SearchResponse {
  data: SearchData[]
  status: number
  statusText: string
  headers: {
    'content-length': string
    'content-type': string
  }
  config: any
  request: any
}
export interface SearchData {
  artists: Artist[]
  playlists: Playlist[]
  albums: Album[]
  top: Artist[]
}
export interface PlaylistReponse {
  data: DetailplaylistData[]
  status: number
  statusText: string
  config: any
  request: any
}
export interface DetailplaylistData {
  data: {
    encodeId: string
    title: string
    thumbnail: string
    isoffical: boolean
    link: string
    isIndie: boolean
    releaseDate: string
    sortDescription: string
    releasedAt: number
    boolAtt: number
    genreIds: string[]
    like: number
    listen: number
    PR: boolean
    artists: Artist[]
    artistsNames: string
    playItemMode: number
    subType: number
    uid: number
    thumbnailM: string
    isShuffle: boolean
    isPrivate: boolean
    userName: string
    isAlbum: boolean
    textType: string
    isSingle: boolean
    zoneid?: string
    song: { items: Track[]; total: number; totalDuration: number; totalDurationStr: string }
    type: string
  }
}

// Track interface
export interface Track {
  encodeId: string
  title: string
  alias: string
  isOffical: boolean
  username: string
  artistsNames: string
  artists: Artist[]
  isWorldWide: boolean
  thumbnailM: string
  link: string
  thumbnail: string
  duration: number
  zingChoice: boolean
  isPrivate: boolean
  preRelease: boolean
  releaseDate: number
  genreIds: string[]
  distributor: string
  indicators: any[]
  isIndie: boolean
  streamingStatus: number
  allowAudioAds: boolean
  hasLyric: boolean
  downloadPrivileges?: number[]
  album?: Album
  previewInfo?: PreviewInfo
  mvlink?: string
  rakingStatus?: number
  score?: number
  totalTopZing?: number
  artist?: Artist
  releasedAt?: number
  streamPrivileges?: number[]
  textType: string
}

// Artist interface
export interface Artist {
  id: string
  name: string
  link: string
  spotlight: boolean
  alias: string
  thumbnail: string
  thumbnailM: string
  isOA: boolean
  birthday: string
  isOABrand: boolean
  playlistId?: string
  totalFollow?: number
  cover?: string
  biography: string
  sortBiography?: string
  national: string
  sections: { items: Track[]; total: number }[]
}

// Album interface
export interface Album {
  encodeId: string
  title: string
  thumbnail: string
  thumbnailM: string
  isoffical: boolean
  link: string
  isIndie: boolean
  releaseDate: string
  sortDescription: string
  releasedAt: number
  boolAtt: number
  genreIds: string[]
  PR: boolean
  artists: Artist[]
  artistsNames: string
  song: Track[]
}

// Preview info
export interface PreviewInfo {
  startTime: number
  endTime: number
}

// Chart data
export interface ChartData {
  times: ChartTime[]
  minScore: number
  maxScore: number
  items: { [key: string]: ChartItem[] }
  totalScore: number
}

export interface ChartTime {
  hour: string
}

export interface ChartItem {
  time: number
  hour: string
  counter: number
}

// Week chart section
export interface WeekChartItem {
  banner: string
  cover: string
  country: string
  type: string
  group: ChartGroup[]
  link: string
  startDate: string
  endDate: string
}

export interface ChartGroup {
  id: number
  name: string
  type: string
  link: string
}

// Playlist interface

export interface Playlist {
  encodeId: string
  title: string
  thumbnail: string
  isoffical: boolean
  link: string
  isIndie: boolean
  releaseDate: string
  sortDescription: string
  releasedAt: number
  boolAtt: number
  genreIds: string[]
  PR: boolean
  artists: Artist[]
  artistsNames: string
  playItemMode: number
  subType: number
  uid: number
  thumbnailM: string
  isShuffle: boolean
  isPrivate: boolean
  userName: string
  isAlbum: boolean
  textType: string
  isSingle: boolean
  zoneid?: string
  type: string
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
export interface PlayerContextType {
  currentTrack: Track | null
  playlist: Track[]
  isPlaying: boolean
  isLoading: boolean
  streamUrl: string | null
  progress: number
  currentTime: number
  duration: number
  audioRef: React.RefObject<HTMLAudioElement | null>
  setCurrentTrack: (track: Track) => void
  setPlaylist: (tracks: Track[]) => void
  togglePlayPause: () => void
  playTrack: (track: Track) => void
  playTrackById: (encodeId: string) => Promise<void>
  playNextTrack: () => void
  playPreviousTrack: () => void
  setCurrentTime: (time: number) => void
  seekTo: (time: number) => void
}
