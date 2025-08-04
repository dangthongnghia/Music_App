import React from 'react'
import { cn } from '../../utils/helpers'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className, ...props }) => {
  return (
    <div className='w-full'>
      {label && <label className='block text-sm font-medium text-gray-300 mb-2'>{label}</label>}
      <div className='relative'>
        {icon && <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>{icon}</div>}
        <input
          className={cn(
            'w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            icon && 'pl-10',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  )
}
