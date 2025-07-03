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
  Clock,
  DollarSign,
  Percent,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import { realTimeDataService, RealTimePrediction } from '../../services/realTimeDataService'
import { subscriptionService } from '../../services/subscriptionService'
import PremiumGate from '../ui/PremiumGate'
import LoadingSpinner from '../ui/LoadingSpinner'

interface RealTimePredictionWidgetProps {
  symbol: string
}

const RealTimePredictionWidget: React.FC<RealTimePredictionWidgetProps> = ({ symbol }) => {
  const [prediction, setPrediction] = useState<RealTimePrediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTimeframe, setActiveTimeframe] = useState<'next5min' | 'next15min' | 'next1hour' | 'next1day' | 'next1week'>('next1hour')
  const [showDetails, setShowDetails] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const hasPremium = subscriptionService.hasPremiumAccess()

  useEffect(() => {
    if (symbol && hasPremium) {
      fetchPrediction()
      
      // Subscribe to real-time prediction updates
      const unsubscribe = realTimeDataService.subscribeToPredictions((predictions) => {
        const symbolPrediction = predictions.find(p => p.symbol === symbol)
        if (symbolPrediction) {
          setPrediction(symbolPrediction)
          setLastUpdate(new Date())
        }
      })

      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchPrediction, 30000)

      return () => {
        unsubscribe()
        clearInterval(interval)
      }
    }
  }, [symbol, hasPremium])

  const fetchPrediction = async () => {
    if (!hasPremium) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await realTimeDataService.generateRealTimePrediction(symbol)
      if (result) {
        setPrediction(result)
        setLastUpdate(new Date())
      } else {
        throw new Error('No prediction data available')
      }
    } catch (err) {
      console.error('Prediction error:', err)
      setError('Failed to fetch real-time prediction')
    } finally {
      setIsLoading(false)
    }
  }

  const getSignalColor = (signal: any) => {
    if (signal.buy) return signal.strength === 'strong' ? 'text-green-700 bg-green-100' : 'text-green-600 bg-green-50'
    if (signal.sell) return signal.strength === 'strong' ? 'text-red-700 bg-red-100' : 'text-red-600 bg-red-50'
    return 'text-yellow-600 bg-yellow-50'
  }

  const getSignalIcon = (signal: any) => {
    if (signal.buy) return <ArrowUp className="h-4 w-4" />
    if (signal.sell) return <ArrowDown className="h-4 w-4" />
    return <Minus className="h-4 w-4" />
  }

  const getSignalText = (signal: any) => {
    if (signal.buy) return `${signal.strength.toUpperCase()} BUY`
    if (signal.sell) return `${signal.strength.toUpperCase()} SELL`
    return 'HOLD'
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'extreme': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
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

  const timeframes = [
    { key: 'next5min', label: '5m', fullLabel: '5 Minutes' },
    { key: 'next15min', label: '15m', fullLabel: '15 Minutes' },
    { key: 'next1hour', label: '1h', fullLabel: '1 Hour' },
    { key: 'next1day', label: '1d', fullLabel: '1 Day' },
    { key: 'next1week', label: '1w', fullLabel: '1 Week' }
  ]

  const PredictionContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <LoadingSpinner />
            <p className="text-gray-600 mt-4">Generating real-time prediction...</p>
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
          <p className="text-gray-600 mb-4">No real-time prediction available for {symbol}</p>
          <button
            onClick={fetchPrediction}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Prediction
          </button>
        </div>
      )
    }

    const currentPrediction = prediction.predictions[activeTimeframe]
    const currentConfidence = prediction.confidence[activeTimeframe]
    const priceChange = currentPrediction - prediction.currentPrice
    const priceChangePercent = (priceChange / prediction.currentPrice) * 100
    const isPositive = priceChange >= 0

    return (
      <div className="space-y-6">
        {/* Header with Real-time Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Real-time AI Prediction</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">Live Analysis for {symbol}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-500">
              Updated: {lastUpdate.toLocaleTimeString()}
            </div>
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

        {/* Timeframe Selector */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.key}
              onClick={() => setActiveTimeframe(timeframe.key as any)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTimeframe === timeframe.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>

        {/* Main Prediction Display */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">
              {timeframes.find(t => t.key === activeTimeframe)?.fullLabel} Prediction
            </p>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              ₹{currentPrediction.toFixed(2)}
            </div>
            <div className={`flex items-center justify-center space-x-2 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
              <span className="text-lg font-semibold">
                {isPositive ? '+' : ''}₹{priceChange.toFixed(2)}
              </span>
              <span className="text-sm">
                ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          {/* Confidence Meter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Confidence</span>
              <span className="text-sm font-bold text-blue-600">{currentConfidence.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${currentConfidence}%` }}
              />
            </div>
          </div>

          {/* Current Price */}
          <div className="text-center text-sm text-gray-600">
            Current Price: ₹{prediction.currentPrice.toFixed(2)}
          </div>
        </div>

        {/* Trading Signals and Risk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Signal</span>
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${
                getSignalColor(prediction.signals)
              }`}>
                {getSignalIcon(prediction.signals)}
                <span>{getSignalText(prediction.signals)}</span>
              </div>
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
        </div>

        {/* Scores */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {prediction.technicalScore.toFixed(0)}
            </div>
            <p className="text-xs text-gray-600">Technical Score</p>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {prediction.fundamentalScore.toFixed(0)}
            </div>
            <p className="text-xs text-gray-600">Fundamental Score</p>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {prediction.sentimentScore.toFixed(0)}
            </div>
            <p className="text-xs text-gray-600">Sentiment Score</p>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {prediction.overallScore.toFixed(0)}
            </div>
            <p className="text-xs text-gray-600">Overall Score</p>
          </div>
        </div>

        {/* Target and Stop Loss */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Target Price</span>
              </div>
              <span className="text-lg font-bold text-green-600">
                ₹{prediction.targetPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-gray-700">Stop Loss</span>
              </div>
              <span className="text-lg font-bold text-red-600">
                ₹{prediction.stopLoss.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Support and Resistance Levels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <TrendingDown className="h-4 w-4 mr-2 text-green-600" />
              Support Levels
            </h4>
            <div className="space-y-2">
              {prediction.supportLevels.map((level, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">S{index + 1}</span>
                  <span className="font-medium text-green-600">₹{level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-red-600" />
              Resistance Levels
            </h4>
            <div className="space-y-2">
              {prediction.resistanceLevels.map((level, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">R{index + 1}</span>
                  <span className="font-medium text-red-600">₹{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card p-6"
            >
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <Brain className="h-4 w-4 mr-2 text-purple-600" />
                AI Analysis
              </h4>
              <p className="text-gray-700 leading-relaxed mb-4">{prediction.analysis}</p>
              
              {/* All Timeframe Predictions */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                {timeframes.map((timeframe) => {
                  const pred = prediction.predictions[timeframe.key as keyof typeof prediction.predictions]
                  const conf = prediction.confidence[timeframe.key as keyof typeof prediction.confidence]
                  const change = pred - prediction.currentPrice
                  const changePercent = (change / prediction.currentPrice) * 100
                  
                  return (
                    <div key={timeframe.key} className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">{timeframe.fullLabel}</p>
                      <p className="text-lg font-bold text-gray-900">₹{pred.toFixed(2)}</p>
                      <p className={`text-xs font-medium ${
                        change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {change >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                      </p>
                      <p className="text-xs text-gray-500">{conf.toFixed(0)}% conf.</p>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Real-time prediction generated at {new Date(prediction.lastUpdated).toLocaleString()}
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500">Live Updates</span>
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
      <PremiumGate feature="Get real-time AI predictions with live market analysis, multiple timeframes, and advanced trading signals">
        <PredictionContent />
      </PremiumGate>
    </motion.div>
  )
}

export default RealTimePredictionWidget