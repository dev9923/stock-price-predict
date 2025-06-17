import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Calendar, TrendingUp, Bell, Settings } from 'lucide-react'

import LiveStockWidget from '../components/dashboard/LiveStockWidget'
import PredictionWidget from '../components/dashboard/PredictionWidget'
import { stockApi, StockData } from '../services/stockApi'
import { subscriptionService } from '../services/subscriptionService'

interface NewsArticle {
  id?: string | number
  title: string
  summary: string
  timestamp: string | number
  sentiment: 'positive' | 'neutral' | 'negative'
}

const Dashboard: React.FC = () => {
  const [stockData, setStockData] = useState<StockData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('1M')
  const [news, setNews] = useState<NewsArticle[]>([])

  const periods = ['1W', '1M', '3M', '6M', '1Y'].map((val) => ({
    label: val,
    value: val
  }))

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // ✅ FIX: Match actual API signature for getHistoricalData
        const [historicalData, marketNews] = await Promise.all([
          stockApi.getHistoricalData({ symbol: 'YESBANK', period: selectedPeriod }),
          stockApi.getMarketNews()
        ])

        setStockData(historicalData)

        // ✅ FIX: Transform MarketNewsItem[] into NewsArticle[]
        setNews(
          marketNews.map((item: any) => ({
            id: item.id,
            title: item.title,
            summary: item.summary,
            timestamp: item.timestamp ?? Date.now(),
            sentiment: item.sentiment ?? 'neutral'
          }))
        )
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedPeriod])

  const subscription = subscriptionService.getCurrentSubscription()

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container-max py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Dashboard</h1>
              <p className="text-gray-600">Real-time Yes Bank stock analysis and predictions</p>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

              {subscription?.planId && (
                <div
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    ['premium', 'pro'].includes(subscription.planId)
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1)} Plan
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Price Chart</h2>
                <div className="flex space-x-2">
                  {periods.map((period) => (
                    <button
                      key={period.value}
                      onClick={() => setSelectedPeriod(period.value)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedPeriod === period.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>

              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stockData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(val: string | number) =>
                          new Date(val).toLocaleDateString()
                        }
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(val) => new Date(val as string).toLocaleDateString()}
                        formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Close Price']}
                      />
                      <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </motion.div>

            {/* Market News */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Market News</h2>
              <div className="space-y-4">
                {news.map((article, index) => (
                  <div
                    key={article.id ?? index}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <h3 className="font-medium text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{article.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(article.timestamp).toLocaleString()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          article.sentiment === 'positive'
                            ? 'bg-secondary-100 text-secondary-700'
                            : article.sentiment === 'negative'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {article.sentiment}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <LiveStockWidget />
            <PredictionWidget />

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Set Price Alert"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Set Price Alert</span>
                </button>

                <button
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="View Analysis"
                >
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">View Analysis</span>
                </button>

                <button
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Open Settings"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Settings</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
