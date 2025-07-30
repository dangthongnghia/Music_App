import { API_ZingMP3 } from './API'

export const getSongInfo_MP3 = async (encodeId: string) => {
  try {
    const response = await API_ZingMP3.get(`infosong`, {
      params: {
        id: encodeId
      }
    })

    return response.data || []
  } catch (error) {
    console.error('Error fetching song info:', error)
  }
}
export const getSongLyrics = async (encodeId: string) => {
  try {
    const response = await API_ZingMP3.get(`lyric`, {
      params: {
        id: encodeId
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching song lyrics:', error)
    throw error
  }
}

// Function để lấy streaming URL
export const getSongPLay = async (encodeId: string) => {
  try {
    const response = await API_ZingMP3.get(`song`, {
      params: {
        id: encodeId
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}
