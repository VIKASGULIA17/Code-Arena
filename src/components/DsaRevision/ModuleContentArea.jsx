import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Circle, ArrowLeft, ArrowRight,
  BookOpen, Code2, Clock, Zap, Target, ChevronRight, PlayCircle, ExternalLink, Plus,
  Pen,
  Share,
  Trash2
} from 'lucide-react'
import { TheorySection } from '../theory/TheorySection'
import { CodeBlock } from '../code/codeblock'
import DsaTemplateButton from './DsaTemplateButton'
import AddTopicModal from './AddTopicModal'
import AddHeaderModal from './AddHeaderModal'
import { useDsaContext } from '../../context/DsaContext'


const difficultyColors = {
  'Beginner': 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
  'Intermediate': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
  'Advanced': 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
  'Extreme': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20'
}

const topicIcons = {
  'arrays': '📊', 'linked-lists': '🔗', 'stacks': '📚', 'queues': '🎫',
  'trees': '🌳', 'graphs': '🕸️', 'sorting': '🔄', 'searching': '🔍',
  'dynamic-programming': '⚡', 'greedy': '🎯', 'merge-sort': '🔀',
  'graph-algorithms': '🕸️', 'advanced-cp': '🚀'
}

/**
 * Build all subtopics for nav purposes
 */
const buildSubtopicList = (catId, topicId, topic) => {
  const list = []
  console.log(topic);
  console.log(topicId);
  if (topic.theory) {
    list.push({ type: 'theory', id: 'theory', label: 'Theory & Concepts', key: `${catId}:${topicId}:theory` })
  }
  if (topic.codeTemplates) {
    Object.entries(topic.codeTemplates).forEach(([templateId, template]) => {
      list.push({ type: 'template', id: templateId, label: template.title, key: `${catId}:${topicId}:template:${templateId}` })
    })
  }
  return list
}

