import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  BarChart3, 
  Brain, 
  Target, 
  ArrowRight, 
  Play,
  CheckCircle,
  Star
} from 'lucide-react'
import AnimatedCounter from '../components/ui/AnimatedCounter'

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced ML Algorithms',
      description: 'Utilizing state-of-the-art machine learning models including Random Forest, LSTM, and ensemble methods for accurate predictions.'
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Analysis',
      description: 'Deep dive into historical data patterns, technical indicators, and market sentiment analysis for robust predictions.'
    },
    {
      icon: Target,
      title: 'High Accuracy',
      description: 'Achieved 94.2% accuracy in stock price predictions through rigorous model training and validation processes.'
    }
  ]

  const stats = [
    { label: 'Data Points Analyzed', value: 50000, suffix: '+' },
    { label: 'Model Accuracy', value: 94.2, suffix: '%' },
    { label: 'Features Engineered', value: 25, suffix: '+' },
    { label: 'Training Hours', value: 120, suffix: '+' }
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
                  Machine Learning Project
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Yes Bank Stock
                  <span className="block text-secondary-400">Price Prediction</span>
                </h1>
                <p className="text-xl text-gray-200 max-w-2xl">
                  Advanced machine learning model that predicts Yes Bank stock closing prices 
                  with 94.2% accuracy using cutting-edge algorithms and comprehensive data analysis.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/results" className="btn-primary inline-flex items-center">
                  View Results
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/methodology" className="btn-secondary inline-flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Learn More
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary-400" />
                  <span className="text-sm">Real-time Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary-400" />
                  <span className="text-sm">High Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary-400" />
                  <span className="text-sm">Open Source</span>
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
                  <h3 className="text-2xl font-bold mb-6">Project Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <span>Model Accuracy</span>
                      <span className="text-2xl font-bold text-secondary-400">94.2%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <span>Data Points</span>
                      <span className="text-2xl font-bold text-secondary-400">50K+</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <span>Training Time</span>
                      <span className="text-2xl font-bold text-secondary-400">120h</span>
                    </div>
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
              Why This Project Stands Out
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining advanced machine learning techniques with comprehensive financial analysis 
              to deliver accurate and reliable stock price predictions.
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

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore the Results?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Dive deep into the model performance, visualizations, and insights 
              from our comprehensive Yes Bank stock price prediction analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/results" className="btn-secondary">
                View Detailed Results
              </Link>
              <Link to="/methodology" className="btn-primary border-2 border-white/20">
                Explore Methodology
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home