"use client"

import { Card } from "@/components/ui/card"
import type { TrafficPrediction } from "@/lib/types"

interface PredictionHeatmapProps {
  predictions: TrafficPrediction[]
}

const CONGESTION_COLORS = {
  low: "#10b981",
  moderate: "#f59e0b",
  high: "#ef4444",
  severe: "#991b1b",
}

export function PredictionHeatmap({ predictions }: PredictionHeatmapProps) {
  // Group predictions by road and time horizon
  const roads = [...new Set(predictions.map((p) => p.roadName))].slice(0, 8)
  const horizons = [15, 30, 60]

  const heatmapData = roads.map((road) => {
    const roadPredictions = predictions.filter((p) => p.roadName === road)
    return {
      road,
      predictions: horizons.map((horizon) => {
        const pred = roadPredictions.find((p) => p.timeHorizon === horizon)
        return pred || null
      }),
    }
  })

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Congestion Forecast Heatmap</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            <div className="font-medium text-sm">Road</div>
            {horizons.map((horizon) => (
              <div key={horizon} className="font-medium text-sm text-center">
                +{horizon} min
              </div>
            ))}
          </div>

          {/* Heatmap rows */}
          <div className="space-y-2">
            {heatmapData.map((row) => (
              <div key={row.road} className="grid grid-cols-4 gap-2">
                <div className="text-sm truncate py-2">{row.road}</div>
                {row.predictions.map((pred, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg p-3 text-center"
                    style={{
                      backgroundColor: pred ? CONGESTION_COLORS[pred.predictedCongestion] : "#e5e7eb",
                    }}
                  >
                    {pred ? (
                      <>
                        <div className="text-xs font-bold text-white">{pred.predictedSpeed.toFixed(0)} km/h</div>
                        <div className="text-xs text-white/80 capitalize">{pred.predictedCongestion}</div>
                      </>
                    ) : (
                      <div className="text-xs text-gray-500">N/A</div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
