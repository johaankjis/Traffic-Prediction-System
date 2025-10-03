"use client"

import { Card } from "@/components/ui/card"
import type { Route, TrafficSegment } from "@/lib/types"

interface RouteMapProps {
  routes: Route[]
  segments: TrafficSegment[]
  selectedRouteId?: string
}

const ROUTE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

export function RouteMap({ routes, segments, selectedRouteId }: RouteMapProps) {
  const selectedRoute = selectedRouteId ? routes.find((r) => r.id === selectedRouteId) : routes[0]

  // Get segments for selected route
  const routeSegments = selectedRoute ? segments.filter((seg) => selectedRoute.segments.includes(seg.id)) : []

  // Calculate map bounds
  const lats = routeSegments.flatMap((s) => [s.startLat, s.endLat])
  const lngs = routeSegments.flatMap((s) => [s.startLng, s.endLng])
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  const normalize = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Route Visualization</h3>
      <div className="relative w-full h-[400px] bg-muted rounded-lg overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="route-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#route-grid)" />
          </svg>
        </div>

        {/* Route path */}
        <svg className="absolute inset-0 w-full h-full">
          {routeSegments.map((segment, index) => {
            const x1 = normalize(segment.startLng, minLng, maxLng)
            const y1 = 100 - normalize(segment.startLat, minLat, maxLat)
            const x2 = normalize(segment.endLng, minLng, maxLng)
            const y2 = 100 - normalize(segment.endLat, minLat, maxLat)

            return (
              <g key={segment.id}>
                <line
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke={ROUTE_COLORS[0]}
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                {index === 0 && (
                  <circle cx={`${x1}%`} cy={`${y1}%`} r="6" fill="#10b981" stroke="white" strokeWidth="2" />
                )}
                {index === routeSegments.length - 1 && (
                  <circle cx={`${x2}%`} cy={`${y2}%`} r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
                )}
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg border shadow-lg">
          <div className="text-xs font-semibold mb-2">{selectedRoute?.name}</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Start</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>End</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
