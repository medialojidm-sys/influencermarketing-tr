import { NextRequest, NextResponse } from "next/server"
import { searchSocial, getConfiguredPlatforms } from "@/lib/services/social"
import type { Platform } from "@/types"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || ""
  const platform = searchParams.get("platform") as Platform | null

  if (!query || query.length < 2) {
    return NextResponse.json({ error: "Query must be at least 2 characters" }, { status: 400 })
  }

  try {
    const configured = getConfiguredPlatforms()
    const results = await searchSocial(query, platform || undefined)

    return NextResponse.json({
      results,
      platforms: configured,
      query,
    })
  } catch (error) {
    console.error("Social search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
