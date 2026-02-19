import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Activity, 
  BarChart3,
  Eye,
  AlertCircle,
  Wifi,
  WifiOff,
  Clock,
  DollarSign,
  Percent,
  Volume2,
  Filter,
  Search,
  ArrowUpDown
} from 'lucide-react'
import { realTimeDataService, RealTimeBankData, LiveMarketData } from '../../services/realTimeDataService'

interface RealTimeBankWidgetProps {
  selectedSymbol?: string
  onSymbolSelect?: (symbol: string) => void
}

const RealTimeBankWidget: React.FC<RealTimeBankWidgetProps> = ({
  selectedSymbol,
  onSymbolSelect
}) => {
  const [bankData, setBankData] = useState<RealTimeBankData[]>([])
  const [marketData, setMarketData] = useState<LiveMarketData | null>(null)
  const [selectedBank, setSelectedBank] = useState<RealTimeBankData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'change' | 'price' | 'volume' | 'marketCap'>('change')
  const [filterSector, setFilterSector] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('detailed')

  useEffect(() => {
    fetchAllData()
    
    // Subscribe to real-time updates
    const unsubscribe = realTimeDataService.subscribe((data) => {
      setBankData(data)
      setLastUpdated(new Date())
      setIsConnected(true)
    })

    // Auto-refresh interval
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchAllData()
      }
    }, 5000) // Refresh every 5 seconds

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [autoRefresh])

  useEffect(() => {
    if (selectedSymbol && bankData.length > 0) {
      const bank = bankData.find(b => b.symbol === selectedSymbol)
      setSelectedBank(bank || null)
    }
  }, [selectedSymbol, bankData])

  const fetchAllData = async () => {
    setIsLoading(true)
    try {
      const [banks, market] = await Promise.all([
        realTimeDataService.getAllBankData(),
        realTimeDataService.getLiveMarketData()
      ])
      
      setBankData(banks)
      setMarketData(market)
      setIsConnected(true)
      setLastUpdated(new Date())
      
      if (!selectedBank && banks.length > 0) {
        setSelectedBank(banks[0])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBankSelect = (bank: RealTimeBankData) => {
    setSelectedBank(bank)
    onSymbolSelect?.(bank.symbol)
  }

  const filteredAndSortedBanks = bankData
    .filter(bank => {
      const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bank.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSector = filterSector === 'all' || bank.sector === filterSector
      return matchesSearch && matchesSector
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'change':
          return Math.abs(b.changePercent) - Math.abs(a.changePercent)
        case 'price':
          return b.currentPrice - a.currentPrice
        case 'volume':
          return b.volume - a.volume
        case 'marketCap':
          return b.marketCap - a.marketCap
        default:
          return 0
      }
    })

  const sectors = ['all', ...Array.from(new Set(bankData.map(bank => bank.sector)))]

  const formatNumber = (num: number, decimals = 2) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toFixed(decimals)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(1)}Cr`
    if (volume >= 100000) return `${(volume / 100000).toFixed(1)}L`
    return `${(volume / 1000).toFixed(0)}K`
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'bearish': return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getTechnicalSignal = (bank: RealTimeBankData) => {
    if (bank.rsi > 70) return { signal: 'Overbought', color: 'text-red-600' }
    if (bank.rsi < 30) return { signal: 'Oversold', color: 'text-green-600' }
    if (bank.currentPrice > bank.sma20) return { signal: 'Bullish', color: 'text-green-600' }
    if (bank.currentPrice < bank.sma20) return { signal: 'Bearish', color: 'text-red-600' }
    return { signal: 'Neutral', color: 'text-gray-600' }
  }

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      {marketData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 bg-gradient-to-r from-blue-50 to-purple-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Live Market Overview</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                marketData.marketStatus === 'open' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`} />
              <span className={`text-sm font-medium ${
                marketData.marketStatus === 'open' ? 'text-green-600' : 'text-red-600'
              }`}>
                {marketData.marketStatus.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">
                {marketData.tradingSession}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Nifty Bank</p>
              <p className="text-xl font-bold text-gray-900">{marketData.niftyBank.value.toLocaleString()}</p>
              <div className={`flex items-center justify-center space-x-1 ${
                marketData.niftyBank.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {marketData.niftyBank.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-sm font-medium">
                  {marketData.niftyBank.change >= 0 ? '+' : ''}{marketData.niftyBank.change.toFixed(2)} 
                  ({marketData.niftyBank.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Sensex</p>
              <p className="text-xl font-bold text-gray-900">{marketData.sensex.value.toLocaleString()}</p>
              <div className={`flex items-center justify-center space-x-1 ${
                marketData.sensex.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {marketData.sensex.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-sm font-medium">
                  {marketData.sensex.change >= 0 ? '+' : ''}{marketData.sensex.change.toFixed(2)} 
                  ({marketData.sensex.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Nifty 50</p>
              <p className="text-xl font-bold text-gray-900">{marketData.nifty50.value.toLocaleString()}</p>
              <div className={`flex items-center justify-center space-x-1 ${
                marketData.nifty50.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {marketData.nifty50.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-sm font-medium">
                  {marketData.nifty50.change >= 0 ? '+' : ''}{marketData.nifty50.change.toFixed(2)} 
                  ({marketData.nifty50.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="mt-4 p-4 bg-white rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Market Sentiment</p>
                <p className={`font-bold ${
                  marketData.marketSentiment.overall === 'bullish' ? 'text-green-600' :
                  marketData.marketSentiment.overall === 'bearish' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {marketData.marketSentiment.overall.toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Fear & Greed Index</p>
                <p className="font-bold text-blue-600">{marketData.marketSentiment.fearGreedIndex.toFixed(0)}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-600">
                {isConnected ? 'Live Data' : 'Disconnected'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {lastUpdated.toLocaleTimeString()}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              {filteredAndSortedBanks.length} of {bankData.length} banks
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search banks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sector Filter */}
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sectors.map(sector => (
                <option key={sector} value={sector}>
                  {sector === 'all' ? 'All Sectors' : sector}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="change">Sort by Change</option>
              <option value="price">Sort by Price</option>
              <option value="volume">Sort by Volume</option>
              <option value="marketCap">Sort by Market Cap</option>
            </select>

            {/* Auto Refresh */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                autoRefresh 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Auto: {autoRefresh ? 'ON' : 'OFF'}
            </button>

            {/* Refresh Button */}
            <button
              onClick={fetchAllData}
              disabled={isLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bank List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Real-time Banking Stocks</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'compact' ? 'detailed' : 'compact')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Toggle View"
            >
              <Eye className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600">Loading real-time data...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredAndSortedBanks.map((bank, index) => {
                const technicalSignal = getTechnicalSignal(bank)
                
                return (
                  <motion.div
                    key={bank.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => handleBankSelect(bank)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedBank?.symbol === bank.symbol
                        ? 'bg-blue-50 border-2 border-blue-200 shadow-md'
                        : 'hover:bg-gray-50 border-2 border-transparent hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-bold text-gray-900">{bank.symbol}</p>
                              {getTrendIcon(bank.trend)}
                              <span className={`text-xs px-2 py-1 rounded-full ${technicalSignal.color} bg-opacity-10`}>
                                {technicalSignal.signal}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate max-w-48">{bank.name}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{bank.sector}</span>
                              <span>•</span>
                              <span>{bank.exchange}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        {/* Price and Change */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">₹{bank.currentPrice.toFixed(2)}</p>
                          <div className={`flex items-center space-x-1 ${
                            bank.trend === 'bullish' ? 'text-green-600' : 
                            bank.trend === 'bearish' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            <span className="text-sm font-medium">
                              {bank.change >= 0 ? '+' : ''}₹{bank.change.toFixed(2)}
                            </span>
                            <span className="text-xs">
                              ({bank.changePercent >= 0 ? '+' : ''}{bank.changePercent.toFixed(2)}%)
                            </span>
                          </div>
                        </div>

                        {/* Technical Indicators */}
                        {viewMode === 'detailed' && (
                          <div className="text-right text-xs text-gray-500 space-y-1">
                            <div className="flex items-center space-x-2">
                              <span>RSI:</span>
                              <span className={`font-medium ${
                                bank.rsi > 70 ? 'text-red-600' : bank.rsi < 30 ? 'text-green-600' : 'text-gray-600'
                              }`}>
                                {bank.rsi.toFixed(1)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>Vol:</span>
                              <span>{formatVolume(bank.volume)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>MCap:</span>
                              <span>₹{formatNumber(bank.marketCap)}Cr</span>
                            </div>
                          </div>
                        )}

                        {/* Basic Stats */}
                        <div className="text-right text-xs text-gray-500 space-y-1">
                          <div className="flex items-center space-x-1">
                            <Volume2 className="h-3 w-3" />
                            <span>{formatVolume(bank.volume)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BarChart3 className="h-3 w-3" />
                            <span>₹{formatNumber(bank.marketCap)}Cr</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span>PE: {bank.pe.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details for Selected Bank */}
                    {selectedBank?.symbol === bank.symbol && viewMode === 'detailed' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Day High</p>
                            <p className="font-medium">₹{bank.dayHigh.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Day Low</p>
                            <p className="font-medium">₹{bank.dayLow.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">52W High</p>
                            <p className="font-medium">₹{bank.weekHigh52.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">52W Low</p>
                            <p className="font-medium">₹{bank.weekLow52.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Book Value</p>
                            <p className="font-medium">₹{bank.bookValue.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">EPS</p>
                            <p className="font-medium">₹{bank.eps.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">P/B Ratio</p>
                            <p className="font-medium">{bank.pb.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Dividend Yield</p>
                            <p className="font-medium">{bank.dividendYield.toFixed(2)}%</p>
                          </div>
                        </div>

                        {/* Technical Indicators */}
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">MACD</p>
                            <p className={`font-medium ${bank.macd >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {bank.macd.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">SMA 20</p>
                            <p className="font-medium">₹{bank.sma20.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">SMA 50</p>
                            <p className="font-medium">₹{bank.sma50.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Volatility</p>
                            <p className="font-medium">{(bank.volatility * 100).toFixed(2)}%</p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>ISIN: {bank.isin}</span>
                            <span>•</span>
                            <span>Beta: {bank.beta.toFixed(2)}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Updated: {new Date(bank.lastUpdated).toLocaleTimeString()}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {!isLoading && filteredAndSortedBanks.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No banks found matching your criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default RealTimeBankWidget