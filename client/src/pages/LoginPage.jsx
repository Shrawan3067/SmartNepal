import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/common/Layout'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email or phone is required'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        // In a real app, you would save remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        }
        
        navigate('/')
      } else {
        setErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        })
      }
    } catch (error) {
      setErrors({
        submit: 'Login failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    // In a real app, this would trigger social login
    alert(`${provider} login would be implemented in a real app`)
  }

  return (
          <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="auth-container flex w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Section */}
          <div className="auth-left hidden lg:flex lg:w-1/2 bg-blue-900 text-white p-12 flex-col justify-between">
            <div className="auth-content max-w-lg">
              <Link to="/" className="logo text-2xl font-bold text-white mb-10 inline-block">
                SmartNepal
              </Link>
              
              <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
              <p className="text-xl opacity-90 mb-10">
                Login to book your next bus journey with exclusive member benefits.
              </p>
              
              <div className="social-login mt-10">
                <p className="text-center mb-6 relative">
                  <span className="relative z-10 px-4 bg-blue-900">Continue with</span>
                  <span className="absolute left-0 right-0 top-1/2 h-px bg-white/30"></span>
                </p>
                <div className="social-buttons flex flex-col gap-4">
                  <button 
                    onClick={() => handleSocialLogin('Google')}
                    className="social-btn google bg-white text-blue-600 py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                  >
                    <i className="fab fa-google"></i>
                    <span>Google</span>
                  </button>
                  <button 
                    onClick={() => handleSocialLogin('Facebook')}
                    className="social-btn facebook bg-[#4267B2] text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                  >
                    <i className="fab fa-facebook-f"></i>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="auth-image mt-12">
              <img 
                src="/images/login-bus.jpg" 
                alt="Bus travel"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
          
          {/* Right Section - Login Form */}
          <div className="auth-right w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
            <div className="auth-form-container max-w-md w-full">
              <div className="lg:hidden mb-8">
                <Link to="/" className="logo text-2xl font-bold text-blue-900 mb-4 inline-block">
                  SmartNepal
                </Link>
                <h1 className="text-3xl font-bold text-blue-900">Welcome Back!</h1>
                <p className="text-gray-600 mt-2">
                  Login to book your next bus journey with exclusive member benefits.
                </p>
              </div>
              
              <h2 className="text-3xl font-bold text-blue-900 mb-8">Login to your account</h2>
              
              <form onSubmit={handleSubmit} className="auth-form">
                {/* Email/Phone Field */}
                <div className={`form-group mb-6 ${errors.email ? 'error' : ''}`}>
                  <label htmlFor="loginEmail" className="block text-gray-800 font-medium mb-2">
                    Email or Phone
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="loginEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter your email or phone"
                    />
                    <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>
                  {errors.email && (
                    <span className="error-message text-red-600 text-sm mt-2 block">{errors.email}</span>
                  )}
                </div>
                
                {/* Password Field */}
                <div className={`form-group mb-6 ${errors.password ? 'error' : ''}`}>
                  <label htmlFor="loginPassword" className="block text-gray-800 font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="loginPassword"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter your password"
                    />
                    <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {errors.password && (
                    <span className="error-message text-red-600 text-sm mt-2 block">{errors.password}</span>
                  )}
                </div>
                
                {/* Remember Me & Forgot Password */}
                <div className="form-options flex justify-between items-center mb-8">
                  <label className="remember-me flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Remember me</span>
                  </label>
                  <Link to="#" className="forgot-password text-blue-900 font-medium hover:text-blue-700">
                    Forgot password?
                  </Link>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full bg-orange-500 text-white font-semibold py-4 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                
                {errors.submit && (
                  <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-center">{errors.submit}</p>
                  </div>
                )}
                
                {/* Mobile Social Login */}
                <div className="lg:hidden mt-8">
                  <p className="text-center mb-4 text-gray-600">Or continue with</p>
                  <div className="social-buttons flex gap-4">
                    <button 
                      onClick={() => handleSocialLogin('Google')}
                      className="social-btn google flex-1 bg-white border border-gray-300 text-blue-600 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                    >
                      <i className="fab fa-google"></i>
                      <span className="hidden sm:inline">Google</span>
                    </button>
                    <button 
                      onClick={() => handleSocialLogin('Facebook')}
                      className="social-btn facebook flex-1 bg-[#4267B2] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                    >
                      <i className="fab fa-facebook-f"></i>
                      <span className="hidden sm:inline">Facebook</span>
                    </button>
                  </div>
                </div>
                
                {/* Sign Up Link */}
                <div className="auth-footer text-center text-gray-600 mt-8">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-900 font-medium hover:text-blue-700">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LoginPage