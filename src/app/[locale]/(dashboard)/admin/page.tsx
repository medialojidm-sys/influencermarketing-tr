"use client"

import { useTranslations } from "next-intl"
import {
  adminStats,
  adminUsers,
  usersByPlanData,
  dailyActiveUsersData,
  revenueTrendData,
  topSearchCategoriesAdmin,
} from "@/lib/mock-data"
import { formatNumber, formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Users,
  UserCheck,
  Search,
  DollarSign,
  Edit,
  Ban,
  Send,
  Download,
  Trash2,
  CircleCheck,
  CircleX,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { cn } from "@/lib/utils"

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
]

export default function AdminPage() {
  const t = useTranslations("admin")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">Platform yönetimi ve istatistikler</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("totalUsers")}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(adminStats.totalUsers)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("activeUsers")}
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(adminStats.activeUsers)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("totalSearches")}
            </CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(adminStats.totalSearches)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("revenue")}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(adminStats.revenue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("userManagement")}</CardTitle>
          <CardDescription>Kullanıcıları yönetin</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İsim</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Kayıt Tarihi</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "default" : "destructive"}
                      className={cn(
                        user.status === "active" &&
                          "bg-green-500/15 text-green-600 dark:text-green-400 hover:bg-green-500/25"
                      )}
                    >
                      {user.status === "active" ? "Aktif" : "Askıda"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Platform Statistics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("usersByPlan")}</CardTitle>
            <CardDescription>{t("platformStats")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usersByPlanData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {usersByPlanData.map((_, index) => (
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
                    formatter={(value: unknown) => [formatNumber(Number(value ?? 0)), "Kullanıcı"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dailyActiveUsers")}</CardTitle>
            <CardDescription>Son 30 gün</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyActiveUsersData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(v) => formatNumber(v)}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: unknown) => [formatNumber(Number(value ?? 0)), "DAU"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke={CHART_COLORS[0]}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("revenueTrend")}</CardTitle>
            <CardDescription>Aylık gelir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrendData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(v) => formatNumber(v)}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: unknown) => [formatCurrency(Number(value ?? 0)), "Gelir"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={CHART_COLORS[0]}
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("topSearchCategories")}</CardTitle>
            <CardDescription>En çok aranan kategoriler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSearchCategoriesAdmin} layout="vertical" margin={{ left: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(v) => formatNumber(v)}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={70}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: unknown) => [formatNumber(Number(value ?? 0)), "Arama"]}
                  />
                  <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("systemHealth")}</CardTitle>
            <CardDescription>Sistem bileşenlerinin durumu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <CircleCheck className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">{t("apiStatus")}</p>
                    <p className="text-sm text-muted-foreground">Tüm endpoint&apos;ler çalışıyor</p>
                  </div>
                </div>
                <Badge className="bg-green-500/15 text-green-600 dark:text-green-400">
                  Aktif
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <CircleCheck className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">{t("databaseStatus")}</p>
                    <p className="text-sm text-muted-foreground">Bağlantı stabil</p>
                  </div>
                </div>
                <Badge className="bg-green-500/15 text-green-600 dark:text-green-400">
                  Aktif
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <CircleCheck className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">{t("cacheStatus")}</p>
                    <p className="text-sm text-muted-foreground">Redis çalışıyor</p>
                  </div>
                </div>
                <Badge className="bg-green-500/15 text-green-600 dark:text-green-400">
                  Aktif
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("quickActions")}</CardTitle>
            <CardDescription>Yönetim işlemleri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Send className="h-4 w-4 mr-2" />
              {t("broadcastMessage")}
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Download className="h-4 w-4 mr-2" />
              {t("exportUserData")}
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Trash2 className="h-4 w-4 mr-2" />
              {t("clearCache")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
