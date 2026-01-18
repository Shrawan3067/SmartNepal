import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logo from "../../assets/images/smart-nepal-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const { user, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    // Set active link based on current route
    const path = location.pathname
    if (path === '/') setActiveLink('bus-tickets')
    else if (path === '/hotels') setActiveLink('hotels')
    else if (path === '/tour-packages') setActiveLink('tour-packages')
    else if (path === '/help') setActiveLink('help')
  }, [location])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  return (
    <header className="navbar bg-white shadow-md sticky top-0 z-50 py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img 
            src={logo}
            alt="SmartNepal Logo" 
            className="logo h-12"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''} hidden md:flex md:items-center md:space-x-8`}>
          <Link 
            to="/" 
            className={`text-gray-800 hover:text-orange-500 font-medium transition-colors ${
              activeLink === 'bus-tickets' ? 'text-orange-500 font-semibold' : ''
            }`}
            onClick={closeMenu}
          >
            Bus Tickets
          </Link>
          <Link 
            to="/hotels" 
            className={`text-gray-800 hover:text-orange-500 font-medium transition-colors ${
              activeLink === 'hotels' ? 'text-orange-500 font-semibold' : ''
            }`}
            onClick={closeMenu}
          >
            Hotels
          </Link>
          <Link 
            to="/tour-packages" 
            className={`text-gray-800 hover:text-orange-500 font-medium transition-colors ${
              activeLink === 'tour-packages' ? 'text-orange-500 font-semibold' : ''
            }`}
            onClick={closeMenu}
          >
            Tour Packages
          </Link>
          <Link 
            to="/help" 
            className={`text-gray-800 hover:text-orange-500 font-medium transition-colors ${
              activeLink === 'help' ? 'text-orange-500 font-semibold' : ''
            }`}
            onClick={closeMenu}
          >
            Help
          </Link>
          
          {/* Auth Buttons - Desktop */}
          <div className="auth-buttons flex space-x-4">
            {user ? (
              <>
                <span className="text-blue-900 font-medium">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-outline border-2 border-blue-900 text-blue-900 font-semibold py-2 px-4 rounded hover:bg-blue-900 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn-outline border-2 border-blue-900 text-blue-900 font-semibold py-2 px-4 rounded hover:bg-blue-900 hover:text-white transition"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn-primary bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className={`hamburger md:hidden ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-blue-900 my-1 transition-transform duration-300"></span>
          <span className="block w-6 h-0.5 bg-blue-900 my-1 transition-opacity duration-300"></span>
          <span className="block w-6 h-0.5 bg-blue-900 my-1 transition-transform duration-300"></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu md:hidden ${isMenuOpen ? 'open' : ''}`}>
        <div className="bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === 'bus-tickets' 
                  ? 'text-orange-500 bg-orange-50' 
                  : 'text-gray-800 hover:text-orange-500 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              Bus Tickets
            </Link>
            <Link 
              to="/hotels" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === 'hotels' 
                  ? 'text-orange-500 bg-orange-50' 
                  : 'text-gray-800 hover:text-orange-500 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              Hotels
            </Link>
            <Link 
              to="/tour-packages" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === 'tour-packages' 
                  ? 'text-orange-500 bg-orange-50' 
                  : 'text-gray-800 hover:text-orange-500 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              Tour Packages
            </Link>
            <Link 
              to="/help" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === 'help' 
                  ? 'text-orange-500 bg-orange-50' 
                  : 'text-gray-800 hover:text-orange-500 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              Help
            </Link>
            
            {/* Auth Buttons - Mobile */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-500">Welcome</p>
                    <p className="text-base font-semibold text-blue-900">{user.name}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-orange-500 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link 
                    to="/login" 
                    className="block w-full text-center border-2 border-blue-900 text-blue-900 font-semibold py-2 px-4 rounded hover:bg-blue-900 hover:text-white transition"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block w-full text-center bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header