import React from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  GraduationCap, 
  Code, 
  Target, 
  Lightbulb, 
  TrendingUp,
  Database,
  Brain,
  BarChart3
} from 'lucide-react'

const About = () => {
  const objectives = [
    {
      icon: Target,
      title: 'Accurate Prediction',
      description: 'Develop a machine learning model that can predict Yes Bank stock closing prices with high accuracy.'
    },
    {
      icon: Brain,
      title: 'Algorithm Comparison',
      description: 'Compare different ML algorithms to identify the best performing model for stock price prediction.'
    },
    {
      icon: BarChart3,
      title: 'Market Analysis',
      description: 'Analyze historical market data and identify key patterns that influence stock price movements.'
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Implement robust data preprocessing and feature engineering techniques for optimal model performance.'
    }
  ]

  const technologies = [
    'Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Matplotlib', 
    'Seaborn', 'Jupyter Notebook', 'Random Forest', 'LSTM', 'Linear Regression', 'SVM'
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About This Project
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive machine learning project focused on predicting Yes Bank stock closing prices 
              using advanced algorithms and extensive data analysis techniques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Project Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                This project represents a deep dive into financial data science, specifically focusing on 
                Yes Bank's stock performance. Using historical stock data spanning several years, we've 
                developed and trained multiple machine learning models to predict future closing prices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The project encompasses the entire machine learning pipeline - from data collection and 
                preprocessing to model training, evaluation, and deployment. We've implemented various 
                algorithms including traditional statistical methods and modern deep learning approaches.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">Financial Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">Machine Learning</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                  <span className="font-medium">Dataset Size</span>
                  <span className="text-primary-600 font-bold">50,000+ records</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                  <span className="font-medium">Time Period</span>
                  <span className="text-secondary-600 font-bold">2005-2020</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-accent-50 rounded-lg">
                  <span className="font-medium">Best Model Accuracy</span>
                  <span className="text-accent-600 font-bold">94.2%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                  <span className="font-medium">Features Used</span>
                  <span className="text-primary-600 font-bold">25+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding bg-gray-50">
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
            {objectives.map((objective, index) => (
              <motion.div
                key={objective.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <objective.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{objective.title}</h3>
                  <p className="text-gray-600">{objective.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technologies & Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The comprehensive tech stack used to build this machine learning solution.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-medium hover:bg-primary-200 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Developer */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Devansh Bansal</h2>
                  <p className="text-primary-200">Machine Learning Enthusiast</p>
                </div>
              </div>
              
              <p className="text-primary-100 leading-relaxed">
                I'm a passionate web development student at SRM Institute of Science and Technology, 
                with a keen interest in machine learning and data science. This project represents 
                my journey into the fascinating world of financial data analysis and predictive modeling.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-primary-300" />
                  <span>Student at SRM Institute of Science and Technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-primary-300" />
                  <span>Specializing in Web Development & Machine Learning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lightbulb className="h-5 w-5 text-primary-300" />
                  <span>Passionate about Data Science & Financial Analysis</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8 bg-white/10 backdrop-blur-lg border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">@</span>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-primary-200">devanshbansal500@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-primary-200">@dev9923</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Institution</p>
                    <p className="text-primary-200">SRM Institute of Science and Technology</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About