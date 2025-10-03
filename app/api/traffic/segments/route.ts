import { NextResponse } from "next/server"
import { generateTrafficSegments } from "@/lib/traffic-simulator"

export async function GET() {
  const segments = generateTrafficSegments()
  return NextResponse.json(segments)
}
