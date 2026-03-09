"use client"

import { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { getInfluencers, searchInfluencers } from "@/lib/mock-data"
import { formatNumber, formatPercentage, getEngagementColor, getScoreColor, getPlatformColor } from "@/lib/utils"
import type { Influencer } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from "@/i18n/navigation"
import {
  UserPlus,
  X,
  Search,
  GitCompare,
  Instagram,
  Youtube,
  Music2,
  Twitter,
  CheckCircle,
} from "lucide-react"
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music2,
  twitter: Twitter,
}

const CHART_COLORS = ["#E1306C", "#6366f1", "#22c55e", "#f59e0b"]

function getAvgEngagement(inf: Influencer): number {
  if (inf.socialAccounts.length === 0) return 0
  return inf.socialAccounts.reduce((s, sa) => s + sa.engagementRate, 0) / inf.socialAccounts.length
}

function getTrustScore(inf: Influencer): number {
  return 100 - inf.fraudScore
}

export default function ComparePage() {
  const t = useTranslations("compare")
  const tPlatforms = useTranslations("platforms")
  const tCategories = useTranslations("categories")
  const tCountries = useTranslations("countries")
  const tCommon = useTranslations("common")

  const [selectedInfluencers, setSelectedInfluencers] = useState<Influencer[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [popoverOpen, setPopoverOpen] = useState(false)

  const allInfluencers = getInfluencers()
  const filteredInfluencers = useMemo(() => {
    if (!searchQuery.trim()) return allInfluencers
    return searchInfluencers(searchQuery)
  }, [searchQuery, allInfluencers])

  const availableInfluencers = filteredInfluencers.filter(
    (inf) => !selectedInfluencers.some((s) => s.id === inf.id)
  )

  const addInfluencer = (inf: Influencer) => {
    if (selectedInfluencers.length >= 4) return
    setSelectedInfluencers((prev) => [...prev, inf])
    setSearchQuery("")
    setPopoverOpen(false)
  }

  const removeInfluencer = (id: string) => {
    setSelectedInfluencers((prev) => prev.filter((inf) => inf.id !== id))
  }

  // Radar chart data: normalize metrics 0-100 for comparison
  const radarData = useMemo(() => {
    if (selectedInfluencers.length === 0) return []
    const maxReach = Math.max(...selectedInfluencers.map((i) => i.totalReach), 1)
    const maxEng = Math.max(...selectedInfluencers.map(getAvgEngagement), 0.1)
    const subjects = [
      { key: "followers", label: "Reach" },
      { key: "engagement", label: "Engagement" },
      { key: "quality", label: "Quality" },
      { key: "trust", label: "Trust" },
    ]
    return subjects.map(({ key, label }) => {
      const point: Record<string, string | number> = { subject: label }
      selectedInfluencers.forEach((inf, i) => {
        const value =
          key === "followers"
            ? Math.min(100, (inf.totalReach / maxReach) * 100)
            : key === "engagement"
              ? Math.min(100, (getAvgEngagement(inf) / maxEng) * 100)
              : key === "quality"
                ? inf.qualityScore
                : getTrustScore(inf)
        point[inf.name] = Math.round(value)
      })
      return point
    })
  }, [selectedInfluencers])

  const barChartData = useMemo(() => {
    const platforms = ["instagram", "youtube", "tiktok", "twitter"] as const
    return platforms.map((platform) => {
      const point: Record<string, string | number> = { platform: tPlatforms(platform) }
      selectedInfluencers.forEach((inf) => {
        const acc = inf.socialAccounts.find((sa) => sa.platform === platform)
        point[inf.name] = acc?.followers ?? 0
      })
      return point
    })
  }, [selectedInfluencers, tPlatforms])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>

      {/* Influencer Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            {t("addInfluencer")}
          </CardTitle>
          <CardDescription>
            Select up to 4 influencers to compare their metrics side by side
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected influencers row */}
          <div className="flex flex-wrap gap-3">
            {selectedInfluencers.map((inf) => (
              <Card key={inf.id} className="overflow-hidden w-[200px]">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 p-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={inf.avatar} />
                      <AvatarFallback>{inf.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/influencer/${inf.id}`}
                        className="font-medium truncate block hover:underline"
                      >
                        {inf.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {formatNumber(inf.totalReach)} reach
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => removeInfluencer(inf.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add influencer dropdown */}
          {selectedInfluencers.length < 4 && (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full max-w-sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t("addInfluencer")} ({selectedInfluencers.length}/4)
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-0" align="start">
                <div className="p-2 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={tCommon("search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="max-h-[280px] overflow-y-auto p-2">
                  {availableInfluencers.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      {tCommon("noResults")}
                    </p>
                  ) : (
                    availableInfluencers.slice(0, 15).map((inf) => (
                      <button
                        key={inf.id}
                        type="button"
                        className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent text-left transition-colors"
                        onClick={() => addInfluencer(inf)}
                      >
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage src={inf.avatar} />
                          <AvatarFallback className="text-xs">
                            {inf.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{inf.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatNumber(inf.totalReach)} • {getAvgEngagement(inf).toFixed(1)}% eng
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </CardContent>
      </Card>

      {selectedInfluencers.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <GitCompare className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-medium">{t("addInfluencer")} to compare</p>
            <p className="text-sm text-muted-foreground mt-1">
              Select up to 4 influencers from the dropdown above to see a detailed comparison
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>{t("metrics")}</CardTitle>
              <CardDescription>Side-by-side metric comparison</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Metric</TableHead>
                    {selectedInfluencers.map((inf) => (
                      <TableHead key={inf.id}>{inf.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Followers (by platform)</TableCell>
                    {selectedInfluencers.map((inf) => (
                      <TableCell key={inf.id}>
                        <div className="flex flex-wrap gap-1">
                          {inf.socialAccounts.map((acc) => {
                            const Icon = platformIcons[acc.platform]
                            return (
                              <Badge
                                key={acc.id}
                                variant="secondary"
                                className={cn(
                                  "text-xs",
                                  getPlatformColor(acc.platform),
                                  acc.platform === "tiktok" ? "text-white dark:text-black" : "text-white"
                                )}
                              >
                                {Icon && <Icon className="h-3 w-3 mr-0.5" />}
                                {formatNumber(acc.followers)}
                              </Badge>
                            )
                          })}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Engagement Rate</TableCell>
                    {selectedInfluencers.map((inf) => (
                      <TableCell key={inf.id}>
                        <span className={cn("font-medium", getEngagementColor(getAvgEngagement(inf)))}>
                          {formatPercentage(getAvgEngagement(inf))}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Quality Score</TableCell>
                    {selectedInfluencers.map((inf) => (
                      <TableCell key={inf.id}>
                        <span className={cn("font-medium", getScoreColor(inf.qualityScore))}>
                          {inf.qualityScore}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Trust Score</TableCell>
                    {selectedInfluencers.map((inf) => (
                      <TableCell key={inf.id}>{getTrustScore(inf)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total Reach</TableCell>
                    {selectedInfluencers.map((inf) => (
                      <TableCell key={inf.id}>{formatNumber(inf.totalReach)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Categories</TableCell>
                    {selectedInfluencers.map((inf) => (
                      <TableCell key={inf.id}>
                        <div className="flex flex-wrap gap-1">
                          {inf.categories.slice(0, 3).map((c) => (
                            <Badge key={c} variant="outline" className="text-xs">
                              {tCategories(c as keyof typeof tCategories)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Country</TableCell>
                    {selectedInfluencers.map((inf) => (
                      <TableCell key={inf.id}>
                        {inf.country
                          ? tCountries(inf.country as "TR" | "US" | "GB" | "DE" | "FR" | "IT" | "ES" | "BR" | "IN" | "JP")
                          : "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Verified</TableCell>
                    {selectedInfluencers.map((inf) => (
                      <TableCell key={inf.id}>
                        {inf.isVerified ? (
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Yes
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Radar Comparison</CardTitle>
                <CardDescription>Normalized metrics across influencers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <PolarRadiusAxis angle={30} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      {selectedInfluencers.map((inf, i) => (
                        <Radar
                          key={inf.id}
                          name={inf.name}
                          dataKey={inf.name}
                          stroke={CHART_COLORS[i % CHART_COLORS.length]}
                          fill={CHART_COLORS[i % CHART_COLORS.length]}
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      ))}
                      <RechartsTooltip />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Followers by Platform</CardTitle>
                <CardDescription>Platform-specific follower counts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="platform" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => formatNumber(v)} />
                      <RechartsTooltip formatter={(v: unknown) => formatNumber(Number(v))} />
                      <Legend />
                      {selectedInfluencers.map((inf, i) => (
                        <Bar
                          key={inf.id}
                          dataKey={inf.name}
                          fill={CHART_COLORS[i % CHART_COLORS.length]}
                          radius={[4, 4, 0, 0]}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
