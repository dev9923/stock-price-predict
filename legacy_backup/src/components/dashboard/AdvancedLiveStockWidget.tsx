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
  Volume2
} from 'lucide-react'
import { realTimeBankDataService, BankStock, MarketData } from '../../services/realTimeBankDataService'

interface AdvancedLiveStockWidgetProps {
  selectedSymbol?: string
  onSymbolSelect?: (symbol: string) => void
}

const AdvancedLiveStockWidget: React.FC<AdvancedLiveStockWidgetProps> = ({
  selectedSymbol,
  onSymbolSelect
}) => {
  const [bankData, setBankData] = useState<BankStock[]>([])
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [selectedBank, setSelectedBank] = useState<BankStock | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [sortBy, setSortBy] = useState<'change' | 'price' | 'volume' | 'marketCap'>('change')
  const [filterSector, setFilterSector] = useState<string>('all')

  useEffect(() => {
    fetchAllData()
    
    // Subscribe to real-time updates
    const unsubscribe = realTimeBankDataService.subscribe((data) => {
      setBankData(data)
      setLastUpdated(new Date())
    })

    // Auto-refresh interval
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchAllData()
      }
    }, 15000) // Refresh every 15 seconds

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
        realTimeBankDataService.getAllBankData(),
        realTimeBankDataService.getMarketData()
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

  const handleBankSelect = (bank: BankStock) => {
    setSelectedBank(bank)
    onSymbolSelect?.(bank.symbol)
  }

  const filteredAndSortedBanks = bankData
    .filter(bank => filterSector === 'all' || bank.sector === filterSector)
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
            <h3 className="text-lg font-bold text-gray-900">Market Overview</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                marketData.marketStatus === 'open' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`} />
              <span className={`text-sm font-medium ${
                marketData.marketStatus === 'open' ? 'text-green-600' : 'text-red-600'
              }`}>
                {marketData.marketStatus.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Nifty Bank</p>
              <p className="text-xl font-bold text-gray-900">{marketData.niftyBank.value.toLocaleString()}</p>
              <p className={`text-sm font-medium ${
                marketData.niftyBank.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {marketData.niftyBank.change >= 0 ? '+' : ''}{marketData.niftyBank.change.toFixed(2)} 
                ({marketData.niftyBank.changePercent.toFixed(2)}%)
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Sensex</p>
              <p className="text-xl font-bold text-gray-900">{marketData.sensex.value.toLocaleString()}</p>
              <p className={`text-sm font-medium ${
                marketData.sensex.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {marketData.sensex.change >= 0 ? '+' : ''}{marketData.sensex.change.toFixed(2)} 
                ({marketData.sensex.changePercent.toFixed(2)}%)
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Nifty 50</p>
              <p className="text-xl font-bold text-gray-900">{marketData.nifty50.value.toLocaleString()}</p>
              <p className={`text-sm font-medium ${
                marketData.nifty50.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {marketData.nifty50.change >= 0 ? '+' : ''}{marketData.nifty50.change.toFixed(2)} 
                ({marketData.nifty50.changePercent.toFixed(2)}%)
              </p>
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
                {isConnected ? 'Live' : 'Disconnected'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sectors.map(sector => (
                <option key={sector} value={sector}>
                  {sector === 'all' ? 'All Sectors' : sector}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="change">Sort by Change</option>
              <option value="price">Sort by Price</option>
              <option value="volume">Sort by Volume</option>
              <option value="marketCap">Sort by Market Cap</option>
            </select>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                autoRefresh 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Auto: {autoRefresh ? 'ON' : 'OFF'}
            </button>

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
          <h3 className="text-xl font-bold text-gray-900">Banking Stocks</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{filteredAndSortedBanks.length} stocks</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600">Loading live data...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredAndSortedBanks.map((bank, index) => (
                <motion.div
                  key={bank.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
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
                          <p className="font-bold text-gray-900">{bank.symbol}</p>
                          <p className="text-sm text-gray-600 truncate max-w-48">{bank.name}</p>
                          <p className="text-xs text-gray-500">{bank.sector}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">₹{bank.currentPrice.toFixed(2)}</p>
                        <div className={`flex items-center space-x-1 ${
                          bank.trend === 'up' ? 'text-green-600' : 
                          bank.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {bank.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : bank.trend === 'down' ? (
                            <TrendingDown className="h-3 w-3" />
                          ) : (
                            <Activity className="h-3 w-3" />
                          )}
                          <span className="text-sm font-medium">
                            {bank.change >= 0 ? '+' : ''}₹{bank.change.toFixed(2)}
                          </span>
                          <span className="text-xs">
                            ({bank.changePercent >= 0 ? '+' : ''}{bank.changePercent.toFixed(2)}%)
                          </span>
                        </div>
                      </div>

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

                  {/* Additional details for selected bank */}
                  {selectedBank?.symbol === bank.symbol && (
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
                          <p className="text-gray-600">Dividend Yield</p>
                          <p className="font-medium">{bank.dividendYield.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Face Value</p>
                          <p className="font-medium">₹{bank.faceValue}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>ISIN: {bank.isin}</span>
                          <span>•</span>
                          <span>Exchange: {bank.exchange}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Updated: {new Date(bank.lastUpdated).toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
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

export default AdvancedLiveStockWidget