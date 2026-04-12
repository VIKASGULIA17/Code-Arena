import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, ChevronDown, ChevronLeft, Menu,
  BookOpen, Code2, BarChart3, X, RotateCcw
} from 'lucide-react'
import { dsaCategories } from '../../data/DsaTopics'

const topicIcons = {
  'arrays': '📊',
  'linked-lists': '🔗',
  'stacks': '📚',
  'queues': '🎫',
  'trees': '🌳',
  'graphs': '🕸️',
  'sorting': '🔄',
  'searching': '🔍',
  'dynamic-programming': '⚡',
  'greedy': '🎯',
  'merge-sort': '🔀',
  'graph-algorithms': '🕸️',
  'advanced-cp': '🚀'
}

const difficultyColors = {
  'Beginner': 'bg-emerald-100 text-emerald-700',
  'Intermediate': 'bg-amber-100 text-amber-700',
  'Advanced': 'bg-rose-100 text-rose-700',
  'Extreme': 'bg-purple-100 text-purple-700'
}

const ModuleSidebar = ({
  collapsed,
  onToggleCollapse,
  activeCategoryId,
  activeTopicId,
  activeSubtopic,
  onSelectTopic,
  onSelectSubtopic,
  getModuleProgress,
  getOverallProgress,
  onResetProgress,
  mobileOpen,
  onCloseMobile
}) => {
  const [expandedTopics, setExpandedTopics] = useState({})
  const overall = getOverallProgress()

  const toggleExpand = (key) => {
    setExpandedTopics(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleTopicClick = (catId, topicId) => {
    const key = `${catId}:${topicId}`
    toggleExpand(key)
    onSelectTopic(catId, topicId)
  }

  const handleSubtopicClick = (catId, topicId, type, id) => {
    onSelectSubtopic(catId, topicId, type, id)
    if (window.innerWidth < 1024) onCloseMobile()
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          {!collapsed && (
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-600" />
              DSA Modules
            </h2>
          )}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Overall Progress */}
        {!collapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Overall Progress</span>
              <span className="text-indigo-600 font-bold">{overall.percent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${overall.percent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{overall.done}/{overall.total} completed</span>
              {overall.done > 0 && (
                <button
                  onClick={onResetProgress}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                  title="Reset all progress"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
        {Object.entries(dsaCategories).map(([catId, category]) => (
          <div key={catId} className="mb-2">
            {/* Category Header */}
            {!collapsed && (
              <div className="px-4 py-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {category.title}
                </span>
              </div>
            )}

            {/* Topics */}
            {Object.entries(category.topics).map(([topicId, topic]) => {
              const key = `${catId}:${topicId}`
              const isExpanded = expandedTopics[key]
              const isActive = activeCategoryId === catId && activeTopicId === topicId
              const progress = getModuleProgress(catId, topicId)
              const icon = topicIcons[topicId] || '💡'

              const subtopics = []
              if (topic.theory) {
                subtopics.push({ type: 'theory', id: 'theory', label: 'Theory & Concepts', icon: BookOpen })
              }
              if (topic.codeTemplates) {
                Object.entries(topic.codeTemplates).forEach(([templateId, template]) => {
                  subtopics.push({ type: 'template', id: templateId, label: template.title, icon: Code2 })
                })
              }

              return (
                <div key={topicId}>
                  {/* Topic Item */}
                  <button
                    onClick={() => handleTopicClick(catId, topicId)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group
                      ${isActive
                        ? 'bg-indigo-50 border-l-[3px] border-indigo-500 text-gray-900'
                        : 'border-l-[3px] border-transparent hover:bg-gray-50 text-gray-700'
                      }
                    `}
                    data-testid={`module-${topicId}`}
                    title={collapsed ? topic.title : undefined}
                  >
                    <span className="text-xl flex-shrink-0">{icon}</span>

                    {!collapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm truncate">{topic.title}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${difficultyColors[topic.difficulty] || ''}`}>
                              {topic.difficulty}
                            </span>
                          </div>
                          {/* Mini progress bar */}
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300"
                                style={{ width: `${progress.percent}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-gray-400 flex-shrink-0">
                              {progress.done}/{progress.total}
                            </span>
                          </div>
                        </div>

                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0 text-gray-400"
                        >
                          <ChevronRight size={16} />
                        </motion.div>
                      </>
                    )}
                  </button>

                  {/* Subtopics Accordion */}
                  <AnimatePresence initial={false}>
                    {isExpanded && !collapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pl-10 pr-3 pb-2 space-y-0.5">
                          {subtopics.map((sub) => {
                            const SubIcon = sub.icon
                            const isSubActive = activeSubtopic?.type === sub.type && activeSubtopic?.id === sub.id && isActive
                            return (
                              <button
                                key={`${sub.type}-${sub.id}`}
                                onClick={() => handleSubtopicClick(catId, topicId, sub.type, sub.id)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150
                                  ${isSubActive
                                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                  }
                                `}
                                data-testid={`subtopic-${sub.id}`}
                              >
                                <SubIcon size={14} className="flex-shrink-0" />
                                <span className="truncate text-left">{sub.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar — FIXED position */}
      <motion.aside
        className="hidden lg:flex flex-col bg-white border-r border-gray-200 fixed top-16 left-0 bottom-0 z-20 overflow-hidden"
        animate={{ width: collapsed ? 72 : 300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={onCloseMobile}
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ModuleSidebar
