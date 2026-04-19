import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, ChevronLeft, Menu,
  BookOpen, Code2, X, RotateCcw, Search,
  CheckCircle2, Circle, Trophy, Zap, Target
} from 'lucide-react'
import { dsaCategories } from '../../data/DsaTopics'

/* ─── static maps ─────────────────────────────────── */
const topicIcons = {
  'arrays': '📊', 'linked-lists': '🔗', 'stacks': '📚',
  'queues': '🎫', 'trees': '🌳', 'graphs': '🕸️',
  'sorting': '🔄', 'searching': '🔍',
  'dynamic-programming': '⚡', 'greedy': '🎯',
  'merge-sort': '🔀', 'graph-algorithms': '🕸️', 'advanced-cp': '🚀'
}

const difficultyMeta = {
  'Beginner':     { cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'Intermediate': { cls: 'bg-amber-100   text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',   dot: 'bg-amber-500'   },
  'Advanced':     { cls: 'bg-rose-100    text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',    dot: 'bg-rose-500'     },
  'Extreme':      { cls: 'bg-purple-100  text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',  dot: 'bg-purple-500'   },
}

/* ─── tiny circular progress SVG ─────────────────── */
function RingProgress({ percent, size = 28, stroke = 3 }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (percent / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#e5e7eb" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={percent === 100 ? '#10b981' : '#6366f1'}
        strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.4s ease' }}
      />
    </svg>
  )
}

/* ─── main component ──────────────────────────────── */
const ModuleSidebar = ({
  collapsed, onToggleCollapse,
  activeCategoryId, activeTopicId, activeSubtopic,
  onSelectTopic, onSelectSubtopic,
  getModuleProgress, getOverallProgress, onResetProgress,
  mobileOpen, onCloseMobile
}) => {
  const [expandedTopics, setExpandedTopics] = useState({})
  const [query, setQuery] = useState('')
  const overall = getOverallProgress()

  const toggleExpand = (key) =>
    setExpandedTopics(prev => ({ ...prev, [key]: !prev[key] }))

  const handleTopicClick = (catId, topicId) => {
    const key = `${catId}:${topicId}`
    toggleExpand(key)
    onSelectTopic(catId, topicId)
  }

  const handleSubtopicClick = (catId, topicId, type, id) => {
    onSelectSubtopic(catId, topicId, type, id)
    if (window.innerWidth < 1024) onCloseMobile()
  }

  /* filter topics by search query */
  const filteredCategories = useMemo(() => {
    if (!query.trim()) return dsaCategories
    const q = query.toLowerCase()
    const result = {}
    Object.entries(dsaCategories).forEach(([catId, cat]) => {
      const topics = {}
      Object.entries(cat.topics).forEach(([topicId, topic]) => {
        if (
          topic.title.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q) ||
          (topic.difficulty || '').toLowerCase().includes(q)
        ) {
          topics[topicId] = topic
        }
      })
      if (Object.keys(topics).length) result[catId] = { ...cat, topics }
    })
    return result
  }, [query])

  /* ──────────────────────── sidebar body ──── */
  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 transition-colors">

      {/* ── Header ── */}
      <div className="px-3 pt-3 pb-2 border-b border-gray-100 dark:border-slate-800 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          {!collapsed && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <BookOpen size={13} className="text-white" />
              </div>
              <span className="font-bold text-sm text-gray-900 dark:text-slate-100 leading-none">DSA Modules</span>
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
              aria-label="Toggle sidebar"
            >
              {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
            </button>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-slate-500"
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Overall progress strip */}
        {!collapsed && (
          <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-2.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Trophy size={12} className="text-indigo-500 dark:text-indigo-400" />
                <span className="text-[11px] font-semibold text-gray-600 dark:text-slate-300">Overall Progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                {overall.done > 0 && (
                  <button
                    onClick={onResetProgress}
                    className="text-[10px] text-gray-300 dark:text-slate-500 hover:text-red-400 dark:hover:text-red-400 transition-colors flex items-center gap-0.5"
                    title="Reset progress"
                  >
                    <RotateCcw size={9} />
                    Reset
                  </button>
                )}
                <span className="text-xs font-bold text-indigo-600">{overall.percent}%</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${overall.percent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 dark:text-slate-400">{overall.done}/{overall.total} items done</span>
              {overall.percent === 100 && (
                <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-0.5">
                  <Zap size={9} /> Complete!
                </span>
              )}
            </div>
          </div>
        )}

        {/* Collapsed: tiny ring */}
        {collapsed && (
          <div className="flex justify-center pt-1">
            <div className="relative">
              <RingProgress percent={overall.percent} size={32} stroke={3} />
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-indigo-600">
                {overall.percent}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Search bar ── */}
      {!collapsed && (
        <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-800 flex-shrink-0">
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search topics…"
              className="w-full pl-7 pr-3 py-1.5 text-xs rounded-lg bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 outline-none placeholder:text-gray-400 dark:placeholder:text-slate-500 text-gray-900 dark:text-slate-100 transition-all"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300">
                <X size={10} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Module list ── */}
      <div className="flex-1 overflow-y-auto py-1 scrollbar-thin">
        {Object.entries(filteredCategories).map(([catId, category]) => {
          /* category-level progress */
          const topicIds = Object.keys(category.topics)
          const catDone  = topicIds.filter(tid => getModuleProgress(catId, tid).percent === 100).length
          const catTotal = topicIds.length

          return (
            <div key={catId} className="mb-0.5">
              {/* Category label */}
              {!collapsed && (
                <div className="px-3 pt-2 pb-0.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {activeCategoryId === catId && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 flex-shrink-0" />
                    )}
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${activeCategoryId === catId ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 dark:text-slate-500'}`}>
                      {category.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-300 dark:text-slate-600 tabular-nums">
                    {catDone}/{catTotal}
                  </span>
                </div>
              )}

              {Object.entries(category.topics).map(([topicId, topic]) => {
                const key      = `${catId}:${topicId}`
                const isExp    = expandedTopics[key]
                const isActive = activeCategoryId === catId && activeTopicId === topicId
                const prog     = getModuleProgress(catId, topicId)
                const icon     = topicIcons[topicId] || '💡'
                const diff     = difficultyMeta[topic.difficulty] || difficultyMeta['Beginner']
                const done100  = prog.percent === 100

                const subtopics = []
                if (topic.theory) subtopics.push({ type: 'theory', id: 'theory', label: 'Theory & Concepts', icon: BookOpen })
                if (topic.codeTemplates) {
                  Object.entries(topic.codeTemplates).forEach(([tid, tpl]) =>
                    subtopics.push({ type: 'template', id: tid, label: tpl.title, icon: Code2 })
                  )
                }

                return (
                  <div key={topicId}>
                    {/* ── Topic row ── */}
                    <button
                      onClick={() => handleTopicClick(catId, topicId)}
                      title={collapsed ? topic.title : undefined}
                      data-testid={`module-${topicId}`}
                      className={`
                        w-full flex items-center gap-2 px-2 py-2 text-left transition-all duration-150 group
                        ${isActive
                          ? 'bg-indigo-50 dark:bg-indigo-500/10 border-l-2 border-indigo-500 dark:border-indigo-400'
                          : 'border-l-2 border-transparent hover:bg-gray-50 dark:hover:bg-slate-800/50'}
                      `}
                    >
                      {/* emoji icon */}
                      <span className={`text-base flex-shrink-0 leading-none transition-transform duration-150 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                        {icon}
                      </span>

                      {!collapsed && (
                        <>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className={`text-xs font-semibold truncate leading-tight ${isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-slate-200'}`}>
                                {topic.title}
                              </span>
                              {done100 && <CheckCircle2 size={11} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`inline-flex items-center gap-0.5 text-[9px] px-1 py-0 rounded-full font-medium ${isActive ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300' : diff.cls}`}>
                                {isActive && <span className="w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />}
                                {topic.difficulty}
                              </span>
                              <span className="text-[9px] text-gray-400 dark:text-slate-500 tabular-nums">{prog.done}/{prog.total}</span>
                            </div>
                          </div>

                          {/* chevron */}
                          <div className="flex-shrink-0">
                            <motion.div animate={{ rotate: isExp ? 90 : 0 }} transition={{ duration: 0.18 }} className="text-gray-400 dark:text-slate-500">
                              <ChevronRight size={13} />
                            </motion.div>
                          </div>
                        </>
                      )}

                      {/* collapsed: just ring */}
                      {collapsed && (
                        <div className="absolute right-1 top-1/2 -translate-y-1/2" style={{ position: 'static' }}>
                          <RingProgress percent={prog.percent} size={18} stroke={2} />
                        </div>
                      )}
                    </button>

                    {/* ── Subtopics accordion ── */}
                    <AnimatePresence initial={false}>
                      {isExp && !collapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="ml-7 mr-2 mb-1 space-y-0.5 border-l border-gray-200 dark:border-slate-700 pl-2">
                            {subtopics.map(sub => {
                              const SubIcon = sub.icon
                              const isSubActive = activeSubtopic?.type === sub.type
                                && activeSubtopic?.id === sub.id
                                && isActive
                              return (
                                <button
                                  key={`${sub.type}-${sub.id}`}
                                  onClick={() => handleSubtopicClick(catId, topicId, sub.type, sub.id)}
                                  data-testid={`subtopic-${sub.id}`}
                                  className={`
                                    w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-left transition-all duration-100
                                      ${isSubActive
                                        ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-medium'
                                        : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-700 dark:hover:text-slate-200'}
                                    `}
                                >
                                  <SubIcon size={11} className="flex-shrink-0 opacity-70" />
                                  <span className="truncate text-[11px] leading-tight">{sub.label}</span>
                                  {isSubActive && (
                                    <Target size={9} className="ml-auto flex-shrink-0 text-indigo-500" />
                                  )}
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
          )
        })}

        {/* Empty state when search yields nothing */}
        {query && Object.keys(filteredCategories).length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <Search size={24} className="text-gray-300 mb-2" />
            <p className="text-xs text-gray-400">No topics match <span className="font-semibold text-gray-500">"{query}"</span></p>
            <button onClick={() => setQuery('')} className="mt-2 text-[11px] text-indigo-500 hover:underline">Clear</button>
          </div>
        )}
      </div>

      {/* ── Footer hint ── */}
      {!collapsed && (
        <div className="px-3 py-2 border-t border-gray-100 dark:border-slate-800 flex-shrink-0">
          <p className="text-[9px] text-gray-300 dark:text-slate-600 text-center">
            <kbd className="bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 px-1 py-0.5 rounded text-[8px] font-mono">click</kbd> topic to expand  ·  track progress with rings
          </p>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop fixed sidebar */}
      <motion.aside
        className="hidden lg:flex flex-col bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 fixed top-16 left-0 bottom-0 z-20 overflow-hidden shadow-sm"
        animate={{ width: collapsed ? 64 : 272 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={onCloseMobile}
            />
            <motion.aside
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[272px] bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
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
