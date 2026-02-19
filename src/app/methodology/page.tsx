'use client';

import { motion } from 'framer-motion'
import {
    Database,
    Filter,
    Brain,
    BarChart3,
    CheckCircle,
    Code,
    Target,
    TrendingUp,
    Zap
} from 'lucide-react'
import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface Step {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    details: string[]
}

interface Algorithm {
    name: string
    accuracy: string
    description: string
    pros: string[]
    color: 'blue' | 'purple' | 'teal' | 'gray'
}

interface Metric {
    name: string
    value: string
    unit: string
}

const colorMap = {
    blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        icon: 'text-blue-500'
    },
    purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        icon: 'text-purple-500'
    },
    teal: {
        bg: 'bg-teal-100',
        text: 'text-teal-600',
        icon: 'text-teal-500'
    },
    gray: {
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        icon: 'text-gray-500'
    }
}

export default function Methodology() {
    const steps: Step[] = [
        {
            icon: Database,
            title: 'Data Collection',
            description: 'Gathered comprehensive historical stock data for banking stocks from 2005-2025, including OHLCV data, trading volumes, and market indicators.',
            details: [
                'Historical Multi-source Data (NSE & BSE)',
                'Live NSI/BOM Exchange Synchronization',
                'RBI Monetary Policy Data Integration',
                'Global Macro-Economic Correlation'
            ]
        },
        {
            icon: Filter,
            title: 'Data Preprocessing',
            description: 'Cleaned and prepared raw data through normalization, handling missing values, and feature scaling for optimal model performance.',
            details: [
                'Missing value imputation',
                'Outlier detection and treatment',
                'Data normalization and scaling',
                'Time series data structuring'
            ]
        },
        {
            icon: Code,
            title: 'Feature Engineering',
            description: 'Created meaningful features including technical indicators, moving averages, and volatility measures.',
            details: [
                'Technical indicators (RSI, MACD, Bollinger Bands)',
                'Moving averages (SMA, EMA)',
                'Volatility measures & ATR',
                'Lag features and rolling statistics'
            ]
        },
        {
            icon: Brain,
            title: 'Model Development',
            description: 'Implemented and trained multiple machine learning algorithms to find the best performing model for stock price prediction.',
            details: [
                'Random Forest Regressor',
                'Ensemble Learning Methods',
                'Support Vector Machines (SVM)',
                'Linear Regression baseline'
            ]
        },
        {
            icon: Target,
            title: 'Model Evaluation',
            description: 'Comprehensive evaluation using multiple metrics and cross-validation to ensure model reliability.',
            details: [
                'Mean Absolute Error (MAE)',
                'Root Mean Square Error (RMSE)',
                'R-squared score (R²)',
                'Backtesting on historical trends'
            ]
        },
        {
            icon: BarChart3,
            title: 'Results Analysis',
            description: 'Detailed analysis of model performance, feature importance, and prediction accuracy across market conditions.',
            details: [
                'Performance visualization',
                'Feature importance analysis',
                'Prediction vs actual comparison',
                'Confidence interval calculation'
            ]
        }
    ]

    const algorithms: Algorithm[] = [
        {
            name: 'Random Forest',
            accuracy: '94.2%',
            description: 'Best performing ensemble method with excellent generalization',
            pros: ['High accuracy', 'Feature importance', 'Robust to overfitting'],
            color: 'blue'
        },
        {
            name: 'Ensemble Neural Net',
            accuracy: '91.8%',
            description: 'Deep learning approach for sequential pattern recognition',
            pros: ['Temporal patterns', 'Non-linear relationships', 'Memory capability'],
            color: 'purple'
        },
        {
            name: 'SVM Regressor',
            accuracy: '88.5%',
            description: 'Kernel-based method for complex decision boundaries',
            pros: ['Non-linear mapping', 'Regularization', 'Kernel flexibility'],
            color: 'teal'
        },
        {
            name: 'Linear Regression',
            accuracy: '76.3%',
            description: 'Baseline model for comparison and interpretability',
            pros: ['Interpretable', 'Fast training', 'Simple implementation'],
            color: 'gray'
        }
    ]

    const metrics: Metric[] = [
        { name: 'Average Nifty Bank MAE', value: '1.84', unit: '%' },
        { name: 'Root Mean Square Error', value: '2.45', unit: '%' },
        { name: 'R-squared (HDFC & SBI)', value: '0.942', unit: '' },
        { name: 'Backtesting Accuracy', value: '91.2', unit: '%' }
    ]

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-20">
                {/* Hero */}
                <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                                Methodology & Approach
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Discover our systematic approach to building high-accuracy
                                stock price prediction models using advanced machine learning techniques.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Process Steps */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Forecast Pipeline</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                A rigorous step-by-step process from data ingestion to predictive output.
                            </p>
                        </div>

                        <div className="space-y-16">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                                >
                                    <div className="flex-1 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                                        <div className="flex items-center space-x-6 mb-8">
                                            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-2xl">
                                                <step.icon className="h-7 w-7 text-blue-600" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Phase {index + 1}</span>
                                                <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">{step.description}</p>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {step.details.map((detail, detailIndex) => (
                                                <li key={detailIndex} className="flex items-center space-x-3 text-gray-700">
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                    <span className="font-medium">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="hidden lg:flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full text-white font-extrabold text-3xl shadow-2xl">
                                        {index + 1}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technical Stack */}
                <section className="py-24 bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl font-bold">Scientific Implementation</h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Our architecture leverages high-performance libraries to ensure
                                    accuracy, scalability, and consistent forecasting reliable for daily trading.
                                </p>
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { title: 'simple-statistics', desc: 'Linear Regression Engine' },
                                        { title: 'Technical Indicators', desc: 'RSI & MACD Divergence' },
                                        { title: 'Next.js 15', desc: 'Real-time UI Sync' },
                                        { title: 'NSE/BSE Feeds', desc: 'Live Market Data' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                            <h4 className="font-bold text-blue-400 mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
                                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-6">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <Zap className="text-yellow-400" /> Key Model Metrics
                                    </h3>
                                    <div className="space-y-4">
                                        {metrics.map((m, i) => (
                                            <div key={i} className="flex justify-between items-center py-3 border-b border-white/10">
                                                <span className="text-gray-400">{m.name}</span>
                                                <span className="text-xl font-mono font-bold text-green-400">{m.value}{m.unit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
