import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { apisearch } from '../services/spotifyService'
import Icon from '../component/Icon'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import type { SearchResponse } from '../types/spotify'

export const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const [searchResults, setSearchResults] = useState<SearchResponse | any>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const keyword = searchParams.get('keyword')
  // const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hoverPlaylist, setHoveredPlaylist] = useState<string | null>(null)

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!keyword || keyword.trim() === '') {
        setSearchResults(null)
        return
      }

      try {
        setLoading(true)

        const results = await apisearch(keyword)
        console.log(results)
        setSearchResults(results)
      } catch (err) {
        // console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadSearchResults()
  }, [keyword])

  const formatFollowers = (count: number) => {
    if (!count) return '0'
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }
  const linkTopresult = (encodeId: string, alias: string, objectType: string) => {
    if (objectType === 'playlist') {
      return `/playlist/${encodeId}`
    } else if (objectType === 'artist') {
      return `/artist?name=${alias}`
    } else if (objectType === 'song') {
      return `/infosong?id=${encodeId}`
    } else if (objectType === 'video') {
      return `/video/${encodeId}`
    } else if (objectType === 'album') {
      return `/album/${encodeId}`
    }
    // Fallback nếu không có objectType phù hợp
    return '/'
  }
  return (
    <div className='text-white mt-10 lg:p-6 '>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 mb-4 text-gray-300 hover:text-white transition-colors'
      >
        <Icon name='arrow-left' />
        Back
      </button>
      {keyword && (
        <div className='mx-5'>
          <div className='md:flex md:justify-between items-center '>
            {/* Top results */}
            <div className='w-full md:w-70 lg:w-[50%]'>
              <h1 className='text-xl md:text-2xl lg:text-3xl font-medium'>Kết quả hàng đầu</h1>
              <div
                key={searchResults?.data.top.encodeId || ''}
                className='hover:bg-opacity-80 p-5  bg-gray-700/30 hover:bg-gray-800 mr-10 my-5 rounded-lg cursor-pointer transition-all duration-300 group relative w-full'
              >
                <Link
                  to={linkTopresult(
                    searchResults?.data.top.encodeId || '',
                    searchResults?.data.top.alias || '',
                    searchResults?.data.top.objectType || ''
                  ) || ''}
                >
                  <div className='mx-5 flex gap-10 items-center w-full'>
                    <img
                      src={searchResults?.data.top.thumbnail}
                      alt=''
                      className='w-20 md:w-20 lg:w-25 rounded-xl md:rounded-full mb-4  shadow-gray-900 shadow-xl'
                    />
                    <div className=''>
                      <h1 className='text-xs md:text-sm'>{searchResults?.data.top.artistsNames || 'Nghệ sĩ'}</h1>
                      <h1 className='text-2xl md:text-3xl lg:text-4xl font-medium line-clamp-1'>
                        {searchResults?.data.top.title || searchResults?.data.top.name}
                      </h1>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            {/* Song results */}
            <div className=' md:ml-20 md:w-60 lg:w-full'>
              <h1 className='text-xl md:text-2xl lg:text-3xl font-medium'>Top Song </h1>
              <div className='hover:bg-opacity-80 mr-10 my-5 rounded-lg cursor-pointer transition-all duration-300 group relative w-100'>
                {searchResults?.data.songs.slice(0, 4).map((songs: any) => {
                  return (
                    <div className=' flex w-100 justify-between ' key={songs.encodeId}>
                      <Link to={`/infosong?id=${songs.encodeId}`}>
                        <div className='flex justify-between items-center'>
                          <img
                            src={songs.thumbnailM}
                            alt=''
                            className='w-20 h-20 lg:w-10 lg:h-10 mr-5 rounded-lg mb-4 shadow-gray-900 shadow-xl'
                          />
                          <div className=''>
                            <h1 className='font-medium lg:text-xl'>{songs.title}</h1>
                            <h1 className='text-gray-500'>{songs.artistsNames}</h1>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {/* Artist */}
          <div>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-medium'>Nghệ sĩ liên quan</h1>
            <div className='w-full lg:m-4 '>
              <div className='lg:flex gap-6 '>
                {/* Chuyển thành slider */}
                {searchResults?.data.artists.slice(0, 5).map((artits: any) => (
                  <Link to={`/artist?name=${artits.alias}`} className='w-full' key={artits.id}>
                    <div className=' lg:justify-center items-center flex lg:flex-col gap-5 my-5 ' key={artits.id}>
                      <img src={artits.thumbnailM} alt='' className='w-20 h-20 lg:w-50 lg:h-50 rounded-full ' />
                      <h1>{artits.name}</h1>
                      <p className='hidden lg:block'>{formatFollowers(artits.totalFollow)} Quan tâm</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* MV */}
          <div className='w-full hidden lg:block'>
            <h1 className='text-3xl font-medium'>MV</h1>
            <div className='w-full mt-5 flex gap-10 justify-between'>
              {searchResults?.data.videos.slice(0, 3).map((video: any) => (
                <div key={video.encodeId}>
                  <Link to={`/video?id=${video.encodeId}`}>
                    <div className='w-full'>
                      <img src={video.thumbnailM} alt='' className='w-[95%]' />
                    </div>
                    <div className='flex mt-3'>
                      <img src={video.artist.thumbnail} alt='' className='w-10 h-10 rounded-full mr-3' />
                      <div>
                        <h1 className=' text-mb font-black'>{video.title}</h1>
                        <h1 className='text-sm text-gray-500'>{video.artistsNames}</h1>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Playlist */}
          <div className='mt-10 '>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-medium mb-5'>Playlist</h1>
            <div className='w-full mt-5 hidden lg:flex'>
              <Swiper
                spaceBetween={20}
                slidesPerView={6}
                // navigation
                loop={searchResults?.data?.playlists.length > 7}
                modules={[Pagination]}
                className='podcasts-swiper'
                breakpoints={{
                  320: { slidesPerView: 3, spaceBetween: 8 },
                  640: { slidesPerView: 4, spaceBetween: 10 },
                  768: { slidesPerView: 4, spaceBetween: 10 },
                  1024: { slidesPerView: 6, spaceBetween: 10 }
                }}
              >
                {searchResults?.data?.playlists.length === 0 && !loading ? (
                  <div className='text-center py-8 text-gray-500'>Playlist Not Found</div>
                ) : (
                  searchResults?.data?.playlists.slice(0, 6).map((playlist: any) => (
                    <SwiperSlide key={playlist.encodeId} className='pb-6'>
                      <div
                        className='relative group  rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 hover:shadow-xl'
                        onMouseEnter={() => setHoveredPlaylist(playlist.encodeId)}
                        onMouseLeave={() => null}
                      >
                        <Link to={`/playlist/${playlist.encodeId}`} className='block p-4'>
                          <div className='relative aspect-square mb-4'>
                            <img
                              src={playlist.thumbnailM}
                              alt={playlist.name}
                              className='h-full w-full object-cover rounded-md transition-all duration-300 group-hover:shadow-lg'
                            />

                            {/* Play Button Overlay */}
                            <div
                              className={`absolute bottom-3 right-3 bg-green-500 rounded-full p-3 shadow-lg transform transition-all duration-300 ${
                                hoverPlaylist === playlist.encodeId
                                  ? 'opacity-100 translate-y-0'
                                  : 'opacity-0 translate-y-4'
                              }`}
                            >
                              <div className='w-8 h-8'>
                                <Icon name='play' className='text-black text-xl ' />
                              </div>
                            </div>
                          </div>

                          <h3 className='font-medium truncate hidden md:block'>{playlist.sortDescription}</h3>
                          <p className='text-sm text-gray-400 truncate mt-1'>{playlist.artist}</p>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </div>
            {/* Play list mobile */}
            <div className='max-md:block hidden'>
              {searchResults?.data?.playlists.length === 0 && !loading ? (
                <div className='text-center py-8 text-gray-500'>Playlist Not Found</div>
              ) : (
                searchResults?.data?.playlists.slice(0, 6).map((playlist: any) => (
                  <div
                    className=' flex group relative  rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 hover:shadow-xl'
                    key={playlist.encodeId}
                  >
                    <Link to={`/playlist/${playlist.encodeId}`} className=' flex gap-4 items-center'>
                      <div className=' mb-4'>
                        <img
                          src={playlist.thumbnailM}
                          alt={playlist.name}
                          className='h-20 w-20 object-cover rounded-md transition-all duration-300 group-hover:shadow-lg'
                        />
                      </div>

                      <h3 className='font-medium w-60 line-clamp-1 relative  md:block'>{playlist.sortDescription}</h3>
                      <p className='text-sm text-gray-400 truncate mt-1'>{playlist.artist}</p>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
