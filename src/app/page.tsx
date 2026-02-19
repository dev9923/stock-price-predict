'use client';

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Brain,
    TrendingUp,
    TrendingDown,
    Shield,
    Zap,
    Target,
    BarChart3,
    ArrowRight,
    Star,
    Users,
    IndianRupee,
    Activity,
    Wifi,
    Clock,
    Award,
    CheckCircle,
    Lock
} from 'lucide-react'
import Link from 'next/link'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import PremiumGate from '@/components/ui/PremiumGate'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Mock bank data for the hero preview
const MOCK_BANKS = [
    { symbol: 'SBIN', name: 'SBI', currentPrice: 812.55, changePercent: -0.4, trend: 'down' },
    { symbol: 'HDFCBANK', name: 'HDFC', currentPrice: 1642.45, changePercent: 1.2, trend: 'up' },
    { symbol: 'RELIANCE', name: 'Reliance', currentPrice: 2950.40, changePercent: 0.5, trend: 'up' },
    { symbol: 'TCS', name: 'TCS', currentPrice: 4120.15, changePercent: -0.2, trend: 'down' },
    { symbol: 'INFY', name: 'Infosys', currentPrice: 1850.30, changePercent: 0.8, trend: 'up' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', currentPrice: 1198.20, changePercent: 0.4, trend: 'up' },
    { symbol: 'AXISBANK', name: 'Axis Bank', currentPrice: 1085.90, changePercent: -0.5, trend: 'down' },
    { symbol: 'WIPRO', name: 'Wipro', currentPrice: 520.40, changePercent: 1.1, trend: 'up' },
    { symbol: 'BHARTIARTL', name: 'Airtel', currentPrice: 1250.20, changePercent: 0.2, trend: 'up' },
];

export default function Home() {
    const [stocks, setStocks] = useState(MOCK_BANKS)
    const [marketStatus, setMarketStatus] = useState<'open' | 'closed'>('open')
    const [isLoading, setIsLoading] = useState(true)
    const [lastUpdated, setLastUpdated] = useState<string>('')

    useEffect(() => {
        const fetchMarketOverview = async () => {
            try {
                const res = await fetch('/api/market-overview')
                const data = await res.json()
                if (data.quotes) {
                    setStocks(data.quotes.filter((s: any) => s.currentPrice > 0))
                    setMarketStatus(data.marketStatus)
                    setLastUpdated(new Date().toLocaleTimeString())
                }
            } catch (err) {
                console.error("Failed to fetch market overview:", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMarketOverview()
        const interval = setInterval(fetchMarketOverview, 30000) // Update every 30s
        return () => clearInterval(interval)
    }, [])

    const features = [
        {
            icon: Brain,
            title: 'Advanced AI Predictions',
            description: 'Multi-model ensemble algorithms with 92% accuracy using deep learning and technical analysis.',
            color: 'from-blue-500 to-purple-600',
            stats: '92% Accuracy'
        },
        {
            icon: Wifi,
            title: 'Real-time Market Data',
            description: 'Live stock prices with minimal latency and comprehensive market analytics.',
            color: 'from-green-500 to-teal-600',
            stats: 'Real-time'
        },
        {
            icon: Target,
            title: 'Smart Trading Signals',
            description: 'Precise entry/exit points, stop-loss recommendations, and risk assessment.',
            color: 'from-orange-500 to-red-600',
            stats: '5+ Indicators'
        },
        {
            icon: Shield,
            title: 'Advanced Risk Management',
            description: 'Portfolio protection with automated alerts, risk scoring, and position sizing.',
            color: 'from-purple-500 to-pink-600',
            stats: 'Risk Scoring'
        }
    ]

    const stats = [
        { label: 'Active Traders', value: 28547, icon: Users, color: 'text-blue-600' },
        { label: 'Prediction Accuracy', value: 92, suffix: '%', icon: Target, color: 'text-green-600' },
        { label: 'Banks Covered', value: 20, suffix: '+', icon: BarChart3, color: 'text-purple-600' },
        { label: 'AUM Protected', value: 2150000, prefix: '₹', icon: IndianRupee, color: 'text-orange-600' }
    ]

    return (
        <div className="bg-white dark:bg-gray-950 transition-colors duration-300 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-gray-950 dark:to-purple-950/20 -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-6 py-2 mb-8">
                            <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Advanced AI Trading Platform</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                                StockSage Pro
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
                            Institutional-grade AI stock predictions with real-time analytics,
                            smart trading signals, and professional forecasting tools.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            <Link
                                href="/dashboard"
                                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                            >
                                <span>Go to Dashboard</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/pricing"
                                className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                            >
                                <Star className="h-5 w-5 text-yellow-500" />
                                <span>View Pricing</span>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center items-center gap-8 mb-20 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Real-time Data</div>
                            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 92% Accuracy</div>
                            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Secure Analysis</div>
                        </div>
                    </motion.div>

                    {/* Live Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 dark:border-gray-800 p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Live Market Overview</h3>
                                <div className="flex items-center space-x-4">
                                    <div className={`flex items-center space-x-2 ${marketStatus === 'open' ? 'text-green-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full ${marketStatus === 'open' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                                        <span className="text-sm font-medium">Market {marketStatus === 'open' ? 'Open' : 'Closed'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-500">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-sm font-medium uppercase tracking-tight">Live BSE/NSE Feed {lastUpdated && `• ${lastUpdated}`}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative mt-8 overflow-hidden py-4 -mx-8 px-8">
                                <motion.div
                                    className="flex gap-6 whitespace-nowrap"
                                    animate={{
                                        x: [0, -((stocks.length * 200) + (stocks.length * 24))]
                                    }}
                                    transition={{
                                        duration: 40,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{ width: "fit-content" }}
                                    whileHover={{ animationPlayState: "paused" }}
                                >
                                    {/* Double the array for seamless loop */}
                                    {[...stocks, ...stocks, ...stocks].map((bank, idx) => (
                                        <Link
                                            key={`${bank.symbol}-${idx}`}
                                            href={`/dashboard?symbol=${bank.symbol.includes('.') ? bank.symbol : (bank.symbol === 'SBI (BSE)' ? '500112.BO' : (bank.symbol === 'HDFC (BSE)' ? '500180.BO' : `${bank.symbol}.NS`))}`}
                                            className={`inline-block w-[200px] text-center p-6 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all group ${isLoading ? 'animate-pulse' : ''}`}
                                        >
                                            <p className="text-xs font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest group-hover:text-blue-500 transition-colors">{bank.symbol}</p>
                                            <p className="text-xl font-black text-gray-900 dark:text-white mb-2">₹{Number(bank.currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                            <div className={`text-sm font-black flex items-center justify-center gap-1.5 ${parseFloat(String(bank.changePercent)) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {parseFloat(String(bank.changePercent)) >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                {Math.abs(parseFloat(String(bank.changePercent)))}%
                                            </div>
                                        </Link>
                                    ))}
                                </motion.div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-6">
                                <PremiumGate feature="Unlock institutional depth-analysis for 5000+ NSE/BSE stocks">
                                    <Link href="/market-deep-dive" className="group bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-3">
                                        View Deep Analysis <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </PremiumGate>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Precision Trading with AI</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">Advanced tools designed for professional and retail traders alike.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                                    <feature.icon className="text-white" size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{feature.description}</p>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">{feature.stats}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center group">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600/20 transition-colors">
                                <stat.icon size={30} className="text-blue-400" />
                            </div>
                            <div className="text-4xl font-bold mb-2">
                                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            </div>
                            <p className="text-gray-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative">Ready to Outsmart the Market?</h2>
                        <p className="text-xl text-blue-100 mb-10 relative">Join 28,000+ traders maximizing their returns with institutional-grade AI.</p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
                            <Link href="/signup" className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors">
                                Start Free Trial
                            </Link>
                            <Link href="/dashboard" className="bg-blue-800/40 border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-800/60 transition-colors">
                                Try Live Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
