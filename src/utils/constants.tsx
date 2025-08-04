export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  PLAYLIST: '/playlist',
  ARTIST: '/artist',
  ALBUM: '/album',
  SEARCH: '/search'
} as const

export const API_ENDPOINTS = {
  HOME: '/home',
  SONG: '/song',
  LYRICS: '/lyric',
  INFO_SONG: '/infosong',
  SEARCH: '/search',
  ARTIST: '/artist',
  PLAYLIST: '/detailplaylist'
} as const

export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  USER_LIST: 'userList',
  THEME: 'theme'
} as const
