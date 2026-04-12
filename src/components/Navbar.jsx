import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  X,
  Search
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export function EnhancedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  const {
    isJwtExist,
    setisJwtExist,
    username,
    setjwtToken,
    userDetails,
    setisLoggedIn,
    userProfile
  } = useAppContext()

  const isAdmin = (userDetails?.roles || []).includes("ADMIN") || (userDetails?.roles || []).includes("ROLE_ADMIN")

  const navItems = [
    { name: 'Home', link: '/', icon: Home },
    { name: 'Problems', link: '/problem', icon: Code },
    { name: 'Contest', link: '/Contest', icon: Trophy },
    { name: 'Visualizer', link: '/algovisualizer', icon: PlayCircle },
    { name: 'Revision', link: '/revision', icon: BookOpen },
  ]

  if (isJwtExist) {
    navItems.push({ name: 'Profile', link: `/profile/${username}`, icon: User })
  }
  if (isAdmin) {
    navItems.push({ name: 'Admin', link: '/admin', icon: Settings })
  }

  // Track scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isUserMenuOpen])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    localStorage.removeItem("jwtToken")
    setisJwtExist(false)
    setisLoggedIn(false)
    setjwtToken(null)
    setIsUserMenuOpen(false)
    setIsMobileMenuOpen(false)
    navigate('/')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-gray-200/60'
          : 'bg-white/60 backdrop-blur-xl border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Code2 size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Code Arena
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item, idx) => {
            const Icon = item.icon
            const active = isActive(item.link)
            return (
              <Link
                key={`nav-${idx}`}
                to={item.link}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  active
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon size={15} strokeWidth={active ? 2.5 : 2} />
                <span>{item.name}</span>
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-[13px] left-3 right-3 h-[2px] bg-indigo-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Search hint */}
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-500 transition-colors">
            <Search size={13} />
            <span>Search</span>
            <kbd className="ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white border border-gray-200 rounded text-gray-400">⌘K</kbd>
          </button>

          {isJwtExist ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={userProfile?.avatarLink || 'https://i.pravatar.cc/100?img=5'}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full border-2 border-gray-200 object-cover"
                />
                <span className="font-medium text-sm text-gray-700 capitalize max-w-[100px] truncate">{userDetails?.fullName || username}</span>
                <ChevronDown
                  size={13}
                  className={`text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden"
                  >
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">{username}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to={`/profile/${username}`}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <User size={15} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/statistics"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <BarChart3 size={15} />
                        <span>Statistics</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          <Settings size={15} />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col p-3 gap-0.5">
              {navItems.map((item, idx) => {
                const Icon = item.icon
                const active = isActive(item.link)
                return (
                  <Link
                    key={`mobile-${idx}`}
                    to={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm ${
                      active
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
                {isJwtExist ? (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-400">
                      Signed in as <span className="text-gray-700 font-medium">{username}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all w-full text-left font-medium text-sm"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 pt-1">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-center text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-center text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}