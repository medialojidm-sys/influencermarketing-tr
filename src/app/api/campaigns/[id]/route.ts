import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        influencers: {
          include: { influencer: { include: { socialAccounts: true } } },
        },
      },
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...campaign,
      goals: campaign.goals ? JSON.parse(campaign.goals) : null,
      results: campaign.results ? JSON.parse(campaign.results) : null,
    })
  } catch (error) {
    console.error("Error fetching campaign:", error)
    return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const body = await request.json()
    const { name, description, status, platform, budget, startDate, endDate, goals, results } = body

    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(platform && { platform }),
        ...(budget !== undefined && { budget: budget ? parseFloat(budget) : null }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(goals && { goals: JSON.stringify(goals) }),
        ...(results && { results: JSON.stringify(results) }),
      },
    })

    return NextResponse.json(campaign)
  } catch (error) {
    console.error("Error updating campaign:", error)
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    await prisma.campaign.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting campaign:", error)
    return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 })
  }
}
