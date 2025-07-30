import { fetchTop100_MP3 } from '../services/spotifyService'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import type { ZingMP3Top100Response, Album } from '../types/spotify'

// You'll need to create/import your Icon component
import Icon from '../component/Icon'

export default function Top100() {
  const [albums, setAlbums] = useState<ZingMP3Top100Response | any>(null)
  const [loading, setLoading] = useState(true)
  const [hoveredTop100, setHoveredTop100] = useState<string | null>(null)

  useEffect(() => {
    const loadTop100 = async () => {
      try {
        setLoading(true)
        const top100 = await fetchTop100_MP3()
        setAlbums(top100)
      } catch (error) {
        // console.error('Error fetching top 100 songs:', error)
      } finally {
        setLoading(false)
      }
    }
    loadTop100()
  }, [])

  return (
    <div>
      <section className='mt-20 px-6 text-white'>
        <div className='flex justify-between items-center mb-4 text-white'>
          <h2 className='text-2xl font-bold'>{albums?.data[0].title}</h2>
          <Link
            to={albums?.data[0].link || '#'}
            className='text-sm text-gray-300 hover:text-white flex items-center w-20 h-10 gap-3'
          >
            See All
            <Icon name='arrow-right' />
          </Link>
        </div>

        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  justify-between gap-4 '>
          {(!albums?.data[0].items || albums.data[0].items.length === 0) && !loading ? (
            <div className='text-center py-8 text-gray-500'>Top 100 Not Found</div>
          ) : (
            albums?.data[0].items?.map((top100: Album) => (
              <div
                className='relative flex flex-col  group bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 hover:shadow-xl'
                onMouseEnter={() => setHoveredTop100(top100.encodeId)}
                onMouseLeave={() => setHoveredTop100(null)}
              >
                <Link to={`/playlist/${top100.encodeId}`} className='block p-4'>
                  <div className='relative aspect-square mb-4'>
                    <img
                      src={top100.thumbnailM}
                      alt={top100.title}
                      className='h-full w-full object-cover rounded-md transition-all duration-300 group-hover:shadow-lg'
                    />

                    <div
                      className={`absolute bottom-3 right-3 bg-green-500 rounded-full p-3 shadow-lg transform transition-all duration-300 ${
                        hoveredTop100 === top100.encodeId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <div className='w-8 h-8'>
                        <Icon name='play' className='text-white text-xl ' />
                      </div>
                    </div>
                  </div>

                  <h3 className='font-medium truncate'>{top100.sortDescription}</h3>
                  <p className='text-sm text-gray-400 truncate mt-1'>{top100.artists?.[0]?.name}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <section className='mt-20 px-6 text-white'>
        <div className='flex justify-between items-center mb-4 text-white'>
          <h2 className='text-2xl font-bold'>{albums?.data[1].title}</h2>
          <Link
            to={albums?.data[1].link || '#'}
            className='text-sm text-gray-300 hover:text-white flex items-center w-20 h-10 gap-3'
          >
            See All
            <Icon name='arrow-right' />
          </Link>
        </div>

        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  justify-between gap-4 '>
          {(!albums?.data[1].items || albums.data[1].items.length === 0) && !loading ? (
            <div className='text-center py-8 text-gray-500'>Top 100 Not Found</div>
          ) : (
            albums?.data[1].items?.map((top100: Album) => (
              <div
                className='relative flex flex-col group bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 hover:shadow-xl'
                onMouseEnter={() => setHoveredTop100(top100.encodeId)}
                onMouseLeave={() => setHoveredTop100(null)}
              >
                <Link to={`/album/${top100.encodeId}`} className='block p-4'>
                  <div className='relative aspect-square mb-4'>
                    <img
                      src={top100.thumbnailM}
                      alt={top100.title}
                      className='h-full w-full object-cover rounded-md transition-all duration-300 group-hover:shadow-lg'
                    />

                    <div
                      className={`absolute bottom-3 right-3 bg-green-500 rounded-full p-3 shadow-lg transform transition-all duration-300 ${
                        hoveredTop100 === top100.encodeId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <div className='w-8 h-8'>
                        <Icon name='play' className='text-white text-xl ' />
                      </div>
                    </div>
                  </div>

                  <h3 className='font-medium truncate'>{top100.sortDescription}</h3>
                  <p className='text-sm text-gray-400 truncate mt-1'>{top100.artists?.[0]?.name}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <section className='mt-20 px-6 text-white'>
        <div className='flex justify-between items-center mb-4 text-white'>
          <h2 className='text-2xl font-bold'>{albums?.data[2].title}</h2>
          <Link
            to={albums?.data[2].link || '#'}
            className='text-sm text-gray-300 hover:text-white flex items-center w-20 h-10 gap-3'
          >
            See All
            <Icon name='arrow-right' />
          </Link>
        </div>

        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  justify-between gap-4 '>
          {(!albums?.data[2].items || albums.data[2].items.length === 0) && !loading ? (
            <div className='text-center py-8 text-gray-500'>Top 100 Not Found</div>
          ) : (
            albums?.data[2].items?.map((top100: Album) => (
              <div
                className='relative flex flex-col group bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 hover:shadow-xl'
                onMouseEnter={() => setHoveredTop100(top100.encodeId)}
                onMouseLeave={() => setHoveredTop100(null)}
              >
                <Link to={`/album/${top100.encodeId}`} className='block p-4'>
                  <div className='relative aspect-square mb-4'>
                    <img
                      src={top100.thumbnailM}
                      alt={top100.title}
                      className='h-full w-full object-cover rounded-md transition-all duration-300 group-hover:shadow-lg'
                    />

                    <div
                      className={`absolute bottom-3 right-3 bg-green-500 rounded-full p-3 shadow-lg transform transition-all duration-300 ${
                        hoveredTop100 === top100.encodeId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <div className='w-8 h-8'>
                        <Icon name='play' className='text-white text-xl ' />
                      </div>
                    </div>
                  </div>

                  <h3 className='font-medium truncate'>{top100.sortDescription}</h3>
                  <p className='text-sm text-gray-400 truncate mt-1'>{top100.artists?.[0]?.name}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <section className='mt-20 px-6 text-white'>
        <div className='flex justify-between items-center mb-4 text-white'>
          <h2 className='text-2xl font-bold'>{albums?.data[3].title}</h2>
          <Link
            to={albums?.data[3].link || '#'}
            className='text-sm text-gray-300 hover:text-white flex items-center w-20 h-10 gap-3'
          >
            See All
            <Icon name='arrow-right' />
          </Link>
        </div>

        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  justify-between gap-4 '>
          {(!albums?.data[3].items || albums.data[3].items.length === 0) && !loading ? (
            <div className='text-center py-8 text-gray-500'>Top 100 Not Found</div>
          ) : (
            albums?.data[3].items?.map((top100: Album) => (
              <div
                className='relative flex flex-col group bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 hover:shadow-xl'
                onMouseEnter={() => setHoveredTop100(top100.encodeId)}
                onMouseLeave={() => setHoveredTop100(null)}
              >
                <Link to={`/album/${top100.encodeId}`} className='block p-4'>
                  <div className='relative aspect-square mb-4'>
                    <img
                      src={top100.thumbnailM}
                      alt={top100.title}
                      className='h-full w-full object-cover rounded-md transition-all duration-300 group-hover:shadow-lg'
                    />

                    <div
                      className={`absolute bottom-3 right-3 bg-green-500 rounded-full p-3 shadow-lg transform transition-all duration-300 ${
                        hoveredTop100 === top100.encodeId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <div className='w-8 h-8'>
                        <Icon name='play' className='text-white text-xl ' />
                      </div>
                    </div>
                  </div>

                  <h3 className='font-medium truncate'>{top100.sortDescription}</h3>
                  <p className='text-sm text-gray-400 truncate mt-1'>{top100.artists?.[0]?.name}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
