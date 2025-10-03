"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle } from "lucide-react"
import type { SystemMetrics } from "@/lib/types"

interface QueueMonitorProps {
  metrics: SystemMetrics
}

export function QueueMonitor({ metrics }: QueueMonitorProps) {
  const queueCapacity = 1000
  const queueUsage = (metrics.queueDepth / queueCapacity) * 100
  const isWarning = queueUsage > 70

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Message Queue</h3>
        {isWarning && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Queue Depth</span>
            <span className="text-2xl font-bold">
              {metrics.queueDepth} / {queueCapacity}
            </span>
          </div>
          <Progress value={queueUsage} className="h-3" />
          <p className="text-xs text-muted-foreground mt-1">{queueUsage.toFixed(1)}% capacity</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Ingestion Rate</p>
            <p className="text-lg font-bold">{metrics.dataIngestionRate.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">events/sec</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Streams</p>
            <p className="text-lg font-bold">{metrics.activeStreams}</p>
            <p className="text-xs text-muted-foreground">Kafka partitions</p>
          </div>
        </div>

        {isWarning && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Queue depth is high. Consider scaling up processing capacity.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
