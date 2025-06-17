/ --- src/components/ui/LoadingSpinner.tsx ---
interface LoadingSpinnerProps {
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = '' }) => {
  return (
    <div className={`spinner ${className}`}>Loading...</div>
  )
}

export default LoadingSpinner
