import { NextRequest, NextResponse } from "next/server"
import { getProfile } from "@/lib/services/social"
import type { Platform } from "@/types"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const platform = searchParams.get("platform") as Platform | null
  const username = searchParams.get("username") || ""

  if (!platform || !username) {
    return NextResponse.json(
      { error: "Both 'platform' and 'username' parameters are required" },
      { status: 400 }
    )
  }

  const validPlatforms: Platform[] = ["youtube", "instagram", "tiktok"]
  if (!validPlatforms.includes(platform)) {
    return NextResponse.json(
      { error: `Invalid platform. Use: ${validPlatforms.join(", ")}` },
      { status: 400 }
    )
  }

  try {
    const profile = await getProfile(platform, username)

    if (!profile) {
      return NextResponse.json(
        { error: `Profile not found or ${platform} API is not configured` },
        { status: 404 }
      )
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Social profile error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}
