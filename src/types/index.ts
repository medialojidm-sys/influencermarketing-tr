export interface Influencer {
  id: string
  name: string
  bio?: string
  avatar?: string
  email?: string
  website?: string
  country?: string
  city?: string
  language?: string
  categories: string[]
  qualityScore: number
  fraudScore: number
  isVerified: boolean
  totalReach: number
  createdAt: string
  updatedAt: string
  socialAccounts: SocialAccount[]
  audienceData?: AudienceData[]
  engagementMetrics?: EngagementMetric[]
}

export interface SocialAccount {
  id: string
  platform: Platform
  username: string
  profileUrl?: string
  followers: number
  following: number
  posts: number
  engagementRate: number
  avgLikes: number
  avgComments: number
  avgViews: number
  audienceDemographics?: AudienceDemographics
  isVerified: boolean
  lastSynced?: string
}

export type Platform = "instagram" | "youtube" | "tiktok" | "twitter"

export interface AudienceDemographics {
  age: { range: string; percentage: number }[]
  gender: { type: string; percentage: number }[]
  locations: { country: string; percentage: number }[]
  interests: { name: string; percentage: number }[]
}

export interface AudienceData {
  id: string
  platform: string
  date: string
  followers: number
  ageData?: { range: string; percentage: number }[]
  genderData?: { type: string; percentage: number }[]
  locationData?: { country: string; percentage: number }[]
  interestData?: { name: string; percentage: number }[]
}

export interface EngagementMetric {
  id: string
  platform: string
  date: string
  engagementRate: number
  likes: number
  comments: number
  shares: number
  views: number
  reach: number
  impressions: number
}

export interface Campaign {
  id: string
  name: string
  description?: string
  status: "draft" | "active" | "paused" | "completed"
  platform?: string
  budget?: number
  spent: number
  startDate?: string
  endDate?: string
  goals?: CampaignGoals
  results?: CampaignResults
  createdAt: string
  updatedAt: string
  influencers?: CampaignInfluencer[]
}

export interface CampaignGoals {
  reach?: number
  engagement?: number
  conversions?: number
  impressions?: number
}

export interface CampaignResults {
  totalReach: number
  totalEngagement: number
  totalImpressions: number
  totalClicks: number
  totalConversions: number
  roi: number
}

export interface CampaignInfluencer {
  id: string
  status: "invited" | "accepted" | "declined" | "completed"
  fee?: number
  notes?: string
  influencer: Influencer
}

export interface InfluencerList {
  id: string
  name: string
  description?: string
  createdAt: string
  items: InfluencerListItem[]
}

export interface InfluencerListItem {
  id: string
  notes?: string
  tags?: string[]
  influencer: Influencer
}

export interface User {
  id: string
  email: string
  name?: string
  company?: string
  image?: string
  role: "user" | "admin"
  plan: "free" | "starter" | "professional" | "enterprise"
}

export interface Subscription {
  id: string
  plan: string
  status: "active" | "cancelled" | "expired"
  startDate: string
  endDate?: string
}

export interface DashboardStats {
  totalInfluencers: number
  totalCampaigns: number
  activeCampaigns: number
  totalReach: number
  avgEngagement: number
  totalBudget: number
  totalSpent: number
  roi: number
}

export interface FilterOptions {
  platform?: Platform
  country?: string
  category?: string
  minFollowers?: number
  maxFollowers?: number
  minEngagement?: number
  maxEngagement?: number
  minQualityScore?: number
  isVerified?: boolean
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