/** Welcome/overview screen when no subtopic is selected */
const WelcomeScreen = ({ getOverallProgress }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [headerModalOpen, setHeaderModalOpen] = useState(false)
  const overall = getOverallProgress()

  // const handleDeleteCategory = () => {
  //   // Implement category deletion logic here
  // }

  const { dsaContent } = useDsaContext();

  const categoryColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-amber-500 to-orange-500',
    'from-emerald-500 to-teal-500',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8"
    >
      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
          <BookOpen size={40} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
          <Zap size={12} className="text-white" />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-3 tracking-tight">
        Welcome to{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          DSA Revision
        </span>
      </h1>
      <p className="text-gray-500 dark:text-slate-400 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
        Pick a module from the sidebar to start learning. Track your progress as you master each topic.
      </p>

      {/* Progress card */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700/50 shadow-sm p-6 w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">Overall Progress</span>
          </div>
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{overall.percent}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 dark:bg-slate-700/60 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${overall.percent}%` }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 dark:text-slate-500">{overall.done} of {overall.total} completed</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{overall.total - overall.done} remaining</span>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-2xl">
        {Object.entries(dsaContent).map(([catId, category], i) => (
          <div
            key={catId}
            className="group bg-white dark:bg-slate-800/60 rounded-2xl border border-gray-200 dark:border-slate-700/50 p-5 text-left hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-md dark:hover:shadow-blue-900/20 transition-all duration-200"
          >
           <div className='flex gap-2  items-start'> <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${categoryColors[i % categoryColors.length]} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-200`}>
              <Code2 size={16} className="text-white" />
            </div>
            <button
              // onClick={() => handleDeleteCategory(catId)}
              className="cursor-pointer ml-auto text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 size={18} />
            </button>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{category.title}</h3>
            <p className="text-xs text-gray-400 dark:text-slate-500">{Object.keys(category.topics).length} modules</p>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex items-center gap-3">


        <button
          onClick={() => setHeaderModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-gray-300 dark:border-slate-600 text-sm font-medium text-gray-500 dark:text-slate-400 hover:border-purple-400 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-500/5 transition-all duration-200 cursor-pointer"
        >
          <Plus size={15} />
          Add New Category
        </button>
      </div>


      <AddHeaderModal isOpen={headerModalOpen} onClose={() => setHeaderModalOpen(false)} />
    </motion.div>
  )
}

/** Module overview when topic is selected but no subtopic */
const ModuleOverview = ({ catId, topicId, topic, category, getModuleProgress, onSelectSubtopic, onOpenTemplateModal }) => {
  const progress = getModuleProgress(catId, topicId)
  const icon = topicIcons[topicId] || '💡'
  console.log("topicId : ", topicId);
  const subtopics = buildSubtopicList(catId, topicId, topic)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-xl px-4 py-2.5 w-fit">
        <span className="hover:text-gray-600 dark:hover:text-slate-300 transition-colors">Modules</span>
        <ChevronRight size={12} />
        <span className="hover:text-gray-600 dark:hover:text-slate-300 transition-colors">{category.title}</span>
        <ChevronRight size={12} />
        <span className="text-gray-700 dark:text-slate-200 font-semibold">{topic.title}</span>
      </nav>

      {/* Module Header Card */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700/50 shadow-sm p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center text-4xl flex-shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 break-words tracking-tight">{topic.title}</h1>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border flex-shrink-0 ${difficultyColors[topic.difficulty] || ''}`}>
                {topic.difficulty}
              </span>
            </div>
            <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">{topic.description}</p>
          </div>
          <div className="flex-shrink-0">
            <DsaTemplateButton
              onClick={onOpenTemplateModal}
              variant="primary"
              size="sm"
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-4 text-center border border-blue-100 dark:border-blue-500/20">
            <Code2 className="mx-auto mb-1.5 text-blue-500 dark:text-blue-400" size={20} />
            <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{Object.keys(topic.codeTemplates || {}).length}</div>
            <div className="text-xs text-blue-500/70 dark:text-blue-400/70 font-medium">Templates</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-500/10 rounded-xl p-4 text-center border border-amber-100 dark:border-amber-500/20">
            <Zap className="mx-auto mb-1.5 text-amber-500 dark:text-amber-400" size={20} />
            <div className="text-xl font-bold text-amber-700 dark:text-amber-300">4</div>
            <div className="text-xs text-amber-500/70 dark:text-amber-400/70 font-medium">Languages</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-500/10 rounded-xl p-4 text-center border border-purple-100 dark:border-purple-500/20">
            <Target className="mx-auto mb-1.5 text-purple-500 dark:text-purple-400" size={20} />
            <div className="text-xl font-bold text-purple-700 dark:text-purple-300">{progress.percent}%</div>
            <div className="text-xs text-purple-500/70 dark:text-purple-400/70 font-medium">Completed</div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-xl p-4 text-center border border-emerald-100 dark:border-emerald-500/20">
            <Clock className="mx-auto mb-1.5 text-emerald-500 dark:text-emerald-400" size={20} />
            <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{subtopics.length}</div>
            <div className="text-xs text-emerald-500/70 dark:text-emerald-400/70 font-medium">Subtopics</div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-slate-400 font-medium">Module Progress</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{progress.done}/{progress.total} completed</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Subtopic List */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700/50">
          <h2 className="text-base font-bold text-gray-900 dark:text-slate-100">Contents</h2>
          <span className="text-xs font-medium text-gray-400 dark:text-slate-500 bg-gray-100 dark:bg-slate-900/60 px-2.5 py-1 rounded-full">{subtopics.length} items</span>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-slate-700/40">
          {subtopics.map((sub, index) => (
            <button
              key={`${sub.type}-${sub.id}`}
              onClick={() => onSelectSubtopic(catId, topicId, sub.type, sub.id)}
              className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-blue-50/60 dark:hover:bg-blue-500/5 transition-colors text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-slate-900/60 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-200 flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-gray-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{sub.label}</span>
                <span className="block text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                  {sub.type === 'theory'
                    ? <span className="inline-flex items-center gap-1"><BookOpen size={10} /> Theory &amp; Concepts</span>
                    : <span className="inline-flex items-center gap-1"><Code2 size={10} /> Code Template</span>
                  }
                </span>
              </div>
              <ChevronRight size={16} className="text-gray-300 dark:text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/** Subtopic content view */
const SubtopicContent = ({ catId, topicId, topic, category, subtopic, isCompleted, toggleComplete, onSelectSubtopic, onOpenTemplateModal }) => {
  console.log("start");
  console.log(catId + " " + topicId + " " + topic);
  const subtopics = buildSubtopicList(catId, topicId, topic)
  const currentIndex = subtopics.findIndex(s => s.type === subtopic.type && s.id === subtopic.id)
  const prevSub = currentIndex > 0 ? subtopics[currentIndex - 1] : null
  const nextSub = currentIndex < subtopics.length - 1 ? subtopics[currentIndex + 1] : null

  const itemKey = subtopic.type === 'theory'
    ? `${catId}:${topicId}:theory`
    : `${catId}:${topicId}:template:${subtopic.id}`
  const completed = isCompleted(itemKey)

  const handleEditTemplate = () => {
    const template = topic.codeTemplates?.[subtopic.id] || {}
    const initialData = {
      templateId: subtopic.id,
      title: template.title || "",
      problemLinks: template.problemLinks && template.problemLinks.length > 0 ? template.problemLinks : [""],
      videoLinks: template.videoLinks && template.videoLinks.length > 0 ? template.videoLinks : [""],
      cpp: template.cpp || "",
      java: template.java || "",
      javascript: template.javascript || "",
      python: template.python || "",
    }
    onOpenTemplateModal("edit", initialData)
  }

  return (
    <motion.div
      key={`${catId}-${topicId}-${subtopic.type}-${subtopic.id}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-xl px-4 py-2.5 w-fit flex-wrap">
        <span>Modules</span>
        <ChevronRight size={12} />
        <span>{category.title}</span>
        <ChevronRight size={12} />
        <button
          className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
          onClick={() => onSelectSubtopic(catId, topicId, null, null)}
        >
          {topic.title}
        </button>
        <ChevronRight size={12} />
        <span className="text-gray-700 dark:text-slate-200 font-semibold">
          {subtopic.type === 'theory' ? 'Theory' : topic.codeTemplates?.[subtopic.id]?.title || subtopic.id}
        </span>
      </nav>

      {/* Title + Mark Complete */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 order-1 break-words tracking-tight">
          {subtopic.type === 'theory' ? `${topic.title} — Theory` : topic.codeTemplates?.[subtopic.id]?.title}
        </h1>
        <button
          onClick={() => toggleComplete(itemKey)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex-shrink-0 order-2 sm:order-3 shadow-sm
            ${completed
              ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200 dark:shadow-emerald-900/30'
              : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
            }
          `}
          data-testid="mark-complete-btn"
        >
          {completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
          <span className="hidden sm:inline">{completed ? 'Completed' : 'Mark Complete'}</span>
          <span className="sm:hidden">{completed ? 'Done' : 'Mark'}</span>
        </button>
      </div>

      {/* Content */}
      <div>
        {subtopic.type === 'theory' && topic.theory && (
          <TheorySection theory={topic.theory} topicTitle={topic.title} />
        )}


        {subtopic.type === 'template' && topic.codeTemplates?.[subtopic.id] && (
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700/50 shadow-sm overflow-hidden">


            <div className="p-6 border-b border-gray-100 dark:border-slate-700/50">

              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3 tracking-tight">{topic.codeTemplates[subtopic.id].title}</h3>
                <div className="flex gap-3">

                  <button
                    onClick={handleEditTemplate}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 px-2.5 py-1 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                  >
                    <Pen size={12} />
                  </button>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 px-2.5 py-1 rounded-full">
                    <Share size={12} />
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 px-2.5 py-1 rounded-full">
                  <Code2 size={12} /> 4 Languages
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2.5 py-1 rounded-full">
                  <Target size={12} /> Production Ready
                </span>
              </div>

              {((topic.codeTemplates[subtopic.id].videoLinks?.length > 0) || (topic.codeTemplates[subtopic.id].problemLinks?.length > 0)) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {topic.codeTemplates[subtopic.id].videoLinks?.map((link, idx) => (
                    <a
                      key={`video-${idx}`}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-red-200 bg-gray-50/50 hover:bg-red-50/50 dark:bg-slate-900/50 dark:border-slate-700/50 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-100 text-red-500 dark:bg-red-500/20 dark:text-red-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <PlayCircle size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 dark:text-slate-100 truncate">Video Tutorial{topic.codeTemplates[subtopic.id].videoLinks.length > 1 ? ` ${idx + 1}` : ''}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400 truncate">Watch explanation</div>
                      </div>
                    </a>
                  ))}
                  {topic.codeTemplates[subtopic.id].problemLinks?.map((link, idx) => (
                    <a
                      key={`problem-${idx}`}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 bg-gray-50/50 hover:bg-blue-50/50 dark:bg-slate-900/50 dark:border-slate-700/50 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <ExternalLink size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 dark:text-slate-100 truncate">Practice Problem{topic.codeTemplates[subtopic.id].problemLinks.length > 1 ? ` ${idx + 1}` : ''}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400 truncate">Solve on LeetCode</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <CodeBlock codeTemplates={topic.codeTemplates[subtopic.id]} templateId={subtopic.id} />
          </div>
        )}
      </div>

      {/* Prev/Next Navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-gray-200 dark:border-slate-700/50">
        {prevSub ? (
          <button
            onClick={() => onSelectSubtopic(catId, topicId, prevSub.type, prevSub.id)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 text-sm font-medium hover:border-blue-300 dark:hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all order-2 sm:order-1 group shadow-sm"
          >
            <ArrowLeft size={16} className="flex-shrink-0 group-hover:-translate-x-0.5 transition-transform" />
            <div className="text-left min-w-0">
              <span className="block text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Previous</span>
              <span className="block truncate max-w-[160px] font-semibold">{prevSub.label}</span>
            </div>
          </button>
        ) : <div className="order-2 sm:order-1" />}

        {nextSub ? (
          <button
            onClick={() => onSelectSubtopic(catId, topicId, nextSub.type, nextSub.id)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md shadow-blue-500/20 order-1 sm:order-2 group"
          >
            <div className="text-right min-w-0">
              <span className="block text-[10px] text-blue-100 uppercase tracking-wider mb-0.5">Next</span>
              <span className="block truncate max-w-[160px]">{nextSub.label}</span>
            </div>
            <ArrowRight size={16} className="flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-white text-sm font-semibold shadow-md shadow-emerald-500/20 order-1 sm:order-2">
            <CheckCircle2 size={16} />
            Module Complete!
          </div>
        )}
      </div>
    </motion.div>
  )
}

const ModuleContentArea = ({
  activeCategoryId,
  activeTopicId,
  activeSubtopic,
  isCompleted,
  toggleComplete,
  getModuleProgress,
  getOverallProgress,
  onSelectSubtopic,
  onOpenTemplateModal
}) => {
  const { dsaContent } = useDsaContext();
  const category = activeCategoryId ? dsaContent[activeCategoryId] : null
  const topic = category?.topics?.[activeTopicId]

  console.log("In Module Content Area : ", topic, " and ", category);

  return (
    <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 pt-16 md:pt-20">
        <AnimatePresence mode="wait">
          {!activeCategoryId || !activeTopicId ? (
            <WelcomeScreen key="welcome" getOverallProgress={getOverallProgress} />
          ) : !activeSubtopic || (!activeSubtopic.type && !activeSubtopic.id) ? (
            <ModuleOverview
              key={`overview-${activeCategoryId}-${activeTopicId}`}
              catId={activeCategoryId}
              topicId={activeTopicId}
              topic={topic}
              category={category}
              getModuleProgress={getModuleProgress}
              onSelectSubtopic={onSelectSubtopic}
              onOpenTemplateModal={onOpenTemplateModal}
            />
          ) : (
            <SubtopicContent
              key={`content-${activeCategoryId}-${activeTopicId}-${activeSubtopic.type}-${activeSubtopic.id}`}
              catId={activeCategoryId}
              topicId={activeTopicId}
              topic={topic}
              category={category}
              subtopic={activeSubtopic}
              isCompleted={isCompleted}
              toggleComplete={toggleComplete}
              onSelectSubtopic={onSelectSubtopic}
              onOpenTemplateModal={onOpenTemplateModal}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ModuleContentArea
