"use client"

import { useState } from "react"
import { PredictionTimeline } from "@/components/prediction-timeline"
import { PredictionChart } from "@/components/prediction-chart"
import { PredictionAccuracy } from "@/components/prediction-accuracy"
import { PredictionHeatmap } from "@/components/prediction-heatmap"
import { useTrafficPredictions } from "@/hooks/use-traffic-data"
import { Spinner } from "@/components/ui/spinner"

export default function PredictionsPage() {
  const { data: predictions, isLoading } = useTrafficPredictions()
  const [selectedHorizon, setSelectedHorizon] = useState(30)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (!predictions) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">No predictions available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Traffic Predictions</h2>
        <p className="text-muted-foreground">AI-powered congestion forecasting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PredictionChart predictions={predictions} selectedHorizon={selectedHorizon} />
        </div>
        <div>
          <PredictionAccuracy predictions={predictions} />
        </div>
      </div>

      <PredictionTimeline
        predictions={predictions}
        selectedHorizon={selectedHorizon}
        onHorizonChange={setSelectedHorizon}
      />

      <PredictionHeatmap predictions={predictions} />
    </div>
  )
}
