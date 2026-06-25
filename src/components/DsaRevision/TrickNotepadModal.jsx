import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import {
  X, Save, Lightbulb, Hash, Tag, ChevronDown,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Code, List, ListOrdered, Quote, Heading2, Heading3,
  Link as LinkIcon, Highlighter, Minus, RotateCcw, RotateCw,
  AlignLeft
} from 'lucide-react'
import { useDsaContext } from '../../context/DsaContext'

/* ─── Toolbar button ─────────────────────────────────── */
const ToolBtn = ({ onClick, active, title, children, disabled }) => (
  <button
    type="button"
    onMouseDown={e => { e.preventDefault(); onClick() }}
    disabled={disabled}
    title={title}
    className={`
      p-1.5 rounded-md text-sm transition-all duration-150 cursor-pointer
      ${active
        ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
        : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-800 dark:hover:text-slate-200'
      }
      ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
    `}
  >
    {children}
  </button>
)

const Divider = () => (
  <span className="w-px h-5 bg-gray-200 dark:bg-slate-700 mx-0.5 flex-shrink-0" />
)

/* ─── Rich-text toolbar ──────────────────────────────── */
const RichToolbar = ({ editor }) => {
  if (!editor) return null

  const setLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-amber-200/60 dark:border-slate-700/60 bg-amber-50/50 dark:bg-slate-800/50 rounded-t-xl">
      {/* History */}
      <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo" disabled={!editor.can().undo()}>
        <RotateCcw size={14} />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo" disabled={!editor.can().redo()}>
        <RotateCw size={14} />
      </ToolBtn>
      <Divider />

      {/* Headings */}
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
        <Heading2 size={14} />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
        <Heading3 size={14} />
      </ToolBtn>
      <Divider />

      {/* Inline marks */}
      <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
        <Bold size={14} />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
        <Italic size={14} />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
        <UnderlineIcon size={14} />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
        <Strikethrough size={14} />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">
        <Highlighter size={14} />
      </ToolBtn>
      <Divider />

      {/* Code */}
      <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline Code">
        <Code size={14} />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
        <span className="text-[10px] font-mono font-bold px-0.5">{'</>'}</span>
      </ToolBtn>
      <Divider />

      {/* Lists & blocks */}
      <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
        <List size={14} />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List">
        <ListOrdered size={14} />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
        <Quote size={14} />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
        <Minus size={14} />
      </ToolBtn>
      <Divider />

      {/* Link */}
      <ToolBtn onClick={setLink} active={editor.isActive('link')} title="Add Link">
        <LinkIcon size={14} />
      </ToolBtn>
    </div>
  )
}

