import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const list = await prisma.influencerList.findUnique({
      where: { id },
      include: {
        items: {
          include: { influencer: { include: { socialAccounts: true } } },
        },
      },
    })

    if (!list) {
      return NextResponse.json({ error: "List not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...list,
      items: list.items.map((item) => ({
        ...item,
        tags: item.tags ? JSON.parse(item.tags) : [],
        influencer: {
          ...item.influencer,
          categories: JSON.parse(item.influencer.categories || "[]"),
        },
      })),
    })
  } catch (error) {
    console.error("Error fetching list:", error)
    return NextResponse.json({ error: "Failed to fetch list" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    await prisma.influencerList.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting list:", error)
    return NextResponse.json({ error: "Failed to delete list" }, { status: 500 })
  }
}
