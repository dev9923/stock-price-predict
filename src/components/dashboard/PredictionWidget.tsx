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
