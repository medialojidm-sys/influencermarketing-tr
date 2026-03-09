import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get("status") || ""

  try {
    const where: Record<string, unknown> = {}
    if (status && status !== "all") where.status = status

    const campaigns = await prisma.campaign.findMany({
      where: where as any,
      include: {
        influencers: {
          include: { influencer: { include: { socialAccounts: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    const result = campaigns.map((c) => ({
      ...c,
      goals: c.goals ? JSON.parse(c.goals) : null,
      results: c.results ? JSON.parse(c.results) : null,
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, platform, budget, startDate, endDate, goals, userId } = body

    const campaign = await prisma.campaign.create({
      data: {
        name,
        description,
        platform,
        budget: budget ? parseFloat(budget) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        goals: goals ? JSON.stringify(goals) : null,
        userId: userId || "demo-user",
      },
    })

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error("Error creating campaign:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
