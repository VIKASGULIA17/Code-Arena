import { useState, useCallback, useMemo } from 'react'
import { useDsaContext } from '../context/DsaContext'
import axios from 'axios'
import { useAppContext } from '../context/AppContext';

const STORAGE_KEY = 'dsa-revision-progress'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
 * Build a flat list of all completable items from dsaContent.
 * Each item key: "categoryId:topicId:subtopicType:subtopicId"
 * subtopicType is either "theory" or "template"
*/
const getAllItems = (dsaContent) => {
  const items = []
  Object.entries(dsaContent || {}).forEach(([catId, category]) => {
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
  const { dsaContent } = useDsaContext();
  const {jwtToken} =  useAppContext();
  const allItems = useMemo(() => getAllItems(dsaContent || {}), [dsaContent])

  const toggleComplete = useCallback(async (key, onlyTemplate) => {

    // console.log("toggleComplete called with key:", key, "onlyTemplate:", onlyTemplate);

    try {
      // console.log("toggle complete hitted",jwtToken);
      const result = await axios.put(`${BACKEND_URL}/user/markDSAContentCompleted/${onlyTemplate}`,{
        
      },{
        headers:{
          Authorization:`Bearer ${jwtToken}`
        }
      });
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
    }
    catch (e) {
      console.log("Error occured");
    }


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
