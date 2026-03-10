const INSTAGRAM_GRAPH_API = "https://graph.facebook.com/v21.0"

export interface InstagramProfile {
  id: string
  username: string
  name: string
  biography: string
  profilePictureUrl: string
  followersCount: number
  followsCount: number
  mediaCount: number
  isVerified: boolean
  website?: string
}

export interface InstagramMedia {
  id: string
  caption?: string
  mediaType: string
  mediaUrl?: string
  permalink: string
  timestamp: string
  likeCount: number
  commentsCount: number
}

export interface InstagramProfileStats {
  profile: InstagramProfile
  recentMedia: InstagramMedia[]
  avgLikes: number
  avgComments: number
  engagementRate: number
}

function getAccessToken(): string {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) throw new Error("INSTAGRAM_ACCESS_TOKEN is not set")
  return token
}

function getBusinessAccountId(): string {
  const id = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  if (!id) throw new Error("INSTAGRAM_BUSINESS_ACCOUNT_ID is not set")
  return id
}

async function instagramGet<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${INSTAGRAM_GRAPH_API}/${endpoint}`)
  url.searchParams.set("access_token", getAccessToken())
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Instagram API error (${res.status}): ${error}`)
  }
  return res.json()
}

export async function getBusinessDiscovery(username: string): Promise<InstagramProfileStats | null> {
  try {
    const accountId = getBusinessAccountId()
    const fields = [
      "business_discovery.fields(",
      "username,name,biography,profile_picture_url,",
      "followers_count,follows_count,media_count,ig_id,",
      "media.limit(12){caption,media_type,media_url,permalink,timestamp,like_count,comments_count}",
      ")",
    ].join("")

    const data = await instagramGet<any>(`${accountId}`, {
      fields: `${fields}`,
      "business_discovery.username": username,
    })

    const bd = data.business_discovery
    if (!bd) return null

    const profile: InstagramProfile = {
      id: bd.ig_id || bd.id || "",
      username: bd.username || username,
      name: bd.name || "",
      biography: bd.biography || "",
      profilePictureUrl: bd.profile_picture_url || "",
      followersCount: bd.followers_count || 0,
      followsCount: bd.follows_count || 0,
      mediaCount: bd.media_count || 0,
      isVerified: false,
      website: bd.website,
    }

    const recentMedia: InstagramMedia[] = (bd.media?.data || []).map((m: any) => ({
      id: m.id,
      caption: m.caption,
      mediaType: m.media_type,
      mediaUrl: m.media_url,
      permalink: m.permalink,
      timestamp: m.timestamp,
      likeCount: m.like_count || 0,
      commentsCount: m.comments_count || 0,
    }))

    const totalLikes = recentMedia.reduce((s, m) => s + m.likeCount, 0)
    const totalComments = recentMedia.reduce((s, m) => s + m.commentsCount, 0)
    const count = recentMedia.length || 1

    const avgLikes = Math.round(totalLikes / count)
    const avgComments = Math.round(totalComments / count)
    const engagementRate = profile.followersCount > 0
      ? parseFloat((((avgLikes + avgComments) / profile.followersCount) * 100).toFixed(2))
      : 0

    return { profile, recentMedia, avgLikes, avgComments, engagementRate }
  } catch (error) {
    console.error("Instagram Business Discovery error:", error)
    return null
  }
}

export function isInstagramConfigured(): boolean {
  return !!(process.env.INSTAGRAM_ACCESS_TOKEN && process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID)
}
