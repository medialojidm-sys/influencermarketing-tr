import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const lists = await prisma.influencerList.findMany({
      include: {
        items: {
          include: { influencer: { include: { socialAccounts: true } } },
        },
        _count: { select: { items: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(lists)
  } catch (error) {
    console.error("Error fetching lists:", error)
    return NextResponse.json({ error: "Failed to fetch lists" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, userId } = body

    const list = await prisma.influencerList.create({
      data: {
        name,
        description,
        userId: userId || "demo-user",
      },
    })

    return NextResponse.json(list, { status: 201 })
  } catch (error) {
    console.error("Error creating list:", error)
    return NextResponse.json({ error: "Failed to create list" }, { status: 500 })
  }
}
