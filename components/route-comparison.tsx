"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Navigation } from "lucide-react"
import type { Route } from "@/lib/types"

interface RouteComparisonProps {
  routes: Route[]
}

export function RouteComparison({ routes }: RouteComparisonProps) {
  const bestRoute = routes[0]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {routes.slice(0, 6).map((route, index) => {
        const isBest = route.id === bestRoute.id
        const timeDiff = route.estimatedTime - bestRoute.estimatedTime

        return (
          <Card key={route.id} className={`p-6 transition-all ${isBest ? "border-2 border-primary shadow-lg" : ""}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{route.name}</h3>
                {isBest && (
                  <Badge className="mt-1" variant="default">
                    Recommended
                  </Badge>
                )}
                {route.alternative && !isBest && (
                  <Badge className="mt-1" variant="secondary">
                    Alternative
                  </Badge>
                )}
              </div>
              <Navigation className={`h-5 w-5 ${isBest ? "text-primary" : "text-muted-foreground"}`} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{Math.round(route.estimatedTime)} min</span>
                {timeDiff > 0 && <span className="text-sm text-muted-foreground">+{Math.round(timeDiff)} min</span>}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-medium">{route.totalDistance.toFixed(1)} km</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Segments</span>
                <span className="font-medium">{route.segments.length}</span>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Congestion</span>
                  <span className="font-medium">{route.congestionScore.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      route.congestionScore < 25
                        ? "bg-green-500"
                        : route.congestionScore < 50
                          ? "bg-yellow-500"
                          : route.congestionScore < 75
                            ? "bg-orange-500"
                            : "bg-red-500"
                    }`}
                    style={{ width: `${route.congestionScore}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
