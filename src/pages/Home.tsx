import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target, 
  BarChart3,
  ArrowRight,
  Star,
  Users,
  DollarSign,
  Activity
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { bankDataService, BankStock } from '../services/bankDataService'
import { subscriptionService } from '../services/subscriptionService'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import PremiumGate from '../components/ui/PremiumGate'

const Home: React.FC = () => {
  const [topBanks, setTopBanks] = useState<BankStock[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTopBanks = async () => {
      try {
        const allBanks = await bankDataService.getAllBankData()
        // Get top 6 banks by market cap
        const sorted = allBanks
          .sort((a, b) => b.marketCap - a.marketCap)
          .slice(0, 6)
        setTopBanks(sorted)
      } catch (error) {
        console.error('Error fetching bank data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopBanks()
  }, [])

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning algorithms analyze market patterns to provide 90%+ accurate predictions.',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Activity,
      title: 'Live Market Data',
      description: 'Real-time stock prices from BSE & NSE with 30-second updates and comprehensive analytics.',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Target,
      title: 'Smart Trading Signals',
      description: 'Get precise entry/exit points, stop-loss recommendations, and risk assessment scores.',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Advanced portfolio protection with automated alerts and risk scoring algorithms.',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const stats = [
    { label: 'Active Traders', value: 25847, icon: Users },
    { label: 'Prediction Accuracy', value: 92, suffix: '%', icon: Target },
    { label: 'Banks Covered', value: 15, suffix: '+', icon: BarChart3 },
    { label: 'Commission Earned', value: 1250000, prefix: '₹', icon: DollarSign }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

        <div className="container-max relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-8">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">AI-Powered Trading Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                StockSage Pro
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Advanced AI predictions for banking stocks with live market data, 
              smart trading signals, and commission-based earnings
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/dashboard"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Trading Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/pricing"
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Star className="h-5 w-5 text-yellow-500" />
                <span>View Pricing</span>
              </Link>
            </div>
          </motion.div>

          {/* Live Bank Prices Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Live Banking Stocks</h3>
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Live Updates</span>
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-6 bg-gray-200 rounded mb-1" />
                      <div className="h-3 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {topBanks.map((bank) => (
                    <motion.div
                      key={bank.symbol}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-600 mb-1">{bank.symbol}</p>
                      <p className="text-lg font-bold text-gray-900">₹{bank.currentPrice}</p>
                      <p className={`text-xs font-medium ${
                        bank.trend === 'up' ? 'text-green-600' : 
                        bank.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {bank.trend === 'up' ? '+' : ''}{bank.changePercent.toFixed(2)}%
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 text-center">
                <PremiumGate feature="Get detailed predictions and trading signals for all banking stocks">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>View All Predictions</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </PremiumGate>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose StockSage Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI technology meets professional trading tools to give you the edge in banking stock investments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="card p-8 h-full text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Icon className="h-8 w-8 mx-auto mb-4 opacity-80" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    <AnimatedCounter 
                      value={stat.value} 
                      prefix={stat.prefix} 
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-blue-100 text-lg">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of successful traders using AI-powered predictions to maximize their returns
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/pricing"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/dashboard"
                className="text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <span>View Live Demo</span>
                <TrendingUp className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
