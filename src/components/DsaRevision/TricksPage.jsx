import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lightbulb, Plus, Search, X, Trash2, Pencil, Hash,
  Clock, Filter, SortDesc, BookOpen, Sparkles
} from 'lucide-react'
import TrickNotepadModal from './TrickNotepadModal'

/* ─── Helpers ────────────────────────────────────────── */
function timeAgo(ts) {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

/* Strip HTML to plain text for card preview */
function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

/* ─── TrickCard ──────────────────────────────────────── */
const TrickCard = ({ trick, onEdit, onDelete, index }) => {
  const preview = stripHtml(trick.descriptionHtml)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group relative bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/80 dark:border-slate-700/50 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Amber left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-orange-500 rounded-l-2xl" />

      <div className="pl-5 pr-4 pt-4 pb-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-400/20 dark:from-amber-500/15 dark:to-orange-500/15 border border-amber-200/60 dark:border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb size={13} className="text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100 truncate group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              {trick.title}
            </h3>
          </div>

          {/* Action buttons — visible on hover */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={() => onEdit(trick)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all cursor-pointer"
              title="Edit"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => onDelete(trick.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all cursor-pointer"
              title="Delete"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* Rich content preview */}
        {trick.descriptionHtml && (
          <div
            className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-4 prose prose-sm dark:prose-invert max-w-none
              [&_strong]:font-bold [&_strong]:text-gray-700 dark:[&_strong]:text-slate-300
              [&_em]:italic [&_em]:text-gray-600 dark:[&_em]:text-slate-400
              [&_code]:font-mono [&_code]:text-xs [&_code]:bg-gray-100 dark:[&_code]:bg-slate-700 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-amber-700 dark:[&_code]:text-amber-400
              [&_mark]:bg-amber-100 dark:[&_mark]:bg-amber-500/20 [&_mark]:px-0.5 [&_mark]:rounded
              [&_del]:line-through [&_u]:underline"
            dangerouslySetInnerHTML={{ __html: trick.descriptionHtml }}
          />
        )}

        {/* Tags */}
        {trick.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {trick.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-500/15"
              >
                <Hash size={8} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-1.5 text-[10px] text-gray-300 dark:text-slate-600 pt-1.5 border-t border-gray-100 dark:border-slate-700/50">
          <Clock size={9} />
          <span>{timeAgo(trick.updatedAt)}</span>
          {trick.topic && (
            <>
              <span>·</span>
              <span className="text-amber-400 dark:text-amber-500/70">{trick.topic}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Full Trick Detail (expandable view) ────────────── */
const TrickDetailPanel = ({ trick, onClose, onEdit }) => {
  if (!trick) return null
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.25 }}
      className="fixed right-0 top-16 bottom-0 w-full max-w-lg bg-white dark:bg-[#131c31] border-l border-gray-200 dark:border-slate-800 shadow-2xl z-30 overflow-y-auto"
    >
      <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800 bg-white/90 dark:bg-[#131c31]/90 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-500" />
          <span className="font-bold text-gray-900 dark:text-slate-100 text-sm">{trick.title}</span>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onEdit(trick)} className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
            <Pencil size={14} />
          </button>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors cursor-pointer">
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Full rich content */}
        <div
          className="prose prose-sm dark:prose-invert max-w-none
            [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-gray-900 dark:[&_h2]:text-slate-100 [&_h2]:mt-4 [&_h2]:mb-2
            [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-800 dark:[&_h3]:text-slate-200 [&_h3]:mt-3 [&_h3]:mb-1.5
            [&_p]:text-gray-700 dark:[&_p]:text-slate-300 [&_p]:leading-relaxed [&_p]:mb-3
            [&_strong]:font-bold [&_strong]:text-gray-900 dark:[&_strong]:text-slate-100
            [&_em]:italic [&_em]:text-gray-700 dark:[&_em]:text-slate-300
            [&_u]:underline
            [&_del]:line-through [&_del]:text-gray-400
            [&_mark]:bg-amber-100 dark:[&_mark]:bg-amber-500/25 [&_mark]:text-amber-900 dark:[&_mark]:text-amber-200 [&_mark]:px-0.5 [&_mark]:rounded
            [&_code]:font-mono [&_code]:text-xs [&_code]:bg-amber-50 dark:[&_code]:bg-slate-800 [&_code]:text-amber-700 dark:[&_code]:text-amber-400 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:border [&_code]:border-amber-100 dark:[&_code]:border-slate-700
            [&_pre]:bg-[#0d1117] dark:[&_pre]:bg-slate-900 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-gray-800 dark:[&_pre]:border-slate-700
            [&_pre_code]:bg-transparent [&_pre_code]:border-0 [&_pre_code]:text-green-400 dark:[&_pre_code]:text-green-400 [&_pre_code]:text-sm [&_pre_code]:px-0 [&_pre_code]:py-0
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-3
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:mb-3
            [&_li]:text-gray-700 dark:[&_li]:text-slate-300
            [&_blockquote]:border-l-4 [&_blockquote]:border-amber-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 dark:[&_blockquote]:text-slate-400 [&_blockquote]:my-4
            [&_hr]:border-gray-200 dark:[&_hr]:border-slate-700 [&_hr]:my-6
            [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-800 dark:[&_a]:hover:text-blue-300"
          dangerouslySetInnerHTML={{ __html: trick.descriptionHtml }}
        />

        {/* Tags */}
        {trick.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
            {trick.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                <Hash size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-[10px] text-gray-300 dark:text-slate-600 mt-4">
          Last updated {timeAgo(trick.updatedAt)}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Empty state ────────────────────────────────────── */
const EmptyState = ({ onAdd, hasSearch }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-24 text-center px-6"
  >
    <div className="relative mb-6">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400/20 to-orange-400/20 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-200/60 dark:border-amber-500/20 flex items-center justify-center">
        <Lightbulb size={36} className="text-amber-500 dark:text-amber-400" />
      </div>
      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
        <Sparkles size={12} className="text-white" />
      </div>
    </div>
    {hasSearch ? (
      <>
        <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">No tricks found</h3>
        <p className="text-sm text-gray-400 dark:text-slate-500 max-w-xs">Try a different search term or tag filter.</p>
      </>
    ) : (
      <>
        <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">No tricks yet</h3>
        <p className="text-sm text-gray-400 dark:text-slate-500 max-w-sm mb-6 leading-relaxed">
          Tricks are those unnamed insights and patterns that save you in interviews. Start capturing them now.
        </p>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm shadow-lg shadow-amber-300/30 dark:shadow-amber-900/30 transition-all hover:scale-105 cursor-pointer"
        >
          <Plus size={16} />
          Add your first trick
        </button>
      </>
    )}
  </motion.div>
)

/* ─── Main TricksPage ────────────────────────────────── */
const TricksPage = ({ tricks, addTrick, updateTrick, deleteTrick }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTrick, setEditingTrick] = useState(null)
  const [selectedTrick, setSelectedTrick] = useState(null)
  const [query, setQuery] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [sort, setSort] = useState('newest')

  // Gather all unique tags from tricks
  const allTags = useMemo(() => {
    const set = new Set()
    tricks.forEach(t => t.tags?.forEach(tag => set.add(tag)))
    return [...set].sort()
  }, [tricks])

  // Filter + sort
  const filteredTricks = useMemo(() => {
    let result = [...tricks]
    const q = query.toLowerCase().trim()
    if (q) {
      result = result.filter(t =>
        t.title?.toLowerCase().includes(q) ||
        stripHtml(t.descriptionHtml).toLowerCase().includes(q) ||
        t.tags?.some(tag => tag.toLowerCase().includes(q))
      )
    }
    if (filterTag) {
      result = result.filter(t => t.tags?.includes(filterTag))
    }
    if (sort === 'oldest') result.sort((a, b) => a.createdAt - b.createdAt)
    else if (sort === 'alpha') result.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    else result.sort((a, b) => b.updatedAt - a.updatedAt) // newest
    return result
  }, [tricks, query, filterTag, sort])

  const openAdd = () => {
    setEditingTrick(null)
    setModalOpen(true)
  }

  const openEdit = (trick) => {
    setEditingTrick(trick)
    setModalOpen(true)
    setSelectedTrick(null)
  }

  const handleSave = (data) => {
    if (editingTrick) {
      updateTrick(editingTrick.id, data)
    } else {
      addTrick(data)
    }
  }

  const handleDelete = (id) => {
    if (selectedTrick?.id === id) setSelectedTrick(null)
    deleteTrick(id)
  }

  return (
    <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 pt-16 md:pt-20">

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-300/40 dark:shadow-amber-900/40">
                  <Lightbulb size={18} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                  My Tricks
                  <span className="ml-2 text-sm font-normal text-gray-400 dark:text-slate-500">
                    ({tricks.length})
                  </span>
                </h1>
              </div>
              <p className="text-sm text-gray-400 dark:text-slate-500 ml-11">
                Unnamed patterns and insights that save you in interviews
              </p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm shadow-md shadow-amber-300/30 dark:shadow-amber-900/40 transition-all hover:scale-105 hover:shadow-lg flex-shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <Plus size={16} />
              Add Trick
            </button>
          </div>
        </motion.div>

        {/* ── Search + filter bar ── */}
        {tricks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="flex flex-col sm:flex-row gap-2.5 mb-6"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search tricks…"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500/60 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-500/10 transition-all"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 cursor-pointer">
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Tag filter */}
            {allTags.length > 0 && (
              <div className="relative">
                <select
                  value={filterTag}
                  onChange={e => setFilterTag(e.target.value)}
                  className="appearance-none pl-9 pr-8 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-gray-700 dark:text-slate-200 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500/60 cursor-pointer transition-all min-w-[140px]"
                >
                  <option value="">All Tags</option>
                  {allTags.map(t => <option key={t} value={t}>#{t}</option>)}
                </select>
                <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            )}

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none pl-9 pr-8 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-gray-700 dark:text-slate-200 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500/60 cursor-pointer transition-all"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="alpha">A → Z</option>
              </select>
              <SortDesc size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </motion.div>
        )}

        {/* ── Tag filter chips ── */}
        {filterTag && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-400 dark:text-slate-500">Filtered by:</span>
            <button
              onClick={() => setFilterTag('')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-200 dark:hover:bg-amber-500/25 transition-colors cursor-pointer"
            >
              <Hash size={10} />
              {filterTag}
              <X size={10} />
            </button>
          </div>
        )}

        {/* ── Cards grid ── */}
        {filteredTricks.length === 0 ? (
          <EmptyState onAdd={openAdd} hasSearch={!!query || !!filterTag} />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredTricks.map((trick, i) => (
                <TrickCard
                  key={trick.id}
                  trick={trick}
                  index={i}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onClick={() => setSelectedTrick(trick)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* ── Detail panel ── */}
      <AnimatePresence>
        {selectedTrick && (
          <TrickDetailPanel
            trick={selectedTrick}
            onClose={() => setSelectedTrick(null)}
            onEdit={openEdit}
          />
        )}
      </AnimatePresence>

      {/* ── Notepad modal ── */}
      <TrickNotepadModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingTrick(null) }}
        onSave={handleSave}
        initialData={editingTrick}
      />
    </div>
  )
}

export default TricksPage
