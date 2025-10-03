// Generate optimized routes based on traffic conditions

import type { Route, TrafficSegment } from "./types"

export function generateRoutes(segments: TrafficSegment[]): Route[] {
  const routes: Route[] = []

  // Group segments by road
  const roadSegments = segments.reduce(
    (acc, seg) => {
      if (!acc[seg.roadName]) {
        acc[seg.roadName] = []
      }
      acc[seg.roadName].push(seg)
      return acc
    },
    {} as Record<string, TrafficSegment[]>,
  )

  const roads = Object.keys(roadSegments)

  // Generate primary routes
  for (let i = 0; i < Math.min(3, roads.length); i++) {
    const road = roads[i]
    const roadSegs = roadSegments[road]
    const avgSpeed = roadSegs.reduce((sum, s) => sum + s.currentSpeed, 0) / roadSegs.length
    const distance = roadSegs.length * 2.5 // Approximate km
    const estimatedTime = (distance / avgSpeed) * 60 // minutes

    // Calculate congestion score (0-100, higher is worse)
    const congestionScore =
      roadSegs.reduce((sum, s) => {
        const scores = { low: 0, moderate: 25, high: 50, severe: 75 }
        return sum + scores[s.congestionLevel]
      }, 0) / roadSegs.length

    routes.push({
      id: `route-${i}`,
      name: `Route via ${road}`,
      segments: roadSegs.map((s) => s.id),
      totalDistance: distance,
      estimatedTime,
      congestionScore,
      alternative: false,
    })
  }

  // Generate alternative routes
  for (let i = 3; i < Math.min(6, roads.length); i++) {
    const road = roads[i]
    const roadSegs = roadSegments[road]
    const avgSpeed = roadSegs.reduce((sum, s) => sum + s.currentSpeed, 0) / roadSegs.length
    const distance = roadSegs.length * 2.8 // Slightly longer
    const estimatedTime = (distance / avgSpeed) * 60

    const congestionScore =
      roadSegs.reduce((sum, s) => {
        const scores = { low: 0, moderate: 25, high: 50, severe: 75 }
        return sum + scores[s.congestionLevel]
      }, 0) / roadSegs.length

    routes.push({
      id: `route-${i}`,
      name: `Alternative via ${road}`,
      segments: roadSegs.map((s) => s.id),
      totalDistance: distance,
      estimatedTime,
      congestionScore,
      alternative: true,
    })
  }

  // Sort by estimated time
  return routes.sort((a, b) => a.estimatedTime - b.estimatedTime)
}
