import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "20")
  const search = searchParams.get("search") || ""
  const platform = searchParams.get("platform") || ""
  const country = searchParams.get("country") || ""
  const category = searchParams.get("category") || ""
  const minFollowers = parseInt(searchParams.get("minFollowers") || "0")
  const maxFollowers = parseInt(searchParams.get("maxFollowers") || "0")
  const minEngagement = parseFloat(searchParams.get("minEngagement") || "0")
  const minQualityScore = parseFloat(searchParams.get("minQualityScore") || "0")
  const isVerified = searchParams.get("isVerified")
  const sortBy = searchParams.get("sortBy") || "totalReach"
  const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc"

  try {
    const where: Record<string, unknown> = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { bio: { contains: search, mode: "insensitive" } },
        { categories: { contains: search, mode: "insensitive" } },
      ]
    }
    if (country) where.country = country
    if (category) where.categories = { contains: category, mode: "insensitive" }
    if (isVerified === "true") where.isVerified = true
    if (minQualityScore > 0) where.qualityScore = { gte: minQualityScore }

    const orderBy: Record<string, string> = {}
    if (sortBy === "name") orderBy.name = sortOrder
    else if (sortBy === "qualityScore") orderBy.qualityScore = sortOrder
    else orderBy.totalReach = sortOrder

    const [influencers, total] = await Promise.all([
      prisma.influencer.findMany({
        where: where as any,
        include: { socialAccounts: true },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.influencer.count({ where: where as any }),
    ])

    let filtered = influencers
    if (platform) {
      filtered = filtered.filter((inf) =>
        inf.socialAccounts.some((sa) => sa.platform === platform)
      )
    }
    if (minFollowers > 0) {
      filtered = filtered.filter((inf) =>
        inf.socialAccounts.some((sa) => sa.followers >= minFollowers)
      )
    }
    if (maxFollowers > 0) {
      filtered = filtered.filter((inf) =>
        inf.socialAccounts.some((sa) => sa.followers <= maxFollowers)
      )
    }
    if (minEngagement > 0) {
      filtered = filtered.filter((inf) => {
        const avgEng = inf.socialAccounts.reduce((s, sa) => s + sa.engagementRate, 0) / inf.socialAccounts.length
        return avgEng >= minEngagement
      })
    }

    const result = filtered.map((inf) => ({
      ...inf,
      categories: JSON.parse(inf.categories || "[]"),
    }))

    return NextResponse.json({
      data: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching influencers:", error)
    return NextResponse.json({ error: "Failed to fetch influencers" }, { status: 500 })
  }
}
