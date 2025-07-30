import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export const API_ZingMP3 = axios.create({
  baseURL: 'https://server-zingmp3-m447.onrender.com/api/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
