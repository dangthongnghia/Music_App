import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../../component/Icon'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

interface SignupForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface GoogleUser {
  email: string
  name: string
  picture: string
  sub: string
}

export default function Signup() {
  const [formData, setFormData] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user types
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Vui lòng nhập họ tên')
      return false
    }
    if (!formData.email.trim()) {
      setError('Vui lòng nhập email')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email không hợp lệ')
      return false
    }
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      // Kiểm tra email đã tồn tại chưa
      const existingUsers = JSON.parse(localStorage.getItem('userList') || '[]')
      const emailExists = existingUsers.some((user: any) => user.email === formData.email)

      if (emailExists) {
        setError('Email đã được sử dụng. Vui lòng chọn email khác.')
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful response
      const mockUserData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=3b82f6&color=fff`,
        loginType: 'email',
        token: `mock_token_${Date.now()}`
      }

      setSuccess('Đăng ký thành công! Đang chuyển hướng...')

      // Lưu vào userList
      const updatedUserList = [...existingUsers, mockUserData]
      localStorage.setItem('userList', JSON.stringify(updatedUserList))

      // Lưu user hiện tại
      localStorage.setItem('user', JSON.stringify(mockUserData))
      localStorage.setItem('token', mockUserData.token)

      setTimeout(() => {
        navigate('/') // Chuyển về trang chủ
      }, 2000)
    } catch (err) {
      // console.error('Signup error:', err)
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      const decoded: GoogleUser = jwtDecode(credentialResponse.credential)

      // Lưu thông tin Google user
      const googleUserData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,

        avatar: decoded.picture,
        loginType: 'google'
      }

      localStorage.setItem('user', JSON.stringify(googleUserData))
      localStorage.setItem('token', credentialResponse.credential)

      setSuccess('Đăng ký Google thành công! Đang chuyển hướng...')
      setTimeout(() => {
        navigate('/') // Chuyển về trang chủ
      }, 1500)
    } catch (error) {
      // console.error('Google signup error:', error)
      setError('Đăng ký Google thất bại')
    }
  }

  const handleGoogleError = () => {
    setError('Đăng ký Google thất bại')
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId || ''}>
      <div className='absolute w-full flex justify-center items-center min-h-screen bg-gray-900 py-8'>
        <div className='bg-gray-800 px-8 pb-10 pt-6 rounded-lg shadow-lg text-white max-w-md w-full mx-4'>
          <div className='w-15 h-15 flex gap-4 items-center cursor-pointer mb-6' onClick={() => navigate(-1)}>
            <Icon name='arrow-left' className='w-6 h-6' />
            <span>Back</span>
          </div>

          <h1 className='text-3xl md:text-4xl font-bold mb-8 text-center'>Đăng Ký</h1>

          {error && (
            <div className='bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4'>{error}</div>
          )}

          {success && (
            <div className='bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded mb-4'>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex flex-col'>
              <label className='text-white/70 font-sans text-sm mb-1'>Họ và tên</label>
              <input
                name='name'
                type='text'
                value={formData.name}
                onChange={handleInputChange}
                placeholder='Nhập họ và tên...'
                className='px-3 w-full text-sm bg-[#171616] text-white p-3 border border-white/10 rounded-md outline-none ring-2 ring-blue-500/0 focus:ring-blue-500 transition-all'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-white/70 font-sans text-sm mb-1'>Email</label>
              <input
                name='email'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Nhập email...'
                className='px-3 w-full text-sm bg-[#171616] text-white p-3 border border-white/10 rounded-md outline-none ring-2 ring-blue-500/0 focus:ring-blue-500 transition-all'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-white/70 font-sans text-sm mb-1'>Mật khẩu</label>
              <div className='relative'>
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Nhập mật khẩu...'
                  className='px-3 w-full text-sm bg-[#171616] text-white p-3 border border-white/10 rounded-md outline-none ring-2 ring-blue-500/0 focus:ring-blue-500 transition-all pr-10'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                >
                  <Icon name={showPassword ? 'eye-off' : 'eye'} className='w-4 h-4' />
                </button>
              </div>
            </div>

            <div className='flex flex-col'>
              <label className='text-white/70 font-sans text-sm mb-1'>Xác nhận mật khẩu</label>
              <div className='relative'>
                <input
                  name='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder='Nhập lại mật khẩu...'
                  className='px-3 w-full text-sm bg-[#171616] text-white p-3 border border-white/10 rounded-md outline-none ring-2 ring-blue-500/0 focus:ring-blue-500 transition-all pr-10'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                >
                  <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} className='w-4 h-4' />
                </button>
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-4 py-3 rounded mt-6 transition-colors font-medium'
            >
              {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
            </button>
          </form>

          <p className='mt-6 text-center'>
            Đã có tài khoản?{' '}
            <a href='/login' className='text-blue-500 hover:text-blue-400'>
              Đăng nhập
            </a>
          </p>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-600'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-gray-800 text-gray-400'>Hoặc đăng ký bằng</span>
              </div>
            </div>

            <div className='mt-4 flex justify-center'>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme='filled_blue'
                size='large'
                text='signup_with'
                shape='rectangular'
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}
