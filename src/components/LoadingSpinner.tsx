import React from 'react'
import { Coffee, Leaf } from 'lucide-react'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'جاري التحميل...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Juicetry Logo Spinner */}
      <div className="relative mb-4">
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center animate-pulse`}>
          <div className="flex items-center gap-1">
            <Coffee className="h-4 w-4 text-white" />
            <Leaf className="h-3 w-3 text-white" />
          </div>
        </div>
        <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      
      {/* Loading Message */}
      <p className="text-gray-600 font-medium text-center">{message}</p>
      
      {/* Loading Dots */}
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
