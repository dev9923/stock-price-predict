import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_example')

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

  // Get current user subscription
  getCurrentSubscription(): UserSubscription | null {
    // In production, this would fetch from your backend
    const stored = localStorage.getItem('userSubscription')
    if (stored) {
      this.currentSubscription = JSON.parse(stored)
    }
    return this.currentSubscription
  }

  // Check if user has premium access
  hasPremiumAccess(): boolean {
    const subscription = this.getCurrentSubscription()
    return subscription?.status === 'active' && 
           (subscription.planId === 'premium' || subscription.planId === 'pro')
  }

  // Check if user has pro access
  hasProAccess(): boolean {
    const subscription = this.getCurrentSubscription()
    return subscription?.status === 'active' && subscription.planId === 'pro'
  }

  // Create checkout session
  async createCheckoutSession(planId: string): Promise<void> {
    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe not loaded')

      // In production, call your backend to create checkout session
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ planId })
      // })
      // const session = await response.json()
      
      // Mock implementation - simulate successful subscription
      const plan = subscriptionPlans.find(p => p.id === planId)
      if (plan) {
        const subscription: UserSubscription = {
          planId,
          status: 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancelAtPeriodEnd: false
        }
        
        localStorage.setItem('userSubscription', JSON.stringify(subscription))
        this.currentSubscription = subscription
        
        // Simulate redirect to success page
        window.location.href = '/subscription-success'
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  }

  // Cancel subscription
  async cancelSubscription(): Promise<void> {
    try {
      // In production, call your backend API
      // await fetch('/api/cancel-subscription', { method: 'POST' })
      
      // Mock implementation
      if (this.currentSubscription) {
        this.currentSubscription.cancelAtPeriodEnd = true
        localStorage.setItem('userSubscription', JSON.stringify(this.currentSubscription))
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      throw error
    }
  }

  // Reactivate subscription
  async reactivateSubscription(): Promise<void> {
    try {
      // In production, call your backend API
      // await fetch('/api/reactivate-subscription', { method: 'POST' })
      
      // Mock implementation
      if (this.currentSubscription) {
        this.currentSubscription.cancelAtPeriodEnd = false
        localStorage.setItem('userSubscription', JSON.stringify(this.currentSubscription))
      }
    } catch (error) {
      console.error('Error reactivating subscription:', error)
      throw error
    }
  }
}

export const subscriptionService = new SubscriptionService()