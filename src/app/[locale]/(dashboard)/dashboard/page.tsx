"use client"

import { useTranslations } from "next-intl"
import {
  dashboardStats,
  monthlyEngagementTrend,
  platformStats,
  getInfluencers,
  getCampaigns,
} from "@/lib/mock-data"
import { formatNumber, formatCurrency, formatPercentage, getEngagementColor, getScoreColor, getPlatformColor } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import {
  Users,
  Megaphone,
  Eye,
  Heart,
  ChevronRight,
  Instagram,
  Youtube,
  Music2,
  Twitter,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer as PieResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music2,
  twitter: Twitter,
}

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
]

export default function DashboardPage() {
  const t = useTranslations("dashboard")
  const tCommon = useTranslations("common")
  const tCampaigns = useTranslations("campaigns")

  const influencers = getInfluencers()
  const campaigns = getCampaigns()

  const topInfluencers = [...influencers]
    .sort((a, b) => b.totalReach - a.totalReach)
    .slice(0, 5)

  const recentCampaigns = [...campaigns]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5)

  const statusColors: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    active: "bg-green-500/15 text-green-600 dark:text-green-400",
    paused: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
    completed: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("overview")}</h1>
        <p className="text-muted-foreground mt-1">{t("welcome")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("totalInfluencers")}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(dashboardStats.totalInfluencers)}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs font-normal">
                +12%
              </Badge>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("activeCampaigns")}
            </CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.activeCampaigns}
            </div>
            <Badge className="mt-1 bg-green-500/15 text-green-600 dark:text-green-400 hover:bg-green-500/25">
              {tCampaigns("active")}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("totalReach")}
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(dashboardStats.totalReach)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total audience reach
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("avgEngagement")}
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "text-2xl font-bold",
                getEngagementColor(dashboardStats.avgEngagement)
              )}
            >
              {formatPercentage(dashboardStats.avgEngagement)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Platform average</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("engagementTrend")}</CardTitle>
            <CardDescription>Monthly engagement by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyEngagementTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value) => [`${value != null ? `${value}%` : "-"}`, undefined]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="instagram"
                    stroke={CHART_COLORS[0]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Instagram"
                  />
                  <Line
                    type="monotone"
                    dataKey="youtube"
                    stroke={CHART_COLORS[1]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="YouTube"
                  />
                  <Line
                    type="monotone"
                    dataKey="tiktok"
                    stroke={CHART_COLORS[2]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="TikTok"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("platformDistribution")}</CardTitle>
            <CardDescription>Influencer count by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {platformStats.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [
                      `${value != null ? value : 0} influencers`,
                      undefined,
                    ]}
                  />
                </PieChart>
              </PieResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t("topInfluencers")}</CardTitle>
              <CardDescription>By total reach</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/discover">
                {tCommon("viewAll")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Followers</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topInfluencers.map((inf) => {
                  const avgEng =
                    inf.socialAccounts.length > 0
                      ? inf.socialAccounts.reduce((s, sa) => s + sa.engagementRate, 0) /
                        inf.socialAccounts.length
                      : 0
                  return (
                    <TableRow key={inf.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={inf.avatar} />
                            <AvatarFallback className="text-xs">
                              {inf.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <Link
                            href={`/influencer/${inf.id}`}
                            className="font-medium hover:underline"
                          >
                            {inf.name}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {inf.socialAccounts.slice(0, 3).map((acc) => {
                            const Icon = platformIcons[acc.platform]
                            return (
                              <Badge
                                key={acc.id}
                                variant="secondary"
                                className={cn(
                                  "text-xs px-1.5 py-0",
                                  getPlatformColor(acc.platform),
                                  acc.platform === "tiktok"
                                    ? "text-white dark:bg-white dark:text-black"
                                    : "text-white"
                                )}
                              >
                                {Icon && <Icon className="h-3 w-3" />}
                              </Badge>
                            )
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatNumber(
                          Math.max(...inf.socialAccounts.map((sa) => sa.followers))
                        )}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "font-medium",
                          getEngagementColor(avgEng)
                        )}
                      >
                        {avgEng.toFixed(1)}%
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "font-semibold",
                            getScoreColor(inf.qualityScore)
                          )}
                        >
                          {inf.qualityScore}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t("recentCampaigns")}</CardTitle>
              <CardDescription>Latest campaign activity</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/campaigns">
                {tCommon("viewAll")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => {
                const progress =
                  campaign.budget && campaign.budget > 0
                    ? Math.min(100, (campaign.spent / campaign.budget) * 100)
                    : 0
                return (
                  <div
                    key={campaign.id}
                    className="flex flex-col gap-2 p-3 rounded-lg border bg-card/50"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/campaigns/${campaign.id}`}
                        className="font-medium hover:underline"
                      >
                        {campaign.name}
                      </Link>
                      <Badge
                        className={cn(
                          "text-xs",
                          statusColors[campaign.status] ?? ""
                        )}
                      >
                        {tCampaigns(campaign.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {tCampaigns("budget")}:{" "}
                        {campaign.budget
                          ? formatCurrency(campaign.budget)
                          : "-"}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
