'use client';

import { motion } from 'framer-motion'
import {
    Target,
    Brain,
    BarChart3,
    Database,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface Objective {
    icon: LucideIcon
    title: string
    description: string
}

export default function About() {
    const objectives: Objective[] = [
        {
            icon: Target,
            title: 'Accurate Prediction',
            description:
                'Develop machine learning models that can predict banking stock closing prices with high accuracy using ensemble methods.',
        },
        {
            icon: Brain,
            title: 'Algorithm Comparison',
            description:
                'Compare different ML algorithms including Linear Regression, Random Forest, and LSTM to identify the best performing model.',
        },
        {
            icon: BarChart3,
            title: 'Market Analysis',
            description:
                'Analyze historical market data and identify key patterns that influence stock price movements in the banking sector.',
        },
        {
            icon: Database,
            title: 'Data Engineering',
            description:
                'Implement robust data preprocessing and feature engineering techniques for optimal model performance across different market conditions.',
        },
    ]

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <main className="pt-20">
                <section className="py-24 bg-gray-50 dark:bg-gray-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Project Objectives
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                                Our main goals and what we aimed to achieve through this comprehensive analysis.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {objectives.map(({ icon: Icon, title, description }) => (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-start space-x-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex-shrink-0 w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                        <Icon className="h-7 w-7 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white dark:bg-gray-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-sans">Our Mission</h2>
                            <p className="mb-4">
                                StockSage Pro was built with a mission to democratize institutional-grade financial analysis.
                                By leveraging advanced AI and real-time data feeds, we provide retail traders with the same
                                level of insight previously reserved for bank-level trading desks.
                            </p>
                            <p>
                                Our team consists of data scientists, financial analysts, and software engineers dedicated
                                to building the most accurate and user-friendly stock prediction platform in the market.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
