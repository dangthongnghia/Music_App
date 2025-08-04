import React from 'react'
import { cn } from '../../utils/helpers'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export const Loading: React.FC<LoadingProps> = ({ size = 'md', className, text }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className={cn('animate-spin rounded-full border-2 border-gray-600 border-t-green-500', sizeClasses[size])} />
      {text && <p className='mt-2 text-sm text-gray-400'>{text}</p>}
    </div>
  )
}
