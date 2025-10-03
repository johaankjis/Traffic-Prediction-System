import { NextResponse } from "next/server"
import { generateTrafficSegments } from "@/lib/traffic-simulator"
import { generateRoutes } from "@/lib/route-generator"

export async function GET() {
  const segments = generateTrafficSegments()
  const routes = generateRoutes(segments)
  return NextResponse.json(routes)
}
