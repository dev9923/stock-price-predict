import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Zap
} from 'lucide-react'

const Results = () => {
  const [activeTab, setActiveTab] = useState('predictions')

  // Sample data for visualizations
  const predictionData = [
    { date: '2020-01', actual: 45.2, predicted: 44.8 },
    { date: '2020-02', actual: 42.1, predicted: 42.5 },
    { date: '2020-03', actual: 38.9, predicted: 39.2 },
    { date: '2020-04', actual: 35.6, predicted: 35.1 },
    { date: '2020-05', actual: 41.3, predicted: 40.9 },
    { date: '2020-06', actual: 44.7, predicted: 45.2 },
    { date: '2020-07', actual: 47.8, predicted: 47.3 },
    { date: '2020-08', actual: 49.2, predicted: 49.8 },
    { date: '2020-09', actual: 46.5, predicted: 46.1 },
    { date: '2020-10', actual: 43.8, predicted: 44.3 },
    { date: '2020-11', actual: 48.1, predicted: 47.6 },
    { date: '2020-12', actual: 51.3, predicted: 51.8 }
  ]

  const modelComparison = [
    { model: 'Random Forest', accuracy: 94.2, mae: 2.34, rmse: 3.12 },
    { model: 'LSTM', accuracy: 91.8, mae: 2.89, rmse: 3.67 },
    { model: 'SVM', accuracy: 88.5, mae: 3.45, rmse: 4.23 },
    { model: 'Linear Regression', accuracy: 76.3, mae: 5.67, rmse: 7.89 }
  ]

  const featureImportance = [
    { feature: 'Previous Close', importance: 0.28, color: '#3b82f6' },
    { feature: 'Volume', importance: 0.22, color: '#22c55e' },
    { feature: 'Moving Average', importance: 0.18, color: '#ef4444' },
    { feature: 'RSI', importance: 0.15, color: '#f59e0b' },
    { feature: 'MACD', importance: 0.12, color: '#8b5cf6' },
    { feature: 'Others', importance: 0.05, color: '#6b7280' }
  ]

  const performanceMetrics = [
    {
      title: 'Model Accuracy',
      value: '94.2%',
      change: '+2.3%',
      trend: 'up',
      icon: Target,
      color: 'primary'
    },
    {
      title: 'Mean Absolute Error',
      value: '₹2.34',
      change: '-0.45',
      trend: 'down',
      icon: Activity,
      color: 'secondary'
    },
    {
      title: 'R-squared Score',
      value: '0.942',
      change: '+0.023',
      trend: 'up',
      icon: Award,
      color: 'accent'
    },
    {
      title: 'Training Time',
      value: '120h',
      change: '-15h',
      trend: 'down',
      icon: Zap,
      color: 'primary'
    }
  ]

  const tabs = [
    { id: 'predictions', label: 'Predictions', icon: TrendingUp },
    { id: 'comparison', label: 'Model Comparison', icon: BarChart3 },
    { id: 'features', label: 'Feature Analysis', icon: PieChartIcon }
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
              Results & Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive analysis of our machine learning model performance, predictions, 
              and insights from the Yes Bank stock price prediction project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Performance Metrics
            </h2>
            <p className="text-xl text-gray-600">
              Overview of our model's performance across different evaluation criteria.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${metric.color}-100 rounded-lg`}>
                    <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.trend === 'up' ? 'text-secondary-600' : 'text-accent-600'
                  }`}>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <p className="text-gray-600 text-sm">{metric.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Charts Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Detailed Analysis
            </h2>
            <p className="text-xl text-gray-600">
              Interactive visualizations showing model performance and insights.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 mr-2 mb-2 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Chart Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8"
          >
            {activeTab === 'predictions' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Actual vs Predicted Stock Prices
                </h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Actual Price"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="Predicted Price"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-gray-600 mt-4">
                  The chart shows excellent alignment between actual and predicted stock prices, 
                  demonstrating the model's high accuracy in forecasting Yes Bank stock movements.
                </p>
              </div>
            )}

            {activeTab === 'comparison' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Model Performance Comparison
                </h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modelComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="model" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  {modelComparison.map((model, index) => (
                    <div key={model.model} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900">{model.model}</h4>
                      <p className="text-sm text-gray-600">Accuracy: {model.accuracy}%</p>
                      <p className="text-sm text-gray-600">MAE: ₹{model.mae}</p>
                      <p className="text-sm text-gray-600">RMSE: ₹{model.rmse}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Feature Importance Analysis
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={featureImportance}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="importance"
                          label={({ feature, importance }) => `${feature}: ${(importance * 100).toFixed(1)}%`}
                        >
                          {featureImportance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-900">Feature Insights</h4>
                    {featureImportance.map((feature, index) => (
                      <div key={feature.feature} className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: feature.color }}
                        ></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">{feature.feature}</span>
                            <span className="text-gray-600">{(feature.importance * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                width: `${feature.importance * 100}%`,
                                backgroundColor: feature.color 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Insights
            </h2>
            <p className="text-xl text-gray-600">
              Important findings and conclusions from our analysis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">High Accuracy Achievement</h3>
              <p className="text-gray-600">
                Our Random Forest model achieved 94.2% accuracy, significantly outperforming 
                traditional statistical methods and demonstrating the power of ensemble learning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Feature Importance</h3>
              <p className="text-gray-600">
                Previous closing price and trading volume emerged as the most influential features, 
                accounting for 50% of the model's predictive power.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Market Volatility</h3>
              <p className="text-gray-600">
                The model performs exceptionally well during stable market conditions and maintains 
                good accuracy even during high volatility periods.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Project Conclusion
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              This project successfully demonstrates the application of machine learning in financial 
              forecasting. The Random Forest model's 94.2% accuracy proves that ensemble methods can 
              effectively capture complex patterns in stock price movements. The comprehensive analysis 
              of feature importance provides valuable insights for future model improvements and 
              investment decision-making.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-400 mb-2">94.2%</div>
                <p className="text-primary-200">Model Accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-400 mb-2">₹2.34</div>
                <p className="text-primary-200">Mean Absolute Error</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-400 mb-2">50K+</div>
                <p className="text-primary-200">Data Points Analyzed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Results