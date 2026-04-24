import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Copy, Check, Code2 } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export const CodeBlock = ({ codeTemplates, templateId }) => {
  const [activeLanguage, setActiveLanguage] = useState('cpp')
  const [copiedStates, setCopiedStates] = useState({})
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const languages = [
    { id: 'cpp', name: 'C++', icon: '🔵' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'javascript', name: 'JavaScript', icon: '🟡' }
  ]

  const handleCopy = (langId) => {
    setCopiedStates({ ...copiedStates, [langId]: true })
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [langId]: false })
    }, 2000)
  }

  const getLanguageForSyntaxHighlighter = (langId) => {
    const mapping = {
      cpp: 'cpp',
      java: 'java',
      python: 'python',
      javascript: 'javascript'
    }
    return mapping[langId] || 'text'
  }

  return (
    <div className="rounded-b-2xl overflow-hidden border-t border-gray-200 dark:border-gray-800/50 bg-white dark:bg-[#011627] shadow-sm dark:shadow-xl transition-colors duration-200">
      {/* Language Tabs */}
      <div className="flex bg-gray-50 dark:bg-[#0b253a] border-b border-gray-200 dark:border-[#1d3b53] overflow-x-auto scrollbar-hide transition-colors duration-200">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setActiveLanguage(lang.id)}
            className={`flex items-center space-x-2 px-6 py-3.5 font-medium transition-all shrink-0 text-sm relative ${activeLanguage === lang.id
                ? 'text-blue-600 bg-white dark:text-rose-300 dark:bg-[#011627]'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-[#011627]/50'
              }`}
            data-testid={`lang-tab-${lang.id}`}
          >
            {activeLanguage === lang.id && (
              <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-gradient-to-r dark:from-rose-400 dark:to-orange-400"></div>
            )}
            <span>{lang.icon}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Code Content */}
      <div className="relative">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className={`${activeLanguage === lang.id ? 'block' : 'hidden'}`}
          >
            {/* Copy Button */}
            <div className="absolute top-4 right-4 z-10">
              <CopyToClipboard
                text={codeTemplates[lang.id] || '// Code not available'}
                onCopy={() => handleCopy(lang.id)}
              >
                <button
                  className="flex items-center space-x-2 px-3 py-1.5 bg-white/80 dark:bg-[#1d3b53]/80 hover:bg-gray-50 dark:hover:bg-[#2b4c68] text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md transition-all border border-gray-200 dark:border-[#2b4c68]/50 text-xs font-medium backdrop-blur-sm shadow-sm dark:shadow-none"
                  data-testid={`copy-btn-${lang.id}`}
                >
                  {copiedStates[lang.id] ? (
                    <>
                      <Check size={14} className="text-green-500 dark:text-emerald-400" />
                      <span className="text-green-500 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </CopyToClipboard>
            </div>

            {/* Code Display */}
            {codeTemplates[lang.id] ? (
              <SyntaxHighlighter
                language={getLanguageForSyntaxHighlighter(lang.id)}
                style={isDark ? nightOwl : oneLight}
                customStyle={{
                  backgroundColor: 'transparent',
                  margin: 0,
                  padding: '2.5rem 1.5rem 1.5rem 1.5rem',
                  fontSize: '14.5px',
                  lineHeight: '1.7',
                  fontFamily: "'Fira Code', 'JetBrains Mono', 'Menlo', 'Monaco', monospace"
                }}
                wrapLines={true}
                wrapLongLines={true}
              >
                {codeTemplates[lang.id]}
              </SyntaxHighlighter>
            ) : (
              <div className="p-10 text-center text-gray-500 bg-gray-50 dark:bg-[#011627] transition-colors duration-200">
                <Code2 className="mx-auto mb-4 text-gray-300 dark:text-[#1d3b53]" size={48} />
                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Code template not available for {lang.name}</p>
                <p className="text-sm mt-2 text-gray-400 dark:text-gray-500">This implementation is coming soon!</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="bg-gray-50 dark:bg-[#0b253a] px-6 py-3 border-t border-gray-200 dark:border-[#1d3b53] transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-gray-500 mb-2 sm:mb-0 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]'}`}></span>
            <span className="text-gray-500 dark:text-gray-400">Language:</span>{' '}
            <span className="text-gray-700 dark:text-gray-300 font-medium">{languages.find(l => l.id === activeLanguage)?.name}</span>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">Template ID:</span> 
            <span className="font-mono text-gray-600 dark:text-gray-400 bg-white dark:bg-[#011627] px-2 py-0.5 rounded border border-gray-200 dark:border-[#1d3b53]">{templateId}</span>
          </div>
        </div>
      </div>
    </div>
  )
}