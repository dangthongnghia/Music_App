import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchHome_MP3 } from '../../services/spotifyService'
import type { ZingMP3HomeResponse } from '../../types/spotify'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Autoplay, Navigation } from 'swiper/modules'
export function Top100Section() {
  const [homeData, setHomeData] = useState<ZingMP3HomeResponse | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const loadHome = async () => {
      try {
        setLoading(true)
        const homepage = await fetchHome_MP3()
        setHomeData(homepage)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    loadHome()
  }, [])
  const getTop100Section = () => {
    return homeData?.data?.items?.find((item) => item.sectionType === 'playlist' && item.title?.includes('Top 100'))
  }

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto'>
        {/* Header Skeleton */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <div className='h-10 bg-gray-700 rounded-lg w-48 mb-2 animate-pulse'></div>
            <div className='h-5 bg-gray-800 rounded w-64 animate-pulse'></div>
          </div>
          <div className='h-10 bg-gray-700 rounded-lg w-32 animate-pulse'></div>
        </div>

        {/* Top 100 Categories Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='bg-gray-800/30 rounded-3xl p-6 animate-pulse'>
              <div className='space-y-3'>
                {/* Category Header */}
                <div className='text-center space-y-3'>
                  <div className='w-24 h-24 bg-gray-700 rounded-2xl mx-auto'></div>
                  <div className='bg-gray-700 rounded w-3/4 h-6 mx-auto'></div>
                  <div className='bg-gray-700 rounded w-1/2 h-4 mx-auto'></div>
                </div>

                {/* Top Songs List */}
                <div className='space-y-3'>
                  {Array.from({ length: 3 }).map((_, songIndex) => (
                    <div key={songIndex} className='flex items-center gap-3'>
                      <div className='bg-gray-700 rounded w-6 h-6'></div>
                      <div className='w-12 h-12 bg-gray-700 ro  unded-lg'></div>
                      <div className='flex-1 space-y-2'>
                        <div className='bg-gray-700 rounded w-full h-4'></div>
                        <div className='bg-gray-700 rounded w-2/3 h-3'></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <div className='bg-gray-700 rounded-full w-full h-10 mx-auto'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-500 bg-clip-text text-transparent mb-2'>
            {getTop100Section()?.title || 'Top 100'}
          </h2>
          <p className='text-gray-400'>Những playlist được yêu thích nhất</p>
        </div>
      </div>

      <Swiper
        slidesPerView={2}
        spaceBetween={24}
        autoplay={{ delay: 4000 }}
        modules={[Navigation, Autoplay]}
        className=' pb-4'
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 }
        }}
      >
        {Array.isArray(getTop100Section()?.items) &&
          getTop100Section()?.items?.map((playlist: any, index: number) => (
            <SwiperSlide key={playlist.encodeId}>
              <Link
                to={`/playlist/${playlist.encodeId}`}
                className='  block bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-4 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-500 border border-white/10 hover:border-blue-400/50 '
              >
                <div className='relative mb-4'>
                  {/* Rank Badge */}
                  <div className='absolute -top-2 -left-2 bg-gradient-to-br from-blue-500 to-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10'>
                    {index + 1}
                  </div>

                  <img
                    src={playlist.thumbnailM || playlist.thumbnail}
                    alt={playlist.title}
                    className='w-full aspect-square object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-500'
                  />

                  {/* Glow Effect */}
                  <div className='absolute inset-0 bg-gradient-to-t from-blue-500/0 group-hover:from-blue-500/30 to-transparent rounded-xl transition-all duration-500' />
                </div>

                <div className='space-y-2'>
                  <h3 className='font-bold text-white line-clamp-2 group-hover:text-blue-300 transition-colors leading-tight hover:underline'>
                    {playlist.title}
                  </h3>
                  <p className='text-xs text-gray-500'>{Math.floor(Math.random() * 1000) + 100}K lượt nghe</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>

      <style>{`
            .top100-swiper .swiper-button-next,
            .top100-swiper .swiper-button-prev {
              color: #22d3ee;
              background: rgba(34, 211, 238, 0.1);
              backdrop-filter: blur(10px);
              border-radius: 50%;
              width: 50px;
              height: 50px;
              margin-top: -25px;
              border: 1px solid rgba(34, 211, 238, 0.3);
              transition: all 0.3s ease;
            }
            
            .top100-swiper .swiper-button-next:hover,
            .top100-swiper .swiper-button-prev:hover {
              background: rgba(34, 211, 238, 0.3);
              transform: scale(1.1);
            }
          `}</style>
    </div>
  )
}
