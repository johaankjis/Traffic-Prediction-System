"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { TrafficPrediction } from "@/lib/types"

interface PredictionChartProps {
  predictions: TrafficPrediction[]
  selectedHorizon: number
}

export function PredictionChart({ predictions, selectedHorizon }: PredictionChartProps) {
  // Filter predictions for selected horizon and prepare chart data
  const filteredPredictions = predictions.filter((p) => p.timeHorizon === selectedHorizon)

  // Group by road and calculate average predicted speed
  const chartData = Object.entries(
    filteredPredictions.reduce(
      (acc, pred) => {
        if (!acc[pred.roadName]) {
          acc[pred.roadName] = { roadName: pred.roadName, speeds: [], confidence: [] }
        }
        acc[pred.roadName].speeds.push(pred.predictedSpeed)
        acc[pred.roadName].confidence.push(pred.confidence * 100)
        return acc
      },
      {} as Record<string, { roadName: string; speeds: number[]; confidence: number[] }>,
    ),
  )
    .map(([_, data]) => ({
      name: data.roadName.split(" ").slice(0, 2).join(" "), // Shorten names
      speed: data.speeds.reduce((a, b) => a + b, 0) / data.speeds.length,
      confidence: data.confidence.reduce((a, b) => a + b, 0) / data.confidence.length,
    }))
    .slice(0, 8)

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Predicted Speed Analysis ({selectedHorizon} min ahead)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis
            yAxisId="left"
            className="text-xs"
            label={{ value: "Speed (km/h)", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            className="text-xs"
            label={{ value: "Confidence (%)", angle: 90, position: "insideRight" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="speed"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            name="Predicted Speed"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="confidence"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            name="Confidence"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
