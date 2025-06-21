import React, { useState, useEffect } from 'react'
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
  Bar
} from 'recharts'
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  Settings,
  Filter,
  Search,
  RefreshCw,
  Target,
  DollarSign,
  Activity,
  AlertTriangle
} from 'lucide-react'

import { bankDataService, BankStock, BankPrediction } from '../services/bankDataService'
import { subscriptionService } from '../services/subscriptionService'
import { tradingService } from '../services/tradingService'
import PremiumGate from '../components/ui/PremiumGate'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const Dashboard: React.FC = () => {
  const [bankData, setBankData] = useState<BankStock[]>([])
  const [predictions, setPredictions] = useState<BankPrediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBank, setSelectedBank] = useState<string>('HDFCBANK')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'volume'>('change')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const subscription = subscriptionService.getCurrentSubscription()
  const hasPremium = subscriptionService.hasPremiumAccess()

  useEffect(() => {
    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      const [banksData, predictionsData] = await Promise.all([
        bankDataService.getAllBankData(),
        hasPremium ? bankDataService.getAllBankPredictions() : Promise.resolve([])
      ])

      setBankData(banksData)
      setPredictions(predictionsData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredBanks = bankData
    .filter(bank => 
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.currentPrice - a.currentPrice
        case 'change':
          return Math.abs(b.changePercent) - Math.abs(a.changePercent)
        case 'volume':
          return b.volume - a.volume
        default:
          return 0
      }
    })

  const selectedBankData = bankData.find(bank => bank.symbol === selectedBank)
  const selectedBankPrediction = predictions.find(pred => pred.symbol === selectedBank)

  const topGainers = bankData
    .filter(bank => bank.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5)

  const topLosers = bankData
    .filter(bank => bank.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5)

  const handleTradeClick = (symbol: string, brokerId: string) => {
    const referralLink = tradingService.generateReferralLink(brokerId, symbol)
    window.open(referralLink, '_blank')
    
    // Track commission (simulate trade amount)
    const tradeAmount = 10000 // ₹10,000 average trade
    tradingService.trackCommission(brokerId, tradeAmount)
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container-max py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Trading Dashboard</h1>
              <p className="text-gray-600">AI-powered banking stock analysis and predictions</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{lastUpdated.toLocaleString()}</span>
              </div>
              
              {subscription?.planId && (
                <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  hasPremium ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1)} Plan
                </div>
              )}
              
              <button
                onClick={fetchDashboardData}
                disabled={isLoading}
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Banks</p>
                <p className="text-2xl font-bold text-gray-900">{bankData.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top Gainer</p>
                <p className="text-2xl font-bold text-green-600">
                  +{topGainers[0]?.changePercent.toFixed(2) || '0.00'}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top Loser</p>
                <p className="text-2xl font-bold text-red-600">
                  {topLosers[0]?.changePercent.toFixed(2) || '0.00'}%
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commission Earned</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{tradingService.getCommissionEarnings().toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bank List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Banking Stocks</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600 font-medium">Live</span>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search banks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price' | 'change' | 'volume')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="change">Sort by Change</option>
                  <option value="price">Sort by Price</option>
                  <option value="volume">Sort by Volume</option>
                </select>
              </div>

              {/* Bank List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : (
                  filteredBanks.map((bank) => (
                    <div
                      key={bank.symbol}
                      onClick={() => setSelectedBank(bank.symbol)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedBank === bank.symbol
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{bank.symbol}</p>
                          <p className="text-sm text-gray-600">{bank.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹{bank.currentPrice}</p>
                          <p className={`text-sm font-medium ${
                            bank.trend === 'up' ? 'text-green-600' : 
                            bank.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {bank.trend === 'up' ? '+' : ''}{bank.changePercent.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Details and Predictions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Selected Bank Details */}
            {selectedBankData && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedBankData.name}</h2>
                    <p className="text-gray-600">{selectedBankData.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">₹{selectedBankData.currentPrice}</p>
                    <p className={`text-lg font-medium ${
                      selectedBankData.trend === 'up' ? 'text-green-600' : 
                      selectedBankData.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {selectedBankData.trend === 'up' ? '+' : ''}₹{selectedBankData.change.toFixed(2)} 
                      ({selectedBankData.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Day High</p>
                    <p className="font-bold">₹{selectedBankData.dayHigh}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Day Low</p>
                    <p className="font-bold">₹{selectedBankData.dayLow}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Volume</p>
                    <p className="font-bold">{(selectedBankData.volume / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">P/E Ratio</p>
                    <p className="font-bold">{selectedBankData.pe.toFixed(1)}</p>
                  </div>
                </div>

                {/* Trading Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {tradingService.getBrokers().map((broker) => (
                    <button
                      key={broker.id}
                      onClick={() => handleTradeClick(selectedBankData.symbol, broker.id)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                    >
                      <span className="text-lg">{broker.logo}</span>
                      <span className="font-medium">{broker.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AI Predictions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">AI Prediction</h3>
                  <p className="text-sm text-gray-600">Advanced machine learning analysis</p>
                </div>
              </div>

              <PremiumGate feature="Get AI-powered predictions with precise entry/exit points and risk analysis">
                {selectedBankPrediction && (
                  <div className="space-y-6">
                    {/* Prediction Summary */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Predicted Price</p>
                          <p className="text-2xl font-bold text-blue-600">
                            ₹{selectedBankPrediction.predictedPrice}
                          </p>
                          <p className="text-sm text-gray-500">{selectedBankPrediction.timeframe}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Target Price</p>
                          <p className="text-2xl font-bold text-green-600">
                            ₹{selectedBankPrediction.targetPrice}
                          </p>
                          <p className="text-sm text-gray-500">Upside Target</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Stop Loss</p>
                          <p className="text-2xl font-bold text-red-600">
                            ₹{selectedBankPrediction.stopLoss}
                          </p>
                          <p className="text-sm text-gray-500">Risk Management</p>
                        </div>
                      </div>
                    </div>

                    {/* Confidence and Recommendation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Confidence</span>
                          <span className="text-sm font-bold text-blue-600">
                            {selectedBankPrediction.confidence}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${selectedBankPrediction.confidence}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Recommendation</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            selectedBankPrediction.recommendation === 'strong_buy' ? 'bg-green-100 text-green-800' :
                            selectedBankPrediction.recommendation === 'buy' ? 'bg-green-100 text-green-700' :
                            selectedBankPrediction.recommendation === 'hold' ? 'bg-yellow-100 text-yellow-700' :
                            selectedBankPrediction.recommendation === 'sell' ? 'bg-red-100 text-red-700' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {selectedBankPrediction.recommendation.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">RSI</p>
                        <p className="font-bold">{selectedBankPrediction.technicalIndicators.rsi}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">MACD</p>
                        <p className="font-bold">{selectedBankPrediction.technicalIndicators.macd}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">SMA 20</p>
                        <p className="font-bold">₹{selectedBankPrediction.technicalIndicators.sma20}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">SMA 50</p>
                        <p className="font-bold">₹{selectedBankPrediction.technicalIndicators.sma50}</p>
                      </div>
                    </div>

                    {/* Analysis */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">AI Analysis</h4>
                      <p className="text-sm text-gray-700">{selectedBankPrediction.analysis}</p>
                    </div>
                  </div>
                )}
              </PremiumGate>
            </motion.div>

            {/* Top Gainers and Losers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  Top Gainers
                </h3>
                <div className="space-y-3">
                  {topGainers.map((bank) => (
                    <div key={bank.symbol} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{bank.symbol}</p>
                        <p className="text-sm text-gray-600">₹{bank.currentPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+{bank.changePercent.toFixed(2)}%</p>
                        <p className="text-sm text-gray-600">+₹{bank.change.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                  Top Losers
                </h3>
                <div className="space-y-3">
                  {topLosers.map((bank) => (
                    <div key={bank.symbol} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{bank.symbol}</p>
                        <p className="text-sm text-gray-600">₹{bank.currentPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">{bank.changePercent.toFixed(2)}%</p>
                        <p className="text-sm text-gray-600">₹{bank.change.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard