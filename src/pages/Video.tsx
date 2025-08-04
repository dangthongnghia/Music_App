import { useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getVideoInfo_MP3 } from '../services/video'
import ReactPlayer from 'react-player'
import Icon from '../component/Icon'
import '../App.css'

export default function Video() {
  const [searchParams] = useSearchParams()
  const encodeId = searchParams.get('id')
  const [dataUrl, setDataUrl] = useState<{ '360p': string; '480p': string; '720p': string }>()
  const [videoInfo, setVideoInfo] = useState<any>(null)
  const [selectedQuality, setSelectedQuality] = useState<'360p' | '480p' | '720p'>('720p')

  useEffect(() => {
    const fetchVideoInfo = async () => {
      if (!encodeId) return
      try {
        const info = await getVideoInfo_MP3(encodeId)
        setDataUrl(info?.data.streaming.hls)
        setVideoInfo(info.data)
        console.log('Video Info:', info)
      } catch (error) {
        console.error('Error fetching video info:', error)
      }
    }
    fetchVideoInfo()
  }, [encodeId])

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pb-20'>
      {/* Header - Mobile Optimized */}
      <div className='p-4 lg:p-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg sm:text-xl lg:text-2xl font-bold line-clamp-2 mb-2'>
              {videoInfo?.title}
            </h1>
            <div className='flex flex-wrap items-center gap-1 text-sm text-gray-300'>
              {videoInfo?.artists?.map((artist: any, i: number) => (
                <span key={artist.id} className='hover:underline'>
                  {i > 0 && <span className='mr-1'>,</span>}
                  <Link 
                    to={`/artist?name=${artist.alias}`} 
                    className='hover:text-green-400 transition-colors'
                  >
                    {artist.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className='flex items-center gap-3 flex-shrink-0'>
            <button className='p-2 text-gray-400 hover:text-red-400 transition-colors w-10 h-10'>
              <Icon name='heart' className='w-6 h-6' />
            </button>
            <button className='p-2 text-gray-400 hover:text-white transition-colors w-10 h-10'>
              <Icon name='share' className='w-6 h-6' />
            </button>
            <button className='p-2 text-gray-400 hover:text-white transition-colors w-10 h-10'>
              <Icon name='download' className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
          {/* Video Player */}
          <div className='flex-1'>
            <div className='relative bg-black rounded-lg overflow-hidden'>
              {/* Quality Selector */}
              <div className='absolute top-4 right-4 z-10'>
                <select
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value as '360p' | '480p' | '720p')}
                  className='bg-black/70 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:outline-none focus:border-green-500'
                >
                  <option value='720p'>720p</option>
                  <option value='480p'>480p</option>
                  <option value='360p'>360p</option>
                </select>
              </div>

              {/* Video Player - Responsive */}
              <div className='aspect-video w-full'>
                <ReactPlayer
                  src={dataUrl?.[selectedQuality]}
                  controls={true}
                  width='100%'
                  height='100%'
                  playing={false}
                  
                />
              </div>
            </div>

            {/* Video Info - Mobile */}
            <div className='mt-4 lg:hidden'>
              <div className='bg-gray-800/50 rounded-lg p-4'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='text-lg font-semibold'>Thông tin video</h3>
                  <span className='text-sm text-gray-400'>
                    {videoInfo?.duration ? Math.floor(videoInfo.duration / 60) + ':' + (videoInfo.duration % 60).toString().padStart(2, '0') : ''}
                  </span>
                </div>
                <div className='text-sm text-gray-300 space-y-2'>
                  <p><span className='text-gray-400'>Thể loại:</span> {videoInfo?.genreNames?.join(', ')}</p>
                  <p><span className='text-gray-400'>Phát hành:</span> {videoInfo?.releaseDate ? new Date(videoInfo.releaseDate * 1000).toLocaleDateString('vi-VN') : ''}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Videos */}
          <div className='w-full lg:w-80 xl:w-96 '>
            <div className='bg-gray-800/30 rounded-lg p-4 '>
              <h2 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                <span className='w-5 h-5'>

                <Icon name='list' className='w-5 h-5' />
                </span>
                Đề xuất video khác
              </h2>
              
              {/* Mobile: Horizontal Scroll, Desktop: Vertical */}
              <div className='lg:space-y-3'>
                <div className='flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:max-h-[500px] pb-2 lg:pb-0 hide-scrollbar'>
                  {videoInfo?.recommends?.map((video: any) => (
                    <Link
                      to={`/video?id=${video.encodeId}`}
                      key={video.encodeId}
                      className='flex-shrink-0 lg:flex-shrink flex flex-col lg:flex-row gap-3 p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-300 group w-48 lg:w-full hide-scrollbar'
                    >
                      <div className='relative'>
                        <img
                          src={video.thumbnailM || video.thumbnail}
                          alt={video.title}
                          className='w-full lg:w-24 aspect-video object-cover rounded-md'
                        />
                        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-md flex items-center justify-center '>
                        <span className='w-10 h-10'>

                          <Icon name='play' className='w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity' />
                        </span>
                        </div>
                      </div>
                      
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-medium text-sm line-clamp-2 group-hover:text-green-400 transition-colors mb-1'>
                          {video.title}
                        </h3>
                        <div className='text-xs text-gray-400 line-clamp-1'>
                          {video.artists?.map((artist: any, i: number) => (
                            <span key={artist.id}>
                              {i > 0 && ', '}
                              {artist.name}
                            </span>
                          ))}
                        </div>
                        {video.duration && (
                          <span className='text-xs text-gray-500 mt-1 block'>
                            {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}