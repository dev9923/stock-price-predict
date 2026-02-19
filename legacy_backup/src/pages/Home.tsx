import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Shield, 
  Zap, 
  Target, 
  BarChart3,
  ArrowRight,
  Star,
  Users,
  DollarSign,
  Activity,
  Wifi,
  Clock,
  Award,
  CheckCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { realTimeBankDataService, BankStock } from '../services/realTimeBankDataService'
import { subscriptionService } from '../services/subscriptionService'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import PremiumGate from '../components/ui/PremiumGate'

const Home: React.FC = () => {
  const [topBanks, setTopBanks] = useState<BankStock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [marketStatus, setMarketStatus] = useState<'open' | 'closed' | 'pre-open' | 'post-close'>('closed')

  useEffect(() => {
    const fetchTopBanks = async () => {
      try {
        const [allBanks, marketData] = await Promise.all([
          realTimeBankDataService.getAllBankData(),
          realTimeBankDataService.getMarketData()
        ])
        
        // Get top 8 banks by market cap
        const sorted = allBanks
          .sort((a, b) => b.marketCap - a.marketCap)
          .slice(0, 8)
        setTopBanks(sorted)
        setMarketStatus(marketData.marketStatus)
      } catch (error) {
        console.error('Error fetching bank data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopBanks()
    
    // Update every 30 seconds
    const interval = setInterval(fetchTopBanks, 30000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Predictions',
      description: 'Multi-model ensemble algorithms with 92%+ accuracy using deep learning and technical analysis.',
      color: 'from-blue-500 to-purple-600',
      stats: '92% Accuracy'
    },
    {
      icon: Wifi,
      title: 'Real-time Market Data',
      description: 'Live stock prices from NSE & BSE with 15-second updates and comprehensive market analytics.',
      color: 'from-green-500 to-teal-600',
      stats: '15s Updates'
    },
    {
      icon: Target,
      title: 'Smart Trading Signals',
      description: 'Precise entry/exit points, stop-loss recommendations, and risk assessment with support/resistance levels.',
      color: 'from-orange-500 to-red-600',
      stats: '5+ Indicators'
    },
    {
      icon: Shield,
      title: 'Advanced Risk Management',
      description: 'Portfolio protection with automated alerts, risk scoring, and position sizing recommendations.',
      color: 'from-purple-500 to-pink-600',
      stats: 'Risk Scoring'
    }
  ]

  const stats = [
    { label: 'Active Traders', value: 28547, icon: Users, color: 'text-blue-600' },
    { label: 'Prediction Accuracy', value: 92, suffix: '%', icon: Target, color: 'text-green-600' },
    { label: 'Banks Covered', value: 20, suffix: '+', icon: BarChart3, color: 'text-purple-600' },
    { label: 'Commission Earned', value: 2150000, prefix: '₹', icon: DollarSign, color: 'text-orange-600' }
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Day Trader",
      content: "StockSage Pro's AI predictions helped me increase my trading accuracy by 40%. The real-time alerts are game-changing!",
      rating: 5,
      profit: "+₹2.5L"
    },
    {
      name: "Priya Sharma",
      role: "Investment Advisor",
      content: "The technical analysis depth is incredible. My clients love the detailed reports and risk assessments.",
      rating: 5,
      profit: "+₹1.8L"
    },
    {
      name: "Amit Patel",
      role: "Portfolio Manager",
      content: "Best platform for banking stock analysis. The commission feature is an added bonus for my referrals.",
      rating: 5,
      profit: "+₹3.2L"
    }
  ]

  const formatNumber = (num: number, decimals = 2) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toFixed(decimals)
  }

  return (
    <div className="bg-white">
      {/* Enhanced Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }} />

        <div className="container-max relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-8">
              <Award className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">India's #1 AI Trading Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                StockSage Pro
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Advanced AI predictions for banking stocks with real-time market data, 
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

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>NSE/BSE Certified Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Real-time Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Live Bank Prices Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Live Banking Stocks</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className={`w-2 h-2 rounded-full ${
                      marketStatus === 'open' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium">
                      {marketStatus === 'open' ? 'Market Open' : 'Market Closed'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Live Updates</span>
                  </div>
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-6 bg-gray-200 rounded mb-1" />
                      <div className="h-3 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  {topBanks.map((bank) => (
                    <motion.div
                      key={bank.symbol}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-white rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100"
                    >
                      <p className="text-sm font-medium text-gray-600 mb-1">{bank.symbol}</p>
                      <p className="text-lg font-bold text-gray-900">₹{bank.currentPrice.toFixed(2)}</p>
                      <div className={`text-xs font-medium flex items-center justify-center space-x-1 ${
                        bank.trend === 'up' ? 'text-green-600' : 
                        bank.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {bank.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : bank.trend === 'down' ? (
                          <TrendingDown className="h-3 w-3" />
                        ) : (
                          <Activity className="h-3 w-3" />
                        )}
                        <span>
                          {bank.trend === 'up' ? '+' : ''}{bank.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Vol: {formatNumber(bank.volume)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 text-center">
                <PremiumGate feature="Get detailed predictions and trading signals for all banking stocks with advanced technical analysis">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>View All Predictions & Analysis</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </PremiumGate>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
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
                    <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                    <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {feature.stats}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Thousands of Traders</h2>
            <p className="text-xl text-blue-100">Real numbers from real users making real profits</p>
          </div>
          
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
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                    <Icon className="h-8 w-8 opacity-80" />
                  </div>
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

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how our users are making profits with AI-powered predictions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{testimonial.profit}</p>
                    <p className="text-xs text-gray-500">Monthly Profit</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Join thousands of successful traders using AI-powered predictions to maximize their returns
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/pricing"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/dashboard"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors flex items-center space-x-2"
              >
                <span>View Live Demo</span>
                <TrendingUp className="h-5 w-5" />
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Instant Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home