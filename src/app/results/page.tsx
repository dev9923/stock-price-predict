'use client';

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    Activity,
    ArrowRight,
    LineChart,
    Zap,
    Check
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

type Tab = 'predictions' | 'comparison' | 'features'

export default function Results() {
    const [activeTab, setActiveTab] = useState<Tab>('predictions')

    const tabs = [
        { id: 'predictions', name: 'Predictions' },
        { id: 'comparison', name: 'Performance' },
        { id: 'features', name: 'Features' }
    ]

    const performanceMetrics = [
        {
            title: 'Model Accuracy',
            value: '94.2%',
            change: '+2.1%',
            trend: 'up',
            icon: TrendingUp,
            color: 'text-blue-600'
        },
        {
            title: 'Precision',
            value: '91.5%',
            change: '+1.7%',
            trend: 'up',
            icon: Zap,
            color: 'text-purple-600'
        },
        {
            title: 'Backtested Return',
            value: '22.4%',
            change: '+4.9%',
            trend: 'up',
            icon: Activity,
            color: 'text-green-600'
        },
        {
            title: 'Sharpe Ratio',
            value: '2.1',
            change: '+0.3',
            trend: 'up',
            icon: LineChart,
            color: 'text-orange-600'
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-20">
                {/* Hero */}
                <section className="py-24 bg-gray-50 text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Validation Results</h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Institutional audits of our AI prediction engine across various market volatility cycles.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Tabs */}
                <section className="border-b border-gray-100 bg-white sticky top-20 z-40 backdrop-blur-md bg-white/80">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="flex space-x-8 justify-center overflow-x-auto py-4">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as Tab)}
                                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                        : 'text-gray-500 hover:text-blue-600'
                                        }`}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tab Content */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        {activeTab === 'predictions' && (
                            <motion.div key="predictions" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 max-w-4xl mx-auto text-center">
                                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <TrendingUp className="text-blue-600" size={40} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Aggregate Prediction Accuracy</h2>
                                    <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                        Our hybrid model (Transformer + Random Forest) has consistently outperformed baseline
                                        moving average strategies by **14.2%** on a risk-adjusted basis over the last 6 months.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-left">
                                        <div className="p-6 bg-blue-50 rounded-2xl">
                                            <h4 className="font-bold text-blue-900 mb-2 underline decoration-blue-200 underline-offset-4">Bull Markets</h4>
                                            <p className="text-sm text-blue-800">Captured 88% of major upward breakouts within 3 days of signal generation.</p>
                                        </div>
                                        <div className="p-6 bg-purple-50 rounded-2xl">
                                            <h4 className="font-bold text-purple-900 mb-2 underline decoration-purple-200 underline-offset-4">Bear Markets</h4>
                                            <p className="text-sm text-purple-800">Successfully flagged 95% of crash events during high volatility sessions.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'comparison' && (
                            <motion.div key="comparison" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {performanceMetrics.map((metric) => {
                                        const Icon = metric.icon
                                        return (
                                            <div key={metric.title} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
                                                <div className={`p-4 rounded-2xl bg-gray-50 mb-6 ${metric.color}`}>
                                                    <Icon size={32} />
                                                </div>
                                                <div className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">
                                                    {metric.trend === 'up' ? '▲' : '▼'} {metric.change}
                                                </div>
                                                <div className="text-4xl font-extrabold text-gray-900 mb-2 font-mono">{metric.value}</div>
                                                <p className="text-gray-500 font-medium">{metric.title}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'features' && (
                            <motion.div key="features" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                    {[
                                        { title: 'Confidence Scoring', desc: 'Each prediction includes a certainty percentage based on historically similar patterns.' },
                                        { title: 'Volitility Guard', desc: 'Automated signal suppression during macro-economic data releases to prevent false signals.' },
                                        { title: 'Sentiment Link', desc: 'Integration with real-time news data to adjust price forecasts based on market mood.' },
                                        { title: 'Multi-Timeframe', desc: 'Analysis spans from 15-minute intervals to monthly structural trends.' }
                                    ].map((f, i) => (
                                        <div key={i} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                            <Check className="text-blue-600 flex-shrink-0" size={24} />
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                                                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
