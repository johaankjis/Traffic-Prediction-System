import { NextResponse } from "next/server"
import { generateTrafficSegments, generatePredictions } from "@/lib/traffic-simulator"

export async function GET() {
  const segments = generateTrafficSegments()
  const predictions = generatePredictions(segments)
  return NextResponse.json(predictions)
}
