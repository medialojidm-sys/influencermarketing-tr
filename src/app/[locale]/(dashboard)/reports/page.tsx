"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { getCampaigns, platformStats, getInfluencers } from "@/lib/mock-data"
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  FileBarChart,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { cn } from "@/lib/utils"

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
]

const recentReports = [
  { id: "1", name: "Yaz Kampanyası 2024", type: "campaign", date: "2024-08-15", status: "completed" },
  { id: "2", name: "Ağustos 2024", type: "monthly", date: "2024-09-01", status: "completed" },
  { id: "3", name: "Q2 2024 Özet", type: "quarterly", date: "2024-07-05", status: "completed" },
  { id: "4", name: "Güzellik Serisi Analizi", type: "custom", date: "2024-08-28", status: "processing" },
  { id: "5", name: "Tech Ürün Lansmanı", type: "campaign", date: "2024-05-02", status: "completed" },
]

const campaignPerformanceData = [
  { name: "Erişim", value: 8.2, target: 10 },
  { name: "Etkileşim", value: 7.5, target: 8 },
  { name: "Dönüşüm", value: 4.2, target: 5 },
  { name: "ROI", value: 3.8, target: 3 },
]

const roiData = [
  { month: "Nis", roi: 2.2 },
  { month: "May", roi: 2.5 },
  { month: "Haz", roi: 2.8 },
  { month: "Tem", roi: 3.1 },
  { month: "Ağu", roi: 3.4 },
  { month: "Eyl", roi: 3.8 },
]

export default function ReportsPage() {
  const t = useTranslations("reports")
  const [reportType, setReportType] = useState("campaign")
  const [startDate, setStartDate] = useState("2024-06-01")
  const [endDate, setEndDate] = useState("2024-08-31")

  const topInfluencers = getInfluencers()
    .slice(0, 5)
    .map((inf) => ({
      name: inf.name,
      reach: inf.totalReach,
      engagement:
        inf.socialAccounts.length > 0
          ? inf.socialAccounts.reduce((s, sa) => s + sa.engagementRate, 0) /
            inf.socialAccounts.length
          : 0,
    }))

  const statusColors: Record<string, string> = {
    completed: "bg-green-500/15 text-green-600 dark:text-green-400",
    processing: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
    failed: "bg-red-500/15 text-red-600 dark:text-red-400",
  }

  const reportTypeLabels: Record<string, string> = {
    campaign: t("campaignReport"),
    monthly: t("monthlyReport"),
    quarterly: t("quarterlyReport"),
    custom: t("custom"),
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
        </div>
        <Button>
          <FileBarChart className="h-4 w-4 mr-2" />
          {t("generate")}
        </Button>
      </div>

      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("reportType")}</CardTitle>
          <CardDescription>Rapor türü ve tarih aralığı seçin</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label>{t("reportType")}</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campaign">{t("campaignReport")}</SelectItem>
                <SelectItem value="monthly">{t("monthlyReport")}</SelectItem>
                <SelectItem value="quarterly">{t("quarterlyReport")}</SelectItem>
                <SelectItem value="custom">{t("custom")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 space-y-2">
            <Label>{t("dateRange")}</Label>
            <div className="flex gap-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Reports */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t("recentReports")}</CardTitle>
            <CardDescription>Son oluşturulan raporlar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{report.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {reportTypeLabels[report.type]} · {report.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <Badge
                      className={cn(
                        "text-xs",
                        statusColors[report.status] ?? "bg-muted"
                      )}
                    >
                      {t(report.status as "completed" | "processing" | "failed")}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Preview */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t("reportPreview")}</CardTitle>
              <CardDescription>{startDate} - {endDate}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <FileBarChart className="h-4 w-4 mr-1" />
                CSV
              </Button>
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Excel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Campaign Performance Summary */}
            <div>
              <h4 className="text-sm font-medium mb-3">{t("campaignPerformance")}</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} name="Gerçekleşen" />
                    <Bar dataKey="target" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} name="Hedef" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ROI Analysis */}
            <div>
              <h4 className="text-sm font-medium mb-3">{t("roiAnalysis")}</h4>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={roiData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(v) => `${v}x`}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: unknown) => [`${Number(value ?? 0)}x ROI`, undefined]}
                    />
                    <Line
                      type="monotone"
                      dataKey="roi"
                      stroke={CHART_COLORS[0]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Top Performing Influencers */}
              <div>
                <h4 className="text-sm font-medium mb-3">{t("topInfluencers")}</h4>
                <div className="space-y-2">
                  {topInfluencers.map((inf, i) => (
                    <div
                      key={inf.name}
                      className="flex justify-between rounded border p-2 text-sm"
                    >
                      <span>
                        {i + 1}. {inf.name}
                      </span>
                      <span className="text-muted-foreground">
                        {formatNumber(inf.reach)} · {inf.engagement.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Breakdown */}
              <div>
                <h4 className="text-sm font-medium mb-3">{t("platformBreakdown")}</h4>
                <div className="h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                          `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                      >
                        {platformStats.map((_, index) => (
                          <Cell
                            key={index}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: unknown) => [formatNumber(Number(value ?? 0)), "Influencer"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
