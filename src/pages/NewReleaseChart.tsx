import { useEffect, useState } from 'react'
// import { fetchEpisodessId } from '../services/spotifyRouteService'
// import { useParams, useSearchParams } from 'react-router-dom'
import type { NewReleaseChartRespone } from '../types/spotify'
import { fetchNewRelease } from '../services/spotifyService'
import { usePlayer } from '../contexts/PlayerContext'
import Icon from '../component/Icon'
export function NewReleaseChart() {
  const [newReleaseData, setNewReleaseData] = useState<NewReleaseChartRespone | any>()
  const [loading, setLoading] = useState(false)
  const { isPlaying, togglePlayPause } = usePlayer()
  useEffect(() => {
    const loadNewRl = async () => {
      try {
        setLoading(true)
        const newRl = await fetchNewRelease()
        setNewReleaseData(newRl)
      } catch (error) {
        // console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadNewRl()
  }, [])

  const formatDuration = (ms: number) => {
    if (!ms || isNaN(ms)) return '0:00'

    // Tính phút và giây
    const minutes = Math.floor(ms / 60)
    const seconds = ms % 60

    // Nếu số giây nhỏ hơn 10, thêm số 0 vào trước
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const topTrend = (rakingStatus: number) => {
    if (rakingStatus > 0) {
      return (
        <div className='text-green-700 w-5 flex flex-col items-center justify-center'>
          <svg
            viewBox='0 0 512 512'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            fill='#000000'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
              {' '}
              <title>triangle-filled</title>{' '}
              <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                {' '}
                <g id='drop' fill='#0ed100' transform='translate(32.000000, 42.666667)'>
                  {' '}
                  <path
                    d='M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z'
                    id='Combined-Shape'
                  >
                    {' '}
                  </path>{' '}
                </g>{' '}
              </g>{' '}
            </g>
          </svg>
          <span className='text-xs font-medium'>{Math.abs(rakingStatus)}</span>
        </div>
      )
    } else if (rakingStatus < 0) {
      return (
        <div className='text-red-900 w-5 flex flex-col items-center justify-center'>
          <svg
            viewBox='0 0 512 512'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            fill='#000000'
            transform='rotate(180)'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
              {' '}
              <title>triangle-filled</title>{' '}
              <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                {' '}
                <g id='drop' fill='#ff0000' transform='translate(32.000000, 42.666667)'>
                  {' '}
                  <path
                    d='M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z'
                    id='Combined-Shape'
                  >
                    {' '}
                  </path>{' '}
                </g>{' '}
              </g>{' '}
            </g>
          </svg>
          <span className='text-xs font-medium'>{Math.abs(rakingStatus)}</span>
        </div>
      )
    } else {
      return (
        <div className='text-white w-10 flex items-center justify-center'>
          <span className='text-lg'>─</span>
        </div>
      )
    }
  }

  return (
    <div className='text-white mt-20 px-6'>
      <div className='flex items-center justify-start gap-3'>
        <p className='text-4xl'>{newReleaseData?.data.title}</p>
        <div className='bg-green-500 rounded-full p-3 shadow-lg transform transition-all duration-300'>
          <div className='w-8 h-8'>
            <button className='w-8 ' onClick={togglePlayPause}>
              {isPlaying ? <Icon name='pause' /> : <Icon name='play' />}
            </button>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        {newReleaseData?.data.items.map((topsong: any, index: number) => (
          <div
            key={topsong.encodeId || index}
            className='flex py-2  justify-between items-center border-b-[1px] border-b-gray-600 hover:border-b-gray-800 hover:bg-gray-500 hover:rounded-sm'
          >
            <div className='flex gap-2 items-center'>
              <div className='w-12 flex justify-center'>{topTrend(topsong.rakingStatus || 0)}</div>
              <img src={topsong.thumbnailM} alt='' className='w-15 h-15  rounded-md' />
              <div>
                <p className='text-sm'>{topsong.title}</p>
                <p className='pl-2 text-gray-400'>{topsong.artistsNames}</p>
              </div>
            </div>
            {/* Sửa CSS cho album title */}
            <p className='text-left text-gray-400 hidden md:block'>{topsong.album?.title || 'Unknown'}</p>
            <p className='text-right text-gray-500 hidden md:block'>{formatDuration(topsong.duration)}</p>
          </div>
        ))}
      </div>
      {loading && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500'></div>
        </div>
      )}
    </div>
  )
}
