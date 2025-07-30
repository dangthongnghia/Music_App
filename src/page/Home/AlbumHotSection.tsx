import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchHome_MP3 } from '../../services/spotifyService'
import { usePlayer } from '../../contexts/PlayerContext'
import type { ZingMP3HomeResponse } from '../../types/spotify'
import Icon from '../../component/Icon'
export function AlbumHotSection() {
  const [homeData, setHomeData] = useState<ZingMP3HomeResponse | null>(null)
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
  const getPlaylistSection = () => {
    return homeData?.data?.items?.find((item) => item.sectionType === 'playlist' && !item.title?.includes('Top 100'))
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
          <h2 className='text-4xl font-black bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 bg-clip-text text-transparent mb-2'>
            {getPlaylistSection()?.title || 'Playlist nổi bật'}
          </h2>
          <p className='text-gray-400'>Khám phá những playlist được tuyển chọn</p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {Array.isArray(getPlaylistSection()?.items) &&
          getPlaylistSection()
            ?.items?.slice(0, 6)
            .map((playlist: any) => (
              <Link
                key={playlist.encodeId}
                to={`/playlist/${playlist.encodeId}`}
                className='group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-6 hover:from-green-500/20 hover:to-blue-500/20 transition-all duration-500 border border-white/10 hover:border-green-400/50'
              >
                <div className='flex items-center gap-6'>
                  <div className='relative'>
                    <img
                      src={playlist.thumbnail || playlist.thumbnailM}
                      alt={playlist.title}
                      className='w-20 h-20 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500'
                    />
                    <div className='absolute inset-0 bg-gradient-to-br from-green-500/0 group-hover:from-green-500/30 to-transparent rounded-2xl transition-all duration-500' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <h3 className='font-bold text-white text-lg line-clamp-2 group-hover:text-green-300 transition-colors mb-2'>
                      {playlist.title}
                    </h3>
                    <p className='text-sm text-gray-400 line-clamp-1 mb-1'>
                      {playlist.sortDescription || 'Playlist tuyển chọn'}
                    </p>
                    <p className='text-xs text-gray-500'>{Math.floor(Math.random() * 500) + 50} bài hát</p>
                  </div>

                  <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div
                      className='bg-green-500 text-black p-3 rounded-full hover:bg-green-400 transition-colors w-15 h-15'
                      onClick={() => handlePlaySongById(playlist.encodeId, getNewReleaseSection()?.items)}
                    >
                      <Icon name='play' className='text-lg ml-0.5' />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}
