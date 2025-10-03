"use client"

import { TrafficMap } from "@/components/traffic-map"
import { TrafficStats } from "@/components/traffic-stats"
import { TrafficSegmentsList } from "@/components/traffic-segments-list"
import { AlertsPanel } from "@/components/alerts-panel"
import { useTrafficSegments, useAlerts } from "@/hooks/use-traffic-data"
import { Spinner } from "@/components/ui/spinner"

export default function DashboardPage() {
  const { data: segments, isLoading: segmentsLoading } = useTrafficSegments()
  const { data: alerts, isLoading: alertsLoading } = useAlerts()

  if (segmentsLoading || alertsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (!segments || !alerts) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Traffic Dashboard</h2>
        <p className="text-muted-foreground">Real-time traffic monitoring and analysis</p>
      </div>

      <TrafficStats segments={segments} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficMap segments={segments} />
        </div>
        <div>
          <AlertsPanel alerts={alerts} />
        </div>
      </div>

      <TrafficSegmentsList segments={segments} />
    </div>
  )
}
