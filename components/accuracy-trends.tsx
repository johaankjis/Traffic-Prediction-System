"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"

export function AccuracyTrends() {
  const [data, setData] = useState<Array<{ time: string; accuracy: number; confidence: number }>>([])

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: `${i}h`,
      accuracy: 82 + Math.random() * 10,
      confidence: 75 + Math.random() * 20,
    }))
    setData(initialData)

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)]
        newData.push({
          time: `${prev.length}h`,
          accuracy: 82 + Math.random() * 10,
          confidence: 75 + Math.random() * 20,
        })
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">ML Model Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="time" className="text-xs" />
          <YAxis domain={[0, 100]} className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
            name="Accuracy (%)"
          />
          <Line
            type="monotone"
            dataKey="confidence"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
            name="Confidence (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
