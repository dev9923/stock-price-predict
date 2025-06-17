import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowRight,
  BarChart2,
  LineChart,
  Zap
} from 'lucide-react'

const Results = () => {
  const [activeTab, setActiveTab] = useState<'predictions' | 'comparison' | 'features'>('predictions')

  const tabs = [
    { id: 'predictions', name: 'Predictions' },
    { id: 'comparison', name: 'Performance' },
    { id: 'features', name: 'Features' }
  ]

  const performanceMetrics = [
    {
      title: 'Model Accuracy',
      value: '92.3%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'secondary'
    },
    {
      title: 'Precision',
      value: '89.5%',
      change: '+1.7%',
      trend: 'up',
      icon: Zap,
      color: 'primary'
    },
    {
      title: 'Recall',
      value: '88.1%',
      change: '+1.9%',
      trend: 'up',
      icon: Activity,
      color: 'accent'
    },
    {
      title: 'F1 Score',
      value: '88.8%',
      change: '+2.3%',
      trend: 'up',
      icon: LineChart,
      color: 'secondary'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-padding text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Prediction Results</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the performance of our AI stock predictions powered by real-time data and deep learning
          </p>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <section className="section-padding border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-4 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'predictions' | 'comparison' | 'features')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4">
          {activeTab === 'predictions' && (
            <motion.div key="predictions" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-4">Prediction Accuracy</h2>
                <p className="text-gray-600 mb-6">
                  Our model achieved over 92% accuracy on historical stock data across multiple sectors.
                </p>
                <img
                  src="/charts/accuracy-chart.png"
                  alt="Accuracy chart"
                  className="w-full rounded-lg shadow-sm"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'comparison' && (
            <motion.div key="comparison" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceMetrics.map((metric) => {
                  const Icon = metric.icon
                  return (
                    <div key={metric.title} className="card p-6 flex flex-col items-start space-y-2">
                      <div className="flex items-center justify-between w-full">
                        <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                        <div
                          className={`text-sm ${
                            metric.trend === 'up' ? 'text-secondary-600' : 'text-accent-600'
                          }`}
                        >
                          {metric.trend === 'up' ? '+' : ''}
                          {metric.change}
                        </div>
                      </div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <p className="text-gray-600">{metric.title}</p>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'features' && (
            <motion.div key="features" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Real-time AI-powered stock predictions</li>
                  <li>Customizable alerts and notifications</li>
                  <li>Comprehensive technical analysis tools</li>
                  <li>Confidence scoring and performance tracking</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">Sign up today and explore predictive AI for smarter investing</p>
          <a
            href="/signup"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Get Started
            <ArrowRight className="h-5 w-5 ml-2" />
          </a>
        </motion.div>
      </section>
    </div>
  )
}

export default Results
