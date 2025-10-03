"use client"
;("use client")

import { Card } from "@/components/ui/card"
import type { TrafficSegment } from "@/lib/types"

interface TrafficMapProps {
  segments: TrafficSegment[]
}

const CONGESTION_COLORS = {
  low: "#10b981",
  moderate: "#f59e0b",
  high: "#ef4444",
  severe: "#991b1b",
}

export function TrafficMap({ segments }: TrafficMapProps) {
  // Calculate map bounds
  const lats = segments.flatMap((s) => [s.startLat, s.endLat])
  const lngs = segments.flatMap((s) => [s.startLng, s.endLng])
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  const normalize = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Live Traffic Map</h3>
      <div className="relative w-full h-[500px] bg-muted rounded-lg overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Traffic segments */}
        <svg className="absolute inset-0 w-full h-full">
          {segments.map((segment) => {
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
                  stroke={CONGESTION_COLORS[segment.congestionLevel]}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx={`${x1}%`} cy={`${y1}%`} r="3" fill={CONGESTION_COLORS[segment.congestionLevel]} />
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg border shadow-lg">
          <div className="text-xs font-semibold mb-2">Congestion Level</div>
          <div className="space-y-1">
            {Object.entries(CONGESTION_COLORS).map(([level, color]) => (
              <div key={level} className="flex items-center gap-2 text-xs">
                <div className="w-4 h-2 rounded" style={{ backgroundColor: color }} />
                <span className="capitalize">{level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
