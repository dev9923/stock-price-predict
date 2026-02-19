import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle,
  BarChart3,
  Activity,
  Shield,
  Zap,
  Eye,
  RefreshCw,
  Download,
  Share2,
  Bookmark
} from 'lucide-react'
import { realTimeBankDataService, BankPrediction } from '../../services/realTimeBankDataService'
import { subscriptionService } from '../../services/subscriptionService'
import PremiumGate from '../ui/PremiumGate'
import LoadingSpinner from '../ui/LoadingSpinner'

interface AdvancedPredictionWidgetProps {
  symbol: string
}

const AdvancedPredictionWidget: React.FC<AdvancedPredictionWidgetProps> = ({ symbol }) => {
  const [prediction, setPrediction] = useState<BankPrediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'analysis'>('overview')
  const [showDetails, setShowDetails] = useState(false)

  const hasPremium = subscriptionService.hasPremiumAccess()

  useEffect(() => {
    if (symbol) {
      fetchPrediction()
    }
  }, [symbol])

  const fetchPrediction = async () => {
    if (!hasPremium) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await realTimeBankDataService.getBankPrediction(symbol)
      if (result) {
        setPrediction(result)
      } else {
        throw new Error('No prediction data available')
      }
    } catch (err) {
      console.error('Prediction error:', err)
      setError('Failed to fetch prediction')
    } finally {
      setIsLoading(false)
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'strong_buy': return 'text-green-700 bg-green-100'
      case 'buy': return 'text-green-600 bg-green-50'
      case 'hold': return 'text-yellow-600 bg-yellow-50'
      case 'sell': return 'text-red-600 bg-red-50'
      case 'strong_sell': return 'text-red-700 bg-red-100'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const PredictionContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <LoadingSpinner />
            <p className="text-gray-600 mt-4">Analyzing market data...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPrediction}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry Analysis
          </button>
        </div>
      )
    }

    if (!prediction) {
      return (
        <div className="text-center py-12">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No prediction available for {symbol}</p>
          <button
            onClick={fetchPrediction}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">AI Prediction for {symbol}</h3>
              <p className="text-sm text-gray-600">Advanced machine learning analysis</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Toggle Details"
            >
              <Eye className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={fetchPrediction}
              disabled={isLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh Prediction"
            >
              <RefreshCw className={`h-4 w-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Main Prediction Card */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Price */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Current Price</p>
              <p className="text-2xl font-bold text-gray-900">₹{prediction.currentPrice.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Live Market Price</p>
            </div>

            {/* Predicted Price */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Predicted Price ({prediction.timeframe})</p>
              <p className="text-3xl font-bold text-blue-600">₹{prediction.predictedPrice.toFixed(2)}</p>
              <div className={`flex items-center justify-center space-x-1 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
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

            {/* Target & Stop Loss */}
            <div className="text-center">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-600">Target</p>
                  <p className="text-lg font-bold text-green-600">₹{prediction.targetPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Stop Loss</p>
                  <p className="text-lg font-bold text-red-600">₹{prediction.stopLoss.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confidence and Recommendation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Confidence</span>
              <span className="text-sm font-bold text-blue-600">{prediction.confidence}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${prediction.confidence}%` }}
              />
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Recommendation</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                getRecommendationColor(prediction.recommendation)
              }`}>
                {prediction.recommendation.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Risk Level</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                getRiskColor(prediction.riskLevel)
              }`}>
                {prediction.riskLevel.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Target },
              { id: 'technical', name: 'Technical', icon: BarChart3 },
              { id: 'analysis', name: 'Analysis', icon: Brain }
            ].map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-green-600" />
                    Support Levels
                  </h4>
                  <div className="space-y-2">
                    {prediction.supportLevels.map((level, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">S{index + 1}</span>
                        <span className="font-medium">₹{level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-red-600" />
                    Resistance Levels
                  </h4>
                  <div className="space-y-2">
                    {prediction.resistanceLevels.map((level, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">R{index + 1}</span>
                        <span className="font-medium">₹{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-blue-600" />
                  Volume Analysis
                </h4>
                <p className="text-sm text-gray-700">{prediction.volumeAnalysis}</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'technical' && (
            <motion.div
              key="technical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">RSI</p>
                  <p className="font-bold text-lg">{prediction.technicalIndicators.rsi}</p>
                  <p className="text-xs text-gray-500">
                    {prediction.technicalIndicators.rsi > 70 ? 'Overbought' : 
                     prediction.technicalIndicators.rsi < 30 ? 'Oversold' : 'Neutral'}
                  </p>
                </div>

                <div className="card p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">MACD</p>
                  <p className="font-bold text-lg">{prediction.technicalIndicators.macd}</p>
                  <p className="text-xs text-gray-500">
                    {prediction.technicalIndicators.macd > 0 ? 'Bullish' : 'Bearish'}
                  </p>
                </div>

                <div className="card p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">SMA 20</p>
                  <p className="font-bold text-lg">₹{prediction.technicalIndicators.sma20}</p>
                  <p className="text-xs text-gray-500">Short Term</p>
                </div>

                <div className="card p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">SMA 50</p>
                  <p className="font-bold text-lg">₹{prediction.technicalIndicators.sma50}</p>
                  <p className="text-xs text-gray-500">Medium Term</p>
                </div>

                <div className="card p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">EMA 12</p>
                  <p className="font-bold text-lg">₹{prediction.technicalIndicators.ema12}</p>
                  <p className="text-xs text-gray-500">Fast EMA</p>
                </div>

                <div className="card p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">EMA 26</p>
                  <p className="font-bold text-lg">₹{prediction.technicalIndicators.ema26}</p>
                  <p className="text-xs text-gray-500">Slow EMA</p>
                </div>

                <div className="card p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">Stochastic %K</p>
                  <p className="font-bold text-lg">{prediction.technicalIndicators.stochastic.k}</p>
                  <p className="text-xs text-gray-500">Momentum</p>
                </div>

                <div className="card p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">ADX</p>
                  <p className="font-bold text-lg">{prediction.technicalIndicators.adx}</p>
                  <p className="text-xs text-gray-500">
                    {prediction.technicalIndicators.adx > 25 ? 'Strong Trend' : 'Weak Trend'}
                  </p>
                </div>
              </div>

              <div className="card p-4">
                <h4 className="font-medium text-gray-900 mb-3">Bollinger Bands</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-600">Upper</p>
                    <p className="font-bold">₹{prediction.technicalIndicators.bollinger.upper}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Middle</p>
                    <p className="font-bold">₹{prediction.technicalIndicators.bollinger.middle}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Lower</p>
                    <p className="font-bold">₹{prediction.technicalIndicators.bollinger.lower}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="card p-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-purple-600" />
                  AI Analysis
                </h4>
                <p className="text-gray-700 leading-relaxed">{prediction.analysis}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                    Market Trend
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Direction</span>
                    <span className={`font-bold ${
                      prediction.trend === 'bullish' ? 'text-green-600' : 
                      prediction.trend === 'bearish' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {prediction.trend.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-orange-600" />
                    News Impact
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sentiment</span>
                    <span className={`font-bold ${
                      prediction.newsImpact === 'positive' ? 'text-green-600' : 
                      prediction.newsImpact === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {prediction.newsImpact.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Prediction generated at {new Date(prediction.currentPrice ? Date.now() : 0).toLocaleString()}
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={fetchPrediction}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Refresh</span>
            </button>
          </div>
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
      <PremiumGate feature="Get advanced AI-powered stock predictions with comprehensive technical analysis, support/resistance levels, and real-time market insights">
        <PredictionContent />
      </PremiumGate>
    </motion.div>
  )
}

export default AdvancedPredictionWidget