export interface TradingBroker {
  id: string
  name: string
  logo: string
  commission: number
  features: string[]
  referralLink: string
  rating: number
}

export const tradingBrokers: TradingBroker[] = [
  {
    id: 'zerodha',
    name: 'Zerodha',
    logo: '🟢',
    commission: 3.5,
    features: ['₹0 brokerage on equity delivery', 'Advanced charting', 'Kite mobile app'],
    referralLink: 'https://zerodha.com/open-account?c=STOCKSAGE',
    rating: 4.8
  },
  {
    id: 'upstox',
    name: 'Upstox',
    logo: '🟠',
    commission: 3.0,
    features: ['₹20/order for intraday', 'Free equity delivery', 'Pro mobile app'],
    referralLink: 'https://upstox.com/open-account?f=STOCKSAGE',
    rating: 4.6
  },
  {
    id: 'groww',
    name: 'Groww',
    logo: '💚',
    commission: 2.5,
    features: ['₹0 brokerage on delivery', 'Mutual funds', 'Simple interface'],
    referralLink: 'https://groww.in/refer/STOCKSAGE',
    rating: 4.7
  },
  {
    id: 'angelone',
    name: 'Angel One',
    logo: '😇',
    commission: 3.2,
    features: ['₹20/order flat fee', 'Research reports', 'Angel Broking legacy'],
    referralLink: 'https://angelone.in/open-account?ref=STOCKSAGE',
    rating: 4.5
  }
]

class TradingService {
  private commissionEarnings: number = 0

  generateReferralLink(brokerId: string, stockSymbol: string): string {
    const broker = tradingBrokers.find(b => b.id === brokerId)
    if (!broker) return '#'

    // Add tracking parameters
    const trackingParams = new URLSearchParams({
      ref: 'STOCKSAGE_PRO',
      stock: stockSymbol,
      source: 'prediction',
      timestamp: Date.now().toString()
    })

    return `${broker.referralLink}&${trackingParams.toString()}`
  }

  trackCommission(brokerId: string, amount: number): void {
    const broker = tradingBrokers.find(b => b.id === brokerId)
    if (!broker) return

    const commission = (amount * broker.commission) / 100
    this.commissionEarnings += commission

    // Store in localStorage for persistence
    localStorage.setItem('commissionEarnings', this.commissionEarnings.toString())
  }

  getCommissionEarnings(): number {
    if (this.commissionEarnings === 0) {
      const stored = localStorage.getItem('commissionEarnings')
      this.commissionEarnings = stored ? parseFloat(stored) : 0
    }
    return this.commissionEarnings
  }

  getBrokers(): TradingBroker[] {
    return tradingBrokers
  }

  getBrokerById(id: string): TradingBroker | undefined {
    return tradingBrokers.find(b => b.id === id)
  }
}

export const tradingService = new TradingService()