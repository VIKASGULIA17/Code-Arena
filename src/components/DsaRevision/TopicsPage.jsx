import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dsaCategories } from '@/data/DsaTopics'
import { CodeBlock } from '../../components/code/codeblock'
import { TheorySection } from '@/components/theory/TheorySection'
import { ArrowLeft, Code2, BookOpen, Clock, Target, Zap } from 'lucide-react'

const TopicPage = () => {
  const { categoryId, topicId } = useParams()
  const [activeTab, setActiveTab] = useState('theory')

  const category = dsaCategories[categoryId]
  const topic = category?.topics[topicId]

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b1120] pt-32 flex items-center justify-center transition-colors">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Topic Not Found</h1>
          <p className="text-gray-500 dark:text-slate-400 mb-8">The requested topic could not be found.</p>
          <Link
            to="/dsa-hub"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to DSA Hub
          </Link>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-500/10 border-green-300 dark:border-green-500/20'
      case 'Intermediate': return 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-500/10 border-yellow-300 dark:border-yellow-500/20'
      case 'Advanced': return 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-500/10 border-red-300 dark:border-red-500/20'
      default: return 'text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
    }
  }

  const tabs = [
    { id: 'theory', label: 'Theory', icon: BookOpen },
    { id: 'templates', label: 'Code Templates', icon: Code2 }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1120] pt-32 pb-20 transition-colors">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-slate-800 pb-8 mb-8 bg-white dark:bg-slate-900 shadow-sm dark:shadow-none">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 dark:text-slate-500 mb-6">
            <Link to="/dsa-hub" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              DSA Hub
            </Link>
            <span>/</span>
            <span className="capitalize">{category.title}</span>
            <span>/</span>
            <span className="text-gray-700 dark:text-slate-300 font-medium">{topic.title}</span>
          </div>

          {/* Topic Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100">
                  {topic.title}
                </h1>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getDifficultyColor(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
              </div>
              <p className="text-xl text-gray-500 dark:text-slate-400 max-w-3xl">
                {topic.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 md:flex md:space-x-4">
              <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 border border-gray-200 dark:border-slate-700/50 text-center">
                <Code2 className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={24} />
                <div className="text-lg font-bold text-gray-900 dark:text-slate-100">
                  {Object.keys(topic.codeTemplates || {}).length}
                </div>
                <div className="text-xs text-gray-400 dark:text-slate-500">Templates</div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 border border-gray-200 dark:border-slate-700/50 text-center">
                <Zap className="mx-auto mb-2 text-yellow-500 dark:text-yellow-400" size={24} />
                <div className="text-lg font-bold text-gray-900 dark:text-slate-100">4</div>
                <div className="text-xs text-gray-400 dark:text-slate-500">Languages</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mt-8 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl w-fit border dark:border-slate-700">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }`}
                  data-testid={`tab-${tab.id}`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4">
        {activeTab === 'theory' && topic.theory && (
          <TheorySection theory={topic.theory} topicTitle={topic.title} />
        )}

        {activeTab === 'templates' && topic.codeTemplates && (
          <div className="space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-4">Code Templates</h2>
              <p className="text-gray-500 dark:text-slate-400">
                Explore ready-to-use code implementations in multiple programming languages.
                Each template is optimized and includes detailed comments.
              </p>
            </div>

            {Object.entries(topic.codeTemplates).map(([templateId, template]) => (
              <div key={templateId} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-slate-800">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">{template.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 dark:text-slate-500">
                    <div className="flex items-center">
                      <Code2 size={16} className="mr-1" />
                      <span>4 Languages</span>
                    </div>
                    <div className="flex items-center">
                      <Target size={16} className="mr-1" />
                      <span>Production Ready</span>
                    </div>
                  </div>
                </div>
                <CodeBlock
                  codeTemplates={template}
                  templateId={templateId}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="container mx-auto max-w-7xl px-4 mt-12">
        <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-slate-800">
          <Link
            to="/dsa-hub"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100 transition-all shadow-sm"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to DSA Hub
          </Link>

          <div className="text-center">
            <p className="text-sm text-gray-400 dark:text-slate-500 mb-2">Found this helpful?</p>
            <Link
              to="/about"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
            >
              Learn more about this project
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicPage