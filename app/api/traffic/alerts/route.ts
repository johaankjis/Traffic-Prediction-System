import { NextResponse } from "next/server"
import { generateTrafficSegments, generateAlerts } from "@/lib/traffic-simulator"

export async function GET() {
  const segments = generateTrafficSegments()
  const alerts = generateAlerts(segments)
  return NextResponse.json(alerts)
}
