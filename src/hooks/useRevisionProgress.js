import { useState, useCallback, useMemo } from 'react'
import { dsaCategories } from '../data/DsaTopics'

const STORAGE_KEY = 'dsa-revision-progress'

const loadProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

const saveProgress = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // silently fail
  }
}

/**
 * Build a flat list of all completable items from dsaCategories.
 * Each item key: "categoryId:topicId:subtopicType:subtopicId"
 * subtopicType is either "theory" or "template"
 */
const getAllItems = () => {
  const items = []
  Object.entries(dsaCategories).forEach(([catId, category]) => {
    Object.entries(category.topics).forEach(([topicId, topic]) => {
      // Theory counts as one item
      if (topic.theory) {
        items.push({ key: `${catId}:${topicId}:theory`, catId, topicId, type: 'theory', id: 'theory' })
      }
      // Each code template is an item
      if (topic.codeTemplates) {
        Object.keys(topic.codeTemplates).forEach(templateId => {
          items.push({ key: `${catId}:${topicId}:template:${templateId}`, catId, topicId, type: 'template', id: templateId })
        })
      }
    })
  })
  return items
}

export const useRevisionProgress = () => {
  const [completed, setCompleted] = useState(loadProgress)

  const allItems = useMemo(() => getAllItems(), [])

  const toggleComplete = useCallback((key) => {
    setCompleted(prev => {
      const next = { ...prev }
      if (next[key]) {
        delete next[key]
      } else {
        next[key] = true
      }
      saveProgress(next)
      return next
    })
  }, [])

  const isCompleted = useCallback((key) => {
    return !!completed[key]
  }, [completed])

  const getModuleProgress = useCallback((catId, topicId) => {
    const moduleItems = allItems.filter(item => item.catId === catId && item.topicId === topicId)
    const total = moduleItems.length
    const done = moduleItems.filter(item => completed[item.key]).length
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 }
  }, [allItems, completed])

  const getOverallProgress = useCallback(() => {
    const total = allItems.length
    const done = allItems.filter(item => completed[item.key]).length
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 }
  }, [allItems, completed])

  const resetProgress = useCallback(() => {
    setCompleted({})
    saveProgress({})
  }, [])

  return {
    completed,
    toggleComplete,
    isCompleted,
    getModuleProgress,
    getOverallProgress,
    resetProgress
  }
}
