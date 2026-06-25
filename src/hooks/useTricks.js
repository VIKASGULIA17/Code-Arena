import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'ca_tricks'

function loadTricks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveTricks(tricks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tricks))
  } catch {
    // storage quota exceeded — silently ignore
  }
}

export function useTricks() {
  const [tricks, setTricks] = useState(() => loadTricks())

  // Keep localStorage in sync whenever state changes
  useEffect(() => {
    saveTricks(tricks)
  }, [tricks])

  const addTrick = useCallback((data) => {
    const newTrick = {
      id: crypto.randomUUID(),
      title: data.title || 'Untitled Trick',
      descriptionHtml: data.descriptionHtml || '',
      tags: data.tags || [],
      topic: data.topic || '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setTricks(prev => [newTrick, ...prev])
    return newTrick
  }, [])

  const updateTrick = useCallback((id, updates) => {
    setTricks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, ...updates, updatedAt: Date.now() }
          : t
      )
    )
  }, [])

  const deleteTrick = useCallback((id) => {
    setTricks(prev => prev.filter(t => t.id !== id))
  }, [])

  // Sorted newest-first
  const sortedTricks = [...tricks].sort((a, b) => b.updatedAt - a.updatedAt)

  return { tricks: sortedTricks, addTrick, updateTrick, deleteTrick }
}
