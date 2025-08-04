// import { useParams } from 'react-router-dom'
// import { albumsData } from '../Data/songs'

// const AlbumsPlaylist = () => {
//   const { id } = useParams()
//   const albumId = parseInt(id || '1')

//   // Find the album by ID
//   const album = albumsData.find((album) => album.id === albumId)

//   if (!album) {
//     return <div>Album not found</div>
//   }

//   return (
//     <div className='p-4'>
//       <div className='flex items-center mb-6'>
//         <img src={album.image} alt={album.name} className='w-48 h-48 object-cover rounded-lg shadow-lg mr-6' />
//         <div>
//           <h1 className='text-3xl font-bold'>{album.name}</h1>
//           <p className='text-gray-600'>{album.listsongs?.length || 0} songs</p>
//         </div>
//       </div>

//       <div className='mt-6'>
//         <h2 className='text-xl font-semibold mb-4'>Songs</h2>

//         {album.listsongs ? (
//           <div className='space-y-2'>
//             {album.listsongs.map((song, index) => (
//               <div key={index} className='flex items-center p-2 hover:bg-gray-100 rounded'>
//                 <div className='mr-4 text-gray-500'>{index + 1}</div>
//                 <img src={song.coverUrl} alt={song.name} className='w-12 h-12 object-cover rounded mr-4' />
//                 <div className='flex-grow'>
//                   <div className='font-medium'>{song.name}</div>
//                   <div className='text-sm text-gray-500'>{song.artist}</div>
//                 </div>
//                 <audio controls src={song.audioUrl} className='h-8'></audio>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No songs available in this album</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AlbumsPlaylist
