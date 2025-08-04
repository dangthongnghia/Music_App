import React from 'react'
import Header from './Header'
// import NavBar from './NavBar'
import AudioPlayer from '../music/AudioPlayer'
import Footer from './Footer'
interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex justify-center items-center h-screen opacity-100 relative'>
      <div className='w-full h-[100%] m-0 rounded-sm shadow-l relative text-white'>
        {/* Header */}
        <div className='absolute top-0 w-full z-30'>
          <Header />
        </div>

        <div className='flex h-full pb-20'>
          {/* <NavBar /> */}

          {/* Main Content */}
          <div className='flex-1 rounded-r-3xl overflow-y-auto hide-scrollbar'>
            <div className='w-full rounded-r-3xl overflow-y-auto hide-scrollbar'>
              <div className='scroll-auto sticky mt-15'>
                {/* Page Content */}
                <main className='min-h-screen'>{children}</main>

                {/* Footer */}
                <div className='w-full p-4 rounded-lg shadow-lg flex flex-col justify-between'>
                  <Footer />
                </div>
              </div>

              <div>
                <div className='fixed top-20 right-4 z-30'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <div className='fixed bottom-0 left-0 right-0 w-full min-w-full z-50 shadow-lg'>
          <AudioPlayer />
        </div>
      </div>
    </div>
  )
}
