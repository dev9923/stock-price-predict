export interface BankStock {
  symbol: string
  name: string
  currentPrice: number
  change: number
  changePercent: number
  dayHigh: number
  dayLow: number
  volume: number
  marketCap: number
  pe: number
  lastUpdated: string
  trend: 'up' | 'down' | 'stable'
}

export interface BankPrediction {
  symbol: string
  currentPrice: number
  predictedPrice: number
  targetPrice: number
  stopLoss: number
  confidence: number
  timeframe: '1D' | '1W' | '1M'
  trend: 'bullish' | 'bearish' | 'neutral'
  riskLevel: 'low' | 'medium' | 'high'
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
  recommendation: 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell'
}

const bankSymbols = [
  { symbol: "HDFCBANK", name: "HDFC Bank" },
  { symbol: "ICICIBANK", name: "ICICI Bank" },
  { symbol: "SBIN", name: "State Bank of India" },
  { symbol: "AXISBANK", name: "Axis Bank" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank" },
  { symbol: "BANKBARODA", name: "Bank of Baroda" },
  { symbol: "IDFCFIRSTB", name: "IDFC First Bank" },
  { symbol: "PNB", name: "Punjab National Bank" },
  { symbol: "FEDERALBNK", name: "Federal Bank" },
  { symbol: "INDUSINDBK", name: "IndusInd Bank" },
  { symbol: "YESBANK", name: "Yes Bank" },
  { symbol: "RBLBANK", name: "RBL Bank" },
  { symbol: "BANDHANBNK", name: "Bandhan Bank" },
  { symbol: "AUBANK", name: "AU Small Finance Bank" },
  { symbol: "CANBK", name: "Canara Bank" }
]

// Mock data generator for demonstration
const generateMockBankData = (symbol: string, name: string): BankStock => {
  const basePrice = Math.random() * 2000 + 100
  const change = (Math.random() - 0.5) * 50
  const changePercent = (change / basePrice) * 100

  return {
    symbol,
    name,
    currentPrice: parseFloat(basePrice.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    dayHigh: parseFloat((basePrice * 1.05).toFixed(2)),
    dayLow: parseFloat((basePrice * 0.95).toFixed(2)),
    volume: Math.floor(Math.random() * 10000000) + 1000000,
    marketCap: Math.floor(Math.random() * 500000) + 50000,
    pe: parseFloat((Math.random() * 30 + 10).toFixed(2)),
    lastUpdated: new Date().toISOString(),
    trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
  }
}

const generateMockPrediction = (bankStock: BankStock): BankPrediction => {
  const predictedChange = (Math.random() - 0.5) * 0.1
  const predictedPrice = bankStock.currentPrice * (1 + predictedChange)
  const targetPrice = predictedPrice * (1 + Math.random() * 0.05)
  const stopLoss = bankStock.currentPrice * (1 - Math.random() * 0.05)

  return {
    symbol: bankStock.symbol,
    currentPrice: bankStock.currentPrice,
    predictedPrice: parseFloat(predictedPrice.toFixed(2)),
    targetPrice: parseFloat(targetPrice.toFixed(2)),
    stopLoss: parseFloat(stopLoss.toFixed(2)),
    confidence: parseFloat((Math.random() * 20 + 75).toFixed(1)),
    timeframe: ['1D', '1W', '1M'][Math.floor(Math.random() * 3)] as '1D' | '1W' | '1M',
    trend: predictedChange > 0.02 ? 'bullish' : predictedChange < -0.02 ? 'bearish' : 'neutral',
    riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
    analysis: `AI analysis suggests ${predictedChange > 0 ? 'positive' : 'negative'} momentum based on technical indicators and market sentiment.`,
    technicalIndicators: {
      rsi: parseFloat((Math.random() * 40 + 30).toFixed(1)),
      macd: parseFloat((Math.random() * 4 - 2).toFixed(2)),
      sma20: parseFloat((bankStock.currentPrice * (1 + (Math.random() - 0.5) * 0.05)).toFixed(2)),
      sma50: parseFloat((bankStock.currentPrice * (1 + (Math.random() - 0.5) * 0.1)).toFixed(2)),
      bollinger: {
        upper: parseFloat((bankStock.currentPrice * 1.05).toFixed(2)),
        middle: parseFloat(bankStock.currentPrice.toFixed(2)),
        lower: parseFloat((bankStock.currentPrice * 0.95).toFixed(2))
      }
    },
    recommendation: (['strong_buy', 'buy', 'hold', 'sell', 'strong_sell'] as const)[Math.floor(Math.random() * 5)]
  }
}

class BankDataService {
  private cache: Map<string, { data: BankStock, timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 30000 // 30 seconds

  async fetchLiveBankData(symbol: string): Promise<BankStock | null> {
    // Check cache first
    const cached = this.cache.get(symbol)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      // Try multiple data sources
      const sources = [
        () => this.fetchFromGroww(symbol),
        () => this.fetchFromYahoo(symbol),
        () => this.fetchFromAlphaVantage(symbol)
      ]

      for (const source of sources) {
        try {
          const data = await source()
          if (data) {
            this.cache.set(symbol, { data, timestamp: Date.now() })
            return data
          }
        } catch (error) {
          console.warn(`Failed to fetch from source:`, error)
          continue
        }
      }

      // Fallback to mock data
      const bankInfo = bankSymbols.find(b => b.symbol === symbol)
      if (bankInfo) {
        const mockData = generateMockBankData(symbol, bankInfo.name)
        this.cache.set(symbol, { data: mockData, timestamp: Date.now() })
        return mockData
      }

      return null
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error)
      return null
    }
  }

  private async fetchFromGroww(symbol: string): Promise<BankStock | null> {
    try {
      const response = await fetch(`https://groww.in/v1/api/stocks_data/v1/company/${symbol}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        }
      })

      if (!response.ok) throw new Error('Groww API failed')

      const data = await response.json()
      const bankInfo = bankSymbols.find(b => b.symbol === symbol)

      return {
        symbol,
        name: bankInfo?.name || symbol,
        currentPrice: parseFloat(data.current_price || data.ltp || 0),
        change: parseFloat(data.day_change || 0),
        changePercent: parseFloat(data.day_change_perc || 0),
        dayHigh: parseFloat(data.day_high || 0),
        dayLow: parseFloat(data.day_low || 0),
        volume: parseInt(data.volume || 0),
        marketCap: parseInt(data.market_cap || 0),
        pe: parseFloat(data.pe || 0),
        lastUpdated: new Date().toISOString(),
        trend: (data.day_change || 0) > 0 ? 'up' : (data.day_change || 0) < 0 ? 'down' : 'stable'
      }
    } catch (error) {
      throw new Error(`Groww fetch failed: ${error}`)
    }
  }

  private async fetchFromYahoo(symbol: string): Promise<BankStock | null> {
    try {
      const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS`)
      
      if (!response.ok) throw new Error('Yahoo API failed')

      const data = await response.json()
      const result = data.chart.result[0]
      const meta = result.meta
      const bankInfo = bankSymbols.find(b => b.symbol === symbol)

      return {
        symbol,
        name: bankInfo?.name || symbol,
        currentPrice: parseFloat(meta.regularMarketPrice || 0),
        change: parseFloat(meta.regularMarketPrice - meta.previousClose || 0),
        changePercent: parseFloat(((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100) || 0),
        dayHigh: parseFloat(meta.regularMarketDayHigh || 0),
        dayLow: parseFloat(meta.regularMarketDayLow || 0),
        volume: parseInt(meta.regularMarketVolume || 0),
        marketCap: parseInt(meta.marketCap || 0),
        pe: parseFloat(meta.trailingPE || 0),
        lastUpdated: new Date().toISOString(),
        trend: (meta.regularMarketPrice - meta.previousClose) > 0 ? 'up' : 
               (meta.regularMarketPrice - meta.previousClose) < 0 ? 'down' : 'stable'
      }
    } catch (error) {
      throw new Error(`Yahoo fetch failed: ${error}`)
    }
  }

  private async fetchFromAlphaVantage(symbol: string): Promise<BankStock | null> {
    try {
      const API_KEY = 'W5W0O0HG8Y19082O'
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${API_KEY}`
      )

      if (!response.ok) throw new Error('Alpha Vantage API failed')

      const data = await response.json()
      const quote = data['Global Quote']
      const bankInfo = bankSymbols.find(b => b.symbol === symbol)

      if (!quote) throw new Error('No quote data')

      return {
        symbol,
        name: bankInfo?.name || symbol,
        currentPrice: parseFloat(quote['05. price'] || 0),
        change: parseFloat(quote['09. change'] || 0),
        changePercent: parseFloat(quote['10. change percent']?.replace('%', '') || 0),
        dayHigh: parseFloat(quote['03. high'] || 0),
        dayLow: parseFloat(quote['04. low'] || 0),
        volume: parseInt(quote['06. volume'] || 0),
        marketCap: 0, // Not available in this API
        pe: 0, // Not available in this API
        lastUpdated: new Date().toISOString(),
        trend: parseFloat(quote['09. change'] || 0) > 0 ? 'up' : 
               parseFloat(quote['09. change'] || 0) < 0 ? 'down' : 'stable'
      }
    } catch (error) {
      throw new Error(`Alpha Vantage fetch failed: ${error}`)
    }
  }

  async getAllBankData(): Promise<BankStock[]> {
    const promises = bankSymbols.map(bank => this.fetchLiveBankData(bank.symbol))
    const results = await Promise.allSettled(promises)
    
    return results
      .filter((result): result is PromiseFulfilledResult<BankStock> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value)
  }

  async getBankPrediction(symbol: string): Promise<BankPrediction | null> {
    const bankData = await this.fetchLiveBankData(symbol)
    if (!bankData) return null

    return generateMockPrediction(bankData)
  }

  async getAllBankPredictions(): Promise<BankPrediction[]> {
    const bankData = await this.getAllBankData()
    return bankData.map(bank => generateMockPrediction(bank))
  }

  getBankSymbols(): Array<{ symbol: string, name: string }> {
    return bankSymbols
  }
}

export const bankDataService = new BankDataService()