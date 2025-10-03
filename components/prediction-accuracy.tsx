"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Zap } from "lucide-react"
import type { TrafficPrediction } from "@/types/traffic-prediction" // Assuming TrafficPrediction is declared in a types file

interface PredictionAccuracyProps {
  predictions: TrafficPrediction[]
}

export function PredictionAccuracy({ predictions }: PredictionAccuracyProps) {
  const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length
  const highConfidencePredictions = predictions.filter((p) => p.confidence > 0.85).length
  const totalPredictions = predictions.length

  const metrics = [
    {
      label: "Average Confidence",
      value: `${(avgConfidence * 100).toFixed(1)}%`,
      progress: avgConfidence * 100,
      icon: Target,
      color: "text-blue-500",
    },
    {
      label: "High Confidence",
      value: `${highConfidencePredictions}/${totalPredictions}`,
      progress: (highConfidencePredictions / totalPredictions) * 100,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      label: "Model Accuracy",
      value: "87.3%",
      progress: 87.3,
      icon: Zap,
      color: "text-purple-500",
    },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Prediction Accuracy</h3>
      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
              <span className="text-sm font-bold">{metric.value}</span>
            </div>
            <Progress value={metric.progress} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  )
}
