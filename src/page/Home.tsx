import { useState } from 'react'
// import LoadingScreen from '../component/Loading'
import { Link } from 'react-router-dom'
import { NewReleaseSection } from './Home/NewReleaseSection'
import { ChartSection } from './Home/ChartSection'
import { AlbumHotSection } from './Home/AlbumHotSection'

import '../App.css'

import Icon from '../component/Icon'
import { Top100Section } from './Home/Top100Section'

function Home() {


  const [isLiked, setIsLiked] = useState(false)

  return (
    <>
      <div className='text-white w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900'>
        {/* Hero Banner Section - Fixed Banner */}
        <section className='relative h-[70vh] sm:h-[70vh] md:h-[60vh] overflow-hidden'>
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

            {/*  Gradient Overlays */}
            <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-purple-900/60' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40' />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60' />

            {/* Main content */}
            <div className='absolute md:inset-0 flex items-center mt-5 md:mt-0 md:justify-center md:flex-row flex-col gap-8 px-4 md:px-8'>
              <div className='max-w-7xl mx-auto px-8 md:flex items-center md:gap-12 w-full'>
                {/* Hero image */}
                <div className='relative group'>
                  <div className='relative overflow-hidden rounded-3xl shadow-2xl'>
                    <div className='w-80 h-80 bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 md:flex items-center justify-center relative overflow-hidden hidden '>
                      <div className='absolute inset-0 opacity-20'>
                        <div className='absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full'></div>
                        <div className='absolute top-12 right-8 w-4 h-4 bg-white rounded-full'></div>
                        <div className='absolute bottom-16 left-8 w-6 h-6 border border-white rounded-full'></div>
                        <div className='absolute bottom-8 right-4 w-12 h-1 bg-white rounded'></div>
                        <div className='absolute bottom-12 right-4 w-8 h-1 bg-white rounded'></div>
                        <div className='absolute bottom-16 right-4 w-10 h-1 bg-white rounded'></div>
                      </div>

                      <div className='relative z-10'>
                        <Icon name='music' className='text-white text-9xl drop-shadow-2xl' />
                      </div>

                      <div className='absolute inset-0 bg-gradient-to-t from-green-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                    </div>
                  </div>
                  {/* Reflection Effect */}
                  <div className='absolute -bottom-20 left-0 w-full h-20 bg-gradient-to-t from-white/5 to-transparent blur-xl' />
                </div>
                {/* Content */}
                <div className='flex-1 space-y-8  '>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 '>
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
                      className='bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105'
                    >
                      <Icon name='music' className='text-lg' />
                      <span>Top Trending</span>
                    </Link>

                    <Link
                      to='/top100'
                      className='bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400/50 text-purple-200 font-semibold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105'
                    >
                      <Icon name='star' className='text-lg' />
                      <span>Top 100</span>
                    </Link>

                    <button
                      className={`text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 w-10 h-10 hidden md:block ${
                        isLiked ? 'text-green-500' : ''
                      }`}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Icon name={isLiked ? 'heart-filled' : 'heart'} className='text-3xl' />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className=' items-center max-md:justify-center gap-8 flex'>
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

        {/* New Release Section - Enhanced */}
        <section className='px-8 mb-16'>{NewReleaseSection()}</section>

        {/* Chart Section - Enhanced */}
        <section className='px-8 mb-16'>{ChartSection()}</section>

        {/* Top 100 Section - Enhanced */}
        <section className='px-8 mb-16'>{Top100Section()}</section>

        {/* Popular Playlists - Enhanced */}
        <section className='px-8 pb-24'>{AlbumHotSection()}</section>
      </div>
    </>
  )
}

export default Home
