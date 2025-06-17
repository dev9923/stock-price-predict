import React from 'react'

interface LoadingSpinnerProps {
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = '' }) => {
  return (
    <div
      className={`flex items-center justify-center space-x-1 ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 bg-primary-600 rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.15}s` }}
        ></div>
      ))}
    </div>
  )
}

export default LoadingSpinner
