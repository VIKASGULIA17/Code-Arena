import React, { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { EnhancedNavbar } from '../Navbar'
import ModuleSidebar from './ModuleSidebar'
import ModuleContentArea from './ModuleContentArea'
import { useRevisionProgress } from '../../hooks/useRevisionProgress'

const RevisionLayout = () => {
  const { categoryId, topicId, subtopicId } = useParams()
  const navigate = useNavigate()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  const {
    toggleComplete,
    isCompleted,
    getModuleProgress,
    getOverallProgress,
    resetProgress
  } = useRevisionProgress()

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024
      setIsDesktop(desktop)
      // Auto-close mobile menu on resize to desktop
      if (desktop) setMobileOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Derive active subtopic from URL
  const activeSubtopic = subtopicId
    ? parseSubtopicId(subtopicId)
    : null

  const handleSelectTopic = useCallback((catId, topId) => {
    navigate(`/revision/${catId}/${topId}`)
  }, [navigate])

  const handleSelectSubtopic = useCallback((catId, topId, type, id) => {
    if (!type || !id) {
      navigate(`/revision/${catId}/${topId}`)
      return
    }
    const subtopicSlug = type === 'theory' ? 'theory' : `template-${id}`
    navigate(`/revision/${catId}/${topId}/${subtopicSlug}`)
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1120] transition-colors">
      <EnhancedNavbar />

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-6 left-6 z-30">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open modules"
          data-testid="mobile-menu-btn"
          className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Fixed sidebar */}
      <ModuleSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
        activeCategoryId={categoryId || null}
        activeTopicId={topicId || null}
        activeSubtopic={activeSubtopic}
        onSelectTopic={handleSelectTopic}
        onSelectSubtopic={handleSelectSubtopic}
        getModuleProgress={getModuleProgress}
        getOverallProgress={getOverallProgress}
        onResetProgress={resetProgress}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Content area - offset by sidebar width on desktop only */}
      <div
        className="pt-20 lg:pt-0 transition-all duration-300"
        style={{ marginLeft: isDesktop ? (sidebarCollapsed ? 64 : 272) : 0 }}
      >
        <div className="hidden lg:block" /> {/* Spacer only needed for layout reference */}
        <ModuleContentArea
          activeCategoryId={categoryId || null}
          activeTopicId={topicId || null}
          activeSubtopic={activeSubtopic}
          isCompleted={isCompleted}
          toggleComplete={toggleComplete}
          getModuleProgress={getModuleProgress}
          getOverallProgress={getOverallProgress}
          onSelectSubtopic={handleSelectSubtopic}
        />
      </div>
    </div>
  )
}

/**
 * Parse a subtopic slug back into { type, id }
 * "theory" → { type: "theory", id: "theory" }
 * "template-two-sum" → { type: "template", id: "two-sum" }
 */
function parseSubtopicId(slug) {
  if (slug === 'theory') {
    return { type: 'theory', id: 'theory' }
  }
  if (slug.startsWith('template-')) {
    return { type: 'template', id: slug.replace('template-', '') }
  }
  return null
}

export default RevisionLayout
