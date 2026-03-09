"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  competitorBrands,
  getInfluencers,
} from "@/lib/mock-data"
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "@/i18n/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import {
  Plus,
  ExternalLink,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

const sharedInfluencers = getInfluencers().slice(0, 5)

export default function CompetitorsPage() {
  const t = useTranslations("competitors")
  const tCampaigns = useTranslations("campaigns")
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ brandName: "", website: "", notes: "" })

  const comparisonData = competitorBrands.map((c) => ({
    name: c.name,
    influencers: c.influencerCount,
    engagement: c.avgEngagement,
    spend: c.totalSpend / 1000,
  }))

  const performanceData = competitorBrands[0]?.performanceOverTime ?? []

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t("addCompetitor")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("addCompetitor")}</DialogTitle>
              <DialogDescription>
                Yeni bir rakip marka ekleyin ve takip etmeye başlayın.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="brandName">{t("brandName")}</Label>
                <Input
                  id="brandName"
                  placeholder="Marka adı"
                  value={formData.brandName}
                  onChange={(e) => setFormData((p) => ({ ...p, brandName: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">{t("website")}</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">{t("notes")}</Label>
                <Textarea
                  id="notes"
                  placeholder="Notlar (isteğe bağlı)"
                  value={formData.notes}
                  onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                İptal
              </Button>
              <Button
                onClick={() => {
                  setFormData({ brandName: "", website: "", notes: "" })
                  setOpen(false)
                }}
              >
                Ekle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Competitor Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {competitorBrands.map((competitor) => (
          <Card key={competitor.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{competitor.name}</CardTitle>
                  <a
                    href={competitor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mt-1"
                  >
                    {competitor.website.replace(/^https?:\/\//, "")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              {competitor.notes && (
                <CardDescription className="text-xs">{competitor.notes}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{formatNumber(competitor.influencerCount)}</span>
                <span className="text-muted-foreground">{t("influencerCount")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span>{formatPercentage(competitor.avgEngagement)}</span>
                <span className="text-muted-foreground">{t("avgEngagement")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{formatCurrency(competitor.totalSpend)}</span>
                <span className="text-muted-foreground">{t("totalSpend")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("performanceComparison")}</CardTitle>
            <CardDescription>Rakiplerin metrik karşılaştırması</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="influencers" fill={CHART_COLORS[0]} name="Influencer" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="engagement" fill={CHART_COLORS[1]} name="Engagement %" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="spend" fill={CHART_COLORS[2]} name="Spend (K)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("performanceOverTime")}</CardTitle>
            <CardDescription>{competitorBrands[0]?.name} performans trendi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: unknown) => [`${Number(value ?? 0)}%`, t("avgEngagement")]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={CHART_COLORS[0]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("performanceComparison")}</CardTitle>
          <CardDescription>Detaylı metrik tablosu</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("brandName")}</TableHead>
                <TableHead>{t("influencerCount")}</TableHead>
                <TableHead>{t("avgEngagement")}</TableHead>
                <TableHead>{t("totalSpend")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitorBrands.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{formatNumber(c.influencerCount)}</TableCell>
                  <TableCell>{formatPercentage(c.avgEngagement)}</TableCell>
                  <TableCell>{formatCurrency(c.totalSpend)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Shared Influencers */}
      <Card>
        <CardHeader>
          <CardTitle>{t("sharedInfluencers")}</CardTitle>
          <CardDescription>Sizin ve rakiplerinizin ortak çalıştığı influencer&apos;lar</CardDescription>
        </CardHeader>
        <CardContent>
          {sharedInfluencers.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {sharedInfluencers.map((inf) => (
                <Link
                  key={inf.id}
                  href={`/influencer/${inf.id}`}
                  className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={inf.avatar} />
                    <AvatarFallback>{inf.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{inf.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(Math.max(...inf.socialAccounts.map((sa) => sa.followers)))} takipçi
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Ortak influencer bulunamadı.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
