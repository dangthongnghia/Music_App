// // import { songs, artistsData, albumsData } from '../Data/songs'
// import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'

// import { fetchAlbumsId } from '../services/spotifyRouteService'

// import type { Albums, Artists, ArtistAlbums } from '../types/spotify'
// import Icon from '../component/Icon'
// import { usePlayer } from '../contexts/PlayerContext'
// export default function Albums() {
//   const { id } = useParams<{ id: string }>()
//   const [albums, setAlbums] = useState<Albums | null>()
//   const [currentPlayingTrack, setCurrentPlayingTrack] = useState<string | null>(null)
//   const [artistAlbums, setArtistAlbums] = useState<Albums[]>([])
//   const [loading, setLoading] = useState<boolean>()
//   const [error, setError] = useState<string | null>()
//   const { playTrack, setPlaylist, currentTrack, isPlaying, togglePlayPause } = usePlayer()
//   const [isShown, setIsShown] = useState<string | null>(null)

//   useEffect(() => {
//     const loadAlbums = async () => {
//       if (!id) return

//       try {
//         setLoading(true)
//         const token = await getSpotifyToken()
//         const albumsData = await fetchAlbumsId(token, id)
//         if (albumsData?.artists && albumsData.artists.length > 0) {
//           const artistId = albumsData.artists[0].id
//           const artistAlbumsData = await fetchArtistAlbums(token, artistId)
//           setArtistAlbums(artistAlbumsData)
//         }
//         setAlbums(albumsData)

//         if (albumsData?.images?.[0]?.url) {
//           document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgb(18, 18, 18) 100%),
//                                             url(${albumsData.images[0].url})`
//           document.body.style.backgroundSize = 'cover'
//           document.body.style.backgroundPosition = 'center'
//           document.body.style.backgroundAttachment = 'fixed'
//         }
//       } catch (err) {
//         console.error('Error loading albums:', err)
//         setError('Failed to load albums details')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadAlbums()
//     return () => {
//       document.body.style.background = 'black'
//     }
//   }, [id])

//   const handlePlayTrack = (episodeId: string) => {
//     if (currentPlayingTrack === episodeId) {
//       setCurrentPlayingTrack(null)
//     } else {
//       setCurrentPlayingTrack(episodeId)
//     }
//   }

//   const formatDuration = (ms: number) => {
//     if (!ms || isNaN(ms)) return '0:00'

//     // Chuyển đổi từ ms sang giây
//     const totalSeconds = Math.floor(ms / 1000)

//     // Tính phút và giây
//     const minutes = Math.floor(totalSeconds / 60)
//     const seconds = totalSeconds % 60

