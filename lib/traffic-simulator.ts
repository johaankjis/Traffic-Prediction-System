// Simulates real-time traffic data generation

import type { TrafficSegment, TrafficPrediction, SystemMetrics, Alert } from "./types"

// Major roads in a simulated city
const ROADS = [
  { name: "Highway 101", lat: 37.7749, lng: -122.4194 },
  { name: "Market Street", lat: 37.7849, lng: -122.4094 },
  { name: "Mission Boulevard", lat: 37.7649, lng: -122.4294 },
  { name: "Van Ness Avenue", lat: 37.7949, lng: -122.4394 },
  { name: "Embarcadero", lat: 37.8049, lng: -122.3994 },
  { name: "Geary Boulevard", lat: 37.7549, lng: -122.4494 },
  { name: "California Street", lat: 37.7749, lng: -122.4094 },
  { name: "Broadway", lat: 37.7949, lng: -122.4194 },
]

function getCongestionLevel(speed: number, avgSpeed: number): "low" | "moderate" | "high" | "severe" {
  const ratio = speed / avgSpeed
  if (ratio > 0.8) return "low"
  if (ratio > 0.6) return "moderate"
  if (ratio > 0.4) return "high"
  return "severe"
}

export function generateTrafficSegments(): TrafficSegment[] {
  const segments: TrafficSegment[] = []
  const now = new Date()

  ROADS.forEach((road, index) => {
    // Generate 3-5 segments per road
    const numSegments = 3 + Math.floor(Math.random() * 3)

    for (let i = 0; i < numSegments; i++) {
      const averageSpeed = 50 + Math.random() * 30 // 50-80 km/h
      const speedVariation = (Math.random() - 0.5) * 40 // -20 to +20 km/h
      const currentSpeed = Math.max(10, averageSpeed + speedVariation)

      segments.push({
        id: `seg-${index}-${i}`,
        roadName: road.name,
        startLat: road.lat + i * 0.01,
        startLng: road.lng + i * 0.01,
        endLat: road.lat + (i + 1) * 0.01,
        endLng: road.lng + (i + 1) * 0.01,
        currentSpeed,
        averageSpeed,
        congestionLevel: getCongestionLevel(currentSpeed, averageSpeed),
        vehicleCount: Math.floor(Math.random() * 200) + 50,
        timestamp: now,
      })
    }
  })

  return segments
}

export function generatePredictions(segments: TrafficSegment[]): TrafficPrediction[] {
  const predictions: TrafficPrediction[] = []
  const now = new Date()

  segments.forEach((segment) => {
    // Generate predictions for 15, 30, and 60 minutes ahead
    ;[15, 30, 60].forEach((horizon) => {
      const trendFactor = Math.random() > 0.5 ? 1.1 : 0.9
      const predictedSpeed = segment.currentSpeed * trendFactor

      predictions.push({
        segmentId: segment.id,
        roadName: segment.roadName,
        predictedCongestion: getCongestionLevel(predictedSpeed, segment.averageSpeed),
        confidence: 0.7 + Math.random() * 0.25, // 70-95% confidence
        timeHorizon: horizon,
        predictedSpeed,
        timestamp: now,
      })
    })
  })

  return predictions
}

export function generateSystemMetrics(): SystemMetrics {
  return {
    timestamp: new Date(),
    dataIngestionRate: 800 + Math.random() * 400, // 800-1200 events/sec
    processingLatency: 50 + Math.random() * 100, // 50-150ms
    predictionAccuracy: 82 + Math.random() * 10, // 82-92%
    activeStreams: 8 + Math.floor(Math.random() * 5), // 8-12 streams
    queueDepth: Math.floor(Math.random() * 1000), // 0-1000 messages
  }
}

export function generateAlerts(segments: TrafficSegment[]): Alert[] {
  const alerts: Alert[] = []
  const now = new Date()

  // Generate alerts for severe congestion
  segments
    .filter((seg) => seg.congestionLevel === "severe" || seg.congestionLevel === "high")
    .slice(0, 3)
    .forEach((seg, index) => {
      alerts.push({
        id: `alert-${index}`,
        type: "congestion",
        severity: seg.congestionLevel === "severe" ? "critical" : "warning",
        message: `Heavy traffic detected on ${seg.roadName}`,
        location: seg.roadName,
        timestamp: now,
      })
    })

  // Random system alert
  if (Math.random() > 0.7) {
    alerts.push({
      id: `alert-system`,
      type: "system",
      severity: "info",
      message: "All systems operational",
      timestamp: now,
    })
  }

  return alerts
}
