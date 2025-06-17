import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Crown, Zap, TrendingUp } from 'lucide-react'
import { subscriptionService } from '../../services/subscriptionService'

interface PremiumGateProps {
  children: React.ReactNode
  feature: string
  className?: string
}

const PremiumGate: React.FC<PremiumGateProps> = ({ children, feature, className = '' }) => {
  const hasPremiumAccess = subscriptionService.hasPremiumAccess()

  if (hasPremiumAccess) {
    return <>{children}</>
  }

  return (
    <div className={`relative ${className}`}>
      {/* Blurred content */}
      <div className="filter blur-sm pointer-events-none opacity-50">
        {children}
      </div>
      
      {/* Premium overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-primary-500/90 to-secondary-500/90 backdrop-blur-sm rounded-lg flex items-center justify-center"
      >
        <div className="text-center text-white p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Crown className="h-8 w-8" />
          </motion.div>
          
          <h3 className="text-xl font-bold mb-2">Premium Feature</h3>
          <p className="text-white/90 mb-4">{feature}</p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.href = '/pricing'}
              className="px-6 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>Upgrade Now</span>
            </button>
            <button
              onClick={() => window.location.href = '/pricing'}
              className="px-6 py-2 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PremiumGate