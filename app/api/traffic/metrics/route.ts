import { NextResponse } from "next/server"
import { generateSystemMetrics } from "@/lib/traffic-simulator"

export async function GET() {
  const metrics = generateSystemMetrics()
  return NextResponse.json(metrics)
}
