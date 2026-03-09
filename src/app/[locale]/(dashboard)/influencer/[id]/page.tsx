"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts"
import { getInfluencerById, getInfluencers, getEngagementHistory, getGrowthData } from "@/lib/mock-data"
import { formatNumber, formatPercentage, getEngagementColor, getScoreColor, getPlatformColor, platformChartColors } from "@/lib/utils"
import type { SocialAccount } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  CheckCircle,
  MapPin,
  Megaphone,
  ListPlus,
  GitCompare,
  Instagram,
  Youtube,
  Users,
  TrendingUp,
  BarChart3,
  BarChart2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88 2.2V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  twitter: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
}

const countryFlags: Record<string, string> = {
  TR: "🇹🇷", US: "🇺🇸", GB: "🇬🇧", DE: "🇩🇪", FR: "🇫🇷", IT: "🇮🇹", ES: "🇪🇸", BR: "🇧🇷", IN: "🇮🇳", JP: "🇯🇵",
}

export default function InfluencerProfilePage() {
  const params = useParams()
  const id = params?.id as string
  const t = useTranslations("influencer")
  const tPlatforms = useTranslations("platforms")
  const tCategories = useTranslations("categories")
  const tCountries = useTranslations("countries")

  const influencer = getInfluencerById(id)

  if (!influencer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-semibold text-muted-foreground">{t("profile")} - 404</h2>
        <p className="text-muted-foreground">Influencer not found.</p>
        <Button asChild variant="outline">
          <Link href="/discover">Discover →</Link>
        </Button>
      </div>
    )
  }

  const totalFollowers = influencer.socialAccounts.reduce((sum, sa) => sum + sa.followers, 0)
  const avgEngagement =
    influencer.socialAccounts.length > 0
      ? influencer.socialAccounts.reduce((s, sa) => s + sa.engagementRate, 0) / influencer.socialAccounts.length
      : 0

  const engagementHistory = getEngagementHistory(id)
  const growthData = getGrowthData(id)
  const latestAudience = growthData[growthData.length - 1]

  const similarInfluencers = getInfluencers()
    .filter((inf) => inf.id !== id && inf.categories.some((c) => influencer.categories.includes(c)))
    .slice(0, 4)

  const engagementChartData = engagementHistory.map((e) => ({
    month: new Date(e.date).toLocaleDateString("default", { month: "short" }),
    engagement: e.engagementRate,
  }))

  const genderData = latestAudience?.genderData?.map((g) => ({
    name: g.type.charAt(0).toUpperCase() + g.type.slice(1),
    value: g.percentage,
  })) ?? [{ name: "Female", value: 60 }, { name: "Male", value: 40 }]

  const locationData = latestAudience?.locationData?.map((l) => ({
    name: tCountries(l.country as "TR" | "US" | "GB" | "DE" | "FR" | "IT" | "ES" | "BR" | "IN" | "JP") ?? l.country,
    value: l.percentage,
  })) ?? []

  const ageData = latestAudience?.ageData ?? [
    { range: "13-17", percentage: 8 },
    { range: "18-24", percentage: 35 },
    { range: "25-34", percentage: 32 },
    { range: "35-44", percentage: 15 },
    { range: "45-54", percentage: 7 },
    { range: "55+", percentage: 3 },
  ]

  const topInterests = latestAudience?.interestData?.slice(0, 5) ?? []

  const PIE_COLORS = ["#E1306C", "#6366f1", "#22c55e", "#f59e0b", "#ef4444"]

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-background shadow-xl">
                    <AvatarImage src={influencer.avatar} alt={influencer.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                      {influencer.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {influencer.isVerified && (
                    <span className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1">
                      <CheckCircle className="h-6 w-6 text-primary-foreground" />
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    {influencer.name}
                    {influencer.isVerified && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CheckCircle className="h-6 w-6 text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>{t("verified")}</TooltipContent>
                      </Tooltip>
                    )}
                  </h1>
                  {(influencer.city || influencer.country) && (
                    <p className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {[influencer.city, influencer.country].filter(Boolean).join(", ")}
                    </p>
                  )}
                  {influencer.bio && (
                    <p className="text-sm text-muted-foreground max-w-xl">{influencer.bio}</p>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {influencer.categories.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {tCategories(cat as keyof typeof tCategories)}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    <Button asChild size="sm">
                      <Link href="/campaigns">
                        <Megaphone className="h-4 w-4 mr-2" />
                        {t("addToCampaign")}
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <ListPlus className="h-4 w-4 mr-2" />
                      {t("addToList")}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/compare">
                        <GitCompare className="h-4 w-4 mr-2" />
                        {t("compare")}
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/influencer/${id}/analytics`}>
                        <BarChart2 className="h-4 w-4 mr-2" />
                        {t("analytics")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex lg:flex-col gap-6 lg:ml-auto lg:items-end">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "relative w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold",
                    "bg-gradient-to-br from-primary/20 to-primary/5"
                  )}>
                    <span className={getScoreColor(influencer.qualityScore)}>{influencer.qualityScore}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t("qualityScore")}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "relative w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold",
                    "bg-gradient-to-br from-green-500/20 to-green-500/5"
                  )}>
                    <span className={influencer.fraudScore <= 10 ? "text-green-500" : influencer.fraudScore <= 20 ? "text-yellow-500" : "text-red-500"}>
                      {100 - influencer.fraudScore}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t("fraudScore")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span className="text-sm">{t("followers")}</span>
              </div>
              <p className="text-2xl font-bold mt-1">{formatNumber(totalFollowers)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">{t("engagementRate")}</span>
              </div>
              <p className={cn("text-2xl font-bold mt-1", getEngagementColor(avgEngagement))}>
                {avgEngagement.toFixed(1)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm">Total Reach</span>
              </div>
              <p className="text-2xl font-bold mt-1">{formatNumber(influencer.totalReach)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">Platforms</span>
              </div>
              <p className="text-2xl font-bold mt-1">{influencer.socialAccounts.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Social Accounts Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t("socialAccounts")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={influencer.socialAccounts[0]?.platform ?? "instagram"}>
              <TabsList className="flex-wrap h-auto gap-1">
                {influencer.socialAccounts.map((acc) => {
                  const Icon = platformIcons[acc.platform]
                  return (
                    <TabsTrigger key={acc.id} value={acc.platform} className="gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      {tPlatforms(acc.platform)}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
              {influencer.socialAccounts.map((acc) => (
                <TabsContent key={acc.id} value={acc.platform} className="mt-6">
                  <SocialAccountTab account={acc} t={t} tPlatforms={tPlatforms} />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Audience Overview */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("audienceGender")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {genderData.map((_, index) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(v: unknown) => formatPercentage(Number(v))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("audienceLocation")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationData} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" tickFormatter={(v) => `${v}%`} />
                    <YAxis type="category" dataKey="name" width={60} />
                    <RechartsTooltip formatter={(v: unknown) => `${v}%`} />
                    <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("audienceAge")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData} margin={{ top: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="range" />
                    <YAxis tickFormatter={(v) => `${v}%`} />
                    <RechartsTooltip formatter={(v: unknown) => `${v}%`} />
                    <Bar dataKey="percentage" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("audienceInterests")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topInterests.map((interest, i) => (
                  <div key={interest.name} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-28 truncate">{interest.name}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${interest.percentage}%`,
                          backgroundColor: PIE_COLORS[i % PIE_COLORS.length],
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-10">{interest.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Trend */}
        <Card>
          <CardHeader>
            <CardTitle>{t("engagementTrend")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => `${v}%`} />
                  <RechartsTooltip formatter={(v: unknown) => [formatPercentage(Number(v)), "Engagement"]} />
                  <Legend />
                  <Line type="monotone" dataKey="engagement" stroke="#E1306C" strokeWidth={2} dot={{ r: 4 }} name="Engagement %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Similar Influencers */}
        <Card>
          <CardHeader>
            <CardTitle>{t("similar")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarInfluencers.map((sim) => (
                <Link key={sim.id} href={`/influencer/${sim.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={sim.avatar} alt={sim.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {sim.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{sim.name}</p>
                          <p className="text-xs text-muted-foreground">{formatNumber(sim.totalReach)} reach</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {sim.categories.slice(0, 2).map((c) => (
                          <Badge key={c} variant="secondary" className="text-xs">
                            {tCategories(c as keyof typeof tCategories)}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

function SocialAccountTab({
  account,
  t,
  tPlatforms,
}: {
  account: SocialAccount
  t: ReturnType<typeof useTranslations>
  tPlatforms: ReturnType<typeof useTranslations>
}) {
  const Icon = platformIcons[account.platform]
  const color = platformChartColors[account.platform] ?? "#6366f1"

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg text-white", getPlatformColor(account.platform), account.platform === "tiktok" && "dark:bg-white dark:text-black")}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <div>
          <p className="font-medium">@{account.username}</p>
          {account.profileUrl && (
            <a
              href={account.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              View Profile →
            </a>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t("followers")}</p>
          <p className="font-semibold">{formatNumber(account.followers)}</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t("following")}</p>
          <p className="font-semibold">{formatNumber(account.following)}</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t("posts")}</p>
          <p className="font-semibold">{formatNumber(account.posts)}</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t("engagementRate")}</p>
          <p className={cn("font-semibold", getEngagementColor(account.engagementRate))}>
            {formatPercentage(account.engagementRate)}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t("avgLikes")}</p>
          <p className="font-semibold">{formatNumber(account.avgLikes)}</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t("avgComments")}</p>
          <p className="font-semibold">{formatNumber(account.avgComments)}</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">{t("avgViews")}</p>
          <p className="font-semibold">{formatNumber(account.avgViews)}</p>
        </div>
      </div>
    </div>
  )
}
