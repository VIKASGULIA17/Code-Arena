import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Circle, ArrowLeft, ArrowRight,
  BookOpen, Code2, Clock, Zap, Target, ChevronRight, PlayCircle, ExternalLink
} from 'lucide-react'
import { dsaCategories } from '../../data/DsaTopics'
import { TheorySection } from '../theory/TheorySection'
import { CodeBlock } from '../code/codeblock'

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
  const overall = getOverallProgress()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
        <BookOpen size={36} className="text-white" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-3">
        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">DSA Revision</span>
      </h1>
      <p className="text-gray-500 dark:text-slate-400 text-lg max-w-xl mb-8">
        Select a module from the sidebar to begin your learning journey. Track your progress as you master each topic.
      </p>

      {/* Progress summary */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700/50 shadow-sm p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600 dark:text-slate-300">Your Progress</span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{overall.percent}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 dark:bg-slate-700/50 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${overall.percent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs text-gray-400 dark:text-slate-500">{overall.done} of {overall.total} items completed</span>
      </div>

      {/* Quick module cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
        {Object.entries(dsaCategories).map(([catId, category]) => (
          <div key={catId} className="bg-white dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700/50 p-4 text-left">
            <h3 className="font-semibold text-gray-900 dark:text-slate-200 text-sm mb-1">{category.title}</h3>
            <p className="text-xs text-gray-400 dark:text-slate-500">{Object.keys(category.topics).length} modules</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/** Module overview when topic is selected but no subtopic */
const ModuleOverview = ({ catId, topicId, topic, category, getModuleProgress, onSelectSubtopic }) => {
  const progress = getModuleProgress(catId, topicId)
  const icon = topicIcons[topicId] || '💡'
  const subtopics = buildSubtopicList(catId, topicId, topic)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500">
        <span>Modules</span>
        <ChevronRight size={14} />
        <span>{category.title}</span>
        <ChevronRight size={14} />
        <span className="text-gray-700 dark:text-slate-300 font-medium">{topic.title}</span>
      </div>

      {/* Module Header Card */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700/50 shadow-sm p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 mb-6">
          <div className="text-4xl sm:text-5xl flex-shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 break-words">{topic.title}</h1>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border flex-shrink-0 ${difficultyColors[topic.difficulty] || ''}`}>
                {topic.difficulty}
              </span>
            </div>
            <p className="text-gray-500 dark:text-slate-400 text-base sm:text-lg">{topic.description}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 text-center border border-gray-100 dark:border-slate-700/50">
            <Code2 className="mx-auto mb-1.5 text-blue-500 dark:text-blue-400" size={22} />
            <div className="text-lg font-bold text-gray-900 dark:text-slate-100">{Object.keys(topic.codeTemplates || {}).length}</div>
            <div className="text-xs text-gray-400 dark:text-slate-500">Templates</div>
          </div>
          <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 text-center border border-gray-100 dark:border-slate-700/50">
            <Zap className="mx-auto mb-1.5 text-amber-500 dark:text-amber-400" size={22} />
            <div className="text-lg font-bold text-gray-900 dark:text-slate-100">4</div>
            <div className="text-xs text-gray-400 dark:text-slate-500">Languages</div>
          </div>
          <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 text-center border border-gray-100 dark:border-slate-700/50">
            <Target className="mx-auto mb-1.5 text-purple-500 dark:text-purple-400" size={22} />
            <div className="text-lg font-bold text-gray-900 dark:text-slate-100">{progress.percent}%</div>
            <div className="text-xs text-gray-400 dark:text-slate-500">Completed</div>
          </div>
          <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 text-center border border-gray-100 dark:border-slate-700/50">
            <Clock className="mx-auto mb-1.5 text-green-500 dark:text-green-400" size={22} />
            <div className="text-lg font-bold text-gray-900 dark:text-slate-100">{subtopics.length}</div>
            <div className="text-xs text-gray-400 dark:text-slate-500">Subtopics</div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-slate-400">Module Progress</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{progress.done}/{progress.total}</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Subtopic List */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-slate-700/50">
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100">Contents</h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-slate-700/50">
          {subtopics.map((sub, index) => (
            <button
              key={`${sub.type}-${sub.id}`}
              onClick={() => onSelectSubtopic(catId, topicId, sub.type, sub.id)}
              className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-900 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {index + 1}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{sub.label}</span>
                <span className="block text-xs text-gray-400 dark:text-slate-500 mt-0.5 capitalize">{sub.type === 'theory' ? 'Theory & Concepts' : 'Code Template'}</span>
              </div>
              <ChevronRight size={16} className="text-gray-300 dark:text-slate-500 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/** Subtopic content view */
const SubtopicContent = ({ catId, topicId, topic, category, subtopic, isCompleted, toggleComplete, onSelectSubtopic }) => {
  const subtopics = buildSubtopicList(catId, topicId, topic)
  const currentIndex = subtopics.findIndex(s => s.type === subtopic.type && s.id === subtopic.id)
  const prevSub = currentIndex > 0 ? subtopics[currentIndex - 1] : null
  const nextSub = currentIndex < subtopics.length - 1 ? subtopics[currentIndex + 1] : null

  const itemKey = subtopic.type === 'theory'
    ? `${catId}:${topicId}:theory`
    : `${catId}:${topicId}:template:${subtopic.id}`
  const completed = isCompleted(itemKey)

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
      <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500 flex-wrap">
        <span>Modules</span>
        <ChevronRight size={14} />
        <span>{category.title}</span>
        <ChevronRight size={14} />
        <span className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer" onClick={() => onSelectSubtopic(catId, topicId, null, null)}>{topic.title}</span>
        <ChevronRight size={14} />
        <span className="text-gray-700 dark:text-slate-300 font-medium">
          {subtopic.type === 'theory' ? 'Theory' : topic.codeTemplates?.[subtopic.id]?.title || subtopic.id}
        </span>
      </div>

      {/* Mark Complete Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 order-1 break-words">
          {subtopic.type === 'theory' ? `${topic.title} — Theory` : topic.codeTemplates?.[subtopic.id]?.title}
        </h1>
        <button
          onClick={() => toggleComplete(itemKey)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0 order-2 sm:order-3
            ${completed
              ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-50 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20'
              : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 dark:hover:border-blue-500/30'
            }
          `}
          data-testid="mark-complete-btn"
        >
          {completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">{topic.codeTemplates[subtopic.id].title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 dark:text-slate-500 mb-6">
                <div className="flex items-center gap-1">
                  <Code2 size={14} />
                  <span>4 Languages</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target size={14} />
                  <span>Production Ready</span>
                </div>
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-gray-200 dark:border-slate-800">
        {prevSub ? (
          <button
            onClick={() => onSelectSubtopic(catId, topicId, prevSub.type, prevSub.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-all order-2 sm:order-1"
          >
            <ArrowLeft size={16} className="flex-shrink-0" />
            <div className="text-left min-w-0">
              <span className="block text-[10px] text-gray-400 dark:text-slate-500 uppercase">Previous</span>
              <span className="block truncate max-w-[160px]">{prevSub.label}</span>
            </div>
          </button>
        ) : <div className="order-2 sm:order-1" />}

        {nextSub ? (
          <button
            onClick={() => onSelectSubtopic(catId, topicId, nextSub.type, nextSub.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-sm order-1 sm:order-2"
          >
            <div className="text-right min-w-0">
              <span className="block text-[10px] text-blue-100 uppercase">Next</span>
              <span className="block truncate max-w-[160px]">{nextSub.label}</span>
            </div>
            <ArrowRight size={16} className="flex-shrink-0" />
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-sm font-medium border border-green-200 dark:border-green-500/20 order-1 sm:order-2">
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
  onSelectSubtopic
}) => {
  const category = activeCategoryId ? dsaCategories[activeCategoryId] : null
  const topic = category?.topics?.[activeTopicId]

  return (
    <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:p-8 lg:p-10 py-6 md:py-8 lg:py-10">
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
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ModuleContentArea
