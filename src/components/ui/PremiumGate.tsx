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
