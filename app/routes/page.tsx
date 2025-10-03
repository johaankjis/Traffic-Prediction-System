"use client"

import { useState } from "react"
import { RouteComparison } from "@/components/route-comparison"
import { RouteMap } from "@/components/route-map"
import { RouteDetails } from "@/components/route-details"
import { useRoutes, useTrafficSegments } from "@/hooks/use-traffic-data"
import { Spinner } from "@/components/ui/spinner"

export default function RoutesPage() {
  const { data: routes, isLoading: routesLoading } = useRoutes()
  const { data: segments, isLoading: segmentsLoading } = useTrafficSegments()
  const [selectedRouteId, setSelectedRouteId] = useState<string>()

  if (routesLoading || segmentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (!routes || !segments) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">No routes available</p>
      </div>
    )
  }

  const selectedRoute = selectedRouteId ? routes.find((r) => r.id === selectedRouteId) : routes[0]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Route Optimization</h2>
        <p className="text-muted-foreground">Find the fastest route based on real-time traffic</p>
      </div>

      <RouteComparison routes={routes} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RouteMap routes={routes} segments={segments} selectedRouteId={selectedRouteId} />
        </div>
        <div>{selectedRoute && <RouteDetails route={selectedRoute} segments={segments} />}</div>
      </div>
    </div>
  )
}
