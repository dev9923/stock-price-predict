import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Brain, Bell, ShieldCheck } from 'lucide-react'
import AnimatedCounter from '../components/ui/AnimatedCounter'

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Price',
    description: 'Access up-to-the-minute stock price updates for Yes Bank.',
  },
  {
    icon: Brain,
    title: 'AI Predictions',
    description: 'Utilize machine learning models to forecast future stock trends.',
  },
  {
    icon: Bell,
    title: 'Price Alerts',
    description: 'Get notified when the stock hits your target price.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Access',
    description: 'Your data and access are secured with industry best practices.',
  },
]

const stats = [
  { label: 'Active Users', value: 15823 },
  { label: 'Prediction Accuracy', value: 87 },
  { label: 'Alerts Sent', value: 24560 },
]

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      <header className="min-h-screen flex items-center justify-center text-center px-4 md:px-12 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Empower Your Trades with Smart Insights
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Real-time Yes Bank stock analysis and AI-powered predictions to stay ahead of the market.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/dashboard"
              className="px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition"
            >
              Launch Dashboard
            </a>
            <a
              href="/#features"
              className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </header>

      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our platform combines real-time data, AI predictions, and intuitive tools to help you make smarter investment decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="card p-8 text-center group bg-white shadow-sm hover:shadow-md rounded-xl"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-primary-600 mb-2">
                  <AnimatedCounter value={stat.value} />
                  {stat.label === 'Prediction Accuracy' && <span>%</span>}
                </div>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make Smarter Investments?
          </h2>
          <p className="text-lg mb-8">
            Start using our intelligent dashboard today and get ahead in your financial journey.
          </p>
          <a
            href="/dashboard"
            className="inline-block px-8 py-4 rounded-lg bg-white text-primary-600 font-medium hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
