import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchHome_MP3 } from '../../services/spotifyService'
import { usePlayer } from '../../contexts/PlayerContext'
import type { ZingMP3HomeResponse } from '../../types/spotify'
import Icon from '../../component/Icon'
export function ChartSection() {
  const [homeData, setHomeData] = useState<ZingMP3HomeResponse | null>(null)
  const [hoveredItemChart, setHoveredItemChart] = useState<string | null>(null)
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
  const getNewReleaseChartSection = () => {
    return homeData?.data?.items?.find((item) => item.sectionType === 'newReleaseChart')
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
          <h2 className='text-4xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-clip-text text-transparent mb-2'>
            {getNewReleaseChartSection()?.title || 'BXH Nhạc Mới'}
          </h2>
          <p className='text-gray-400'>Những bài hát đang thịnh hành nhất</p>
        </div>
      </div>

      {/* Featured Chart Item */}
      {getNewReleaseChartSection()?.items?.[0] && (
        <div className='bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-orange-400/30'>
          <div className='flex items-center gap-8'>
            <div className='relative group'>
              <img
                src={getNewReleaseChartSection()?.items?.[0]?.thumbnailM || '/img/default-music.jpg'}
                alt={getNewReleaseChartSection()?.items?.[0]?.title || 'Song'}
                className='w-20 h-20 md:h-24 md:w-24 object-cover rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300 '
              />

              <div className='absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-transparent transition-all duration-300' />
            </div>

            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-2'>
                <span className='bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs md:text-sm font-bold'>
                  #1 TRENDING
                </span>
                <div className='flex items-center gap-1 text-orange-400'>
                  <Icon name='fire' className='text-lg' />
                  <span className='text-xs md:text-sm font-medium'>HOT</span>
                </div>
              </div>
              <Link
                to={`/infosong?id=${getNewReleaseChartSection()?.items?.[0]?.encodeId}`}
                className='block mb-1 hover:underline'
              >
                <h3 className='text-xl md:text-2xl font-bold text-white mb-1'>
                  {getNewReleaseChartSection()?.items?.[0]?.title || 'Untitled Song'}
                </h3>
              </Link>
              <div className='text-xs sm:text-sm text-gray-400 line-clamp-1'>
                {Array.isArray(getNewReleaseChartSection()?.items?.[0]?.artists)
                  ? getNewReleaseChartSection()?.items?.[0]?.artists?.map((artist: any, i: number) => (
                      <span key={i} className='inline'>
                        {i > 0 && ', '}
                        <Link to={`/artist?name=${artist.alias}`} className='hover:underline'>
                          {artist.name}
                        </Link>
                      </span>
                    ))
                  : getNewReleaseChartSection()?.items?.[0]?.artists || 'Unknown Artist'}
              </div>
            </div>

            <button
              onClick={() => handlePlaySongById(getNewReleaseChartSection()?.items?.[0]?.encodeId)}
              className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white p-4 rounded-full hover:scale-110 transition-all duration-300 shadow-xl w-15 h-15 hidden md:block'
            >
              <Icon name='play' className='text-xl ml-0.5' />
            </button>
          </div>
        </div>
      )}

      {/* Chart List */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {Array.isArray(getNewReleaseChartSection()?.items) &&
          getNewReleaseChartSection()
            ?.items?.slice(1, 11)
            .map((song: any, index: number) => (
              <div
                key={song.encodeId}
                className='group bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 cursor-pointer border border-white/10 hover:border-orange-400/50'
                onMouseEnter={() => setHoveredItemChart(song.encodeId)}
                onMouseLeave={() => setHoveredItemChart(null)}
              >
                <div className='flex items-center gap-4'>
                  {/* Ranking */}
                  <div className='flex-shrink-0 w-8 text-center'>
                    <span className={`text-2xl font-black ${index + 2 <= 3 ? 'text-orange-400' : 'text-gray-400'}`}>
                      {index + 2}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <img
                    src={song.thumbnail || song.thumbnailM}
                    alt={song.title}
                    className='w-16 h-16 object-cover rounded-xl shadow-lg'
                  />
                  {/* Play Button */}
                  <div
                    className={`absolute left-18 flex items-center justify-center transition-all duration-300 ${
                      hoveredItemChart === song.encodeId ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <button
                      className='   hover:scale-110 transition-all duration-300  w-10 h-10'
                      onClick={() => handlePlaySongById(song.encodeId, getNewReleaseChartSection()?.items)}
                    >
                      <Icon name='play' className='text-lg ml-0.5' />
                    </button>
                  </div>

                  {/* Song Info */}
                  <div className='flex-1 min-w-0'>
                    <Link to={`/infosong?id=${song.encodeId}`} className='block mb-1 hover:underline'>
                      <h4 className='font-bold text-white line-clamp-1 group-hover:text-orange-300 transition-colors'>
                        {song.title}
                      </h4>
                    </Link>
                    <div className='text-xs sm:text-sm text-gray-400 line-clamp-1'>
                      {Array.isArray(song.artists)
                        ? song.artists.map((artist: any, i: number) => (
                            <span key={i} className='inline'>
                              {i > 0 && ', '}
                              <Link to={`/artist?name=${artist.alias}`} className='hover:underline'>
                                {artist.name}
                              </Link>
                            </span>
                          ))
                        : song.artists}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
