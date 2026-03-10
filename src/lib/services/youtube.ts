const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"

function getApiKey(): string {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) throw new Error("YOUTUBE_API_KEY is not set")
  return key
}

export interface YouTubeChannel {
  id: string
  title: string
  description: string
  customUrl: string
  thumbnailUrl: string
  country?: string
  subscriberCount: number
  videoCount: number
  viewCount: number
  publishedAt: string
}

export interface YouTubeVideo {
  id: string
  title: string
  publishedAt: string
  thumbnailUrl: string
  viewCount: number
  likeCount: number
  commentCount: number
}

export interface YouTubeChannelStats {
  channel: YouTubeChannel
  recentVideos: YouTubeVideo[]
  avgViews: number
  avgLikes: number
  avgComments: number
  engagementRate: number
  postingFrequency: number
}

async function youtubeGet<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${YOUTUBE_API_BASE}/${endpoint}`)
  url.searchParams.set("key", getApiKey())
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) {
    const error = await res.text()
    throw new Error(`YouTube API error (${res.status}): ${error}`)
  }
  return res.json()
}

export async function searchChannels(query: string, maxResults = 10): Promise<YouTubeChannel[]> {
  const searchData = await youtubeGet<any>("search", {
    part: "snippet",
    q: query,
    type: "channel",
    maxResults: String(maxResults),
  })

  if (!searchData.items?.length) return []

  const channelIds = searchData.items.map((item: any) => item.snippet.channelId || item.id.channelId).join(",")

  const channelsData = await youtubeGet<any>("channels", {
    part: "snippet,statistics,brandingSettings",
    id: channelIds,
  })

  return (channelsData.items || []).map(mapChannel)
}

export async function getChannelByUsername(username: string): Promise<YouTubeChannel | null> {
  let data = await youtubeGet<any>("channels", {
    part: "snippet,statistics,brandingSettings",
    forHandle: username.startsWith("@") ? username : `@${username}`,
  })

  if (!data.items?.length) {
    data = await youtubeGet<any>("search", {
      part: "snippet",
      q: username,
      type: "channel",
      maxResults: "1",
    })

    if (!data.items?.length) return null

    const channelId = data.items[0].snippet?.channelId || data.items[0].id?.channelId
    if (!channelId) return null

    data = await youtubeGet<any>("channels", {
      part: "snippet,statistics,brandingSettings",
      id: channelId,
    })
  }

  if (!data.items?.length) return null
  return mapChannel(data.items[0])
}

export async function getChannelStats(channelId: string): Promise<YouTubeChannelStats | null> {
  const [channelData, videosData] = await Promise.all([
    youtubeGet<any>("channels", {
      part: "snippet,statistics,brandingSettings",
      id: channelId,
    }),
    youtubeGet<any>("search", {
      part: "snippet",
      channelId,
      type: "video",
      order: "date",
      maxResults: "20",
    }),
  ])

  if (!channelData.items?.length) return null

  const channel = mapChannel(channelData.items[0])
  const videoIds = (videosData.items || [])
    .map((v: any) => v.id?.videoId)
    .filter(Boolean)
    .join(",")

  let recentVideos: YouTubeVideo[] = []
  if (videoIds) {
    const videoStatsData = await youtubeGet<any>("videos", {
      part: "snippet,statistics",
      id: videoIds,
    })
    recentVideos = (videoStatsData.items || []).map(mapVideo)
  }

  const { avgViews, avgLikes, avgComments, engagementRate, postingFrequency } =
    calculateMetrics(recentVideos, channel.subscriberCount)

  return {
    channel,
    recentVideos,
    avgViews,
    avgLikes,
    avgComments,
    engagementRate,
    postingFrequency,
  }
}

export async function getVideoStats(videoIds: string[]): Promise<YouTubeVideo[]> {
  if (videoIds.length === 0) return []

  const data = await youtubeGet<any>("videos", {
    part: "snippet,statistics",
    id: videoIds.join(","),
  })

  return (data.items || []).map(mapVideo)
}

function mapChannel(item: any): YouTubeChannel {
  const stats = item.statistics || {}
  const snippet = item.snippet || {}
  return {
    id: item.id,
    title: snippet.title || "",
    description: snippet.description || "",
    customUrl: snippet.customUrl || "",
    thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || "",
    country: snippet.country || item.brandingSettings?.channel?.country,
    subscriberCount: parseInt(stats.subscriberCount || "0", 10),
    videoCount: parseInt(stats.videoCount || "0", 10),
    viewCount: parseInt(stats.viewCount || "0", 10),
    publishedAt: snippet.publishedAt || "",
  }
}

function mapVideo(item: any): YouTubeVideo {
  const stats = item.statistics || {}
  const snippet = item.snippet || {}
  return {
    id: item.id,
    title: snippet.title || "",
    publishedAt: snippet.publishedAt || "",
    thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || "",
    viewCount: parseInt(stats.viewCount || "0", 10),
    likeCount: parseInt(stats.likeCount || "0", 10),
    commentCount: parseInt(stats.commentCount || "0", 10),
  }
}

function calculateMetrics(videos: YouTubeVideo[], subscribers: number) {
  if (videos.length === 0) {
    return { avgViews: 0, avgLikes: 0, avgComments: 0, engagementRate: 0, postingFrequency: 0 }
  }

  const totalViews = videos.reduce((s, v) => s + v.viewCount, 0)
  const totalLikes = videos.reduce((s, v) => s + v.likeCount, 0)
  const totalComments = videos.reduce((s, v) => s + v.commentCount, 0)

  const avgViews = Math.round(totalViews / videos.length)
  const avgLikes = Math.round(totalLikes / videos.length)
  const avgComments = Math.round(totalComments / videos.length)

  const engagementRate = subscribers > 0
    ? parseFloat((((avgLikes + avgComments) / subscribers) * 100).toFixed(2))
    : 0

  let postingFrequency = 0
  if (videos.length >= 2) {
    const dates = videos.map((v) => new Date(v.publishedAt).getTime()).sort((a, b) => b - a)
    const spanDays = (dates[0] - dates[dates.length - 1]) / (1000 * 60 * 60 * 24)
    postingFrequency = spanDays > 0 ? parseFloat((videos.length / (spanDays / 30)).toFixed(1)) : 0
  }

  return { avgViews, avgLikes, avgComments, engagementRate, postingFrequency }
}
