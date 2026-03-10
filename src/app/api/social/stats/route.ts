import { NextRequest, NextResponse } from "next/server"
import { getProfile, getConfiguredPlatforms } from "@/lib/services/social"
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

  try {
    const profile = await getProfile(platform, username)

    if (!profile) {
      return NextResponse.json(
        { error: `Stats not found or ${platform} API is not configured` },
        { status: 404 }
      )
    }

    const { raw, ...basicProfile } = profile

    const stats = {
      ...basicProfile,
      details: raw ? extractDetailedStats(platform, raw) : null,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Social stats error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}

function extractDetailedStats(platform: Platform, raw: any) {
  switch (platform) {
    case "youtube":
      return {
        totalViews: raw.channel?.viewCount || 0,
        videoCount: raw.channel?.videoCount || 0,
        postingFrequency: raw.postingFrequency || 0,
        recentVideos: (raw.recentVideos || []).slice(0, 10).map((v: any) => ({
          title: v.title,
          views: v.viewCount,
          likes: v.likeCount,
          comments: v.commentCount,
          publishedAt: v.publishedAt,
        })),
      }
    case "instagram":
      return {
        mediaCount: raw.profile?.mediaCount || 0,
        recentPosts: (raw.recentMedia || []).slice(0, 10).map((m: any) => ({
          type: m.mediaType,
          likes: m.likeCount,
          comments: m.commentsCount,
          permalink: m.permalink,
          timestamp: m.timestamp,
        })),
      }
    case "tiktok":
      return {
        totalLikes: raw.profile?.likesCount || 0,
        videoCount: raw.profile?.videoCount || 0,
        recentVideos: (raw.recentVideos || []).slice(0, 10).map((v: any) => ({
          description: v.description?.slice(0, 100),
          views: v.viewCount,
          likes: v.likeCount,
          comments: v.commentCount,
          shares: v.shareCount,
        })),
      }
    default:
      return null
  }
}
