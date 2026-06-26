import { useState, useCallback } from 'react'

const STORAGE_KEY = 'ca_notebook'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function loadNotebook() {
  try {
    console.log("loading notebook from backend",BACKEND_URL);
    const result = await fetch(`${BACKEND_URL}/trick/get`)
    const raw = await result.text();
    console.log("raw data is : ", raw)
    return {
      html: raw || '',
      savedAt: null || null, 
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
  console.log("notebook is : ", notebook)
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
      console.log('updating notebook', html)
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
