import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Phone, 
  Send,
  User,
  MessageSquare,
  CheckCircle,
  ExternalLink
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'devanshbansal500@gmail.com',
      link: 'mailto:devanshbansal500@gmail.com',
      color: 'primary'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: '@dev9923',
      link: 'https://github.com/dev9923',
      color: 'secondary'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Devansh Bansal',
      link: 'https://linkedin.com/in/devansh-bansal',
      color: 'accent'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'SRM Institute of Science and Technology',
      link: null,
      color: 'primary'
    }
  ]

  const projectLinks = [
    {
      title: 'View Project Repository',
      description: 'Access the complete source code and documentation',
      icon: Github,
      link: 'https://github.com/dev9923',
      color: 'gray-900'
    },
    {
      title: 'Jupyter Notebook',
      description: 'Explore the machine learning implementation',
      icon: ExternalLink,
      link: '#',
      color: 'primary-600'
    },
    {
      title: 'Dataset Information',
      description: 'Learn about the data sources and preprocessing',
      icon: ExternalLink,
      link: '#',
      color: 'secondary-600'
    }
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
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about the project, want to collaborate, or interested in discussing 
              machine learning and data science? I'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-secondary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Tell me about your thoughts, questions, or collaboration ideas..."
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="card p-4 flex items-center space-x-4"
                    >
                      <div className={`w-12 h-12 bg-${info.color}-100 rounded-lg flex items-center justify-center`}>
                        <info.icon className={`h-6 w-6 text-${info.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`text-${info.color}-600 hover:text-${info.color}-700 transition-colors`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Project Resources</h3>
                <div className="space-y-3">
                  {projectLinks.map((link, index) => (
                    <motion.a
                      key={link.title}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="card p-4 flex items-center space-x-3 hover:shadow-lg transition-all duration-200 group"
                    >
                      <link.icon className={`h-5 w-5 text-${link.color} group-hover:scale-110 transition-transform`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-sm text-gray-600">{link.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Let's Connect!</h3>
                <p className="text-gray-600 mb-4">
                  I'm always excited to discuss machine learning, data science, and innovative projects. 
                  Whether you're a fellow student, researcher, or industry professional, let's connect!
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">24h</div>
                    <p className="text-sm text-gray-600">Response Time</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-600">100%</div>
                    <p className="text-sm text-gray-600">Reply Rate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about the project and collaboration opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Can I use this project for my research?
              </h3>
              <p className="text-gray-600">
                Absolutely! This project is open source and available for educational and research purposes. 
                Please feel free to cite it in your work and reach out if you need any clarifications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                How accurate is the prediction model?
              </h3>
              <p className="text-gray-600">
                Our Random Forest model achieved 94.2% accuracy on the test dataset. However, remember that 
                past performance doesn't guarantee future results in financial markets.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Are you available for collaboration?
              </h3>
              <p className="text-gray-600">
                Yes! I'm always interested in collaborating on machine learning and data science projects. 
                Feel free to reach out with your ideas and proposals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What technologies were used?
              </h3>
              <p className="text-gray-600">
                The project uses Python with scikit-learn, pandas, numpy, and matplotlib for the ML pipeline, 
                and React with TypeScript for this web interface.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact