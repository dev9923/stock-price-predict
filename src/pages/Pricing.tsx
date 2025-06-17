import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Crown, Zap, Star, ArrowRight } from 'lucide-react'
import { subscriptionPlans, subscriptionService } from '../services/subscriptionService'
import toast from 'react-hot-toast'

const Pricing = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month')

  const currentSubscription = subscriptionService.getCurrentSubscription()

  const handleSubscribe = async (planId: string) => {
    if (planId === 'basic') {
      toast.success('You already have access to basic features!')
      return
    }

    setIsLoading(planId)

    try {
      await subscriptionService.createCheckoutSession(planId)
      toast.success('Redirecting to checkout...')
    } catch (error) {
      toast.error('Failed to start checkout process')
      console.error('Subscription error:', error)
    } finally {
      setIsLoading(null)
    }
  }

  const getPlanPrice = (plan: any) => {
    if (billingCycle === 'year' && plan.price > 0) {
      return Math.floor(plan.price * 10) // 2 months free for yearly
    }
    return plan.price
  }

  const features = [
    {
      category: 'Data & Analytics',
      items: [
        { name: 'Historical stock data', basic: true, premium: true, pro: true },
        { name: 'Real-time price updates', basic: true, premium: true, pro: true },
        { name: 'Basic technical indicators', basic: true, premium: true, pro: true },
        { name: 'Advanced technical analysis', basic: false, premium: true, pro: true },
        { name: 'Multiple timeframes', basic: false, premium: true, pro: true },
        { name: 'Custom indicators', basic: false, premium: false, pro: true }
      ]
    },
    {
      category: 'AI Predictions',
      items: [
        { name: 'Daily price predictions', basic: false, premium: true, pro: true },
        { name: 'Confidence scoring', basic: false, premium: true, pro: true },
        { name: 'Trend analysis', basic: false, premium: true, pro: true },
        { name: 'Multiple stock predictions', basic: false, premium: false, pro: true },
        { name: 'Custom model training', basic: false, premium: false, pro: true }
      ]
    },
    {
      category: 'Alerts & Notifications',
      items: [
        { name: 'Price alerts', basic: false, premium: true, pro: true },
        { name: 'Prediction alerts', basic: false, premium: true, pro: true },
        { name: 'News notifications', basic: false, premium: true, pro: true },
        { name: 'Custom alert rules', basic: false, premium: false, pro: true }
      ]
    },
    {
      category: 'Support & Access',
      items: [
        { name: 'Email support', basic: true, premium: true, pro: true },
        { name: 'Priority support', basic: false, premium: true, pro: true },
        { name: 'API access', basic: false, premium: false, pro: true },
        { name: 'Dedicated account manager', basic: false, premium: false, pro: true }
      ]
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get access to advanced AI-powered stock predictions and comprehensive market analysis
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setBillingCycle('month')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'month'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('year')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'year'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-1 text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card p-8 relative ${
                  plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    {plan.id === 'basic' && (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Zap className="h-6 w-6 text-gray-600" />
                      </div>
                    )}
                    {plan.id === 'premium' && (
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Crown className="h-6 w-6 text-primary-600" />
                      </div>
                    )}
                    {plan.id === 'pro' && (
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{getPlanPrice(plan).toLocaleString()}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-600">/{billingCycle}</span>
                    )}
                  </div>

                  {billingCycle === 'year' && plan.price > 0 && (
                    <p className="text-sm text-secondary-600 font-medium">
                      Save ₹{(plan.price * 2).toLocaleString()} per year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={
                    isLoading === plan.id ||
                    (currentSubscription?.planId === plan.id && currentSubscription.status === 'active')
                  }
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading === plan.id ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : currentSubscription?.planId === plan.id &&
                    currentSubscription.status === 'active' ? (
                    <span>Current Plan</span>
                  ) : (
                    <>
                      <span>{plan.price === 0 ? 'Get Started' : 'Upgrade Now'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison and FAQ remain unchanged */}

    </div>
  )
}

export default Pricing
