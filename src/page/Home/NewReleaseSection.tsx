import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchHome_MP3 } from '../../services/spotifyService'
import { usePlayer } from '../../contexts/PlayerContext'
import type { ZingMP3HomeResponse } from '../../types/spotify'
import Icon from '../../component/Icon'
export function NewReleaseSection() {
  const [homeData, setHomeData] = useState<ZingMP3HomeResponse | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { playTrackById, setPlaylist } = usePlayer()
  useEffect(() => {
    const loadHome = async () => {
      try {
        const homepage = await fetchHome_MP3()

        setHomeData(homepage)
        // setDataLoaded(true)
      } catch (error) {
        // setDataLoaded(true)
      }
    }
    loadHome()
  }, [])
  const getNewReleaseSection = () => {
    return homeData?.data?.items?.find((item) => item.sectionType === 'new-release')
  }

  const handlePlaySongById = async (encodeId: string, playlistData?: any[]) => {
    try {
      if (playlistData) {
        setPlaylist(playlistData)
      }
      await playTrackById(encodeId)
    } catch (error) {}
  }
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent mb-2'>
            {getNewReleaseSection()?.title || 'Mới phát hành'}
          </h2>
          <p className='text-gray-400'>Những bài hát mới nhất và hot nhất</p>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center'>
        {Array.isArray(getNewReleaseSection()?.items.all) &&
          getNewReleaseSection()
            ?.items?.all.slice(0, 12)
            .map((song: any, index: number) => {
              return (
                <div
                  key={song.encodeId}
                  className='group items-center justify-center max-md:flex max-md:gap-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-4 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-500 cursor-pointer border border-white/10 hover:border-purple-400/50'
                  onMouseEnter={() => setHoveredItem(song.encodeId)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className='relative mb-4'>
                    {/* Ranking Badge for Top 3 */}
                    {index < 3 && (
                      <div
                        className={`absolute -top-2 -left-2 w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                          index === 0
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black'
                            : index === 1
                              ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black'
                              : 'bg-gradient-to-br from-orange-400 to-red-500 text-white'
                        }`}
                      >
                        {index + 1}
                      </div>
                    )}

                    <img
                      src={song.thumbnailM}
                      alt={song.title}
                      className='w-15 md:w-full lg:w-full  lg:h-full  items-center aspect-square object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-500'
                    />

                    {/* Glow Effect */}
                    <div className='absolute inset-0 bg-gradient-to-t from-purple-500/0 group-hover:from-purple-500/30 to-transparent rounded-xl transition-all duration-500' />

                    {/* Play Button */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        hoveredItem === song.encodeId ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <button
                        className='bg-green-500/90 backdrop-blur-sm text-black p-3 rounded-full hover:bg-green-400 hover:scale-110 transition-all duration-300 shadow-xl w-15 h-15 hidden lg:block'
                        onClick={() => handlePlaySongById(song.encodeId, getNewReleaseSection()?.items)}
                      >
                        <Icon name='play' className='text-lg ml-0.5' />
                      </button>
                    </div>
                  </div>

                  <div className='space-y-2 w-[90%]'>
                    <div className=' items-center gap-2'>
                      <Link to={`/infosong?id=${song.encodeId}`} className='block mb-1 hover:underline'>
                        <h3 className='font-bold text-white line-clamp-1 group-hover:text-purple-300 transition-colors '>
                          {song.title}
                        </h3>
                      </Link>
                      <div className='text-xs sm:text-sm text-gray-400 line-clamp-1'>
                        {song.artists.map((artist: any, i: number) => (
                          <span key={i} className='inline'>
                            {i > 0 && ', '}
                            <Link to={`/artist?name=${artist.alias}`} className='hover:underline'>
                              {artist.name}
                            </Link>
                          </span>
                        ))}
                      </div>
                    </div>
                    {song.releaseDate && (
                      <p className='text-xs text-gray-500 hidden md:block'>
                        {new Date(song.releaseDate * 1000).toLocaleDateString('vi-VN')}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}
