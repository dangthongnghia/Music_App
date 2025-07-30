import { API_ZingMP3 } from './API'

export const fetchHome_MP3 = async () => {
  try {
    const response = await API_ZingMP3.get(`home`)
    // console.log(response)
    return response.data || []
  } catch (error) {
    console.error(error)
  }
}

export const fetchArtists_MP3 = async (name: string) => {
  try {
    const response = await API_ZingMP3.get('artist', {
      params: { name: name }
    })
    // console.log(response)
    return response.data || []
  } catch (error) {
    console.error('Error fetching artist songs:', error)
  }
}

export const fetchTop100_MP3 = async () => {
  try {
    const response = await API_ZingMP3.get(`top100`)

    return response.data || []
  } catch (error) {
    console.error(error)
  }
}

export const fetchAlbums_MP3 = async () => {
  try {
    const response = await API_ZingMP3.get(`albums`)

    return response.data || []
  } catch (error) {
    console.error(error)
  }
}
export const fetchArtistSongs_MP3 = async (name: string) => {
  try {
    const response = await API_ZingMP3.get('artistsong', {
      params: { name }
    })
    return response.data || []
  } catch (error) {
    console.error('Error fetching artist songs:', error)
  }
}
export const fetchNewRelease = async () => {
  try {
    const response = await API_ZingMP3.get('newreleasechart')

    return response.data || []
  } catch (error) {
    console.error(error)
  }
}
export const apisearch = async (keyword: string) => {
  try {
    const response = await API_ZingMP3.get('search', {
      params: { keyword }
    })
    return response.data
  } catch (error) {
    console.error('Error searching:', error)
  }
}

export const fetchDetailPlaylist = async (id: string) => {
  try {
    const response = await API_ZingMP3.get(`detailplaylist`, {
      params: {
        id: id
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching playlist:', error)
    throw error
  }
}
