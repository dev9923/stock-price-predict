import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react'
import { stockApi, PredictionResult } from '../../services/stockApi'
import { subscriptionService } from '../../services/subscriptionService'
import PremiumGate from '../ui/PremiumGate'
import LoadingSpinner from '../ui/LoadingSpinner'

const PredictionWidget: React.FC = () => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPrediction = async () => {
    if (!subscriptionService.hasPremiumAccess()) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await stockApi.getPrediction()
      setPrediction(result)
    } catch (err) {
      setError('Failed to fetch prediction')
      console.error('Prediction error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPrediction()

    const interval = setInterval(fetchPrediction, 3600000) // every hour
    return () => clearInterval(interval)
  }, [])

  const PredictionContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchPrediction}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )
    }

    if (!prediction) {
      return (
        <div className="text-center py-8">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No prediction available</p>
          <button
            onClick={fetchPrediction}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Generate Prediction
          </button>
        </div>
      )
    }

    const priceChange = prediction.predictedPrice - prediction.currentPrice
    const priceChangePercent = (priceChange / prediction.currentPrice) * 100
    const isPositive = priceChange >= 0

    return (
      <div className="space-y-6">
        {/* Main Prediction */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Brain className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-gray-600">AI Prediction</span>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold text-gray-900">
              ₹{prediction.predictedPrice.toFixed(2)}
            </div>

            <div
              className={`flex items-center justify-center space-x-1 ${
                isPositive ? 'text-secondary-600' : 'text-red-600'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="font-medium">
                {isPositive ? '+' : ''}₹{priceChange.toFixed(2)}
              </span>
              <span className="text-sm">
                ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Confidence</span>
            <span className="text-sm font-bold text-primary-600">
              {prediction.confidence.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Analysis</h4>
          <p className="text-sm text-gray-700">{prediction.analysis}</p>
        </div>

        {/* Technical Indicators */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">RSI</div>
            <div className="font-medium">{prediction.technicalIndicators.rsi.toFixed(1)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">MACD</div>
            <div className="font-medium">{prediction.technicalIndicators.macd.toFixed(2)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">SMA 20</div>
            <div className="font-medium">
              ₹{prediction.technicalIndicators.sma20.toFixed(2)}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">SMA 50</div>
            <div className="font-medium">
              ₹{prediction.technicalIndicators.sma50.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Prediction generated at {new Date().toLocaleTimeString()}
          </p>
          <button
            onClick={fetchPrediction}
            className="mt-2 text-xs text-primary-600 hover:text-primary-700 font-medium"
          >
            Refresh Prediction
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
          <Target className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Daily Prediction</h3>
          <p className="text-sm text-gray-600">AI-powered stock forecast</p>
        </div>
      </div>

      <PremiumGate feature="Get daily AI-powered stock predictions with advanced technical analysis">
        <PredictionContent />
      </PremiumGate>
    </motion.div>
  )
}

export default PredictionWidget
