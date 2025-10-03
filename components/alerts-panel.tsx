"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import type { Alert } from "@/lib/types"

interface AlertsPanelProps {
  alerts: Alert[]
}

const ALERT_ICONS = {
  info: Info,
  warning: AlertTriangle,
  critical: AlertCircle,
}

const ALERT_COLORS = {
  info: "text-blue-500",
  warning: "text-orange-500",
  critical: "text-red-500",
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Active Alerts</h3>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No active alerts</p>
        ) : (
          alerts.map((alert) => {
            const Icon = ALERT_ICONS[alert.severity]
            return (
              <div key={alert.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Icon className={`h-5 w-5 mt-0.5 ${ALERT_COLORS[alert.severity]}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={alert.severity === "critical" ? "destructive" : "secondary"} className="capitalize">
                      {alert.type}
                    </Badge>
                    {alert.location && <span className="text-xs text-muted-foreground">{alert.location}</span>}
                  </div>
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </Card>
  )
}
