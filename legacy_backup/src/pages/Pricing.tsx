import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Crown, Zap, Star, ArrowRight, Shield, Target, BarChart3 } from 'lucide-react'
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
      toast.success('Redirecting to secure payment...')
    } catch (error) {
      toast.error('Failed to start checkout process')
      console.error('Subscription error:', error)
    } finally {
      setIsLoading(null)
    }
  }

  const getPlanPrice = (plan: any) => {
    if (billingCycle === 'year' && plan.price > 0) {
      return Math.floor(plan.price * 10) // 2 months free
    }
    return plan.price
  }

  const features = [
    {
      icon: Target,
      title: '90%+ Prediction Accuracy',
      description: 'AI-powered predictions with industry-leading accuracy rates'
    },
    {
      icon: BarChart3,
      title: 'Live Market Data',
      description: 'Real-time stock prices from BSE & NSE with 30-second updates'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Advanced portfolio protection and risk assessment tools'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
              <Crown className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Premium AI Trading Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trading Plan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get access to advanced AI-powered banking stock predictions, live market data, 
              and commission-based trading opportunities
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white rounded-xl p-1 shadow-lg border border-gray-200">
              {['month', 'year'].map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle as 'month' | 'year')}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    billingCycle === cycle
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {cycle === 'month' ? 'Monthly' : 'Yearly'}
                  {cycle === 'year' && (
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Save 17%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {subscriptionPlans.map((plan, index) => {
              const isCurrentPlan =
                currentSubscription?.planId === plan.id && currentSubscription?.status === 'active'
              const displayPrice = getPlanPrice(plan)

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                    plan.popular 
                      ? 'border-blue-500 ring-4 ring-blue-100' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                        plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                        plan.id === 'professional' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                        'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center mb-4">
                        {plan.id === 'basic' && (
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <Zap className="h-6 w-6 text-gray-600" />
                          </div>
                        )}
                        {plan.id === 'premium' && (
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Crown className="h-6 w-6 text-white" />
                          </div>
                        )}
                        {plan.id === 'professional' && (
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                        )}
                        {plan.id === 'enterprise' && (
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Star className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">
                          ₹{displayPrice.toLocaleString()}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-gray-600">/{billingCycle}</span>
                        )}
                      </div>

                      {billingCycle === 'year' && plan.price > 0 && (
                        <p className="text-sm text-green-600 font-medium">
                          Save ₹{(plan.price * 2).toLocaleString()} per year
                        </p>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={isLoading === plan.id || isCurrentPlan}
                      className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                          : plan.id === 'basic'
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                          : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105`}
                    >
                      {isLoading === plan.id ? (
                        <>
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </>
                      ) : isCurrentPlan ? (
                        <span>Current Plan</span>
                      ) : (
                        <>
                          <span>{plan.price === 0 ? 'Get Started Free' : 'Upgrade Now'}</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our AI-powered trading platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How accurate are the AI predictions?",
                answer: "Our AI models achieve 90%+ accuracy on historical data using advanced machine learning algorithms and real-time market analysis."
              },
              {
                question: "How do I earn commissions?",
                answer: "When users trade through our broker referral links, you earn 2-3.5% commission on successful trades. Commissions are tracked automatically."
              },
              {
                question: "Is the payment secure?",
                answer: "Yes, all payments are processed through secure PayTM UPI with bank-level encryption and security protocols."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of successful traders using AI-powered predictions to maximize their returns
            </p>
            <button
              onClick={() => handleSubscribe('premium')}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pricing