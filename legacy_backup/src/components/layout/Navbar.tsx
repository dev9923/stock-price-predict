import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, TrendingUp, Crown, Brain } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { subscriptionService, UserSubscription } from '../../services/subscriptionService'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sub = subscriptionService.getCurrentSubscription()
    setSubscription(sub)
  }, [location])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Methodology', path: '/methodology' },
    { name: 'Results', path: '/results' },
    { name: 'Contact', path: '/contact' },
  ]

  const hasPremium = subscriptionService.hasPremiumAccess()

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <span
                className={`text-xl font-bold ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                StockSage Pro
              </span>
              <div className="text-xs text-blue-600 font-medium">AI Trading Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? scrolled
                      ? 'text-blue-600'
                      : 'text-white'
                    : scrolled
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Subscription Status / Pricing Link */}
            {hasPremium ? (
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
                <Crown className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  {subscription?.planId === 'enterprise' ? 'Enterprise' : 
                   subscription?.planId === 'professional' ? 'Professional' : 
                   subscription?.planId === 'premium' ? 'Premium' : 'Pro'}
                </span>
              </div>
            ) : (
              <Link
                to="/pricing"
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Crown className="h-4 w-4" />
                <span className="font-medium">Upgrade</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="container-max py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Subscription Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                {hasPremium ? (
                  <div className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <Crown className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-700">
                      {subscription?.planId === 'enterprise' ? 'Enterprise Plan' : 
                       subscription?.planId === 'professional' ? 'Professional Plan' : 
                       subscription?.planId === 'premium' ? 'Premium Plan' : 'Pro Plan'}
                    </span>
                  </div>
                ) : (
                  <Link
                    to="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                  >
                    <Crown className="h-4 w-4" />
                    <span className="font-medium">Upgrade to Premium</span>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar