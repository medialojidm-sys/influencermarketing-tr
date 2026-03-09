"use client"

import { useTranslations } from "next-intl"
import {
  dashboardStats,
  categoryStats,
  platformMonthlyGrowth,
  geographicDistribution,
  getInfluencers,
} from "@/lib/mock-data"
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InfluencerCard } from "@/components/influencer/influencer-card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  Users,
  Heart,
  Instagram,
  Hash,
  MapPin,
} from "lucide-react"

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
]

const trendingHashtags = [
  { tag: "#influencermarketing", posts: 245000 },
  { tag: "#sponsored", posts: 182000 },
  { tag: "#ad", posts: 156000 },
  { tag: "#collab", posts: 98000 },
  { tag: "#partnership", posts: 72000 },
]

export default function MarketPage() {
  const t = useTranslations("market")
  const tCountries = useTranslations("countries")
  const influencers = getInfluencers()
  const trendingInfluencers = [...influencers]
    .sort((a, b) => b.totalReach - a.totalReach)
    .slice(0, 6)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("totalMarketSize")}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(125000000)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Türkiye pazar tahmini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("activeInfluencers")}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(dashboardStats.totalInfluencers)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Platformda kayıtlı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("averageEngagement")}
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPercentage(dashboardStats.avgEngagement)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Sektör ortalaması
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("topPlatform")}
            </CardTitle>
            <Instagram className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Instagram</div>
            <p className="text-xs text-muted-foreground mt-1">
              En yüksek influencer sayısı
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Trends & Platform Growth */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("categoryTrends")}</CardTitle>
            <CardDescription>{t("influencerCount")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryStats} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis
                    type="number"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={80}
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: unknown) => [formatNumber(Number(value ?? 0)), t("influencerCount")]}
                  />
                  <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("platformGrowth")}</CardTitle>
            <CardDescription>Aylık influencer büyümesi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={platformMonthlyGrowth}>
                  <defs>
                    <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorYoutube" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS[1]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={CHART_COLORS[1]} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTiktok" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS[2]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={CHART_COLORS[2]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(v) => formatNumber(v)}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: unknown) => [formatNumber(Number(value ?? 0)), undefined]}
                  />
                  <Area
                    type="monotone"
                    dataKey="instagram"
                    stroke={CHART_COLORS[0]}
                    fillOpacity={1}
                    fill="url(#colorInstagram)"
                    name="Instagram"
                  />
                  <Area
                    type="monotone"
                    dataKey="youtube"
                    stroke={CHART_COLORS[1]}
                    fillOpacity={1}
                    fill="url(#colorYoutube)"
                    name="YouTube"
                  />
                  <Area
                    type="monotone"
                    dataKey="tiktok"
                    stroke={CHART_COLORS[2]}
                    fillOpacity={1}
                    fill="url(#colorTiktok)"
                    name="TikTok"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {t("geographicDistribution")}
          </CardTitle>
          <CardDescription>Ülkelere göre influencer dağılımı</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={geographicDistribution.map((g, i) => ({
                  ...g,
                  label: g.country === "Other" ? "Diğer" : tCountries(g.country as "TR" | "US" | "DE" | "GB" | "FR"),
                }))}
                layout="vertical"
                margin={{ left: 50, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 50]}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={70}
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: unknown) => [`${Number(value ?? 0)}%`, undefined]}
                />
                <Bar
                  dataKey="count"
                  fill={CHART_COLORS[0]}
                  radius={[0, 4, 4, 0]}
                  name="Yüzde"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trending Influencers */}
      <Card>
        <CardHeader>
          <CardTitle>{t("topInfluencers")}</CardTitle>
          <CardDescription>Platformda en çok etkileşim alan influencer&apos;lar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trendingInfluencers.map((inf) => (
              <InfluencerCard
                key={inf.id}
                influencer={inf}
                translations={{
                  viewProfile: "Profili Gör",
                  addToList: "Listeye Ekle",
                  addToCompare: "Karşılaştır",
                  followers: "Takipçi",
                  engagementRate: "Etkileşim",
                  qualityScore: "Kalite",
                  verified: "Doğrulanmış",
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            {t("industryInsights")}
          </CardTitle>
          <CardDescription>{t("keyMetrics")} ve trend etiketler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium mb-3">{t("trendingHashtags")}</h4>
              <div className="space-y-2">
                {trendingHashtags.map((h) => (
                  <div
                    key={h.tag}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <span className="font-mono text-sm">{h.tag}</span>
                    <Badge variant="secondary">{formatNumber(h.posts)}</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">{t("keyMetrics")}</h4>
              <div className="space-y-3">
                <div className="flex justify-between rounded-lg border p-3">
                  <span className="text-muted-foreground">Yıllık büyüme oranı</span>
                  <span className="font-semibold text-green-600">+24%</span>
                </div>
                <div className="flex justify-between rounded-lg border p-3">
                  <span className="text-muted-foreground">Ortalama kampanya bütçesi</span>
                  <span className="font-semibold">{formatCurrency(85000)}</span>
                </div>
                <div className="flex justify-between rounded-lg border p-3">
                  <span className="text-muted-foreground">En büyüyen kategori</span>
                  <span className="font-semibold">Güzellik (+18%)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
