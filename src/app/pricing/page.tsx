'use client';

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Crown, Zap, Star, ArrowRight, Shield, Target, BarChart3 } from 'lucide-react'
import { subscriptionPlans, subscriptionService, UserSubscription } from '@/services/subscriptionService'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function Pricing() {
    const [isLoading, setIsLoading] = useState<string | null>(null)
    const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month')
    const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null)

    useEffect(() => {
        setCurrentSubscription(subscriptionService.getCurrentSubscription())
    }, [])

    const handleSubscribe = async (planId: string) => {
        if (planId === 'basic') {
            toast.success('You already have access to basic features!')
            return
        }

        setIsLoading(planId)

        try {
            await subscriptionService.createCheckoutSession(planId)
            toast.success('Redirecting to secure payment...')
        } catch (error) {
            toast.error('Failed to start checkout process')
        } finally {
            setIsLoading(null)
        }
    }

    const getPlanPrice = (plan: any) => {
        if (billingCycle === 'year' && plan.price > 0) {
            return Math.floor(plan.price * 10) // 2 months free
        }
        return plan.price
    }

    const features = [
        {
            icon: Target,
            title: '92% Prediction Accuracy',
            description: 'AI-powered predictions with industry-leading accuracy rates'
        },
        {
            icon: BarChart3,
            title: 'Real-time Market Data',
            description: 'Institutional data feeds with sub-second latency updates'
        },
        {
            icon: Shield,
            title: 'Risk Management',
            description: 'Advanced portfolio protection and risk assessment tools'
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-20">
                <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16"
                        >
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
                                <Crown className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">Advanced AI Trading Platform</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                                Institutional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Power Plans</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                                Unlock full access to our proprietary AI forecasting engine and real-time bank analytics.
                            </p>

                            {/* Billing Toggle */}
                            <div className="inline-flex items-center bg-white rounded-2xl p-1.5 shadow-xl border border-gray-200">
                                {['month', 'year'].map((cycle) => (
                                    <button
                                        key={cycle}
                                        onClick={() => setBillingCycle(cycle as 'month' | 'year')}
                                        className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${billingCycle === cycle
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                            : 'text-gray-500 hover:text-gray-900'
                                            }`}
                                    >
                                        {cycle === 'month' ? 'Monthly' : 'Yearly'}
                                        {cycle === 'year' && (
                                            <span className="ml-2 text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                                2 Months Free
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto">
                            {features.map((feature, idx) => (
                                <div key={idx} className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                                        <feature.icon className="text-white" size={24} />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                                    <p className="text-sm text-gray-500">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {subscriptionPlans.map((plan, idx) => {
                                const isCurrent = currentSubscription?.planId === plan.id;
                                const price = getPlanPrice(plan);

                                return (
                                    <motion.div
                                        key={plan.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`relative flex flex-col p-8 rounded-3xl border-2 transition-all ${plan.popular ? 'border-blue-600 bg-blue-50/30 ring-4 ring-blue-100 shadow-2xl' : 'border-gray-100 bg-white hover:border-blue-200 shadow-lg'
                                            }`}
                                    >
                                        {plan.popular && (
                                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                                Most Popular
                                            </span>
                                        )}

                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-extrabold text-gray-900">₹{price}</span>
                                                {plan.price > 0 && <span className="text-gray-500 font-medium">/{billingCycle}</span>}
                                            </div>
                                        </div>

                                        <ul className="flex-1 space-y-4 mb-10">
                                            {plan.features.map((f, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                                                    <span className="text-sm text-gray-600 font-medium">{f}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => handleSubscribe(plan.id)}
                                            disabled={isLoading === plan.id || isCurrent}
                                            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${plan.popular
                                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                } disabled:opacity-50`}
                                        >
                                            {isLoading === plan.id ? 'Processing...' : isCurrent ? 'Active Plan' : (
                                                <>Upgrade Now <ArrowRight size={18} /></>
                                            )}
                                        </button>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
