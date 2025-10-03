// Core data types for the traffic prediction system

export interface TrafficSegment {
  id: string
  roadName: string
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  currentSpeed: number
  averageSpeed: number
  congestionLevel: "low" | "moderate" | "high" | "severe"
  vehicleCount: number
  timestamp: Date
}

export interface TrafficPrediction {
  segmentId: string
  roadName: string
  predictedCongestion: "low" | "moderate" | "high" | "severe"
  confidence: number
  timeHorizon: number // minutes ahead
  predictedSpeed: number
  timestamp: Date
}

export interface Route {
  id: string
  name: string
  segments: string[]
  totalDistance: number // km
  estimatedTime: number // minutes
  congestionScore: number
  alternative: boolean
}

export interface SystemMetrics {
  timestamp: Date
  dataIngestionRate: number // events per second
  processingLatency: number // milliseconds
  predictionAccuracy: number // percentage
  activeStreams: number
  queueDepth: number
}

export interface Alert {
  id: string
  type: "congestion" | "incident" | "prediction" | "system"
  severity: "info" | "warning" | "critical"
  message: string
  location?: string
  timestamp: Date
}
