import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Copy, Check, Code2 } from 'lucide-react'

export const CodeBlock = ({ codeTemplates, templateId }) => {
  const [activeLanguage, setActiveLanguage] = useState('cpp')
  const [copiedStates, setCopiedStates] = useState({})

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
    <div className="rounded-b-2xl overflow-hidden border-t border-gray-100">
      {/* Language Tabs */}
      <div className="flex bg-gray-50 border-b border-gray-200 overflow-x-auto">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setActiveLanguage(lang.id)}
            className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all shrink-0 text-sm ${activeLanguage === lang.id
                ? 'bg-white text-blue-600 border-b-2 border-blue-500 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            data-testid={`lang-tab-${lang.id}`}
          >
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
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white rounded-lg transition-all border border-gray-600 text-sm"
                  data-testid={`copy-btn-${lang.id}`}
                >
                  {copiedStates[lang.id] ? (
                    <>
                      <Check size={16} className="text-green-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
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
                style={materialLight}
                customStyle={{
                  background: '#F5F5F5',
                  margin: 0,
                  padding: '2rem',
                  paddingTop: '3.5rem',
                  fontSize: '14px',
                  lineHeight: '1.8',
                  fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
                }}
                wrapLines={true}
                wrapLongLines={true}
              >
                {codeTemplates[lang.id]}
              </SyntaxHighlighter>
            ) : (
              <div className="p-8 text-center text-gray-400 bg-gray-50">
                <Code2 className="mx-auto mb-4 text-gray-300" size={48} />
                <p className="text-lg text-gray-500">Code template not available for {lang.name}</p>
                <p className="text-sm mt-2 text-gray-400">This implementation is coming soon!</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500 mb-2 sm:mb-0">
            <strong className="text-gray-700">Language:</strong>{' '}
            {languages.find(l => l.id === activeLanguage)?.name}
          </div>
          <div className="text-sm text-gray-500">
            <strong className="text-gray-700">Template ID:</strong> {templateId}
          </div>
        </div>
      </div>
    </div>
  )
}