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
  primary: `
    bg-slate-900 text-white 
    hover:bg-slate-800 
    active:bg-slate-950
    border border-slate-900
    shadow-sm hover:shadow-md

    dark:bg-white dark:text-slate-950
    dark:hover:bg-slate-200
    dark:active:bg-slate-300
    dark:border-white
  `,

  secondary: `
    bg-white text-slate-900
    hover:bg-slate-100
    active:bg-slate-200
    border border-slate-200
    shadow-sm hover:shadow-md

    dark:bg-slate-900 dark:text-slate-100
    dark:hover:bg-slate-800
    dark:active:bg-slate-700
    dark:border-slate-700
  `,

  accent: `
    bg-indigo-600 text-white
    hover:bg-indigo-700
    active:bg-indigo-800
    border border-indigo-600
    shadow-sm hover:shadow-md

    dark:bg-indigo-500
    dark:hover:bg-indigo-400
    dark:active:bg-indigo-600
    dark:border-indigo-400
  `,

  danger: `
    bg-red-600 text-white
    hover:bg-red-700
    active:bg-red-800
    border border-red-600
    shadow-sm hover:shadow-md

    dark:bg-red-500
    dark:hover:bg-red-400
    dark:active:bg-red-600
    dark:border-red-400
  `,

  ghost: `
    bg-transparent text-slate-700
    hover:bg-slate-100
    active:bg-slate-200
    border border-transparent

    dark:text-slate-200
    dark:hover:bg-slate-800
    dark:active:bg-slate-700
  `,
};

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} shadow-sm`}
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
