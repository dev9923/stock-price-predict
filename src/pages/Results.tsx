// src/pages/Results.tsx

import { useState } from 'react'
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
  const [activeTab, setActiveTab] = useState<'predictions' | 'comparison' | 'features'>('predictions')

  // Actual vs Predicted Closing Prices for past 12 months
  const predictionData = [
    { date: '2024-07', actual: 85.4, predicted: 84.9 },
    { date: '2024-08', actual: 87.6, predicted: 88.2 },
    { date: '2024-09', actual: 90.1, predicted: 89.7 },
    { date: '2024-10', actual: 88.9, predicted: 88.5 },
    { date: '2024-11', actual: 92.3, predicted: 92.0 },
    { date: '2024-12', actual: 95.2, predicted: 95.8 },
    { date: '2025-01', actual: 98.1, predicted: 97.5 },
    { date: '2025-02', actual: 96.7, predicted: 96.4 },
    { date: '2025-03', actual: 99.5, predicted: 99.0 },
    { date: '2025-04', actual: 102.3, predicted: 102.9 },
    { date: '2025-05', actual: 104.8, predicted: 104.5 },
    { date: '2025-06', actual: 107.2, predicted: 107.0 }
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
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Results & Analysis</h1>
          <p className="text-xl text-gray-600">Detailed evaluation of predictive modeling for Yes Bank stock.</p>
        </motion.div>
      </section>

      {/* Performance Metrics */}
      <section className="section-padding">
        <div className="container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric) => (
            <motion.div key={metric.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card p-6 flex items-center justify-between">
                <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                <div className={`text-sm ${metric.trend === 'up' ? 'text-secondary-600' : 'text-accent-600'}`}>
                  {metric.trend === 'up' ? '+' : ''}{metric.change}
                </div>
              </div>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-gray-600">{metric.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Analysis Tabs */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="flex flex-wrap justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition ${
                  activeTab === tab.id ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="card p-8">
            {activeTab === 'predictions' && (
              <>
                <h3 className="text-2xl font-bold mb-6">Actual vs Predicted (Last 12 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={predictionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="actual" stroke="#3b82f6" name="Actual" />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#22c55e"
                      name="Predicted"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}

            {activeTab === 'comparison' && (
              <>
                <h3 className="text-2xl font-bold mb-6">Model Performance Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={modelComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="model" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}

            {activeTab === 'features' && (
              <>
                <h3 className="text-2xl font-bold mb-6">Feature Importance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={featureImportance}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="importance"
                      label={(entry) => `${entry.feature}: ${(entry.importance * 100).toFixed(1)}%`}
                    >
                      {featureImportance.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Results
