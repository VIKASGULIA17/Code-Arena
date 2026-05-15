import React from 'react'
import { Plus } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

const DsaTemplateButton = ({ onClick, variant = 'primary', size = 'md' }) => {
  const { isAdmin } = useAppContext()

  // Only show if user is admin
  if (!isAdmin) return null

  const baseStyles = 'flex items-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50'
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base'
  }

  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-sm',
    secondary: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600',
    ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}
      title="Add or manage DSA templates (admin only)"
    >
      <Plus size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
      <span>
        {size === 'sm' ? 'Template' : 'Add DSA Template'}
      </span>
    </button>
  )
}

export default DsaTemplateButton
