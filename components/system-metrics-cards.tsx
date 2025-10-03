"use client"

import { Card } from "@/components/ui/card"
import { Activity, Zap, Database, TrendingUp } from "lucide-react"
import type { SystemMetrics } from "@/lib/types"

interface SystemMetricsCardsProps {
  metrics: SystemMetrics
}

export function SystemMetricsCards({ metrics }: SystemMetricsCardsProps) {
  const cards = [
    {
      label: "Data Ingestion Rate",
      value: `${metrics.dataIngestionRate.toFixed(0)} events/sec`,
      icon: Database,
      color: "text-blue-500",
      trend: "+12%",
    },
    {
      label: "Processing Latency",
      value: `${metrics.processingLatency.toFixed(0)} ms`,
      icon: Zap,
      color: "text-yellow-500",
      trend: "-5%",
    },
    {
      label: "Prediction Accuracy",
      value: `${metrics.predictionAccuracy.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-green-500",
      trend: "+2%",
    },
    {
      label: "Active Streams",
      value: metrics.activeStreams,
      icon: Activity,
      color: "text-purple-500",
      trend: "stable",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <card.icon className={`h-8 w-8 ${card.color}`} />
            <span className="text-xs text-muted-foreground">{card.trend}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
          <p className="text-2xl font-bold">{card.value}</p>
        </Card>
      ))}
    </div>
  )
}
