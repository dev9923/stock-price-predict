import { loadStripe } from '@stripe/stripe-js'

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

if (!STRIPE_PUBLISHABLE_KEY) {
  console.warn('⚠️ Missing Stripe publishable key in environment variables.')
}

const stripePromise = loadStripe(
  STRIPE_PUBLISHABLE_KEY || 'pk_test_mock_fallback_key'
)

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  popular?: boolean
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    currency: 'INR',
    interval: 'month',
    features: [
      'Historical stock data',
      'Basic charts and analysis',
      'Market news updates',
      'Email support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    currency: 'INR',
    interval: 'month',
    popular: true,
    features: [
      'Everything in Basic',
      'Daily AI predictions',
      'Advanced technical indicators',
      'Real-time alerts',
      'Portfolio tracking',
      'Priority support',
      'Export data to Excel/CSV'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 1999,
    currency: 'INR',
    interval: 'month',
    features: [
      'Everything in Premium',
      'Multiple stock predictions',
      'Custom ML model training',
      'API access',
      'White-label solution',
      'Dedicated account manager',
      'Custom integrations'
    ]
  }
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
    if (!this.currentSubscription) {
      const stored = localStorage.getItem('userSubscription')
      if (stored) {
        try {
          this.currentSubscription = JSON.parse(stored)
        } catch (e) {
          console.error('Failed to parse subscription from storage:', e)
        }
      }
    }
    return this.currentSubscription
  }

  hasPremiumAccess(): boolean {
    const sub = this.getCurrentSubscription()
    return sub?.status === 'active' && ['premium', 'pro'].includes(sub.planId)
  }

  hasProAccess(): boolean {
    const sub = this.getCurrentSubscription()
    return sub?.status === 'active' && sub.planId === 'pro'
  }

  async createCheckoutSession(planId: string): Promise<void> {
    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe.js not loaded properly.')

      const plan = subscriptionPlans.find(p => p.id === planId)
      if (!plan) throw new Error('Selected plan not found.')

      // In production, integrate with your backend API to create a real checkout session
      // Example:
      // const res = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ planId }),
      // });
      // const session = await res.json();
      // await stripe.redirectToCheckout({ sessionId: session.id });

      // Mock logic for dev/demo:
      console.warn('⚠️ Using mocked checkout session for plan:', planId)

      const subscription: UserSubscription = {
        planId,
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false
      }

      localStorage.setItem('userSubscription', JSON.stringify(subscription))
      this.currentSubscription = subscription

      window.location.href = '/subscription-success'
    } catch (error) {
      console.error('Checkout session failed:', error)
      throw error
    }
  }

  async cancelSubscription(): Promise<void> {
    try {
      const sub = this.getCurrentSubscription()
      if (!sub) throw new Error('No active subscription found.')

      sub.cancelAtPeriodEnd = true
      localStorage.setItem('userSubscription', JSON.stringify(sub))
      this.currentSubscription = sub
    } catch (error) {
      console.error('Subscription cancellation failed:', error)
      throw error
    }
  }

  async reactivateSubscription(): Promise<void> {
    try {
      const sub = this.getCurrentSubscription()
      if (!sub) throw new Error('No subscription to reactivate.')

      sub.cancelAtPeriodEnd = false
      localStorage.setItem('userSubscription', JSON.stringify(sub))
      this.currentSubscription = sub
    } catch (error) {
      console.error('Reactivation failed:', error)
      throw error
    }
  }
}

export const subscriptionService = new SubscriptionService()
