export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  popular?: boolean
  badge?: string
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    currency: 'INR',
    interval: 'month',
    features: [
      'View live bank stock prices',
      'Basic market data',
      'Limited predictions (3/day)',
      'Email support',
      'Basic charts'
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49,
    currency: 'INR',
    interval: 'month',
    popular: true,
    badge: 'Most Popular',
    features: [
      'Everything in Basic',
      'Unlimited AI predictions',
      'Advanced technical indicators',
      'Real-time alerts',
      'Trading recommendations',
      'Commission-based trading links',
      'Priority support',
      'Export data (Excel/PDF)'
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 149,
    currency: 'INR',
    interval: 'month',
    badge: 'Best Value',
    features: [
      'Everything in Premium',
      'Advanced portfolio analytics',
      'Custom watchlists (unlimited)',
      'API access',
      'Advanced risk management',
      'Institutional-grade data',
      'Phone support',
      'Custom alerts & notifications'
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    currency: 'INR',
    interval: 'month',
    badge: 'Enterprise',
    features: [
      'Everything in Professional',
      'White-label solution',
      'Custom ML model training',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced reporting',
      '24/7 priority support',
      'Custom development'
    ],
  },
]

export interface UserSubscription {
  planId: string
  status: 'active' | 'inactive' | 'cancelled' | 'past_due'
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

class SubscriptionService {
  private currentSubscription: UserSubscription | null = null

  getCurrentSubscription(): UserSubscription | null {
    if (this.currentSubscription) return this.currentSubscription

    try {
      const stored = localStorage.getItem('userSubscription')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed && typeof parsed.planId === 'string' && typeof parsed.status === 'string') {
          this.currentSubscription = parsed as UserSubscription
        }
      }
    } catch {
      localStorage.removeItem('userSubscription')
    }

    return this.currentSubscription
  }

  hasPremiumAccess(): boolean {
    const sub = this.getCurrentSubscription()
    return sub?.status === 'active' && ['premium', 'professional', 'enterprise'].includes(sub.planId)
  }

  hasProAccess(): boolean {
    const sub = this.getCurrentSubscription()
    return sub?.status === 'active' && ['professional', 'enterprise'].includes(sub.planId)
  }

  hasEnterpriseAccess(): boolean {
    const sub = this.getCurrentSubscription()
    return sub?.status === 'active' && sub.planId === 'enterprise'
  }

  async createCheckoutSession(planId: string): Promise<void> {
    try {
      const plan = subscriptionPlans.find((p) => p.id === planId)
      if (!plan) throw new Error('Invalid plan selected')

      // Create PayTM payment URL with hidden UPI
      const paymentData = {
        amount: plan.price,
        planId: planId,
        planName: plan.name,
        upiId: '8449779923@pthdfc', // Hidden from user
        merchantName: 'StockSage Pro'
      }

      // Encode payment data
      const encodedData = btoa(JSON.stringify(paymentData))
      
      // Redirect to payment page with encoded data
      window.location.href = `/payment?data=${encodedData}`
      
    } catch (error) {
      console.error('Checkout failed:', error)
      throw error
    }
  }

  async processPayment(paymentData: any): Promise<boolean> {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Create subscription
      const subscription: UserSubscription = {
        planId: paymentData.planId,
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
      }

      localStorage.setItem('userSubscription', JSON.stringify(subscription))
      this.currentSubscription = subscription

      return true
    } catch (error) {
      console.error('Payment processing failed:', error)
      return false
    }
  }

  async cancelSubscription(): Promise<void> {
    try {
      const sub = this.getCurrentSubscription()
      if (!sub) throw new Error('No active subscription')

      sub.cancelAtPeriodEnd = true
      localStorage.setItem('userSubscription', JSON.stringify(sub))
      this.currentSubscription = sub
    } catch (error) {
      console.error('Cancel failed:', error)
      throw error
    }
  }
}

export const subscriptionService = new SubscriptionService()