//     // Nếu số giây nhỏ hơn 10, thêm số 0 vào trước
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`
//   }
//   return (
//     <div className='text-white w-full min-h-screen pb-24'>
//       <div className='pt-16 pb-8 px-8 flex flex-col md:flex-row items-start gap-8'>
//         <div className='shrink-0'>
//           {albums?.images && albums.images[0] && (
//             <img
//               src={albums.images[0].url}
//               alt=''
//               className='w-56 h-56 md:w-64 md:h-64 rounded-lg shadow-2xl object-cover'
//             />
//           )}
//         </div>
//         <div className='flex flex-col justify-end'>
//           <span className='uppercase text-sm font-bold mb-2'>Album</span>
//           <h1 className='text-4xl md:text-6xl font-bold mb-4 line-clamp-2'>{albums?.name}</h1>
//           <p className='text-xl md:text-2xl text-gray-300 mb-6'>{albums?.artists[0].name}</p>

//           <div className='flex items-center gap-4'>
//             <button
//               className='bg-green-500 hover:bg-green-400 text-black font-bold rounded-full flex items-center justify-center w-12 h-12 transition duration-300'
//               onClick={() =>
//                 albums?.tracks.items && albums.tracks.items.length > 0 && handlePlayTrack(albums.tracks.items[0].id)
//               }
//             >
//               {currentPlayingTrack === (albums?.tracks?.items?.[0]?.id || null) ? (
//                 <div className='w-8 h-8'>
//                   <Icon name='pause' className='text-black text-xl ' />
//                 </div>
//               ) : (
//                 <div className='w-8 h-8'>
//                   <Icon name='play' className='text-black text-xl ' />
//                 </div>
//               )}
//             </button>

//             <button className='text-gray-400 hover:text-white transition-colors'></button>
//           </div>
//         </div>
//       </div>

//       {/* List track */}
//       <div className='mt-8'>
//         <h1 className='text-3xl font-medium text-white mb-6'>Playlist</h1>
//         <div className='flex justify-between mx-8 border-b-1 pb-5'>
//           <div className='flex justify-between gap-10'>
//             <p>#</p>
//             <p>Title</p>
//           </div>
//           <p>Time</p>
//         </div>
//         <div className='  rounded-lg p-4'>
//           {albums?.tracks.items.map((tracks, index) => (
//             <li
//               key={tracks.id}
//               className='flex items-center justify-between px-4 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all duration-300'
//               // onClick={() => handlePlayPauseTrack(tracks, index)}
//             >
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   // handlePlayPauseTrack(tracks, index)
//                 }}
//               >
//                 {currentTrack?.encodeId === tracks.id && isPlaying ? (
//                   <div
//                     className='text-white group-hover:hidden mr-3'
//                     onMouseEnter={() => setIsShown(tracks.id)}
//                     onMouseLeave={() => setIsShown(null)}
//                   >
//                     {isShown === tracks.id ? (
//                       <p className='w-6'>
//                         <Icon name='pause' />
//                       </p>
//                     ) : (
//                       <div className='loading-wave w-full gap-[2px] h-5 flex justify-center items-end'>
//                         <div className='loading-bar w-[3px] h-1 m-0 bg-[#3498bd] rounded-[5px] '></div>
//                         <div className='loading-bar w-[3px] h-2 m-0 bg-[#3498bd] rounded-[5px] '></div>
//                         <div className='loading-bar w-[3px] h-2 m-0 bg-[#3498bd] rounded-[5px] '></div>
//                         <div className='loading-bar w-[3px] h-2 m-0 bg-[#3498bd] rounded-[5px] '></div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div
//                     className='text-white group-hover:hidden mr-3'
//                     onMouseEnter={() => setIsShown(tracks.id)}
//                     onMouseLeave={() => setIsShown(null)}
//                   >
//                     {isShown === tracks.id ? (
//                       <p className='w-6'>
//                         <Icon name='play' />
//                       </p>
//                     ) : (
//                       <p>{index + 1}</p>
//                     )}
//                   </div>
//                 )}
//               </button>
//               <div className='w-full flex justify-between items-center'>
//                 <div className='flex items-center w-[30%]'>
//                   <div className='pl-4'>
//                     <span className='line-clamp-1 text-white '>{tracks.name}</span>
//                     <p className='text-sm text-gray-300 '>{tracks.artists.map((artist) => artist.name).join(', ')}</p>
//                   </div>
//                 </div>

//                 <div className='w-[20%] text-right text-gray-300'>{formatDuration(tracks.duration_ms)}</div>
//               </div>
//             </li>
//           ))}
//         </div>
//       </div>

//       <div className='mx-8 mt-12 pb-12'>
//         <p className='text-2xl font-medium mb-6'>More by {albums?.artists[0].name}</p>

//         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
//           {artistAlbums.slice(0, 6).map((album) => {
//             return (
//               <div
//                 key={album.id}
//                 className='bg-gray-900/50 p-3 rounded-lg hover:bg-gray-800/70 transition-all duration-300 cursor-pointer'
//                 onClick={() => (window.location.href = `/albums/${album.id}`)}
//               >
//                 {album.images && album.images[0] && (
//                   <img
//                     src={album.images[0].url}
//                     alt={album.name}
//                     className='w-full aspect-square object-cover rounded-md shadow-lg mb-3'
//                   />
//                 )}
//                 <h3 className='font-medium text-sm line-clamp-1'>{album.name}</h3>
//                 <p className='text-xs text-gray-400 mt-1'>{album.release_date?.split('-')[0] || ''}</p>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }
