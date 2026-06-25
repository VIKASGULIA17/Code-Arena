import React, { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, BookOpen, Lightbulb } from 'lucide-react'
import { EnhancedNavbar } from '../Navbar'
import ModuleSidebar from './ModuleSidebar'
import ModuleContentArea from './ModuleContentArea'
import DsaTemplateModal from './DsaTemplateModal'
import TricksPage from './TricksPage'
import { useRevisionProgress } from '../../hooks/useRevisionProgress'
import { useTricks } from '../../hooks/useTricks'

const RevisionLayout = () => {
  const { categoryId, topicId, subtopicId } = useParams()

  // console.log("categoryID : ",categoryId);
  // console.log("topicId :",topicId);
  // console.log("subTopicId : ",subtopicId);

  const navigate = useNavigate()

  const [mode, setMode] = useState('modules') // 'modules' | 'tricks'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
  const [templateModalOpen, setTemplateModalOpen] = useState(false)
  const [templateModalMode, setTemplateModalMode] = useState("create")
  const [templateInitialData, setTemplateInitialData] = useState(null)

  const { tricks, addTrick, updateTrick, deleteTrick } = useTricks()

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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1120]">
      <EnhancedNavbar />

      {/* ── Mode Toggle Pill ─────────────────────────────── */}
      <div className="fixed top-[72px] right-4 sm:right-6 z-40">
        <div className="relative flex items-center bg-white dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700/60 rounded-full p-1 shadow-lg dark:shadow-black/30 backdrop-blur-md">
          {/* Sliding indicator */}
          <motion.div
            layout
            layoutId="mode-pill"
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className={`absolute top-1 bottom-1 rounded-full ${
              mode === 'modules'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                : 'bg-gradient-to-r from-amber-500 to-orange-500'
            }`}
            style={{
              left: mode === 'modules' ? '4px' : '50%',
              right: mode === 'modules' ? '50%' : '4px',
            }}
          />
          <button
            onClick={() => setMode('modules')}
            className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              mode === 'modules' ? 'text-white' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen size={13} />
            <span className="hidden sm:inline">Modules</span>
          </button>
          <button
            onClick={() => setMode('tricks')}
            className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              mode === 'tricks' ? 'text-white' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
            }`}
          >
            <Lightbulb size={13} />
            <span className="hidden sm:inline">Tricks</span>
          </button>
        </div>
      </div>

      {/* ── Modules mode ─────────────────────────────────── */}
      {mode === 'modules' && (
        <>
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

          {/* Content area */}
          <div
            className="pt-20 lg:pt-0 transition-all duration-300"
            style={{ marginLeft: isDesktop ? (sidebarCollapsed ? 64 : 272) : 0 }}
          >
            <div className="hidden lg:block" />
            <ModuleContentArea
              activeCategoryId={categoryId || null}
              activeTopicId={topicId || null}
              activeSubtopic={activeSubtopic}
              isCompleted={isCompleted}
              toggleComplete={toggleComplete}
              getModuleProgress={getModuleProgress}
              getOverallProgress={getOverallProgress}
              onSelectSubtopic={handleSelectSubtopic}
              onOpenTemplateModal={(tplMode, initialData) => {
                setTemplateModalMode(tplMode === "edit" ? "edit" : "create")
                setTemplateInitialData(tplMode === "edit" ? initialData : null)
                setTemplateModalOpen(true)
              }}
            />
          </div>

          {/* DSA Template Modal */}
          <DsaTemplateModal
            isOpen={templateModalOpen}
            onClose={() => {
              setTemplateModalOpen(false)
              setTemplateInitialData(null)
              setTemplateModalMode("create")
            }}
            mode={templateModalMode}
            initialData={templateInitialData}
            parentId={topicId}
          />
        </>
      )}

      {/* ── Tricks mode ───────────────────────────────────── */}
      {mode === 'tricks' && (
        <TricksPage
          tricks={tricks}
          addTrick={addTrick}
          updateTrick={updateTrick}
          deleteTrick={deleteTrick}
        />
      )}
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
