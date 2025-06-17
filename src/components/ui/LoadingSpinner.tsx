import React from 'react'

interface LoadingSpinnerProps {
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = '' }) => {
  return (
    <div className={`loading-dots w-8 h-8 ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default LoadingSpinner
