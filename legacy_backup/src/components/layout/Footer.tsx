import { Link } from 'react-router-dom'
import { Brain, Mail, Github, Linkedin, ExternalLink, TrendingUp, Shield, Zap } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">StockSage Pro</span>
                <div className="text-xs text-blue-400 font-medium">AI Trading Platform</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Advanced AI-powered banking stock predictions with live market data, 
              smart trading signals, and commission-based earnings. Transform your trading with cutting-edge technology.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">90%+ Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Live Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">Secure Trading</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href="mailto:support@stocksagepro.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Email"
                title="Send Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/stocksagepro"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/stocksagepro"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Trading Partners</h3>
            <ul className="space-y-2">
              {[
                { name: 'Zerodha', href: 'https://zerodha.com/' },
                { name: 'Upstox', href: 'https://upstox.com/' },
                { name: 'Groww', href: 'https://groww.in/' },
                { name: 'Angel One', href: 'https://angelone.in/' },
              ].map((resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                    title={resource.name}
                  >
                    {resource.name}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-4 mt-6">Data Sources</h3>
            <ul className="space-y-2">
              {[
                { name: 'BSE India', href: 'https://www.bseindia.com/' },
                { name: 'NSE India', href: 'https://www.nseindia.com/' },
                { name: 'Alpha Vantage', href: 'https://www.alphavantage.co/' },
              ].map((resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                    title={resource.name}
                  >
                    {resource.name}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 StockSage Pro. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Advanced AI-Powered Trading Solutions
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors">
                Risk Disclaimer
              </Link>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              <strong>Risk Disclaimer:</strong> Trading in stocks involves risk. Past performance does not guarantee future results. 
              AI predictions are for informational purposes only and should not be considered as financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer