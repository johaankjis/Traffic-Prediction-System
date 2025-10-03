"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TrafficSegment } from "@/lib/types"

interface TrafficSegmentsListProps {
  segments: TrafficSegment[]
}

const CONGESTION_BADGE_VARIANT = {
  low: "default",
  moderate: "secondary",
  high: "destructive",
  severe: "destructive",
} as const

export function TrafficSegmentsList({ segments }: TrafficSegmentsListProps) {
  // Sort by congestion level (worst first)
  const sortedSegments = [...segments].sort((a, b) => {
    const order = { severe: 0, high: 1, moderate: 2, low: 3 }
    return order[a.congestionLevel] - order[b.congestionLevel]
  })

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Traffic Segments</h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {sortedSegments.slice(0, 15).map((segment) => (
          <div key={segment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex-1">
              <p className="font-medium">{segment.roadName}</p>
              <p className="text-sm text-muted-foreground">
                {segment.currentSpeed.toFixed(0)} km/h • {segment.vehicleCount} vehicles
              </p>
            </div>
            <Badge variant={CONGESTION_BADGE_VARIANT[segment.congestionLevel]} className="capitalize">
              {segment.congestionLevel}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}
