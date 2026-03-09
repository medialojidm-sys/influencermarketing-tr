import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const influencer = await prisma.influencer.findUnique({
      where: { id },
      include: {
        socialAccounts: true,
        audienceData: { orderBy: { date: "desc" }, take: 12 },
        engagementMetrics: { orderBy: { date: "desc" }, take: 12 },
      },
    })

    if (!influencer) {
      return NextResponse.json({ error: "Influencer not found" }, { status: 404 })
    }

    const result = {
      ...influencer,
      categories: JSON.parse(influencer.categories || "[]"),
      audienceData: influencer.audienceData.map((ad) => ({
        ...ad,
        ageData: ad.ageData ? JSON.parse(ad.ageData) : null,
        genderData: ad.genderData ? JSON.parse(ad.genderData) : null,
        locationData: ad.locationData ? JSON.parse(ad.locationData) : null,
        interestData: ad.interestData ? JSON.parse(ad.interestData) : null,
      })),
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching influencer:", error)
    return NextResponse.json({ error: "Failed to fetch influencer" }, { status: 500 })
  }
}
