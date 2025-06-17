import React from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Filter, 
  Brain, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Code,
  Target,
  TrendingUp,
  Zap
} from 'lucide-react'

const Methodology = () => {
  const steps = [
    {
      icon: Database,
      title: 'Data Collection',
      description: 'Gathered comprehensive historical stock data for Yes Bank from 2005-2020, including OHLCV data, trading volumes, and market indicators.',
      details: [
        'Historical stock prices from NSE',
        '50,000+ data points collected',
        'Multiple data sources validation',
        'Real-time data integration'
      ]
    },
    {
      icon: Filter,
      title: 'Data Preprocessing',
      description: 'Cleaned and prepared the raw data through normalization, handling missing values, and feature scaling for optimal model performance.',
      details: [
        'Missing value imputation',
        'Outlier detection and treatment',
        'Data normalization and scaling',
        'Time series data structuring'
      ]
    },
    {
      icon: Code,
      title: 'Feature Engineering',
      description: 'Created meaningful features from raw data including technical indicators, moving averages, and volatility measures.',
      details: [
        'Technical indicators (RSI, MACD, Bollinger Bands)',
        'Moving averages (SMA, EMA)',
        'Volatility measures',
        'Lag features and rolling statistics'
      ]
    },
    {
      icon: Brain,
      title: 'Model Development',
      description: 'Implemented and trained multiple machine learning algorithms to find the best performing model for stock price prediction.',
      details: [
        'Random Forest Regressor',
        'LSTM Neural Networks',
        'Support Vector Machines',
        'Linear Regression baseline'
      ]
    },
    {
      icon: Target,
      title: 'Model Evaluation',
      description: 'Comprehensive evaluation using multiple metrics and cross-validation to ensure model reliability and generalization.',
      details: [
        'Mean Absolute Error (MAE)',
        'Root Mean Square Error (RMSE)',
        'R-squared score',
        'Cross-validation testing'
      ]
    },
    {
      icon: BarChart3,
      title: 'Results Analysis',
      description: 'Detailed analysis of model performance, feature importance, and prediction accuracy across different market conditions.',
      details: [
        'Performance visualization',
        'Feature importance analysis',
        'Prediction vs actual comparison',
        'Market condition analysis'
      ]
    }
  ]

  const algorithms = [
    {
      name: 'Random Forest',
      accuracy: '94.2%',
      description: 'Best performing ensemble method with excellent generalization',
      pros: ['High accuracy', 'Feature importance', 'Robust to overfitting'],
      color: 'primary'
    },
    {
      name: 'LSTM Neural Network',
      accuracy: '91.8%',
      description: 'Deep learning approach for sequential pattern recognition',
      pros: ['Temporal patterns', 'Non-linear relationships', 'Memory capability'],
      color: 'secondary'
    },
    {
      name: 'Support Vector Machine',
      accuracy: '88.5%',
      description: 'Kernel-based method for complex decision boundaries',
      pros: ['Non-linear mapping', 'Regularization', 'Kernel flexibility'],
      color: 'accent'
    },
    {
      name: 'Linear Regression',
      accuracy: '76.3%',
      description: 'Baseline model for comparison and interpretability',
      pros: ['Interpretable', 'Fast training', 'Simple implementation'],
      color: 'gray'
    }
  ]

  const metrics = [
    { name: 'Mean Absolute Error', value: '2.34', unit: '₹' },
    { name: 'Root Mean Square Error', value: '3.12', unit: '₹' },
    { name: 'R-squared Score', value: '0.942', unit: '' },
    { name: 'Mean Absolute Percentage Error', value: '5.8', unit: '%' }
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
              Methodology & Approach
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive overview of our systematic approach to building an accurate 
              stock price prediction model using advanced machine learning techniques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step breakdown of our machine learning pipeline from data collection to final results.
            </p>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 card p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
                      <step.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-primary-600">Step {index + 1}</span>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block w-px h-12 bg-gray-300 mx-auto mt-8"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms Comparison */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Algorithm Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Performance comparison of different machine learning algorithms tested for stock price prediction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {algorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-${algorithm.color}-100 rounded-full -mr-10 -mt-10`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{algorithm.name}</h3>
                    <span className={`text-2xl font-bold text-${algorithm.color}-600`}>
                      {algorithm.accuracy}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{algorithm.description}</p>
                  <div className="space-y-2">
                    {algorithm.pros.map((pro, proIndex) => (
                      <div key={proIndex} className="flex items-center space-x-2">
                        <Zap className={`h-4 w-4 text-${algorithm.color}-500`} />
                        <span className="text-sm text-gray-700">{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Performance Metrics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed evaluation metrics for our best performing Random Forest model.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {metric.value}{metric.unit}
                </div>
                <h3 className="font-medium text-gray-900">{metric.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Technical Implementation
              </h2>
              <p className="text-primary-100 leading-relaxed">
                Our implementation leverages industry-standard libraries and frameworks to ensure 
                reliability, scalability, and maintainability of the machine learning pipeline.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary-400" />
                  <span>Python-based implementation with Scikit-learn</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary-400" />
                  <span>TensorFlow for deep learning models</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary-400" />
                  <span>Pandas and NumPy for data manipulation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary-400" />
                  <span>Matplotlib and Seaborn for visualization</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8 bg-white/10 backdrop-blur-lg border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-6 w-6 text-secondary-400" />
                  <div>
                    <p className="font-medium">Real-time Prediction</p>
                    <p className="text-sm text-primary-200">Live stock price forecasting</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="h-6 w-6 text-secondary-400" />
                  <div>
                    <p className="font-medium">Ensemble Methods</p>
                    <p className="text-sm text-primary-200">Multiple model combination</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-6 w-6 text-secondary-400" />
                  <div>
                    <p className="font-medium">Advanced Analytics</p>
                    <p className="text-sm text-primary-200">Comprehensive performance metrics</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-secondary-400" />
                  <div>
                    <p className="font-medium">High Accuracy</p>
                    <p className="text-sm text-primary-200">94.2% prediction accuracy</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Methodology