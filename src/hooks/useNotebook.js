import { useState, useCallback } from 'react'

const STORAGE_KEY = 'ca_notebook'

function loadNotebook() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { html: '', savedAt: null }
    const parsed = JSON.parse(raw)
    return {
      html: parsed.html || '',
      savedAt: parsed.savedAt || null,
    }
  } catch {
    return { html: '', savedAt: null }
  }
}

/**
 * useNotebook — manages a single global rich-text notebook stored in localStorage.
 *
 * Behaviour:
 *  - `save(html)`   → stores a full snapshot; isDirty → false
 *  - `update(html)` → appends / overwrites with the current editor content; isDirty → false
 *  - `markDirty()`  → called by the editor's onUpdate to flag unsaved changes
 */
export function useNotebook() {
  const [notebook, setNotebook] = useState(() => loadNotebook())
  const [isDirty, setIsDirty] = useState(false)

  /** Save a complete snapshot of the editor content */
  const save = useCallback((html) => {
    const entry = { html, savedAt: Date.now() }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry))
    } catch {
      // storage quota exceeded — ignore silently
    }
    setNotebook(entry)
    setIsDirty(false)
  }, [])

  /**
   * Update — conceptually "commit new additions".
   * For a single flat document this is identical to save() but it is
   * surfaced separately so the UI can show distinct states.
   */
  const update = useCallback((html) => {
    const entry = { html, savedAt: Date.now() }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry))
    } catch {
      // ignore
    }
    setNotebook(entry)
    setIsDirty(false)
  }, [])

  /** Call this from the TipTap onUpdate callback */
  const markDirty = useCallback(() => setIsDirty(true), [])

  return {
    initialHtml: notebook.html,
    savedAt: notebook.savedAt,
    isDirty,
    save,
    update,
    markDirty,
  }
}
