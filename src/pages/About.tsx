import { motion } from 'framer-motion'
import {
  Target,
  Brain,
  BarChart3,
  Database,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Objective {
  icon: LucideIcon
  title: string
  description: string
}

const About: React.FC = () => {
  const objectives: Objective[] = [
    {
      icon: Target,
      title: 'Accurate Prediction',
      description:
        'Develop a machine learning model that can predict Yes Bank stock closing prices with high accuracy.',
    },
    {
      icon: Brain,
      title: 'Algorithm Comparison',
      description:
        'Compare different ML algorithms to identify the best performing model for stock price prediction.',
    },
    {
      icon: BarChart3,
      title: 'Market Analysis',
      description:
        'Analyze historical market data and identify key patterns that influence stock price movements.',
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description:
        'Implement robust data preprocessing and feature engineering techniques for optimal model performance.',
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Project Objectives */}
      <section className="py-20 bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Project Objectives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className="card p-6 flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
