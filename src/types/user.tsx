export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string | null
  loginType?: string
  createdAt?: string
  phone?: string | undefined
  favoriteGenres?: string[]
  totalListeningTime?: number
}
