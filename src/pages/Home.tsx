import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  BarChart3, 
  Brain, 
  Target, 
  CheckCircle,
  Star,
  Crown,
  Zap
} from 'lucide-react'
import AnimatedCounter from '../components/ui/AnimatedCounter'

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Get daily stock price predictions powered by advanced machine learning algorithms with 94.2% accuracy.'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analysis',
      description: 'Access live market data, technical indicators, and comprehensive analysis updated every 30 seconds.'
    },
    {
      icon: Target,
      title: 'Premium Insights',
      description: 'Unlock advanced features including custom alerts, portfolio tracking, and professional-grade analytics.'
    }
  ]

  const stats = [
    { label: 'Prediction Accuracy', value: 94.2, suffix: '%' },
    { label: 'Daily Updates', value: 24, suffix: '/7' },
    { label: 'Technical Indicators', value: 25, suffix: '+' },
    { label: 'Active Users', value: 1200, suffix: '+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Real-time Stock Predictions
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Yes Bank Stock
                  <span className="block text-secondary-400">Price Prediction</span>
                </h1>
                <p className="text-xl text-gray-200 max-w-2xl">
                  Get daily AI-powered stock predictions with 94.2% accuracy. Access real-time market data, 
                  advanced technical analysis, and premium insights to make informed investment decisions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard" className="btn-primary inline-flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Dashboard
                </Link>
                <Link to="/pricing" className="btn-secondary inline-flex items-center">
                  <Crown className="mr-2 h-5 w-5" />
                  Get Premium
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary-400" />
                  <span className="text-sm">Daily Updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary-400" />
                  <span className="text-sm">94.2% Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary-400" />
                  <span className="text-sm">Real-time Data</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-500 rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400 rounded-full opacity-20 animate-bounce-slow"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Live Prediction</h3>
                    <div className="flex items-center space-x-2 px-3 py-1 bg-secondary-500/20 rounded-full">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Live</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <span>Current Price</span>
                      <span className="text-2xl font-bold text-secondary-400">₹45.67</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <span>Predicted Price</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-secondary-400">₹47.23</div>
                        <div className="text-sm text-secondary-300">+3.4% ↗</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <span>Confidence</span>
                      <span className="text-2xl font-bold text-secondary-400">94.2%</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-secondary-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm font-medium">Premium Feature</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Get detailed analysis, alerts, and advanced predictions with Premium access.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Stock Analysis Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining cutting-edge AI technology with real-time market data to deliver 
              accurate predictions and comprehensive analysis for informed trading decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card p-8 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              <Crown className="h-4 w-4 mr-2" />
              Premium Features Available
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Unlock Advanced Predictions & Analysis
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Get daily AI predictions, real-time alerts, advanced technical indicators, 
              and comprehensive market analysis with our premium subscription.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="btn-secondary">
                <Crown className="mr-2 h-5 w-5" />
                View Pricing Plans
              </Link>
              <Link to="/dashboard" className="btn-primary border-2 border-white/20">
                <BarChart3 className="mr-2 h-5 w-5" />
                Try Free Dashboard
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Daily Predictions</div>
                <p className="text-primary-200">AI-powered forecasts updated every day</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Real-time Alerts</div>
                <p className="text-primary-200">Get notified of important price movements</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Advanced Analytics</div>
                <p className="text-primary-200">Professional-grade technical analysis tools</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
