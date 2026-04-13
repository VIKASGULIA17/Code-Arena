import React from 'react'
import { Link } from 'react-router-dom'
import { dsaCategories } from '../../data/DsaTopics'
import { Code2, BookOpen, ArrowRight, Star, TrendingUp } from 'lucide-react'
import { EnhancedNavbar } from '../../components/Navbar'

const DSAHubPage = () => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-700 bg-green-100 border-green-300'
      case 'Intermediate': return 'text-yellow-700 bg-yellow-100 border-yellow-300'
      case 'Advanced': return 'text-red-700 bg-red-100 border-red-300'
      default: return 'text-gray-700 bg-gray-100 border-gray-300'
    }
  }

  const getTopicIcon = (topicKey) => {
    const icons = {
      'arrays': '📊',
      'linked-lists': '🔗',
      'stacks': '📚',
      'queues': '🎫',
      'trees': '🌳',
      'graphs': '🕸️',
      'sorting': '🔄',
      'searching': '🔍',
      'dynamic-programming': '⚡',
      'greedy': '🎯'
    }
    return icons[topicKey] || '💡'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-16 sm:pb-20 px-3 sm:px-4">
      <EnhancedNavbar />
      <div className="container mx-auto max-w-7xl">

        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DSA Learning Hub
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0">
            Comprehensive collection of Data Structures and Algorithms with detailed explanations,
            code implementations in multiple languages, and complexity analysis.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 max-w-3xl mx-auto mb-12 px-2 sm:px-0">
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">50+</div>
              <div className="text-xs sm:text-sm text-gray-500">Topics</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="text-lg sm:text-2xl font-bold text-green-600">200+</div>
              <div className="text-xs sm:text-sm text-gray-500">Code Examples</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">4</div>
              <div className="text-xs sm:text-sm text-gray-500">Languages</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="text-lg sm:text-2xl font-bold text-yellow-600">∞</div>
              <div className="text-xs sm:text-sm text-gray-500">Learning</div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12 sm:space-y-16">
          {Object.entries(dsaCategories).map(([categoryKey, category]) => (

            <section key={categoryKey} className="space-y-6 sm:space-y-8">

              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-3 sm:pb-4 gap-2">
                <div className="min-w-0">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 break-words">
                    {category.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500">{category.description}</p>
                </div>
                <div className="hidden md:flex items-center space-x-2 text-xs sm:text-sm text-gray-400 flex-shrink-0">
                  <TrendingUp size={16} />
                  <span className="whitespace-nowrap">{Object.keys(category.topics).length} Topics</span>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Object.entries(category.topics).map(([topicKey, topic]) => {
                  const templateCount = Object.keys(topic.codeTemplates || {}).length

                  return (
                    <Link
                      key={topicKey}
                      to={`/topic/${categoryKey}/${topicKey}`}
                      className="group block"
                      data-testid={`topic-${topicKey}`}
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group-hover:scale-105 h-full">

                        {/* Topic Header */}
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <span className="text-2xl sm:text-3xl flex-shrink-0">{getTopicIcon(topicKey)}</span>
                          <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold border flex-shrink-0 ml-2 ${getDifficultyColor(topic.difficulty)}`}>
                            {topic.difficulty}
                          </span>
                        </div>

                        {/* Topic Content */}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors break-words">
                          {topic.title}
                        </h3>

                        <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                          {topic.description}
                        </p>

                        {/* Topic Stats */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-2 sm:gap-0">
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <div className="flex items-center text-gray-400 gap-1">
                              <Code2 size={14} className="flex-shrink-0" />
                              <span className="truncate">{templateCount} Templates</span>
                            </div>
                            <div className="flex items-center text-gray-400 gap-1">
                              <BookOpen size={14} className="flex-shrink-0" />
                              <span>Theory</span>
                            </div>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0"
                          />
                        </div>

                        {/* Complexity Indicator */}
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-gray-400 flex-shrink-0">Time Complexity</span>
                            <div className="flex items-center space-x-1">
                              {topic.theory?.timeComplexity && (
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-green-700 truncate">
                                  {Object.values(topic.theory.timeComplexity)[0]?.average || 'Varies'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
            <Star className="mx-auto mb-4 text-yellow-500" size={48} />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Choose any topic above to dive deep into theory, explore code implementations,
              and master the concepts with hands-on practice.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <BookOpen className="mr-2" size={20} />
              Learn About This Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DSAHubPage