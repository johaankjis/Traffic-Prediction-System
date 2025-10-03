"use client"

import { Card } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"

export function PerformanceChart() {
  const [data, setData] = useState<Array<{ time: string; latency: number; throughput: number }>>([])

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: `${i}s`,
      latency: 50 + Math.random() * 100,
      throughput: 800 + Math.random() * 400,
    }))
    setData(initialData)

    // Update data every 3 seconds
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)]
        newData.push({
          time: `${prev.length}s`,
          latency: 50 + Math.random() * 100,
          throughput: 800 + Math.random() * 400,
        })
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">System Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="time" className="text-xs" />
          <YAxis yAxisId="left" className="text-xs" />
          <YAxis yAxisId="right" orientation="right" className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="latency"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#colorLatency)"
            name="Latency (ms)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="throughput"
            stroke="hsl(var(--chart-2))"
            fillOpacity={1}
            fill="url(#colorThroughput)"
            name="Throughput (events/s)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
