import { API } from './API'
import type { Albums, Artists, Show } from '../types/spotify'

export const fetchArtistById = async (token: string, id: string): Promise<Artists> => {
  const response = await API.get(`artists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      market: 'VN'
    }
  })

  if (!response.status) {
    throw new Error(`Error fetching artist: ${response.statusText}`)
  }

  return response.data
}

export const fetchPodcastsId = async (token: string, id: string): Promise<Show> => {
  const response = await API.get(`shows/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      limit: 10,
      include_groups: 'album,single,appears_on,compilation',
      market: 'VN'
    }
  })

  if (!response.status) {
    throw new Error(`Error fetching artist albums: ${response.statusText}`)
  }

  return response.data || []
}
export const fetchEpisodessId = async (token: string, id: string): Promise<Show> => {
  const response = await API.get(`episodes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.status) {
    throw new Error(`Error fetching artist albums: ${response.statusText}`)
  }

  return response.data || []
}

export const fetchAlbumsId = async (token: string, id: string): Promise<Albums> => {
  const response = await API.get(`albums/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.status) {
    throw new Error(`Error fetching artist albums: ${response.statusText}`)
  }
  return response.data || []
}
