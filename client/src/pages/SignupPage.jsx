import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/common/Layout'

const SignupPage = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    width: '0%',
    color: '#e53e3e',
    text: 'Weak'
  })
  const [termsAgreed, setTermsAgreed] = useState(false)
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
    
    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value)
    }
  }

  const checkPasswordStrength = (password) => {
    let strength = 0
    
    // Check password length
    if (password.length >= 8) strength += 1
    if (password.length >= 12) strength += 1
    
    // Check for mixed case
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1
    
    // Check for numbers
    if (/\d/.test(password)) strength += 1
    
    // Check for special chars
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1
    
    // Update UI
    const width = strength * 20
    let color = '#e53e3e' // red
    let text = 'Weak'
    
    if (strength >= 3) {
      color = '#f6ad55' // orange
      text = 'Medium'
    }
    if (strength >= 5) {
      color = '#68d391' // green
      text = 'Strong'
    }
    
    setPasswordStrength({
      width: `${width}%`,
      color,
      text
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    // Terms validation
    if (!termsAgreed) {
      newErrors.terms = 'You must agree to the terms and conditions'
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
      const result = await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
      
      if (result.success) {
        navigate('/')
      } else {
        setErrors({
          submit: 'Signup failed. Please try again.'
        })
      }
    } catch (error) {
      setErrors({
        submit: 'Signup failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
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
              
              <h1 className="text-4xl font-bold mb-6">Join SmartNepal Today!</h1>
              <p className="text-xl opacity-90 mb-10">
                Create an account to enjoy faster bookings, exclusive deals, and member-only benefits.
              </p>
              
              <div className="benefits mt-12">
                <div className="benefit-item flex items-center gap-4 mb-6">
                  <i className="fas fa-percentage text-2xl text-teal-400"></i>
                  <span className="text-lg">Exclusive member discounts</span>
                </div>
                <div className="benefit-item flex items-center gap-4 mb-6">
                  <i className="fas fa-bolt text-2xl text-teal-400"></i>
                  <span className="text-lg">Faster bookings</span>
                </div>
                <div className="benefit-item flex items-center gap-4">
                  <i className="fas fa-gift text-2xl text-teal-400"></i>
                  <span className="text-lg">Special offers</span>
                </div>
              </div>
            </div>
            
            <div className="auth-image mt-12">
              <img 
                src="/images/signup-bus.jpg" 
                alt="Bus travel"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
          
          {/* Right Section - Signup Form */}
          <div className="auth-right w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
            <div className="auth-form-container max-w-md w-full">
              <div className="lg:hidden mb-8">
                <Link to="/" className="logo text-2xl font-bold text-blue-900 mb-4 inline-block">
                  SmartNepal
                </Link>
                <h1 className="text-3xl font-bold text-blue-900">Join SmartNepal Today!</h1>
                <p className="text-gray-600 mt-2">
                  Create an account to enjoy faster bookings, exclusive deals, and member-only benefits.
                </p>
              </div>
              
              <h2 className="text-3xl font-bold text-blue-900 mb-8">Create your account</h2>
              
              <form onSubmit={handleSubmit} className="auth-form">
                {/* Name Field */}
                <div className={`form-group mb-6 ${errors.name ? 'error' : ''}`}>
                  <label htmlFor="signupName" className="block text-gray-800 font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="signupName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter your full name"
                    />
                    <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>
                  {errors.name && (
                    <span className="error-message text-red-600 text-sm mt-2 block">{errors.name}</span>
                  )}
                </div>
                
                {/* Email Field */}
                <div className={`form-group mb-6 ${errors.email ? 'error' : ''}`}>
                  <label htmlFor="signupEmail" className="block text-gray-800 font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="signupEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter your email"
                    />
                    <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>
                  {errors.email && (
                    <span className="error-message text-red-600 text-sm mt-2 block">{errors.email}</span>
                  )}
                </div>
                
                {/* Phone Field */}
                <div className={`form-group mb-6 ${errors.phone ? 'error' : ''}`}>
                  <label htmlFor="signupPhone" className="block text-gray-800 font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="signupPhone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter your phone number"
                    />
                    <i className="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>
                  {errors.phone && (
                    <span className="error-message text-red-600 text-sm mt-2 block">{errors.phone}</span>
                  )}
                </div>
                
                {/* Password Field */}
                <div className={`form-group mb-6 ${errors.password ? 'error' : ''}`}>
                  <label htmlFor="signupPassword" className="block text-gray-800 font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="signupPassword"
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
                  
                  {/* Password Strength Indicator */}
                  <div className="password-strength mt-3">
                    <div className="strength-bar h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300"
                        style={{
                          width: passwordStrength.width,
                          backgroundColor: passwordStrength.color
                        }}
                      ></div>
                    </div>
                    <span 
                      className="strength-text text-xs mt-1 block"
                      style={{ color: passwordStrength.color }}
                    >
                      Password strength: {passwordStrength.text}
                    </span>
                  </div>
                  
                  {errors.password && (
                    <span className="error-message text-red-600 text-sm mt-2 block">{errors.password}</span>
                  )}
                </div>
                
                {/* Confirm Password Field */}
                <div className={`form-group mb-6 ${errors.confirmPassword ? 'error' : ''}`}>
                  <label htmlFor="signupConfirmPassword" className="block text-gray-800 font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="signupConfirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Confirm your password"
                    />
                    <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-message text-red-600 text-sm mt-2 block">{errors.confirmPassword}</span>
                  )}
                </div>
                
                {/* Terms Agreement */}
                <div className="checkbox-group flex items-start gap-3 mb-8">
                  <input
                    type="checkbox"
                    id="termsAgree"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="termsAgree" className="text-gray-700 text-sm">
                    I agree to the{' '}
                    <a href="#" className="text-blue-900 font-medium hover:text-blue-700">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-900 font-medium hover:text-blue-700">Privacy Policy</a>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-600 text-sm mb-4 -mt-4">{errors.terms}</p>
                )}
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full bg-orange-500 text-white font-semibold py-4 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                >
                  {isLoading ? 'Creating account...' : 'Sign Up'}
                </button>
                
                {errors.submit && (
                  <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-center">{errors.submit}</p>
                  </div>
                )}
                
                {/* Login Link */}
                <div className="auth-footer text-center text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-900 font-medium hover:text-blue-700">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SignupPage