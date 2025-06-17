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

export const stockApi = {
  // Get historical stock data
  getHistoricalData: async (symbol: string = 'YESBANK', period: string = '1M'): Promise<StockData[]> => {
    try {
      // In production, replace with actual API call
      // const response = await axios.get(`${API_BASE_URL}/historical/${symbol}?period=${period}`)
      
      // Mock implementation
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
      // In production, replace with actual API call
      // const response = await axios.get(`${API_BASE_URL}/current/${symbol}`)
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500))
      return 45.67 + (Math.random() - 0.5) * 5
    } catch (error) {
      console.error('Error fetching current price:', error)
      return 45.67
    }
  },

  // Get AI prediction (Premium feature)
  getPrediction: async (symbol: string = 'YESBANK'): Promise<PredictionResult> => {
    try {
      // In production, this would call your ML model API
      // const response = await axios.post(`${API_BASE_URL}/predict`, { symbol })
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const currentPrice = 45.67 + (Math.random() - 0.5) * 5
      const change = (Math.random() - 0.5) * 0.1 * currentPrice
      const predictedPrice = currentPrice + change
      
      return {
        currentPrice: Number(currentPrice.toFixed(2)),
        predictedPrice: Number(predictedPrice.toFixed(2)),
        confidence: 85 + Math.random() * 10,
        trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
        analysis: `Based on technical analysis and market sentiment, Yes Bank stock is expected to ${change > 0 ? 'rise' : 'decline'} by ${Math.abs(change/currentPrice * 100).toFixed(1)}% in the next trading session.`,
        technicalIndicators: {
          rsi: 30 + Math.random() * 40,
          macd: (Math.random() - 0.5) * 2,
          sma20: currentPrice * (0.98 + Math.random() * 0.04),
          sma50: currentPrice * (0.95 + Math.random() * 0.1),
          bollinger: {
            upper: currentPrice * 1.05,
            middle: currentPrice,
            lower: currentPrice * 0.95
          }
        }
      }
    } catch (error) {
      console.error('Error getting prediction:', error)
      throw error
    }
  },

  // Get market news
  getMarketNews: async (): Promise<any[]> => {
    try {
      // Mock news data
      await new Promise(resolve => setTimeout(resolve, 800))
      
      return [
        {
          id: 1,
          title: "Yes Bank Reports Strong Q3 Results",
          summary: "Yes Bank shows improved asset quality and profitability in latest quarterly results.",
          timestamp: new Date().toISOString(),
          sentiment: "positive"
        },
        {
          id: 2,
          title: "Banking Sector Outlook Remains Positive",
          summary: "Analysts maintain positive outlook on Indian banking sector amid economic recovery.",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          sentiment: "positive"
        },
        {
          id: 3,
          title: "RBI Policy Decision Impact on Banks",
          summary: "Recent RBI monetary policy decisions expected to benefit banking sector.",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          sentiment: "neutral"
        }
      ]
    } catch (error) {
      console.error('Error fetching news:', error)
      return []
    }
  }
}