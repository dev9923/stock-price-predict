import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, RefreshCw, Activity } from 'lucide-react'
import { stockApi } from '../../services/stockApi'

const LiveStockWidget: React.FC = () => {
  const [currentPrice, setCurrentPrice] = React.useState<number | null>(null)
  const [previousPrice, setPreviousPrice] = React.useState<number | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null)

  const fetchCurrentPrice = async () => {
    setIsLoading(true)
    try {
      const price = await stockApi.getCurrentPrice()
      if (typeof price === 'number' && !isNaN(price)) {
        setPreviousPrice(currentPrice)
        setCurrentPrice(price)
        setLastUpdated(new Date())
      } else {
        console.warn('Invalid price fetched:', price)
      }
    } catch (error) {
      console.error('Error fetching current price:', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchCurrentPrice()
    const interval = setInterval(fetchCurrentPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  const priceChange =
    currentPrice !== null && previousPrice !== null ? currentPrice - previousPrice : 0
  const priceChangePercent =
    previousPrice !== null && previousPrice !== 0
      ? (priceChange / previousPrice) * 100
      : 0
  const isPositive = priceChange >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Yes Bank (NSE)</h3>
            <p className="text-sm text-gray-600">YESBANK</p>
          </div>
        </div>

        <button
          onClick={fetchCurrentPrice}
          disabled={isLoading}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">
            ₹{currentPrice !== null ? currentPrice.toFixed(2) : '--'}
          </span>
          {previousPrice !== null && priceChange !== 0 && (
            <div
              className={`flex items-center space-x-1 ${
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
          )}
        </div>

        {lastUpdated && (
          <p className="text-xs text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600">Day High</p>
            <p className="font-medium">
              ₹{currentPrice !== null ? (currentPrice * 1.02).toFixed(2) : '--'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Day Low</p>
            <p className="font-medium">
              ₹{currentPrice !== null ? (currentPrice * 0.98).toFixed(2) : '--'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Volume</p>
            <p className="font-medium">2.5M</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LiveStockWidget
