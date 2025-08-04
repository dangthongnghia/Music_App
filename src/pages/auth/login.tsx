import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../../components/common/Icon_1'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

interface LoginForm {
  email: string
  password: string
}

interface GoogleUser {
  email: string
  name: string
  picture: string
  sub: string
}

export default function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!googleClientId) {
    // console.error('VITE_GOOGLE_CLIENT_ID is not defined in environment variables')
  }

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
    if (!formData.email.trim()) {
      setError('Vui lòng nhập email')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email không hợp lệ')
      return false
    }
    if (!formData.password.trim()) {
      setError('Vui lòng nhập mật khẩu')
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
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Kiểm tra trong userList trước
      const userList = JSON.parse(localStorage.getItem('userList') || '[]')
      const foundUser = userList.find(
        (user: any) => user.email === formData.email && user.password === formData.password
      )

      if (foundUser) {
        // User tồn tại trong userList
        const loginUserData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          avatar: foundUser.avatar,
          loginType: foundUser.loginType,
          token: `login_token_${Date.now()}`
        }

        setSuccess('Đăng nhập thành công!')

        localStorage.setItem('user', JSON.stringify(loginUserData))
        localStorage.setItem('token', loginUserData.token)

        setTimeout(
          () => {
            navigate('/')
          },
          1000,
          loading
        )
      } else {
        setError('Email hoặc mật khẩu không đúng.')
      }
    } catch (err) {
      // console.error('Login error:', err)
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

      setTimeout(() => {
        window.location.href = '/'
      })
    } catch (error) {
      // console.error('Google login error:', error)
      setError('Đăng nhập Google thất bại')
    }
  }

  const handleGoogleError = () => {
    setError('Đăng nhập Google thất bại')
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className='absolute w-full flex justify-center items-center h-screen bg-gray-900'>
        <div className='bg-gray-800 px-8 pb-10 rounded-lg shadow-lg text-white max-w-md w-full mx-4'>
          <div className='w-15 h-15 flex gap-4 items-center cursor-pointer mb-6' onClick={() => navigate(-1)}>
            <Icon name='arrow-left' className='w-6 h-6' />
            <span>Back</span>
          </div>

          <h1 className='text-3xl md:text-5xl font-bold mb-8 text-center'>Đăng Nhập</h1>

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
              <label className='text-white/70 font-sans text-sm mb-1'>Email</label>
              <input
                name='email'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='demo@example.com'
                className='px-3 w-full text-sm bg-[#171616] text-white p-3 border border-white/10 rounded-md outline-none ring-2 ring-blue-500/0 focus:ring-blue-500 transition-all'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-white/70 font-sans text-sm mb-1'>Password</label>
              <div className='relative'>
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Password'
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

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-4 py-3 rounded mt-6 transition-colors font-medium'
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          <p className='mt-6 text-center'>
            Bạn chưa có tài khoản?{' '}
            <a href='/signup' className='text-blue-500 hover:text-blue-400'>
              Đăng ký
            </a>
          </p>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-600'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-gray-800 text-gray-400'>Hoặc đăng nhập bằng</span>
              </div>
            </div>

            <div className='mt-4 flex justify-center'>
              {googleClientId ? (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme='filled_blue'
                  size='large'
                  text='continue_with'
                  shape='rectangular'
                />
              ) : (
                <div className='text-red-400 text-sm'>Google Login không khả dụng</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}
