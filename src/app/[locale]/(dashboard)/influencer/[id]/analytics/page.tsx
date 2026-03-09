"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts"
import { getInfluencerById, getEngagementHistory, getGrowthData } from "@/lib/mock-data"
import { formatNumber, formatPercentage, getEngagementColor, getScoreColor } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ChevronRight,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  BarChart2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const PIE_COLORS = ["#E1306C", "#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function InfluencerAnalyticsPage() {
  const params = useParams()
  const id = params?.id as string
  const t = useTranslations("influencer")
  const tPlatforms = useTranslations("platforms")
  const tCategories = useTranslations("categories")
  const tCountries = useTranslations("countries")

  const influencer = getInfluencerById(id)
  const engagementHistory = getEngagementHistory(id)
  const growthData = getGrowthData(id)
  const latestAudience = growthData[growthData.length - 1]

  if (!influencer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-semibold text-muted-foreground">Analytics - 404</h2>
        <p className="text-muted-foreground">Influencer not found.</p>
        <Button asChild variant="outline">
          <Link href="/discover">Discover →</Link>
        </Button>
      </div>
    )
  }

  const growthChartData = growthData.map((d) => ({
    month: new Date(d.date).toLocaleDateString("default", { month: "short" }),
    followers: d.followers,
  }))

  const firstMonthFollowers = growthData[0]?.followers ?? 0
  const lastMonthFollowers = growthData[growthData.length - 1]?.followers ?? 0
  const growthRate = firstMonthFollowers > 0
    ? ((lastMonthFollowers - firstMonthFollowers) / firstMonthFollowers) * 100
    : 0
  const projectedFollowers = Math.floor(lastMonthFollowers * (1 + growthRate / 100))

  const engagementTrendData = engagementHistory.map((e) => ({
    month: new Date(e.date).toLocaleDateString("default", { month: "short" }),
    engagement: e.engagementRate,
  }))

  const likesCommentsData = engagementHistory.map((e, i) => ({
    month: new Date(e.date).toLocaleDateString("default", { month: "short" }),
    likes: e.likes,
    comments: e.comments,
  }))

  const reachImpressionsData = engagementHistory.map((e) => ({
    month: new Date(e.date).toLocaleDateString("default", { month: "short" }),
    reach: e.reach,
    impressions: e.impressions,
  }))

  const ageData = latestAudience?.ageData ?? [
    { range: "13-17", percentage: 8 },
    { range: "18-24", percentage: 35 },
    { range: "25-34", percentage: 32 },
    { range: "35-44", percentage: 15 },
    { range: "45-54", percentage: 7 },
    { range: "55+", percentage: 3 },
  ]

  const genderData = latestAudience?.genderData?.map((g) => ({
    name: g.type.charAt(0).toUpperCase() + g.type.slice(1),
    value: g.percentage,
  })) ?? [{ name: "Female", value: 60 }, { name: "Male", value: 40 }]

  const locationData = (latestAudience?.locationData ?? []).slice(0, 6).map((l) => ({
    name: tCountries(l.country as "TR" | "US" | "GB" | "DE" | "FR" | "IT" | "ES" | "BR" | "IN" | "JP") ?? l.country,
    value: l.percentage,
  }))

  const interestRadarData = (latestAudience?.interestData ?? [
    { name: "Fashion", percentage: 28 },
    { name: "Beauty", percentage: 24 },
    { name: "Travel", percentage: 18 },
    { name: "Food", percentage: 15 },
    { name: "Fitness", percentage: 10 },
    { name: "Tech", percentage: 5 },
  ]).map((i) => ({ subject: i.name, value: i.percentage, fullMark: 100 }))

  const fakeFollowersPct = influencer.fraudScore
  const engagementAuthenticity = 100 - influencer.fraudScore
  const audienceQuality = influencer.qualityScore
  const suspiciousActivity = influencer.fraudScore > 15

  const contentTypes = [
    { type: "Reels/Short-form", percentage: 45 },
    { type: "Stories", percentage: 30 },
    { type: "Posts", percentage: 15 },
    { type: "Livestream", percentage: 10 },
  ]

  const postingFrequency = [
    { day: "Mon", posts: 12 },
    { day: "Tue", posts: 8 },
    { day: "Wed", posts: 15 },
    { day: "Thu", posts: 10 },
    { day: "Fri", posts: 18 },
    { day: "Sat", posts: 22 },
    { day: "Sun", posts: 14 },
  ]

  const bestTimes = [
    [2, 5, 8, 12, 15, 18],
    [1, 4, 9, 11, 14, 20],
    [3, 6, 10, 13, 16, 19],
    [2, 5, 8, 12, 15, 18],
    [1, 4, 7, 11, 14, 21],
    [3, 6, 9, 12, 17, 20],
    [2, 5, 8, 11, 15, 19],
  ]

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1 text-sm text-muted-foreground">
              <Link href="/discover" className="hover:text-foreground">Discover</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/influencer/${id}`} className="hover:text-foreground">{influencer.name}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{t("analytics")}</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={influencer.avatar} alt={influencer.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {influencer.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{influencer.name}</p>
                <p className="text-xs text-muted-foreground">{formatNumber(influencer.totalReach)} reach</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 12 months
            </Button>
          </div>
        </div>

        {/* Growth Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {t("growthChart")}
              </CardTitle>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Growth Rate</p>
                  <p className={cn("font-bold", growthRate >= 0 ? "text-green-500" : "text-red-500")}>
                    {formatPercentage(growthRate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Projected</p>
                  <p className="font-bold">{formatNumber(projectedFollowers)}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthChartData}>
                  <defs>
                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => formatNumber(Number(v))} />
                  <RechartsTooltip formatter={(v: unknown) => [formatNumber(Number(v)), "Followers"]} />
                  <Area type="monotone" dataKey="followers" stroke="#6366f1" fillOpacity={1} fill="url(#colorFollowers)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Deep Dive */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("engagementTrend")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(v) => `${v}%`} />
                    <RechartsTooltip formatter={(v: unknown) => [formatPercentage(Number(v)), "Engagement"]} />
                    <Line type="monotone" dataKey="engagement" stroke="#E1306C" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Likes vs Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={likesCommentsData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(v) => formatNumber(Number(v))} />
                    <RechartsTooltip formatter={(v: unknown) => [formatNumber(Number(v)), ""]} />
                    <Legend />
                    <Bar dataKey="likes" fill="#E1306C" radius={[4, 4, 0, 0]} name="Likes" />
                    <Bar dataKey="comments" fill="#6366f1" radius={[4, 4, 0, 0]} name="Comments" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reach & Impressions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reachImpressionsData}>
                  <defs>
                    <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => formatNumber(Number(v))} />
                  <RechartsTooltip formatter={(v: unknown) => [formatNumber(Number(v)), ""]} />
                  <Legend />
                  <Area type="monotone" dataKey="reach" stroke="#22c55e" fill="url(#colorReach)" strokeWidth={2} name="Reach" />
                  <Area type="monotone" dataKey="impressions" stroke="#8b5cf6" fill="url(#colorImpressions)" strokeWidth={2} name="Impressions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Audience Demographics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("audienceAge")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" tickFormatter={(v) => `${v}%`} />
                    <YAxis type="category" dataKey="range" width={50} />
                    <RechartsTooltip formatter={(v: unknown) => `${v}%`} />
                    <Bar dataKey="percentage" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
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
                      innerRadius={50}
                      outerRadius={80}
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
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("audienceLocation")} (Top 6)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationData} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" tickFormatter={(v) => `${v}%`} />
                    <YAxis type="category" dataKey="name" width={70} />
                    <RechartsTooltip formatter={(v: unknown) => `${v}%`} />
                    <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
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
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={interestRadarData}>
                    <PolarGrid stroke="hsl(var(--muted-foreground))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--foreground))" }} />
                    <PolarRadiusAxis angle={30} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Radar name="Interest" dataKey="value" stroke="#E1306C" fill="#E1306C" fillOpacity={0.4} />
                    <RechartsTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fraud Detection Section */}
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Fraud & Trust Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold",
                  "ring-4 ring-offset-2",
                  influencer.qualityScore >= 80 ? "bg-green-500/20 ring-green-500/50 text-green-600 dark:text-green-400" :
                  influencer.qualityScore >= 60 ? "bg-yellow-500/20 ring-yellow-500/50 text-yellow-600 dark:text-yellow-400" :
                  "bg-red-500/20 ring-red-500/50 text-red-600 dark:text-red-400"
                )}>
                  {influencer.qualityScore}
                </div>
                <p className="text-sm font-medium mt-2">Overall Trust Score</p>
              </div>
              <div className="flex-1 min-w-[200px] space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fake Followers Risk</span>
                    <span className={fakeFollowersPct <= 10 ? "text-green-500" : fakeFollowersPct <= 20 ? "text-yellow-500" : "text-red-500"}>
                      {fakeFollowersPct}%
                    </span>
                  </div>
                  <Progress
                    value={fakeFollowersPct}
                    className={cn(
                      "h-3",
                      fakeFollowersPct <= 10 ? "[&_[role=progressbar]]:bg-green-500" :
                      fakeFollowersPct <= 20 ? "[&_[role=progressbar]]:bg-yellow-500" : "[&_[role=progressbar]]:bg-red-500"
                    )}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Engagement Authenticity</span>
                    <span className={engagementAuthenticity >= 80 ? "text-green-500" : engagementAuthenticity >= 60 ? "text-yellow-500" : "text-red-500"}>
                      {engagementAuthenticity}%
                    </span>
                  </div>
                  <Progress
                    value={engagementAuthenticity}
                    className={cn(
                      "h-3",
                      engagementAuthenticity >= 80 ? "[&_[role=progressbar]]:bg-green-500" :
                      engagementAuthenticity >= 60 ? "[&_[role=progressbar]]:bg-yellow-500" : "[&_[role=progressbar]]:bg-red-500"
                    )}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Audience Quality</span>
                    <span className={getScoreColor(audienceQuality)}>{audienceQuality}</span>
                  </div>
                  <Progress value={audienceQuality} className="h-3" />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  {suspiciousActivity ? (
                    <>
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <span className="text-sm text-amber-600 dark:text-amber-400">Suspicious activity detected</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-green-600 dark:text-green-400">No suspicious activity</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Performance */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                Best Content Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentTypes.map((ct, i) => (
                  <div key={ct.type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{ct.type}</span>
                      <span className="font-medium">{ct.percentage}%</span>
                    </div>
                    <Progress value={ct.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Posting Frequency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={postingFrequency}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="posts" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Best Posting Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, row) => (
                  <div key={day} className="flex gap-0.5">
                    <span className="text-xs w-8 shrink-0 text-muted-foreground">{day}</span>
                    <div className="flex flex-1 gap-0.5">
                      {Array.from({ length: 24 }, (_, col) => (
                        <Tooltip key={col}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "flex-1 min-w-0 h-4 rounded-sm transition-colors cursor-default",
                                bestTimes[row]?.includes(col)
                                  ? "bg-primary"
                                  : "bg-muted hover:bg-muted/80"
                              )}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            {day} {col}:00 - {bestTimes[row]?.includes(col) ? "Peak time" : "Low activity"}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">Hours 0-23 • Dark = best time</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