/* ─── Main Modal ─────────────────────────────────────── */
const TrickNotepadModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const { dsaContent } = useDsaContext()
  const [title, setTitle] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [topic, setTopic] = useState('')
  const [topicOpen, setTopicOpen] = useState(false)
  const tagRef = useRef(null)

  const topicOptions = Object.entries(dsaContent || {}).flatMap(([, cat]) =>
    Object.entries(cat.topics || {}).map(([key, t]) => ({ key, label: t.title }))
  )

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: { class: 'trick-code-block' },
        },
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      Placeholder.configure({ placeholder: 'Write your trick here… be specific, include the insight that makes it click.' }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'trick-link' } }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'trick-editor-area focus:outline-none',
      },
    },
  })

  // Populate fields when editing an existing trick
  useEffect(() => {
    if (!isOpen) return
    if (initialData) {
      setTitle(initialData.title || '')
      setTags(initialData.tags || [])
      setTopic(initialData.topic || '')
      editor?.commands.setContent(initialData.descriptionHtml || '')
    } else {
      setTitle('')
      setTags([])
      setTopic('')
      editor?.commands.setContent('')
    }
  }, [isOpen, initialData, editor])

  // Tag keyboard handling
  const handleTagKey = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim().toLowerCase().replace(/,/g, '')
      if (newTag && !tags.includes(newTag)) {
        setTags(prev => [...prev, newTag])
      }
      setTagInput('')
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags(prev => prev.slice(0, -1))
    }
  }

  const removeTag = (t) => setTags(prev => prev.filter(x => x !== t))

  const handleSave = () => {
    if (!title.trim() && !editor?.getText().trim()) return
    onSave({
      title: title.trim() || 'Untitled Trick',
      descriptionHtml: editor?.getHTML() || '',
      tags,
      topic,
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Paper modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -0.8, y: 24 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, rotate: 0.5, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/30 dark:shadow-black/60 trick-notepad-paper">

              {/* ── Notepad header ── */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-amber-200/60 dark:border-slate-700 bg-amber-50/80 dark:bg-[#1a2540] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-300/40 dark:shadow-amber-900/40">
                    <Lightbulb size={16} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-slate-100">
                      {initialData ? 'Edit Trick' : 'New Trick'}
                    </h2>
                    <p className="text-[10px] text-gray-400 dark:text-slate-500">Capture the pattern before you forget</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── Scrollable body ── */}
              <div className="overflow-y-auto flex-1 trick-notepad-body">

                {/* Title input */}
                <div className="px-5 pt-4 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <AlignLeft size={12} className="text-amber-500 dark:text-amber-400 flex-shrink-0" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">Title</span>
                  </div>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Give this trick a short label…"
                    className="w-full bg-transparent text-lg font-bold text-gray-900 dark:text-slate-100 placeholder:text-gray-300 dark:placeholder:text-slate-600 border-none outline-none resize-none"
                  />
                </div>

                {/* Rich text editor */}
                <div className="mx-5 mb-4 rounded-xl border border-amber-200/60 dark:border-slate-700/60 overflow-hidden bg-white dark:bg-slate-900/60">
                  <RichToolbar editor={editor} />
                  <div className="trick-ruled-area min-h-[180px] px-4 py-3">
                    <EditorContent editor={editor} />
                  </div>
                </div>

                {/* Tags */}
                <div className="px-5 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={12} className="text-amber-500 dark:text-amber-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">Tags</span>
                    <span className="text-[10px] text-gray-300 dark:text-slate-600">press Enter or , to add</span>
                  </div>
                  <div
                    className="flex flex-wrap gap-1.5 items-center min-h-[38px] px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 cursor-text"
                    onClick={() => tagRef.current?.focus()}
                  >
                    {tags.map(t => (
                      <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
                        <Hash size={9} />
                        {t}
                        <button type="button" onClick={() => removeTag(t)} className="hover:text-red-500 cursor-pointer">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                    <input
                      ref={tagRef}
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={handleTagKey}
                      placeholder={tags.length === 0 ? 'two-pointer, arrays…' : ''}
                      className="flex-1 min-w-[100px] bg-transparent text-sm text-gray-800 dark:text-slate-200 placeholder:text-gray-300 dark:placeholder:text-slate-600 outline-none border-none"
                    />
                  </div>
                </div>

                {/* Topic dropdown */}
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash size={12} className="text-amber-500 dark:text-amber-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">Related Topic</span>
                    <span className="text-[10px] text-gray-300 dark:text-slate-600">(optional)</span>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setTopicOpen(o => !o)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-sm text-left text-gray-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500/40 transition-colors cursor-pointer"
                    >
                      <span className={topic ? '' : 'text-gray-300 dark:text-slate-600'}>
                        {topic ? topicOptions.find(o => o.key === topic)?.label || topic : 'Select a topic…'}
                      </span>
                      <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${topicOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {topicOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 right-0 mt-1.5 z-10 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto"
                        >
                          <button
                            type="button"
                            onClick={() => { setTopic(''); setTopicOpen(false) }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                          >
                            None
                          </button>
                          {topicOptions.map(opt => (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => { setTopic(opt.key); setTopicOpen(false) }}
                              className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer
                                ${topic === opt.key
                                  ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium'
                                  : 'text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* ── Footer actions ── */}
              <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-amber-200/60 dark:border-slate-700 bg-amber-50/60 dark:bg-[#1a2540]/80 flex-shrink-0">
                <p className="text-[10px] text-gray-400 dark:text-slate-500 italic">
                  Rich formatting preserved on save
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-slate-700/80 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-300/30 dark:shadow-amber-900/40 transition-all cursor-pointer"
                  >
                    <Save size={14} />
                    Save Trick
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TrickNotepadModal
