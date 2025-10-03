"use client"

import { Card } from "@/components/ui/card"
import { Activity, TrendingUp, AlertTriangle, Navigation } from "lucide-react"
import type { TrafficSegment } from "@/lib/types"

interface TrafficStatsProps {
  segments: TrafficSegment[]
}

export function TrafficStats({ segments }: TrafficStatsProps) {
  const totalSegments = segments.length
  const avgSpeed = segments.reduce((sum, s) => sum + s.currentSpeed, 0) / totalSegments
  const congestedSegments = segments.filter(
    (s) => s.congestionLevel === "high" || s.congestionLevel === "severe",
  ).length
  const totalVehicles = segments.reduce((sum, s) => sum + s.vehicleCount, 0)

  const stats = [
    {
      label: "Active Segments",
      value: totalSegments,
      icon: Navigation,
      color: "text-blue-500",
    },
    {
      label: "Avg Speed",
      value: `${avgSpeed.toFixed(1)} km/h`,
      icon: Activity,
      color: "text-green-500",
    },
    {
      label: "Congested Areas",
      value: congestedSegments,
      icon: AlertTriangle,
      color: "text-orange-500",
    },
    {
      label: "Total Vehicles",
      value: totalVehicles.toLocaleString(),
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  )
}
