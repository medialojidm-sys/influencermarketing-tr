import { searchChannels, getChannelByUsername, getChannelStats, type YouTubeChannelStats } from "./youtube"
import { getBusinessDiscovery, isInstagramConfigured, type InstagramProfileStats } from "./instagram"
import { getTikTokProfile, searchTikTokUsers, isTikTokConfigured, type TikTokProfileStats } from "./tiktok"
import { getCachedProfile, setCachedProfile } from "./cache"
import type { Platform } from "@/types"

export interface SocialSearchResult {
  platform: Platform
  id: string
  username: string
  displayName: string
  avatarUrl: string
  followers: number
  description: string
  isVerified: boolean
}

export interface SocialProfileResult {
  platform: Platform
  username: string
  displayName: string
  avatarUrl: string
  bio: string
  followers: number
  following: number
  posts: number
  engagementRate: number
  avgLikes: number
  avgComments: number
  avgViews: number
  isVerified: boolean
  country?: string
  profileUrl: string
  raw: YouTubeChannelStats | InstagramProfileStats | TikTokProfileStats | null
}

export async function searchSocial(query: string, platform?: Platform): Promise<SocialSearchResult[]> {
  const results: SocialSearchResult[] = []
  const errors: string[] = []

  const platforms = platform ? [platform] : (["youtube", "instagram", "tiktok"] as Platform[])

  const tasks = platforms.map(async (p) => {
    try {
      switch (p) {
        case "youtube": {
          if (!process.env.YOUTUBE_API_KEY) return
          const channels = await searchChannels(query, 5)
          for (const ch of channels) {
            results.push({
              platform: "youtube",
              id: ch.id,
              username: ch.customUrl || ch.title,
              displayName: ch.title,
              avatarUrl: ch.thumbnailUrl,
              followers: ch.subscriberCount,
              description: ch.description.slice(0, 150),
              isVerified: false,
            })
          }
          break
        }
        case "instagram": {
          if (!isInstagramConfigured()) return
          const igProfile = await getBusinessDiscovery(query)
          if (igProfile) {
            results.push({
              platform: "instagram",
              id: igProfile.profile.id,
              username: igProfile.profile.username,
              displayName: igProfile.profile.name,
              avatarUrl: igProfile.profile.profilePictureUrl,
              followers: igProfile.profile.followersCount,
              description: igProfile.profile.biography.slice(0, 150),
              isVerified: igProfile.profile.isVerified,
            })
          }
          break
        }
        case "tiktok": {
          if (!isTikTokConfigured()) return
          const ttUsers = await searchTikTokUsers(query)
          for (const u of ttUsers.slice(0, 5)) {
            results.push({
              platform: "tiktok",
              id: u.id,
              username: u.username,
              displayName: u.displayName,
              avatarUrl: u.avatarUrl,
              followers: u.followersCount,
              description: u.bio.slice(0, 150),
              isVerified: u.isVerified,
            })
          }
          break
        }
      }
    } catch (error) {
      errors.push(`${p}: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  })

  await Promise.allSettled(tasks)
  if (errors.length) console.error("Social search errors:", errors)

  return results.sort((a, b) => b.followers - a.followers)
}

export async function getProfile(platform: Platform, username: string): Promise<SocialProfileResult | null> {
  const cacheKey = `${platform}:${username}`
  const cached = await getCachedProfile<SocialProfileResult>(platform, username)
  if (cached) return cached

  let result: SocialProfileResult | null = null

  switch (platform) {
    case "youtube": {
      if (!process.env.YOUTUBE_API_KEY) return null
      const stats = await getChannelStats(username)
      if (!stats) {
        const channel = await getChannelByUsername(username)
        if (!channel) return null
        const fullStats = await getChannelStats(channel.id)
        if (!fullStats) return null
        result = mapYouTubeToProfile(fullStats)
      } else {
        result = mapYouTubeToProfile(stats)
      }
      break
    }
    case "instagram": {
      if (!isInstagramConfigured()) return null
      const igData = await getBusinessDiscovery(username)
      if (!igData) return null
      result = mapInstagramToProfile(igData)
      break
    }
    case "tiktok": {
      if (!isTikTokConfigured()) return null
      const ttData = await getTikTokProfile(username)
      if (!ttData) return null
      result = mapTikTokToProfile(ttData)
      break
    }
  }

  if (result) {
    await setCachedProfile(platform, username, result)
  }

  return result
}

export function getConfiguredPlatforms(): { platform: Platform; configured: boolean }[] {
  return [
    { platform: "youtube", configured: !!process.env.YOUTUBE_API_KEY },
    { platform: "instagram", configured: isInstagramConfigured() },
    { platform: "tiktok", configured: isTikTokConfigured() },
  ]
}

function mapYouTubeToProfile(stats: YouTubeChannelStats): SocialProfileResult {
  return {
    platform: "youtube",
    username: stats.channel.customUrl || stats.channel.title,
    displayName: stats.channel.title,
    avatarUrl: stats.channel.thumbnailUrl,
    bio: stats.channel.description.slice(0, 300),
    followers: stats.channel.subscriberCount,
    following: 0,
    posts: stats.channel.videoCount,
    engagementRate: stats.engagementRate,
    avgLikes: stats.avgLikes,
    avgComments: stats.avgComments,
    avgViews: stats.avgViews,
    isVerified: false,
    country: stats.channel.country,
    profileUrl: `https://youtube.com/${stats.channel.customUrl || `channel/${stats.channel.id}`}`,
    raw: stats,
  }
}

function mapInstagramToProfile(data: InstagramProfileStats): SocialProfileResult {
  return {
    platform: "instagram",
    username: data.profile.username,
    displayName: data.profile.name,
    avatarUrl: data.profile.profilePictureUrl,
    bio: data.profile.biography,
    followers: data.profile.followersCount,
    following: data.profile.followsCount,
    posts: data.profile.mediaCount,
    engagementRate: data.engagementRate,
    avgLikes: data.avgLikes,
    avgComments: data.avgComments,
    avgViews: 0,
    isVerified: data.profile.isVerified,
    profileUrl: `https://instagram.com/${data.profile.username}`,
    raw: data,
  }
}

function mapTikTokToProfile(data: TikTokProfileStats): SocialProfileResult {
  return {
    platform: "tiktok",
    username: data.profile.username,
    displayName: data.profile.displayName,
    avatarUrl: data.profile.avatarUrl,
    bio: data.profile.bio,
    followers: data.profile.followersCount,
    following: data.profile.followingCount,
    posts: data.profile.videoCount,
    engagementRate: data.engagementRate,
    avgLikes: data.avgLikes,
    avgComments: data.avgComments,
    avgViews: data.avgViews,
    isVerified: data.profile.isVerified,
    profileUrl: `https://tiktok.com/@${data.profile.username}`,
    raw: data,
  }
}
