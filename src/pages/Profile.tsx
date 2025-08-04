import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Icon from '../component/Icon'

export default function Profile() {
  const { user_id } = useParams<{ user_id: string }>()
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [profileUser, setProfileUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    bio: ''
  })

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (user_id) {
          // Load profile của user khác
          const userList = JSON.parse(localStorage.getItem('userList') || '[]')
          const foundUser = userList.find((u: any) => u.id === user_id)
          if (foundUser) {
            setProfileUser(foundUser)
            setEditForm({
              name: foundUser.name || '',
              bio: foundUser.bio || ''
            })
          }
        } else {
          // Load profile của user hiện tại
          if (isAuthenticated && user) {
            setProfileUser(user)
            setEditForm({
              name: user.name || '',
              bio: user.bio || ''
            })
          }
        }
      } catch (error) {
        // console.error('Error loading profile:', error)
      } finally {
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
        bio: editForm.bio
      }

      // Cập nhật trong userList
      const userList = JSON.parse(localStorage.getItem('userList') || '[]')
      const updatedUserList = userList.map((u: any) => (u.id === user.id ? updatedUser : u))
      localStorage.setItem('userList', JSON.stringify(updatedUserList))

      // Cập nhật current user
      localStorage.setItem('user', JSON.stringify(updatedUser))

      setProfileUser(updatedUser)
      setIsEditing(false)
    } catch (error) {
      //   console.error('Error updating profile:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!profileUser) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-900 text-white'>
        <div className='text-center'>
          <Icon name='user' className='w-16 h-16 mx-auto mb-4 text-gray-500' />
          <h2 className='text-xl font-semibold mb-2'>Không tìm thấy người dùng</h2>
          <Link to='/' className='text-blue-400 hover:text-blue-300'>
            Quay về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  const isOwnProfile = !user_id || (user && user.id === profileUser.id)

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white'>
      <div className='max-w-4xl mx-auto px-6 py-8'>
        {/* Header */}
        <div className='relative mb-8'>
          {/* Cover Image */}
          <div className='h-64 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg overflow-hidden'>
            <div className='w-full h-full bg-black/20'></div>
          </div>

          {/* Profile Info */}
          <div className='absolute -bottom-16 left-8 flex items-end gap-6'>
            <div className='relative'>
              <img
                src={
                  profileUser.avatar ||
                  'https://ui-avatars.com/api/?name=' +
                    encodeURIComponent(profileUser.name) +
                    '&background=3b82f6&color=fff'
                }
                alt={profileUser.name}
                className='w-32 h-32 rounded-full border-4 border-gray-900 shadow-lg object-cover'
              />
              {isOwnProfile && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className='absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-colors w-5 h-5'
                >
                  <Icon name='edit' className='w-4 h-4' />
                </button>
              )}
            </div>

            <div className='pb-4'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-sm text-gray-400 uppercase tracking-wider'>Profile</span>
                {profileUser.loginType === 'google' && (
                  <span className='w-5 h-5'>
                    <Icon name='google' className='w-4 h-4 text-blue-400' />
                  </span>
                )}
              </div>
              <h1 className='text-4xl font-bold mb-2'>{profileUser.name}</h1>
              <p className='text-gray-300'>{profileUser.email}</p>
              {profileUser.bio && <p className='text-gray-400 mt-2 max-w-md'>{profileUser.bio}</p>}
            </div>
          </div>

          {/* Actions */}
          {isOwnProfile && (
            <div className='absolute top-4 right-4 flex gap-2'>
              <button
                onClick={() => setIsEditing(true)}
                className='bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors'
              >
                Chỉnh sửa profile
              </button>
              <button
                onClick={handleLogout}
                className='bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-colors'
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>

        {/* Edit Form Modal */}
        {isEditing && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
            <div className='bg-gray-800 rounded-lg p-6 w-full max-w-md'>
              <h2 className='text-xl font-bold mb-4'>Chỉnh sửa profile</h2>
              <form onSubmit={handleEditSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-2'>Tên hiển thị</label>
                  <input
                    type='text'
                    value={editForm.name}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                    className='w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>Tiểu sử</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, bio: e.target.value }))}
                    className='w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none'
                    rows={3}
                    placeholder='Viết vài dòng về bản thân...'
                  />
                </div>
                <div className='flex gap-3 pt-4'>
                  <button
                    type='submit'
                    className='flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition-colors'
                  >
                    Lưu thay đổi
                  </button>
                  <button
                    type='button'
                    onClick={() => setIsEditing(false)}
                    className='flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md font-medium transition-colors'
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className='space-y-6 mt-20'>
          <h2 className='text-2xl font-bold'>Hoạt động gần đây</h2>

          <div className='bg-gray-800/30 rounded-lg p-6'>
            <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
              <span className='w-5 h-5'>
                <Icon name='heart' className='w-5 h-5 text-red-400' />
              </span>
              Bài hát yêu thích
            </h3>
            <div className='text-gray-400 text-center py-8'>
              <p className='w-5 h-5'>
                <Icon name='music' className='w-12 h-12 mx-auto mb-3 text-gray-600' />
              </p>
              <p>Chưa có bài hát yêu thích nào</p>
              <Link to='/' className='text-blue-400 hover:text-blue-300 mt-2 inline-block'>
                Khám phá nhạc mới
              </Link>
            </div>
          </div>

          <div className='bg-gray-800/30 rounded-lg p-6'>
            <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
              <span className='w-5 h-5'>
                <Icon name='list' className='w-5 h-5 text-green-400' />
              </span>
              Playlist đã tạo
            </h3>
            <div className='text-gray-400 text-center py-8'>
              <span className='w-5 h-5'>
                <Icon name='plus' className='w-12 h-12 mx-auto mb-3 text-gray-600' />
              </span>
              <p>Chưa có playlist nào</p>
              <button className='text-blue-400 hover:text-blue-300 mt-2 inline-block'>Tạo playlist đầu tiên</button>
            </div>
          </div>

          <div className='bg-gray-800/30 rounded-lg p-6'>
            <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
              <span className='w-5 h-5'>
                <Icon name='clock' className='w-5 h-5 text-blue-400' />
              </span>
              Nghe gần đây
            </h3>
            <div className='text-gray-400 text-center py-8'>
              <span className='w-5 h-5'>
                <Icon name='headphones' className='w-12 h-12 mx-auto mb-3 text-gray-600' />
              </span>
              <p>Chưa có lịch sử nghe nhạc</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
