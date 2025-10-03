"use client"

import { SystemMetricsCards } from "@/components/system-metrics-cards"
import { PerformanceChart } from "@/components/performance-chart"
import { SystemHealth } from "@/components/system-health"
import { QueueMonitor } from "@/components/queue-monitor"
import { AccuracyTrends } from "@/components/accuracy-trends"
import { useSystemMetrics } from "@/hooks/use-traffic-data"
import { Spinner } from "@/components/ui/spinner"

export default function MonitoringPage() {
  const { data: metrics, isLoading } = useSystemMetrics()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">No metrics available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Monitoring</h2>
        <p className="text-muted-foreground">Real-time system health and performance metrics</p>
      </div>

      <SystemMetricsCards metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <AccuracyTrends />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SystemHealth queueDepth={metrics.queueDepth} />
        </div>
        <div>
          <QueueMonitor metrics={metrics} />
        </div>
      </div>
    </div>
  )
}
