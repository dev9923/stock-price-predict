import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw,
  Target,
  DollarSign,
  Activity,
  BarChart3,
  Users,
  Zap,
  Shield,
  Bell,
  Settings,
  Download,
  Share2
} from 'lucide-react'

import { realTimeBankDataService, BankStock, BankPrediction, MarketData } from '../services/realTimeBankDataService'
import { subscriptionService } from '../services/subscriptionService'
import { tradingService } from '../services/tradingService'
import AdvancedLiveStockWidget from '../components/dashboard/AdvancedLiveStockWidget'
import AdvancedPredictionWidget from '../components/dashboard/AdvancedPredictionWidget'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const Dashboard: React.FC = () => {
  const [bankData, setBankData] = useState<BankStock[]>([])
  const [predictions, setPredictions] = useState<BankPrediction[]>([])
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBank, setSelectedBank] = useState<string>('HDFCBANK')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [notifications, setNotifications] = useState<any[]>([])

  const subscription = subscriptionService.getCurrentSubscription()
  const hasPremium = subscriptionService.hasPremiumAccess()

  useEffect(() => {
    fetchDashboardData()
    
    // Subscribe to real-time updates
    const unsubscribe = realTimeBankDataService.subscribe((data) => {
      setBankData(data)
      setLastUpdated(new Date())
      checkForAlerts(data)
    })

    // Refresh interval for market data
    const interval = setInterval(fetchMarketData, 30000) // Every 30 seconds

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      const [banksData, marketDataResult] = await Promise.all([
        realTimeBankDataService.getAllBankData(),
        realTimeBankDataService.getMarketData()
      ])

      setBankData(banksData)
      setMarketData(marketDataResult)
      setLastUpdated(new Date())

      if (hasPremium) {
        const predictionsData = await realTimeBankDataService.getAllBankPredictions()
        setPredictions(predictionsData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMarketData = async () => {
    try {
      const marketDataResult = await realTimeBankDataService.getMarketData()
      setMarketData(marketDataResult)
    } catch (error) {
      console.error('Error fetching market data:', error)
    }
  }

  const checkForAlerts = (data: BankStock[]) => {
    // Check for significant price movements and generate alerts
    const alerts = data
      .filter(bank => Math.abs(bank.changePercent) > 5) // 5% movement threshold
      .map(bank => ({
        id: Date.now() + Math.random(),
        type: bank.changePercent > 0 ? 'gain' : 'loss',
        symbol: bank.symbol,
        message: `${bank.symbol} moved ${bank.changePercent > 0 ? '+' : ''}${bank.changePercent.toFixed(2)}%`,
        timestamp: new Date()
      }))

    if (alerts.length > 0) {
      setNotifications(prev => [...alerts, ...prev].slice(0, 10)) // Keep last 10 notifications
    }
  }

  const handleTradeClick = (symbol: string, brokerId: string) => {
    const referralLink = tradingService.generateReferralLink(brokerId, symbol)
    window.open(referralLink, '_blank')
    
    // Track commission (simulate trade amount)
    const tradeAmount = 10000 // ₹10,000 average trade
    tradingService.trackCommission(brokerId, tradeAmount)
  }

  const topGainers = bankData
    .filter(bank => bank.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5)

  const topLosers = bankData
    .filter(bank => bank.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5)

  const selectedBankData = bankData.find(bank => bank.symbol === selectedBank)
  const selectedBankPrediction = predictions.find(pred => pred.symbol === selectedBank)

  const portfolioValue = 1250000 // Mock portfolio value
  const todaysPnL = 15750 // Mock P&L
  const totalCommissions = tradingService.getCommissionEarnings()

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container-max py-8">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Trading Dashboard</h1>
              <p className="text-gray-600">Real-time AI-powered banking stock analysis and predictions</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              {/* Market Status */}
              {marketData && (
                <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    marketData.marketStatus === 'open' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">
                    Market {marketData.marketStatus.toUpperCase()}
                  </span>
                </div>
              )}
              
              {/* Last Updated */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{lastUpdated.toLocaleTimeString()}</span>
              </div>
              
              {/* Subscription Status */}
              {subscription?.planId && (
                <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  hasPremium ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1)} Plan
                </div>
              )}
              
              {/* Refresh Button */}
              <button
                onClick={fetchDashboardData}
                disabled={isLoading}
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
                title="Refresh Data"
              >
                <RefreshCw className={`h-4 w-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Bell className="h-4 w-4 text-gray-600" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{(portfolioValue / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's P&L</p>
                <p className={`text-2xl font-bold ${todaysPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {todaysPnL >= 0 ? '+' : ''}₹{(todaysPnL / 1000).toFixed(1)}K
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
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
                <p className="text-sm text-gray-600">Commissions</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{(totalCommissions / 1000).toFixed(1)}K
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Enhanced Bank List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AdvancedLiveStockWidget 
                selectedSymbol={selectedBank}
                onSymbolSelect={setSelectedBank}
              />
            </motion.div>
          </div>

          {/* Right Column - Enhanced Details and Predictions */}
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
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-gray-600">{selectedBankData.symbol}</span>
                      <span className="text-sm text-gray-500">{selectedBankData.sector}</span>
                      <span className="text-sm text-gray-500">{selectedBankData.exchange}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">₹{selectedBankData.currentPrice.toFixed(2)}</p>
                    <p className={`text-lg font-medium ${
                      selectedBankData.trend === 'up' ? 'text-green-600' : 
                      selectedBankData.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {selectedBankData.trend === 'up' ? '+' : ''}₹{selectedBankData.change.toFixed(2)} 
                      ({selectedBankData.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>

                {/* Enhanced Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Day High</p>
                    <p className="font-bold">₹{selectedBankData.dayHigh.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Day Low</p>
                    <p className="font-bold">₹{selectedBankData.dayLow.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">52W High</p>
                    <p className="font-bold">₹{selectedBankData.weekHigh52.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">52W Low</p>
                    <p className="font-bold">₹{selectedBankData.weekLow52.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Volume</p>
                    <p className="font-bold">{(selectedBankData.volume / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Market Cap</p>
                    <p className="font-bold">₹{(selectedBankData.marketCap / 10000000).toFixed(0)}Cr</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">P/E Ratio</p>
                    <p className="font-bold">{selectedBankData.pe.toFixed(1)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Book Value</p>
                    <p className="font-bold">₹{selectedBankData.bookValue.toFixed(2)}</p>
                  </div>
                </div>

                {/* Enhanced Trading Buttons */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Trade with Top Brokers</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {tradingService.getBrokers().map((broker) => (
                      <button
                        key={broker.id}
                        onClick={() => handleTradeClick(selectedBankData.symbol, broker.id)}
                        className="flex flex-col items-center space-y-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        <span className="text-2xl">{broker.logo}</span>
                        <span className="font-medium text-sm">{broker.name}</span>
                        <span className="text-xs opacity-90">{broker.commission}% commission</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Enhanced AI Predictions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AdvancedPredictionWidget symbol={selectedBank} />
            </motion.div>

            {/* Enhanced Top Gainers and Losers */}
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
                  {topGainers.map((bank, index) => (
                    <div 
                      key={bank.symbol} 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => setSelectedBank(bank.symbol)}
                    >
                      <div>
                        <p className="font-medium text-gray-900">{bank.symbol}</p>
                        <p className="text-sm text-gray-600">₹{bank.currentPrice.toFixed(2)}</p>
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
                  {topLosers.map((bank, index) => (
                    <div 
                      key={bank.symbol} 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => setSelectedBank(bank.symbol)}
                    >
                      <div>
                        <p className="font-medium text-gray-900">{bank.symbol}</p>
                        <p className="text-sm text-gray-600">₹{bank.currentPrice.toFixed(2)}</p>
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

        {/* Notifications Panel */}
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 card p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 text-blue-600 mr-2" />
              Recent Alerts
            </h3>
            <div className="space-y-2">
              {notifications.slice(0, 5).map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    notification.type === 'gain' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{notification.message}</p>
                    <span className="text-xs text-gray-500">
                      {notification.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard