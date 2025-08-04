import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../components/common/Icon_1'
import { NewReleaseSection } from './NewReleaseSection'
import { ChartSection } from './ChartSection'
import { Top100Section } from './Top100Section'
import { AlbumHotSection } from './AlbumHotSection'

import '../../App.css'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // 1.5 seconds loading

    return () => clearTimeout(timer)
  }, [])

  // Simple loading screen
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900'>
        <div className='text-center space-y-6'>
          {/* Spinner */}
          <div className='w-8 h-8 border-2 border-gray-700 border-t-green-400 rounded-full animate-spin mx-auto'></div>

          {/* Text */}
          <div className='space-y-2'>
            <h2 className='text-xl font-semibold text-white'>Đang tải...</h2>
            <p className='text-gray-400 text-sm'>Chuẩn bị âm nhạc cho bạn</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='text-white w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900'>
      {/* Hero Banner Section */}
      <section className='relative h-[70vh] sm:h-[70vh] md:h-[65vh] overflow-hidden'>
        <div className='relative h-full'>
          {/* Static Background */}
          <div
            className='absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out'
            style={{
              backgroundImage: `linear-gradient(135deg, #667eea 0%, #764ba2 100%), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>')`,
              filter: 'blur(0px) brightness(0.4)'
            }}
          />

          {/* Animated Particles Background */}
          <div className='absolute inset-0'>
            <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60'></div>
            <div className='absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40'></div>
            <div className='absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-50'></div>
            <div className='absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-60'></div>
          </div>

          {/* Gradient Overlays */}
          <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-purple-900/60' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40' />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60' />

          {/* Main content */}
          <div className='absolute inset-0 flex items-center mt-5 md:mt-0 md:justify-center md:flex-row flex-col gap-8 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto px-8 md:flex items-center md:gap-12 w-full'>
              {/* Content */}
              <div className='flex-1 space-y-8'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full' />
                    <p className='text-green-400 font-bold text-lg md:xl tracking-wider uppercase animate-pulse'>
                      Âm nhạc không giới hạn
                    </p>
                  </div>

                  <h1 className='text-3xl lg:text-5xl font-black leading-tight bg-gradient-to-r from-white via-green-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl'>
                    Khám Phá Thế Giới Âm Nhạc
                  </h1>

                  <p className='text-lg lg:text-3xl text-gray-300 font-medium'>
                    Hàng triệu bài hát, mọi thể loại, mọi tâm trạng
                  </p>

                  <p className='text-sm lg:text-lg text-gray-400 max-w-2xl leading-relaxed'>
                    Trải nghiệm âm nhạc chất lượng cao với bộ sưu tập khổng lồ từ những nghệ sĩ hàng đầu thế giới. Tìm
                    kiếm, khám phá và tận hưởng âm nhạc theo cách của bạn.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className='flex items-center gap-6 max-md-justify-between text-xs'>
                  <Link
                    to='/newreleasechart'
                    className='bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 text-white font-semibold px-3 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105'
                  >
                    <i className='w-5'>
                      <Icon name='music' className='text-lg' />
                    </i>
                    <span>Top Trending</span>
                  </Link>

                  <Link
                    to='/top100'
                    className='bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400/50 text-purple-200 font-semibold px-3 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105'
                  >
                    <i className='w-5'>
                      <Icon name='star' className='text-lg' />
                    </i>
                    <span>Top 100</span>
                  </Link>

                  <button
                    className={`text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 w-10 h-10 hidden lg:block ${
                      isLiked ? 'text-green-500' : ''
                    }`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Icon name={isLiked ? 'heart-filled' : 'heart'} size={30} className='text-3xl' />
                  </button>
                </div>

                {/* Stats */}
                <div className='items-center max-md:justify-center gap-8 hidden md:flex text-sm text-gray-400'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-green-400'>10M+</div>
                    <div className='text-sm text-gray-400'>Bài hát</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-purple-400'>500K+</div>
                    <div className='text-sm text-gray-400'>Nghệ sĩ</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-blue-400'>1M+</div>
                    <div className='text-sm text-gray-400'>Playlist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Music Notes Animation */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            <div
              className='absolute top-1/4 left-10 text-green-400 text-2xl opacity-60 animate-bounce'
              style={{ animationDelay: '0s' }}
            >
              ♪
            </div>
            <div
              className='absolute top-1/3 right-20 text-purple-400 text-lg opacity-40 animate-bounce'
              style={{ animationDelay: '1s' }}
            >
              ♫
            </div>
            <div
              className='absolute bottom-1/3 left-1/4 text-blue-400 text-xl opacity-50 animate-bounce'
              style={{ animationDelay: '2s' }}
            >
              ♪
            </div>
            <div
              className='absolute bottom-1/4 right-1/3 text-pink-400 text-lg opacity-60 animate-bounce'
              style={{ animationDelay: '0.5s' }}
            >
              ♫
            </div>
            <div
              className='absolute top-1/2 left-1/2 text-yellow-400 text-sm opacity-30 animate-bounce'
              style={{ animationDelay: '1.5s' }}
            >
              ♪
            </div>
          </div>
        </div>
      </section>

      <section className='px-8 mb-16'>
        <NewReleaseSection />
      </section>

      <section className='px-8 mb-16'>
        <ChartSection />
      </section>

      <section className='px-8 mb-16'>
        <Top100Section />
      </section>

      <section className='px-8 pb-24'>
        <AlbumHotSection />
      </section>
    </div>
  )
}

export default Home
