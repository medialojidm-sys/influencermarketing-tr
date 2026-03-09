import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const influencerId = searchParams.get("influencerId")
  const type = searchParams.get("type") || "engagement"

  if (!influencerId) {
    return NextResponse.json({ error: "influencerId is required" }, { status: 400 })
  }

  try {
    if (type === "engagement") {
      const metrics = await prisma.engagementMetric.findMany({
        where: { influencerId },
        orderBy: { date: "asc" },
        take: 12,
      })
      return NextResponse.json(metrics)
    }

    if (type === "audience") {
      const data = await prisma.audienceData.findMany({
        where: { influencerId },
        orderBy: { date: "desc" },
        take: 1,
      })

      if (data.length === 0) {
        return NextResponse.json(null)
      }

      const latest = data[0]
      return NextResponse.json({
        ...latest,
        ageData: latest.ageData ? JSON.parse(latest.ageData) : null,
        genderData: latest.genderData ? JSON.parse(latest.genderData) : null,
        locationData: latest.locationData ? JSON.parse(latest.locationData) : null,
        interestData: latest.interestData ? JSON.parse(latest.interestData) : null,
      })
    }

    if (type === "growth") {
      const data = await prisma.audienceData.findMany({
        where: { influencerId },
        orderBy: { date: "asc" },
        select: { date: true, followers: true, platform: true },
      })
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
