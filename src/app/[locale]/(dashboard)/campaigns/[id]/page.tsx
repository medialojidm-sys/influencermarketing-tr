"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import {
  getCampaignById,
  getEngagementHistory,
} from "@/lib/mock-data"
import {
  formatNumber,
  formatCurrency,
  formatPercentage,
  getEngagementColor,
  getScoreColor,
  getPlatformColor,
} from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "@/i18n/navigation"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Megaphone,
  Pencil,
  Pause,
  Play,
  Download,
  DollarSign,
  TrendingUp,
  MousePointer,
  Eye,
  Target,
  Instagram,
  Youtube,
  Music2,
  Twitter,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music2,
  twitter: Twitter,
}

const statusConfig: Record<string, { className: string }> = {
  draft: { className: "bg-muted text-muted-foreground" },
  active: { className: "bg-green-500/15 text-green-600 dark:text-green-400" },
  paused: { className: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400" },
  completed: { className: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
}

const CHART_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export default function CampaignDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const t = useTranslations("campaigns")
  const tPlatforms = useTranslations("platforms")

  const campaign = getCampaignById(id)

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-semibold text-muted-foreground">Campaign not found</h2>
        <Button asChild variant="outline">
          <Link href="/campaigns">Back to Campaigns</Link>
        </Button>
      </div>
    )
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-"
    return new Date(dateStr).toLocaleDateString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const PlatformIcon = campaign.platform ? platformIcons[campaign.platform] : null

  // Performance chart data - use engagement history from first influencer or generate
  const performanceData = campaign.influencers?.length
    ? (() => {
        const infId = campaign.influencers[0].influencer.id
        const history = getEngagementHistory(infId)
        return history.slice(-7).map((h) => ({
          date: new Date(h.date).toLocaleDateString("default", { day: "numeric", month: "short" }),
          engagement: h.engagementRate,
          reach: Math.floor(h.reach / 1000),
        }))
      })()
    : [
        { date: "Mon", engagement: 4.2, reach: 120 },
        { date: "Tue", engagement: 4.5, reach: 145 },
        { date: "Wed", engagement: 4.1, reach: 98 },
        { date: "Thu", engagement: 4.8, reach: 165 },
        { date: "Fri", engagement: 5.2, reach: 189 },
        { date: "Sat", engagement: 4.9, reach: 156 },
        { date: "Sun", engagement: 5.1, reach: 172 },
      ]

  const influencerPerformance = campaign.influencers?.map((ci, i) => ({
    name: ci.influencer.name,
    reach: campaign.results
      ? Math.floor((campaign.results.totalReach / (campaign.influencers?.length ?? 1)) * (1 + (i - 1) * 0.1))
      : Math.floor(500000 + Math.random() * 1000000),
    engagement: (ci.influencer.socialAccounts[0]?.engagementRate ?? 4) + i * 0.2,
  })) ?? []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{campaign.name}</h1>
          {campaign.description && (
            <p className="text-muted-foreground mt-1">{campaign.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className={cn(statusConfig[campaign.status]?.className ?? "")}>
              {t(campaign.status)}
            </Badge>
            {campaign.platform && (
              <Badge variant="secondary" className="gap-1">
                {PlatformIcon && <PlatformIcon className="h-3.5 w-3.5" />}
                {tPlatforms(campaign.platform as "instagram" | "youtube" | "tiktok" | "twitter")}
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">
              {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4 mr-2" />
            {t("editCampaign")}
          </Button>
          {(campaign.status === "active" || campaign.status === "paused") && (
            <Button variant="outline" size="sm">
              {campaign.status === "active" ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </>
              )}
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t("exportReport")}
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {t("budget")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {campaign.budget ? formatCurrency(campaign.budget) : "-"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" />
              {t("spent")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(campaign.spent)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {t("roi")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {campaign.results?.roi ? `${campaign.results.roi}x` : "-"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {t("reach")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {campaign.results?.totalReach
                ? formatNumber(campaign.results.totalReach)
                : "-"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              {t("engagement")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {campaign.results?.totalEngagement
                ? formatNumber(campaign.results.totalEngagement)
                : "-"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              {t("conversions")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {campaign.results?.totalConversions
                ? formatNumber(campaign.results.totalConversions)
                : "-"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Performance</CardTitle>
            <CardDescription>Engagement and reach over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(v) => `${v}K`}
                  />
                  <RechartsTooltip
                    formatter={(value: unknown, name: unknown) =>
                      name === "engagement" ? [`${value}%`, "Engagement"] : [formatNumber(Number(value) * 1000), "Reach"]
                    }
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="engagement"
                    stroke={CHART_COLORS[0]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Engagement %"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="reach"
                    stroke={CHART_COLORS[1]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Reach (K)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Per-Influencer Performance</CardTitle>
            <CardDescription>Reach by influencer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={influencerPerformance} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => formatNumber(v)} />
                  <RechartsTooltip formatter={(v: unknown) => formatNumber(Number(v))} />
                  <Bar dataKey="reach" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} name="Reach" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Influencer table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("influencers")}</CardTitle>
          <CardDescription>Influencers participating in this campaign</CardDescription>
        </CardHeader>
        <CardContent>
          {!campaign.influencers?.length ? (
            <p className="text-muted-foreground text-center py-8">No influencers assigned yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Deliverables</TableHead>
                  <TableHead>Results</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaign.influencers.map((ci) => {
                  const inf = ci.influencer
                  const avgEng =
                    inf.socialAccounts.length > 0
                      ? inf.socialAccounts.reduce((s, sa) => s + sa.engagementRate, 0) /
                        inf.socialAccounts.length
                      : 0
                  return (
                    <TableRow key={ci.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={inf.avatar} />
                            <AvatarFallback>{inf.name.slice(0, 2).toUpperCase()}</AvatarFallback>
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
                        <Badge variant="secondary" className="capitalize">
                          {ci.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{ci.fee ? formatCurrency(ci.fee) : "-"}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {ci.notes || "1 post"}
                      </TableCell>
                      <TableCell>
                        <span className={cn(getEngagementColor(avgEng))}>
                          {formatPercentage(avgEng)} eng
                        </span>
                        <span className="text-muted-foreground ml-1">
                          • {formatNumber(inf.totalReach)} reach
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/influencer/${inf.id}`}>
                            View
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
