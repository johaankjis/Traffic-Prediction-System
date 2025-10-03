"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Route, TrafficSegment } from "@/lib/types"

interface RouteDetailsProps {
  route: Route
  segments: TrafficSegment[]
}

export function RouteDetails({ route, segments }: RouteDetailsProps) {
  const routeSegments = segments.filter((seg) => route.segments.includes(seg.id))

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Route Details</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">{route.name}</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Distance</span>
              <p className="font-medium">{route.totalDistance.toFixed(1)} km</p>
            </div>
            <div>
              <span className="text-muted-foreground">Estimated Time</span>
              <p className="font-medium">{Math.round(route.estimatedTime)} min</p>
            </div>
            <div>
              <span className="text-muted-foreground">Segments</span>
              <p className="font-medium">{route.segments.length}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Congestion</span>
              <p className="font-medium">{route.congestionScore.toFixed(0)}%</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Segment Breakdown</h4>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {routeSegments.map((segment, index) => (
              <div key={segment.id} className="flex items-center justify-between p-2 bg-muted rounded">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                  <span className="text-sm">{segment.roadName}</span>
                </div>
                <Badge
                  variant={segment.congestionLevel === "severe" ? "destructive" : "secondary"}
                  className="capitalize text-xs"
                >
                  {segment.congestionLevel}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
