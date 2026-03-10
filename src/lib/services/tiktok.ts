export interface TikTokProfile {
  id: string
  username: string
  displayName: string
  avatarUrl: string
  bio: string
  followersCount: number
  followingCount: number
  likesCount: number
  videoCount: number
  isVerified: boolean
}

export interface TikTokVideo {
  id: string
  description: string
  createTime: string
  duration: number
  viewCount: number
  likeCount: number
  commentCount: number
  shareCount: number
}

export interface TikTokProfileStats {
  profile: TikTokProfile
  recentVideos: TikTokVideo[]
  avgViews: number
  avgLikes: number
  avgComments: number
  engagementRate: number
}

/**
 * TikTok official Research API is restricted to academic use only.
 * This service is a placeholder for future 3rd-party API integration
 * (e.g., TikAPI, Ensembledata, or similar services).
 *
 * Set TIKTOK_API_KEY and TIKTOK_API_BASE_URL in .env when ready.
 */

const API_BASE = process.env.TIKTOK_API_BASE_URL || ""

export function isTikTokConfigured(): boolean {
  return !!(process.env.TIKTOK_API_KEY && API_BASE)
}

export async function getTikTokProfile(username: string): Promise<TikTokProfileStats | null> {
  if (!isTikTokConfigured()) return null

  try {
    const res = await fetch(`${API_BASE}/user/info?username=${encodeURIComponent(username)}`, {
      headers: {
        "Authorization": `Bearer ${process.env.TIKTOK_API_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null
    const data = await res.json()

    const user = data.user || data.userInfo?.user || {}
    const stats = data.stats || data.userInfo?.stats || {}

    const profile: TikTokProfile = {
      id: user.id || "",
      username: user.uniqueId || username,
      displayName: user.nickname || "",
      avatarUrl: user.avatarLarger || user.avatarMedium || "",
      bio: user.signature || "",
      followersCount: stats.followerCount || 0,
      followingCount: stats.followingCount || 0,
      likesCount: stats.heartCount || stats.heart || 0,
      videoCount: stats.videoCount || 0,
      isVerified: user.verified || false,
    }

    return {
      profile,
      recentVideos: [],
      avgViews: 0,
      avgLikes: 0,
      avgComments: 0,
      engagementRate: 0,
    }
  } catch (error) {
    console.error("TikTok API error:", error)
    return null
  }
}

export async function searchTikTokUsers(query: string): Promise<TikTokProfile[]> {
  if (!isTikTokConfigured()) return []

  try {
    const res = await fetch(`${API_BASE}/user/search?query=${encodeURIComponent(query)}`, {
      headers: {
        "Authorization": `Bearer ${process.env.TIKTOK_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) return []
    const data = await res.json()

    return (data.users || data.user_list || []).map((u: any) => ({
      id: u.id || "",
      username: u.uniqueId || u.unique_id || "",
      displayName: u.nickname || "",
      avatarUrl: u.avatarLarger || u.avatar_larger || "",
      bio: u.signature || "",
      followersCount: u.followerCount || u.follower_count || 0,
      followingCount: u.followingCount || u.following_count || 0,
      likesCount: u.heartCount || u.likes_count || 0,
      videoCount: u.videoCount || u.video_count || 0,
      isVerified: u.verified || false,
    }))
  } catch {
    return []
  }
}
