"use client"

import useSWR from "swr"
import type { TrafficSegment, TrafficPrediction, SystemMetrics, Alert, Route } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useTrafficSegments() {
  return useSWR<TrafficSegment[]>("/api/traffic/segments", fetcher, {
    refreshInterval: 5000, // Update every 5 seconds
  })
}

export function useTrafficPredictions() {
  return useSWR<TrafficPrediction[]>("/api/traffic/predictions", fetcher, {
    refreshInterval: 10000, // Update every 10 seconds
  })
}

export function useSystemMetrics() {
  return useSWR<SystemMetrics>("/api/traffic/metrics", fetcher, {
    refreshInterval: 3000, // Update every 3 seconds
  })
}

export function useAlerts() {
  return useSWR<Alert[]>("/api/traffic/alerts", fetcher, {
    refreshInterval: 5000, // Update every 5 seconds
  })
}

export function useRoutes() {
  return useSWR<Route[]>("/api/traffic/routes", fetcher, {
    refreshInterval: 10000, // Update every 10 seconds
  })
}
