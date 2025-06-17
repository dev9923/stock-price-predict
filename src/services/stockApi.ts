// src/services/stockApi.ts

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

// ===== MOCK GENERATORS =====

const generateMockStockData = (days = 30): StockData[] => {
  const data: StockData[] = []
  let currentPrice = 45 + Math.random() * 10

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    const volatility = 0.02 + Math.random() * 0.03
    const change = (Math.random() - 0.5) * volatility * currentPrice

    const open = currentPrice
    const close = Math.max(0.1, currentPrice + change)
    const high = Math.max(open, close) * (1 + Math.random() * 0.01)
    const low = Math.min(open, close) * (1 - Math.random() * 0.01)
    const volume = Math.floor(1_000_000 + Math.random() * 4_000_000)

    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume,
    })

    currentPrice = close
  }

  return data
}

const generateMockNews = (): MarketNewsItem[] => [
  {
    title: 'Market rallies on strong earnings reports',
    summary: 'Tech and financial stocks led gains as major indices surged.',
    url: 'https://example.com/market-news-1',
    source: 'Reuters',
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'Oil prices dip amid global demand concerns',
    summary: 'Crude oil saw a slight pullback as economic data pointed to slowing growth.',
    url: 'https://example.com/market-news-2',
    source: 'Bloomberg',
    publishedAt: new Date().toISOString(),
  },
]

const generateMockPrediction = (): PredictionResult => ({
  currentPrice: 46.25,
  predictedPrice: 48.6,
  confidence: 0.85,
  trend: 'up',
  analysis: 'Yes Bank is expected to rise due to strong earnings and technical momentum.',
  technicalIndicators: {
    rsi: 65,
    macd: 1.2,
    sma20: 45.5,
    sma50: 44.8,
    bollinger: {
      upper: 49.2,
      middle: 45.8,
      lower: 42.4,
    },
  },
})

// ===== SERVICE METHODS =====

export const stockApi = {
  /**
   * Get mock historical stock data
   */
  getHistoricalData: async (): Promise<StockData[]> => {
    try {
      await new Promise((res) => setTimeout(res, 1000))
      return generateMockStockData(30)
    } catch (error) {
      console.error('Error fetching historical data:', error)
      return generateMockStockData(30)
    }
  },

  /**
   * Get current stock price
   */
  getCurrentPrice: async (): Promise<number> => {
    try {
      await new Promise((res) => setTimeout(res, 500))
      return parseFloat((45.67 + (Math.random() - 0.5) * 4).toFixed(2))
    } catch (error) {
      console.error('Error fetching current price:', error)
      return 45.67
    }
  },

  /**
   * Get stock prediction result
   */
  getPrediction: async (): Promise<PredictionResult> => {
    try {
      await new Promise((res) => setTimeout(res, 500))
      return generateMockPrediction()
    } catch (error) {
      console.error('Error fetching prediction:', error)
      return generateMockPrediction()
    }
  },

  /**
   * Get latest market news
   */
  getMarketNews: async (): Promise<MarketNewsItem[]> => {
    try {
      await new Promise((res) => setTimeout(res, 500))
      return generateMockNews()
    } catch (error) {
      console.error('Error fetching market news:', error)
      return generateMockNews()
    }
  },
}
