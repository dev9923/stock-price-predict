import { loadStripe } from '@stripe/stripe-js'

// Load the Stripe publishable key from environment or use fallback
const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_example'

// Initialize Stripe promise
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

export const subscriptionService = {
  // Mock current subscription
  getCurrentSubscription: () => {
    return {
      userId: 'user_123',
      planId: 'pro', // or 'premium' or undefined
    }
  },

  // Redirect to Stripe Checkout
  async redirectToCheckout(priceId: string) {
    const stripe = await stripePromise
    if (!stripe) {
      throw new Error('Stripe failed to load')
    }

    await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      successUrl: window.location.origin + '/dashboard',
      cancelUrl: window.location.origin + '/dashboard',
    })
  },
}
