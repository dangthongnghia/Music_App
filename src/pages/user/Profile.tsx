import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Icon from '../../components/common/Icon_1'
import { Button } from '../../components/ui/Button'
import { Loading } from '../../components/ui/Loading'
import type { UserProfile } from '../../types/user'
export default function Profile() {
  const { user_id } = useParams<{ user_id: string }>()
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [profileUser, setProfileUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    phone: '',
    favoriteGenres: [] as string[]
  })

  const convertUserToProfile = (userData: any): UserProfile => {
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      bio: userData.bio || undefined,
      loginType: userData.loginType,
      createdAt: userData.createdAt,
      phone: userData.phone || undefined,
      favoriteGenres: userData.favoriteGenres || [],
      totalListeningTime: userData.totalListeningTime || 0
    }
  }

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        if (user_id) {
          // Load profile của user khác
          const userList = JSON.parse(localStorage.getItem('userList') || '[]')
          const foundUser = userList.find((u: any) => u.id === user_id)
          if (foundUser) {
            const profileData = convertUserToProfile(foundUser)
            setProfileUser(profileData)
            setEditForm({
              name: foundUser.name || '',
              bio: foundUser.bio || '',
              phone: foundUser.phone || '',
              favoriteGenres: foundUser.favoriteGenres || []
            })
          }
        } else {
          // Load profile của user hiện tại
          if (isAuthenticated && user) {
            const profileData = convertUserToProfile(user)
            setProfileUser(profileData)
            setEditForm({
              name: user.name || '',
              bio: user.bio || '',
              phone: user.phone || '',
              favoriteGenres: (user as any).favoriteGenres || []
            })
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user_id, user, isAuthenticated])

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!user) return

      const updatedUser = {
        ...user,
        name: editForm.name,
        bio: editForm.bio,
        favoriteGenres: editForm.favoriteGenres,
        phone: editForm.phone || undefined
      }

      // Cập nhật trong userList
      const userList = JSON.parse(localStorage.getItem('userList') || '[]')
      const updatedUserList = userList.map((u: any) => (u.id === user.id ? updatedUser : u))
      localStorage.setItem('userList', JSON.stringify(updatedUserList))

      // Cập nhật current user
      localStorage.setItem('user', JSON.stringify(updatedUser))

      const profileData = convertUserToProfile(updatedUser)
      setProfileUser(profileData)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const formatJoinDate = (dateString?: string): string => {
    if (!dateString) return 'Không có thông tin'
    try {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long'
      })
    } catch {
      return 'Không có thông tin'
    }
  }

  const formatListeningTime = (minutes?: number): string => {
    if (!minutes) return '0 phút'
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return hours > 0 ? `${hours} giờ ${remainingMinutes} phút` : `${remainingMinutes} phút`
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black'>
        <Loading size='lg' text='Đang tải profile...' />
      </div>
    )
  }

  if (!profileUser) {
    return (
      <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white'>
        <div className='text-center'>
          <Icon name='user' size={64} className='mx-auto mb-4 text-gray-600' />
          <h2 className='text-xl font-semibold mb-2'>Không tìm thấy người dùng</h2>
          <Link to='/' className='text-green-400 hover:text-green-300 transition-colors'>
            Quay về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  const isOwnProfile = !user_id || (user && user.id === profileUser.id)

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900'>
      {/* Header Section */}
      <div className='relative overflow-hidden'>
        {/* Background */}
        <div className='absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 opacity-80' />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/60' />

        <div className='relative z-10 container mx-auto px-4 py-12'>
          <div className='flex flex-col lg:flex-row items-center lg:items-end gap-8'>
            {/* Avatar */}
            <div className='flex-shrink-0 relative group'>
              <img
                src={
                  profileUser.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(profileUser.name)}&background=3b82f6&color=fff&size=300`
                }
                alt={profileUser.name}
                className='w-48 h-48 rounded-full border-4 border-white/20 shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105'
              />
              {isOwnProfile && (
                <Button
                  variant='secondary'
                  size='sm'
                  onClick={() => setIsEditing(true)}
                  className='absolute bottom-4 right-4 rounded-full shadow-xl'
                >
                  <Icon name='settings' size={16} />
                </Button>
              )}
            </div>

            {/* User Info */}
            <div className='flex-1 text-center lg:text-left space-y-4'>
              <div>
                <div className='flex items-center justify-center lg:justify-start gap-2 mb-2'>
                  <span className='text-green-400 font-medium text-sm uppercase tracking-wide'>Profile</span>
                  {profileUser.loginType === 'google' && <Icon name='verified' size={20} className='text-blue-400' />}
                </div>
                <h1 className='text-white text-4xl lg:text-6xl font-bold leading-tight mb-2'>{profileUser.name}</h1>
                <p className='text-gray-300 text-lg'>{profileUser.email}</p>
              </div>

              {profileUser.bio && (
                <p className='text-gray-400 text-lg max-w-2xl leading-relaxed italic font-bold'>{profileUser.bio}</p>
              )}

              {/* Stats */}
              <div className='flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-300'>
                <div className='text-center'>
                  <p className='text-white font-semibold'>Tham gia</p>
                  <p>{formatJoinDate(profileUser.createdAt)}</p>
                </div>
                <div className='w-px h-8 bg-gray-600' />
                <div className='text-center'>
                  <p className='text-white font-semibold'>Thời gian nghe</p>
                  <p>{formatListeningTime(profileUser.totalListeningTime)}</p>
                </div>
              </div>

              {/* Favorite Genres */}
              {profileUser.favoriteGenres && profileUser.favoriteGenres.length > 0 && (
                <div className='flex flex-wrap gap-2 justify-center lg:justify-start'>
                  {profileUser.favoriteGenres.map((genre, index) => (
                    <span
                      key={index}
                      className='bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm'
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {isOwnProfile && (
                <div className='flex items-center justify-center lg:justify-start gap-4 pt-4'>
                  <Button variant='default' size='lg' onClick={() => setIsEditing(true)}>
                    <Icon name='settings' size={20} />
                    Chỉnh sửa profile
                  </Button>

                  <Button
                    variant='destructive'
                    size='lg'
                    onClick={handleLogout}
                    className='text-red-300 hover:text-red-100 hover:bg-red-500'
                  >
                    <Icon name='back' size={20} />
                    Đăng xuất
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {/* Recently Played */}
          <div className='bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm'>
            <div className='flex items-center gap-3 mb-6'>
              <Icon name='time' size={24} className='text-blue-400' />
              <h3 className='text-xl font-bold text-white'>Nghe gần đây</h3>
            </div>
            <div className='text-center py-8'>
              <Icon name='music' size={48} className='mx-auto mb-4 text-gray-600' />
              <p className='text-gray-400 mb-3'>Chưa có lịch sử nghe nhạc</p>
              <Link to='/' className='text-green-400 hover:text-green-300 transition-colors font-medium'>
                Khám phá nhạc mới
              </Link>
            </div>
          </div>

          {/* Favorite Songs */}
          <div className='bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm'>
            <div className='flex items-center gap-3 mb-6'>
              <Icon name='heart-filled' size={24} className='text-red-400' />
              <h3 className='text-xl font-bold text-white'>Bài hát yêu thích</h3>
            </div>
            <div className='text-center py-8'>
              <Icon name='heart' size={48} className='mx-auto mb-4 text-gray-600' />
              <p className='text-gray-400 mb-3'>Chưa có bài hát yêu thích nào</p>
              <Link to='/' className='text-green-400 hover:text-green-300 transition-colors font-medium'>
                Tìm nhạc yêu thích
              </Link>
            </div>
          </div>

          {/* Playlists */}
          <div className='bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm lg:col-span-2 xl:col-span-1'>
            <div className='flex items-center gap-3 mb-6'>
              <Icon name='playlist' size={24} className='text-green-400' />
              <h3 className='text-xl font-bold text-white'>Playlist</h3>
            </div>
            <div className='text-center py-8'>
              <Icon name='playlist' size={48} className='mx-auto mb-4 text-gray-600' />
              <p className='text-gray-400 mb-3'>Chưa có playlist nào</p>
              <Button variant='ghost' size='sm' className='text-green-400 hover:text-green-300'>
                <Icon name='music' size={16} />
                Tạo playlist đầu tiên
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-2xl'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-bold text-white'>Chỉnh sửa profile</h2>
              <Button variant='ghost' size='sm' onClick={() => setIsEditing(false)}>
                <Icon name='close' size={16} />
              </Button>
            </div>

            <form onSubmit={handleEditSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-2 text-gray-300'>Tên hiển thị</label>
                <input
                  type='text'
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  className='w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-green-500 focus:outline-none transition-colors'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-2 text-gray-300'>Số điện thoại</label>
                <input
                  value={editForm.phone}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className='w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-green-500 focus:outline-none transition-colors'
                  placeholder='nhập số điện thoại...'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-2 text-gray-300'>Tiểu sử</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, bio: e.target.value }))}
                  className='w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-green-500 focus:outline-none transition-colors resize-none'
                  rows={3}
                  placeholder='Viết vài dòng về bản thân...'
                />
              </div>

              <div className='flex gap-3 pt-4'>
                <Button type='submit' variant='destructive' size='lg' className='flex-1'>
                  <Icon name='check' size={16} />
                  Lưu thay đổi
                </Button>
                <Button
                  type='button'
                  variant='secondary'
                  size='lg'
                  onClick={() => setIsEditing(false)}
                  className='flex-1'
                >
                  Hủy
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
