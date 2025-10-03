"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"

interface SystemHealthProps {
  queueDepth: number
}

export function SystemHealth({ queueDepth }: SystemHealthProps) {
  const services = [
    {
      name: "Kafka Broker",
      status: "operational",
      uptime: "99.9%",
      lastCheck: "2 min ago",
    },
    {
      name: "Spark Streaming",
      status: "operational",
      uptime: "99.8%",
      lastCheck: "1 min ago",
    },
    {
      name: "ML Prediction Service",
      status: queueDepth > 800 ? "degraded" : "operational",
      uptime: "99.5%",
      lastCheck: "30 sec ago",
    },
    {
      name: "PostgreSQL Database",
      status: "operational",
      uptime: "99.9%",
      lastCheck: "1 min ago",
    },
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.7%",
      lastCheck: "45 sec ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "down":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge variant="default">Operational</Badge>
      case "degraded":
        return <Badge variant="secondary">Degraded</Badge>
      case "down":
        return <Badge variant="destructive">Down</Badge>
      default:
        return <Badge variant="default">Unknown</Badge>
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">System Health</h3>
      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(service.status)}
              <div>
                <p className="font-medium">{service.name}</p>
                <p className="text-xs text-muted-foreground">Last check: {service.lastCheck}</p>
              </div>
            </div>
            <div className="text-right">
              {getStatusBadge(service.status)}
              <p className="text-xs text-muted-foreground mt-1">{service.uptime} uptime</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
