import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Shield, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'
import { subscriptionService } from '../services/subscriptionService'
import toast from 'react-hot-toast'

const Payment: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [paymentData, setPaymentData] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending')

  useEffect(() => {
    const encodedData = searchParams.get('data')
    if (encodedData) {
      try {
        const decoded = JSON.parse(atob(encodedData))
        setPaymentData(decoded)
      } catch (error) {
        console.error('Invalid payment data:', error)
        navigate('/pricing')
      }
    } else {
      navigate('/pricing')
    }
  }, [searchParams, navigate])

  const handlePayment = async () => {
    if (!paymentData) return

    setIsProcessing(true)
    setPaymentStatus('processing')

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Process payment through subscription service
      const success = await subscriptionService.processPayment(paymentData)

      if (success) {
        setPaymentStatus('success')
        toast.success('Payment successful! Welcome to StockSage Pro!')
        
        // Redirect to success page after delay
        setTimeout(() => {
          navigate('/subscription-success')
        }, 2000)
      } else {
        throw new Error('Payment processing failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentStatus('failed')
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const generateUPILink = () => {
    if (!paymentData) return '#'
    
    const upiParams = new URLSearchParams({
      pa: paymentData.upiId,
      pn: paymentData.merchantName,
      am: paymentData.amount.toString(),
      cu: 'INR',
      tn: `StockSage Pro ${paymentData.planName} Subscription`
    })

    return `upi://pay?${upiParams.toString()}`
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container-max py-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                {paymentStatus === 'success' ? (
                  <CheckCircle className="h-8 w-8 text-white" />
                ) : paymentStatus === 'failed' ? (
                  <AlertCircle className="h-8 w-8 text-white" />
                ) : (
                  <CreditCard className="h-8 w-8 text-white" />
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {paymentStatus === 'success' ? 'Payment Successful!' :
                 paymentStatus === 'failed' ? 'Payment Failed' :
                 'Complete Your Payment'}
              </h1>
              <p className="text-gray-600">
                {paymentStatus === 'success' ? 'Welcome to StockSage Pro!' :
                 paymentStatus === 'failed' ? 'Please try again or contact support' :
                 'Secure payment via PayTM UPI'}
              </p>
            </div>

            {paymentStatus === 'pending' && (
              <>
                {/* Plan Details */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-medium">{paymentData.planName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Billing</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-xl text-blue-600">₹{paymentData.amount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900">Payment Method</h3>
                  
                  {/* UPI Payment */}
                  <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">₹</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">PayTM UPI</p>
                        <p className="text-sm text-gray-600">Secure & Instant</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        `Pay ₹${paymentData.amount} via UPI`
                      )}
                    </button>
                  </div>
                </div>

                {/* Security Info */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                  <Shield className="h-4 w-4" />
                  <span>Your payment is secured with bank-level encryption</span>
                </div>
              </>
            )}

            {paymentStatus === 'processing' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Processing your payment...</p>
                <p className="text-sm text-gray-500 mt-2">Please don't close this window</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Your subscription is now active!</p>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-700">
                    You now have access to all {paymentData.planName} features including AI predictions, 
                    live market data, and commission-based trading opportunities.
                  </p>
                </div>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div className="text-center py-8">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Payment could not be processed</p>
                <div className="space-y-3">
                  <button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back to Pricing
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Payment