"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TrafficPrediction } from "@/lib/types"
import { Clock } from "lucide-react"

interface PredictionTimelineProps {
  predictions: TrafficPrediction[]
  selectedHorizon: number
  onHorizonChange: (horizon: number) => void
}

const CONGESTION_COLORS = {
  low: "bg-green-500",
  moderate: "bg-yellow-500",
  high: "bg-orange-500",
  severe: "bg-red-500",
}

export function PredictionTimeline({ predictions, selectedHorizon, onHorizonChange }: PredictionTimelineProps) {
  const horizons = [15, 30, 60]

  // Group predictions by road and horizon
  const predictionsByRoad = predictions.reduce(
    (acc, pred) => {
      if (!acc[pred.roadName]) {
        acc[pred.roadName] = {}
      }
      acc[pred.roadName][pred.timeHorizon] = pred
      return acc
    },
    {} as Record<string, Record<number, TrafficPrediction>>,
  )

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Prediction Timeline</h3>
        <div className="flex gap-2">
          {horizons.map((horizon) => (
            <button
              key={horizon}
              onClick={() => onHorizonChange(horizon)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedHorizon === horizon
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Clock className="inline h-4 w-4 mr-1" />
              {horizon} min
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(predictionsByRoad)
          .slice(0, 8)
          .map(([roadName, roadPredictions]) => (
            <div key={roadName} className="space-y-2">
              <p className="font-medium text-sm">{roadName}</p>
              <div className="flex gap-2">
                {horizons.map((horizon) => {
                  const pred = roadPredictions[horizon]
                  if (!pred) return null

                  return (
                    <div
                      key={horizon}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        selectedHorizon === horizon ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">+{horizon}m</span>
                        <Badge
                          variant={pred.predictedCongestion === "severe" ? "destructive" : "secondary"}
                          className="capitalize text-xs"
                        >
                          {pred.predictedCongestion}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 flex-1 rounded-full ${CONGESTION_COLORS[pred.predictedCongestion]}`} />
                        <span className="text-xs font-medium">{pred.predictedSpeed.toFixed(0)} km/h</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(pred.confidence * 100).toFixed(0)}% confidence
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
      </div>
    </Card>
  )
}
