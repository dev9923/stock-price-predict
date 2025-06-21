import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Crown, ArrowRight, Star, Target, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { subscriptionService } from '../services/subscriptionService'

const SubscriptionSuccess: React.FC = () => {
  const subscription = subscriptionService.getCurrentSubscription()

  useEffect(() => {
    // Track successful subscription
    if (subscription) {
      console.log('Subscription activated:', subscription)
    }
  }, [subscription])

  const features = [
    {
      icon: Target,
      title: 'AI Predictions',
      description: 'Get unlimited access to 90%+ accurate stock predictions'
    },
    {
      icon: BarChart3,
      title: 'Live Market Data',
      description: 'Real-time banking stock prices with 30-second updates'
    },
    {
      icon: Star,
      title: 'Trading Commissions',
      description: 'Earn 2-3.5% commission on successful broker referrals'
    }
  ]

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container-max py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">StockSage Pro!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your subscription has been activated successfully. You now have access to all premium features.
            </p>

            {subscription && (
              <div className="inline-flex items-center space-x-3 bg-white rounded-xl px-6 py-4 shadow-lg border border-gray-200">
                <Crown className="h-6 w-6 text-yellow-500" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1)} Plan
                  </p>
                  <p className="text-sm text-gray-600">
                    Active until {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="card p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
            <p className="text-blue-100 mb-6">
              Start exploring AI-powered predictions and begin earning commissions through our trading platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>View Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                to="/features"
                className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Explore Features</span>
                <Star className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-4">
              Need help getting started? Our support team is here to help.
            </p>
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support →
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionSuccess