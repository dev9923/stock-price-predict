import axios from 'axios'

// Mock API service - In production, you would use real stock APIs like Alpha Vantage, Yahoo Finance, etc.
const API_BASE_URL = 'https://api.example.com' // Replace with actual API

export interface StockData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  prediction?: number
  confidence?: number
}

export interface PredictionResult {
  currentPrice: number
  predictedPrice: number
  confidence: number
  trend: 'up' | 'down' | 'stable'
  analysis: string
  technicalIndicators: {
    rsi: number
    macd: number
    sma20: number
    sma50: number
    bollinger: {
      upper: number
      middle: number
      lower: number
    }
  }
}

export interface MarketNewsItem {
  title: string
  summary: string
  url: string
  source: string
  publishedAt: string
}

// Mock data generator for demonstration
const generateMockStockData = (days: number = 30): StockData[] => {
  const data: StockData[] = []
  const basePrice = 45 + Math.random() * 10
  let currentPrice = basePrice

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    const volatility = 0.02 + Math.random() * 0.03
    const change = (Math.random() - 0.5) * volatility * currentPrice

    const open = currentPrice
    const close = Math.max(0.1, currentPrice + change)
    const high = Math.max(open, close) * (1 + Math.random() * 0.02)
    const low = Math.min(open, close) * (1 - Math.random() * 0.02)
    const volume = Math.floor(1000000 + Math.random() * 5000000)

    data.push({
      date: date.toISOString().split('T')[0],
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    })

    currentPrice = close
  }

  return data
}

const generateMockNews = (): MarketNewsItem[] => {
  return [
    {
      title: 'Market rallies on strong earnings reports',
      summary: 'Tech and financial stocks led gains as major indices surged.',
      url: 'https://example.com/market-news-1',
      source: 'Reuters',
      publishedAt: new Date().toISOString()
    },
    {
      title: 'Oil prices dip amid global demand concerns',
      summary: 'Crude oil saw a slight pullback as economic data pointed to slowing growth.',
      url: 'https://example.com/market-news-2',
      source: 'Bloomberg',
      publishedAt: new Date().toISOString()
    }
  ]
}

export const stockApi = {
  // Get historical stock data
  getHistoricalData: async (symbol: string = 'YESBANK', period: string = '1M'): Promise<StockData[]> => {
    try {
      // const response = await axios.get(`${API_BASE_URL}/historical/${symbol}?period=${period}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
      return generateMockStockData(30)
    } catch (error) {
      console.error('Error fetching historical data:', error)
      return generateMockStockData(30)
    }
  },

  // Get current stock price
  getCurrentPrice: async (symbol: string = 'YESBANK'): Promise<number> => {
    try {
      // const response = await axios.get(`${API_BASE_URL}/current/${symbol}`)
      await new Promise(resolve => setTimeout(resolve, 500))
      return 45.67 + (Math.random() - 0.5) * 5
    } catch (error) {
      console.error('Error fetching current price:', error)
      return 45.67
    }
  },

  // ✅ NEW: Get market news
  getMarketNews: async (): Promise<MarketNewsItem[]> => {
    try {
      // const response = await axios.get(`${API_BASE_URL}/market-news`)
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate delay
      return generateMockNews()
    } catch (error) {
      console.error('Error fetching market news:', error)
      return generateMockNews()
    }
  }
}
