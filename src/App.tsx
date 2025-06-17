// --- src/App.tsx ---
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Results from './pages/Results'
import Pricing from './pages/Pricing'
import Methodology from './pages/Methodology'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<Results />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/methodology" element={<Methodology />} />
      </Routes>
    </Router>
  )
}

export default App

// --- src/components/dashboard/PredictionWidget.tsx ---
import { useEffect, useState } from 'react'
import stockApi from '../../services/stockApi'

const PredictionWidget = () => {
  const [prediction, setPrediction] = useState<any>(null)

  useEffect(() => {
    stockApi.getPrediction().then(setPrediction)
  }, [])

  return (
    <div>
      {prediction ? (
        <div>
          <h3>Predicted Price: ₹{prediction.predictedPrice}</h3>
          <p>Confidence: {prediction.confidence * 100}%</p>
          <p>Trend: {prediction.trend}</p>
        </div>
      ) : (
        <p>Loading prediction...</p>
      )}
    </div>
  )
}

export default PredictionWidget

// --- src/components/layout/Footer.tsx ---
const Footer = () => {
  return <footer className="text-center p-4">© 2025 Stock Predict</footer>
}

export default Footer

// --- src/components/layout/Navbar.tsx ---
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>Stock App</nav>
  )
}

export default Navbar

// --- src/components/ui/LoadingSpinner.tsx ---
interface LoadingSpinnerProps {
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = '' }) => {
  return (
    <div className={`spinner ${className}`}>Loading...</div>
  )
}

export default LoadingSpinner

// --- src/components/ui/PremiumGate.tsx ---
import { Crown, Zap } from 'lucide-react'

const PremiumGate = () => {
  return (
    <div className="p-4 border border-yellow-400 rounded-lg">
      <Crown />
      <p>Subscribe for premium features</p>
      <Zap />
    </div>
  )
}

export default PremiumGate

// --- src/pages/About.tsx ---
const About = () => <div>About our predictive analytics model</div>

export default About

// --- src/pages/Dashboard.tsx ---
import { useState, useEffect } from 'react'
import stockApi from '../services/stockApi'

const Dashboard = () => {
  const [news, setNews] = useState<{ title: string; url: string }[]>([])

  useEffect(() => {
    stockApi.getMarketNews().then(setNews)
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {news.map(article => (
          <li key={article.url}><a href={article.url}>{article.title}</a></li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard

// --- src/pages/Home.tsx ---
const Home = () => <div>Welcome to the Stock Prediction App</div>

export default Home

// --- src/pages/Methodology.tsx ---
const Methodology = () => <div>Our ML and statistical techniques explained.</div>

export default Methodology

// --- src/pages/Pricing.tsx ---
import { useState } from 'react'

const Pricing = () => {
  const [selected, setSelected] = useState('free')

  return (
    <div>
      <h1>Pricing Plans</h1>
      <button onClick={() => setSelected('free')}>Free</button>
      <button onClick={() => setSelected('premium')}>Premium</button>
      <p>Selected: {selected}</p>
    </div>
  )
}

export default Pricing

// --- src/pages/Results.tsx ---
import { useState } from 'react'

const Results = () => {
  const [modelComparison] = useState([{ name: 'Model A', score: 0.91 }])
  const [featureImportance] = useState([{ feature: 'Volume', importance: 0.6 }])

  return (
    <div>
      <h1>Results</h1>
      <h2>Model Comparison</h2>
      <ul>
        {modelComparison.map(model => (
          <li key={model.name}>{model.name}: {model.score}</li>
        ))}
      </ul>

      <h2>Feature Importance</h2>
      <ul>
        {featureImportance.map(feature => (
          <li key={feature.feature}>{feature.feature}: {feature.importance}</li>
        ))}
      </ul>
    </div>
  )
}

export default Results

// --- src/services/subscriptionService.ts ---
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_example'
)

export default stripePromise
