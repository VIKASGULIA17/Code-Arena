import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  Search,
  Sun,
  Moon,
  Monitor
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import SearchModal from './SearchModal'

export function EnhancedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const userMenuRef = useRef(null)
  const { theme, cycleTheme, resolvedTheme } = useTheme()

  const {
    isJwtExist,
    setisJwtExist,
    username,
    setjwtToken,
    userDetails,
    setisLoggedIn,
    userProfile,
    avatar
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

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
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

  const handleThemeToggle = () => {
    document.documentElement.classList.add('theme-transitioning')
    cycleTheme()
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning')
    }, 350)
  }

  const ThemeIcon = resolvedTheme === 'dark' ? Moon : Sun
  const themeLabel = theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3)] border-b border-slate-200/60 dark:border-slate-700/50'
          : 'bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-b border-transparent'
      }`}
    >
      <div className="section-wrapper h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
            <Code2 size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
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
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={15} strokeWidth={active ? 2.5 : 2} />
                <span>{item.name}</span>
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-[13px] left-3 right-3 h-[2px] bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Search hint */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-500 dark:hover:text-slate-300 transition-all duration-200"
          >
            <Search size={13} />
            <span>Search</span>
            <kbd className="ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-400 dark:text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)]">⌘K</kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200"
            title={`Theme: ${themeLabel}`}
          >
            <ThemeIcon size={16} key={resolvedTheme} className="animate-theme-icon" />
          </button>

          {isJwtExist ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <img
                  src={avatar || userProfile?.avatarLink || 'https://i.pravatar.cc/100?img=5'}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full border-2 border-slate-200 dark:border-slate-700 object-cover"
                />
                <span className="font-medium text-sm text-slate-700 dark:text-slate-200 capitalize max-w-[100px] truncate">{userDetails?.fullName || username}</span>
                <ChevronDown
                  size={13}
                  className={`text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
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
                    className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 z-50 py-1 overflow-hidden"
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate mt-0.5">{username}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to={`/profile/${username}`}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
                      >
                        <User size={15} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/statistics"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
                      >
                        <BarChart3 size={15} />
                        <span>Statistics</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
                        >
                          <Settings size={15} />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-700 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-150 w-full text-left"
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
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm shadow-indigo-200/50 dark:shadow-indigo-900/30"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
            title={`Theme: ${themeLabel}`}
          >
            <ThemeIcon size={20} key={resolvedTheme} className="animate-theme-icon" />
          </button>
          <button
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden"
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm ${
                      active
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-1">
                {isJwtExist ? (
                  <>
                    <div className="px-4 py-2 text-xs text-slate-400 dark:text-slate-500">
                      Signed in as <span className="text-slate-700 dark:text-slate-200 font-medium">{username}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all duration-200 w-full text-left font-medium text-sm"
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
                      className="px-4 py-3 text-center text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-center text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors duration-200"
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

    {/* Search Modal — rendered outside header to avoid positioning issues */}
    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}