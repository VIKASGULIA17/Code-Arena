import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Code2,
  BookOpen,
  User,
  Home,
  PlayCircle,
  Trophy,
  Code,
  ChevronDown,
  LogOut,
  Settings,
  BarChart3,
  Menu,
  X
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export function EnhancedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  // 1. Pulled the exact variables from your OLD working code
  const { 
    isJwtExist, 
    setisJwtExist, 
    username, 
    setjwtToken, 
    userDetails, 
    setisLoggedIn,
    userProfile
  } = useAppContext()

  console.log(userDetails);

  // 2. Fixed the Admin check based on your old code's logic
  const isAdmin = (userDetails?.roles || []).includes("ADMIN") || (userDetails?.roles || []).includes("ROLE_ADMIN")

  const navItems = [
    { name: 'Home', link: '/', icon: Home },
    { name: 'Problems', link: '/problem', icon: Code },
    { name: 'Contest', link: '/Contest', icon: Trophy },
    { name: 'Algo Visualizer', link: '/algovisualizer', icon: PlayCircle },
    { name: 'Revision', link: '/revision', icon: BookOpen },
  ]

  // 3. Changed condition from isLoggedIn to isJwtExist
  if (isJwtExist) {
    navItems.push({ name: 'Profile', link: `/profile/${username}`, icon: User })
  }
  if (isAdmin) {
    navItems.push({ name: 'Admin Panel', link: '/admin', icon: Settings })
  }

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  // 4. Brought back your old clearJwtToken logic for a bulletproof logout
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setisJwtExist(false);
    setisLoggedIn(false);
    setjwtToken(null);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Code2 size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Code Arena
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon
            const active = isActive(item.link)
            return (
              <Link
                key={`nav-link-${idx}`}
                to={item.link}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                <Icon size={15} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          {isJwtExist ? ( // Changed to isJwtExist
            /* User Menu */
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <img
                  src={userProfile?.avatarLink || 'https://i.pravatar.cc/100?img=5'}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full border border-gray-200 object-cover"
                />
                <span className="font-medium text-sm capitalize">{userDetails?.fullName || username}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{username}</p>
                  </div>
                  <Link
                    to={`/profile/${username}`}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <User size={15} />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/statistics"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <BarChart3 size={15} />
                    <span>Statistics</span>
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Settings size={15} />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Auth Buttons */
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col p-4 space-y-1">
            {navItems.map((item, idx) => {
              const Icon = item.icon
              const active = isActive(item.link)
              return (
                <Link
                  key={`mobile-link-${idx}`}
                  to={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            <div className="pt-3 border-t border-gray-100 mt-2 space-y-2">
              {isJwtExist ? ( // Changed to isJwtExist
                <>
                  <div className="px-4 py-2 text-sm text-gray-400">
                    Signed in as <span className="text-gray-700 font-medium">{username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all w-full text-left font-medium"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-center text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-center text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}