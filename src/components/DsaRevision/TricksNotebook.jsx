import React, { useEffect, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import {
  Save, RefreshCw, Lightbulb, CheckCircle2, Clock, BookOpen,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Code, List, ListOrdered, Quote, Heading2, Heading3,
  Link as LinkIcon, Highlighter, Minus, RotateCcw, RotateCw,
} from 'lucide-react'
import { useNotebook } from '../../hooks/useNotebook'

/* ─── Helpers ────────────────────────────────────────── */
function formatTime(ts) {
  if (!ts) return null
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/* ─── Toolbar button ─────────────────────────────────── */
const ToolBtn = ({ onClick, active, title, children, disabled }) => (
  <button
    type="button"
    onMouseDown={e => { e.preventDefault(); onClick() }}
    disabled={disabled}
    title={title}
    className={`
      p-1.5 rounded-md text-sm transition-all duration-150 cursor-pointer flex-shrink-0
      ${active
        ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
        : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/70 hover:text-gray-800 dark:hover:text-slate-200'
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

/* ─── Rich-text toolbar (with Save / Update appended) ── */
const RichToolbar = ({ editor, onSave, onUpdate, isDirty, savedAt }) => {
  if (!editor) return null

  const savedTimeLabel = formatTime(savedAt)

  const setLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-4 py-2 border-b border-amber-200/50 dark:border-slate-700/60 bg-amber-50/60 dark:bg-[#151e33] sticky top-0 z-10">

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

      {/* ── Save / Update — pushed to the far right ── */}
      <div className="ml-auto flex items-center gap-1.5 pl-2 border-l border-gray-200 dark:border-slate-700">

        {/* Saved status micro-label */}
        {savedTimeLabel && !isDirty && (
          <span className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 px-1 flex-shrink-0">
            <CheckCircle2 size={11} />
            {savedTimeLabel}
          </span>
        )}
        {isDirty && (
          <span className="hidden sm:flex items-center gap-1 text-[10px] text-amber-500 dark:text-amber-400 px-1 flex-shrink-0">
            <Clock size={11} />
            unsaved
          </span>
        )}

        {/* Save */}
        {/* <button
          type="button"
          onMouseDown={e => { e.preventDefault(); onSave() }}
          title="Save (Ctrl+S)"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-sm shadow-amber-300/30 dark:shadow-amber-900/30 transition-all hover:scale-105 cursor-pointer flex-shrink-0"
        >
          <Save size={13} />
          Save
        </button> */}

        {/* Update */}
        <button
          type="button"
          onMouseDown={e => { e.preventDefault(); onUpdate() }}
          title="Update with latest changes"
          disabled={!isDirty}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold  flex-shrink-0 ${
            isDirty
              ? 'bg-gradient-to-r transition-all hover:scale-105 cursor-pointer from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-sm shadow-indigo-300/30 dark:shadow-indigo-900/30'
              : 'bg-gray-100 cursor-not-allowed dark:bg-slate-700/60 text-gray-400 dark:text-slate-500'
          }`}
        >
          <RefreshCw size={13} className={isDirty ? 'animate-spin-slow' : ''} />
          Save
        </button>
      </div>
    </div>
  )
}

/* ─── Main TricksNotebook ────────────────────────────── */
const TricksNotebook = ({ onSwitchToModules }) => {
  const { initialHtml, savedAt, isDirty, save, update, markDirty } = useNotebook()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: { class: 'trick-code-block' },
        },
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      Placeholder.configure({
        placeholder: 'Start writing your tricks, patterns and insights here…',
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'trick-link' } }),
    ],
    content: initialHtml || '',
    editorProps: {
      attributes: {
        class: 'trick-editor-area notebook-editor focus:outline-none',
      },
    },
    onUpdate: () => {
      markDirty()
    },
  })

  /* Sync initial content once editor mounts */
  useEffect(() => {
    if (editor && initialHtml && editor.isEmpty) {
      editor.commands.setContent(initialHtml)
    }
  }, [editor, initialHtml])

  const handleSave = useCallback(() => {
    if (!editor) return
    save(editor.getHTML())
  }, [editor, save])

  const handleUpdate = useCallback(() => {
    if (!editor) return
    update(editor.getHTML())
  }, [editor, update])

  /* Keyboard shortcut: Ctrl+S / Cmd+S → Save */
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleSave])

  return (
    <div className="notebook-fullscreen flex flex-col" style={{ paddingTop: '64px', minHeight: '100vh' }}>

      {/* ── Top bar: icon + title LEFT, mode toggle RIGHT ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-amber-200/60 dark:border-slate-700/60 bg-amber-50/80 dark:bg-[#131c31] flex-shrink-0">

        {/* Left: identity only */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-300/30 dark:shadow-amber-900/30 flex-shrink-0">
            <Lightbulb size={16} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-gray-900 dark:text-slate-100 leading-none">
              My Tricks Notebook
            </h1>
            <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5">
              Patterns and insights — saved locally
            </p>
          </div>
        </div>

        {/* Right: Modules / Tricks toggle pill */}
        <div className="relative flex items-center bg-white dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700/60 rounded-full p-0.5 shadow-md dark:shadow-black/30">
          <button
            type="button"
            onClick={onSwitchToModules}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
          >
            <BookOpen size={12} />
            <span className="hidden sm:inline">Modules</span>
          </button>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
            <Lightbulb size={12} />
            <span className="hidden sm:inline">Tricks</span>
          </div>
        </div>
      </div>

      {/* ── Formatting toolbar with Save / Update at the end ── */}
      <RichToolbar
        editor={editor}
        onSave={handleSave}
        onUpdate={handleUpdate}
        isDirty={isDirty}
        savedAt={savedAt}
      />
      

      {/* ── Editor fills remaining height ── */}
      <div className="flex-1 notebook-paper overflow-y-auto">
        <div className="notebook-ruled-area min-h-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-8">
          <EditorContent editor={editor} className="max-w-4xl mx-auto" />
        </div>
      </div>
    </div>
  )
}

export default TricksNotebook
