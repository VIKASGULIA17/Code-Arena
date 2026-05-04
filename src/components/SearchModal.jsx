import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  X,
  Code,
  Trophy,
  BookOpen,
  PlayCircle,
  ArrowRight,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { dsaCategories } from '../data/DsaTopics'

// ── Static visualizer entries ──
const VISUALIZER_ITEMS = [
  { label: 'Sorting Visualizer', desc: 'Bubble · Quick · Merge · Heap', route: '/algovisualizer' },
  { label: 'Graph Visualizer', desc: 'Dijkstra · BFS · DFS · A*', route: '/algovisualizer' },
  { label: 'Tree Visualizer', desc: 'BST · Inorder · Preorder · AVL', route: '/algovisualizer' },
  { label: 'Recursion Visualizer', desc: 'Fibonacci · Factorial · Hanoi', route: '/algovisualizer' },
  { label: 'Tree Builder', desc: 'Interactive BST Construction', route: '/algovisualizer' },
  { label: 'Traversal Converter', desc: 'Binary Tree to Array Trace', route: '/algovisualizer' },
]

// ── Build a flat revision index once ──
function buildRevisionIndex() {
  const items = []
  for (const [catId, cat] of Object.entries(dsaCategories)) {
    if (!cat.topics) continue;
    
    const firstTopicId = Object.keys(cat.topics)[0];
    
    // Category-level entry
    items.push({
      label: cat.title,
      desc: cat.description || '',
      route: `/revision/${catId}/${firstTopicId}`,
    })
    
    for (const [topicId, topic] of Object.entries(cat.topics)) {
      // Topic-level entry
      items.push({
        label: topic.title,
        desc: topic.description || '',
        route: `/revision/${catId}/${topicId}`,
      })
      // Code template titles
      if (topic.codeTemplates) {
        for (const [tmplId, tmpl] of Object.entries(topic.codeTemplates)) {
          items.push({
            label: tmpl.title,
            desc: `${cat.title} › ${topic.title}`,
            route: `/revision/${catId}/${topicId}`,
          })
        }
      }
    }
  }
  return items
}

const REVISION_INDEX = buildRevisionIndex()

// ── Category config ──
const CATEGORIES = {
  problems: { icon: Code, color: '#6366f1', label: 'Problems' },
  contests: { icon: Trophy, color: '#f59e0b', label: 'Contests' },
  revision: { icon: BookOpen, color: '#10b981', label: 'Revision' },
  visualizer: { icon: PlayCircle, color: '#ec4899', label: 'Visualizer' },
}

const MAX_PER_GROUP = 5

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()
  const { allProblem, allContest } = useAppContext()

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // ── Build results ──
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    const out = []

    // Problems (from backend via context)
    if (allProblem?.length) {
      const matched = allProblem
        .filter((p) => p.title?.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q)))
        .slice(0, MAX_PER_GROUP)
        .map((p) => ({
          group: 'problems',
          label: p.title,
          desc: `${p.difficulty} · ${(p.tags || []).join(', ')}`,
          route: `/problem/${p.id}`,
        }))
      out.push(...matched)
    }

    // Contests
    if (allContest?.length) {
      const matched = allContest
        .filter((c) => c.contestName?.toLowerCase().includes(q) || c.contestSlug?.toLowerCase().includes(q))
        .slice(0, MAX_PER_GROUP)
        .map((c) => ({
          group: 'contests',
          label: c.contestName,
          desc: c.status || '',
          route: `/contest`,
        }))
      out.push(...matched)
    }

    // Revision
    const revMatched = REVISION_INDEX
      .filter((r) => r.label.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q))
      .slice(0, MAX_PER_GROUP)
      .map((r) => ({ group: 'revision', ...r }))
    out.push(...revMatched)

    // Visualizer
    const vizMatched = VISUALIZER_ITEMS
      .filter((v) => v.label.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q))
      .slice(0, MAX_PER_GROUP)
      .map((v) => ({ group: 'visualizer', ...v }))
    out.push(...vizMatched)

    return out
  }, [query, allProblem, allContest])

  // Reset active index when results change
  useEffect(() => {
    setActiveIdx(0)
  }, [results])

  // ── Navigate ──
  const handleSelect = useCallback(
    (item) => {
      onClose()
      navigate(item.route)
    },
    [navigate, onClose],
  )

  // ── Keyboard nav ──
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[activeIdx]) {
        e.preventDefault()
        handleSelect(results[activeIdx])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, results, activeIdx, handleSelect])

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`)
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  if (!isOpen) return null

  // Group results for section headers
  const grouped = {}
  results.forEach((r, i) => {
    if (!grouped[r.group]) grouped[r.group] = []
    grouped[r.group].push({ ...r, flatIdx: i })
  })

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/50 border border-slate-200 dark:border-slate-700/80 overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <Search size={18} className="text-slate-400 dark:text-slate-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search problems, contests, topics, visualizers..."
                className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none"
              />
              <button
                onClick={onClose}
                className="shrink-0 text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-1.5 py-0.5"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto overscroll-contain">
              {query.trim() === '' ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Start typing to search across the platform...
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-slate-400 dark:text-slate-600">
                    <span className="flex items-center gap-1">
                      <ArrowUp size={11} /> <ArrowDown size={11} /> Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <CornerDownLeft size={11} /> Select
                    </span>
                    <span>ESC Close</span>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No results for "<span className="font-semibold text-slate-700 dark:text-slate-200">{query}</span>"
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Try searching for a problem name, topic, or algorithm
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {Object.entries(grouped).map(([groupKey, items]) => {
                    const cat = CATEGORIES[groupKey]
                    const Icon = cat?.icon || Code
                    return (
                      <div key={groupKey}>
                        {/* Group Header */}
                        <div className="flex items-center gap-2 px-5 pt-3 pb-1.5">
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center"
                            style={{ background: `${cat?.color}18` }}
                          >
                            <Icon size={11} style={{ color: cat?.color }} />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            {cat?.label}
                          </span>
                          <span className="text-[10px] text-slate-300 dark:text-slate-600">
                            {items.length} result{items.length > 1 ? 's' : ''}
                          </span>
                        </div>

                        {/* Items */}
                        {items.map((item) => {
                          const isActive = item.flatIdx === activeIdx
                          return (
                            <button
                              key={`${item.group}-${item.flatIdx}`}
                              data-idx={item.flatIdx}
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() => setActiveIdx(item.flatIdx)}
                              className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors duration-100 ${
                                isActive
                                  ? 'bg-indigo-50 dark:bg-indigo-500/10'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-medium truncate ${
                                    isActive
                                      ? 'text-indigo-700 dark:text-indigo-300'
                                      : 'text-slate-700 dark:text-slate-200'
                                  }`}
                                >
                                  {highlightMatch(item.label, query)}
                                </p>
                                {item.desc && (
                                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                              {isActive && (
                                <ArrowRight
                                  size={14}
                                  className="text-indigo-400 dark:text-indigo-500 shrink-0"
                                />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {results.length > 0 && (
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-600">
                  <span className="flex items-center gap-1">
                    <ArrowUp size={10} /> <ArrowDown size={10} /> Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft size={10} /> Open
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ── Highlight matching substring ──
function highlightMatch(text, query) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  )
}
