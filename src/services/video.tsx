import { API_ZingMP3 } from './API'

export const getVideoInfo_MP3 = async (encodeId: string) => {
  try {
    const response = await API_ZingMP3.get(`video`, {
      params: {
        id: encodeId
      }
    })
    return response.data || []
  } catch (error) {}
}
