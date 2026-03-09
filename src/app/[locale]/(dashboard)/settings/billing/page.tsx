"use client"

import { useTranslations } from "next-intl"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreditCard, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "free",
    name: "Ücretsiz",
    price: 0,
    period: "/ay",
    features: [
      { text: "Günlük 10 arama", included: true },
      { text: "Temel profil görüntüleme", included: true },
      { text: "1 liste oluşturma", included: true },
      { text: "Analitik raporlar", included: false },
      { text: "Kampanya yönetimi", included: false },
      { text: "API erişimi", included: false },
    ],
    searchLimit: 10,
    campaignLimit: 0,
    listLimit: 1,
  },
  {
    id: "starter",
    name: "Başlangıç",
    price: 499,
    period: "/ay",
    features: [
      { text: "Günlük 100 arama", included: true },
      { text: "Temel profil görüntüleme", included: true },
      { text: "5 liste oluşturma", included: true },
      { text: "Analitik raporlar", included: true },
      { text: "3 kampanya yönetimi", included: true },
      { text: "API erişimi", included: false },
    ],
    searchLimit: 100,
    campaignLimit: 3,
    listLimit: 5,
  },
  {
    id: "professional",
    name: "Profesyonel",
    price: 999,
    period: "/ay",
    popular: true,
    features: [
      { text: "Sınırsız arama", included: true },
      { text: "Gelişmiş analitik", included: true },
      { text: "Sınırsız liste", included: true },
      { text: "20 kampanya yönetimi", included: true },
      { text: "Sahtecilik tespiti", included: true },
      { text: "API erişimi", included: true },
    ],
    searchLimit: -1,
    campaignLimit: 20,
    listLimit: -1,
  },
  {
    id: "enterprise",
    name: "Kurumsal",
    price: null,
    period: "",
    features: [
      { text: "Tüm özellikler", included: true },
      { text: "Özel entegrasyonlar", included: true },
      { text: "Dedike hesap yöneticisi", included: true },
      { text: "Sınırsız kampanya", included: true },
      { text: "SLA garantisi", included: true },
      { text: "7/24 destek", included: true },
    ],
    searchLimit: -1,
    campaignLimit: -1,
    listLimit: -1,
  },
]

const paymentHistory = [
  { id: "1", date: "2024-09-01", amount: 999, status: "paid", invoice: "#INV-2024-0901" },
  { id: "2", date: "2024-08-01", amount: 999, status: "paid", invoice: "#INV-2024-0801" },
  { id: "3", date: "2024-07-01", amount: 999, status: "paid", invoice: "#INV-2024-0701" },
  { id: "4", date: "2024-06-01", amount: 499, status: "paid", invoice: "#INV-2024-0601" },
]

const currentPlanId = "professional"
const usage = {
  searches: 2847,
  searchesLimit: -1, // unlimited for professional
  campaigns: 12,
  campaignsLimit: 20,
  lists: 8,
  listsLimit: -1, // unlimited for professional
}

export default function BillingPage() {
  const t = useTranslations("billing")
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("currentPlan")}</CardTitle>
            <CardDescription>Profesyonel plan - Tüm özelliklere erişim</CardDescription>
          </div>
          <Button variant="outline">{t("changePlan")}</Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge className="bg-primary/15 text-primary">{t("currentPlanBadge")}</Badge>
            <span className="text-2xl font-bold">{formatCurrency(999)}/ay</span>
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId
          const isHigher =
            ["starter", "professional", "enterprise"].indexOf(plan.id) >
            ["free", "starter", "professional", "enterprise"].indexOf(currentPlanId)

          return (
            <Card
              key={plan.id}
              className={cn(
                plan.popular && "ring-2 ring-primary",
                isCurrent && "border-primary"
              )}
            >
              <CardHeader className="pb-2">
                {plan.popular && (
                  <Badge variant="secondary" className="w-fit mb-2">
                    Popüler
                  </Badge>
                )}
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">
                    {plan.price !== null ? formatCurrency(plan.price) : "Özel"}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                {isCurrent && (
                  <Badge className="w-fit bg-green-500/15 text-green-600 dark:text-green-400">
                    {t("currentPlanBadge")}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      {f.included ? (
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                      <span className={cn(!f.included && "text-muted-foreground")}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                {isHigher && plan.id !== "enterprise" && (
                  <Button className="w-full" size="sm">
                    {t("upgrade")}
                  </Button>
                )}
                {plan.id === "enterprise" && !isCurrent && (
                  <Button className="w-full" variant="outline" size="sm">
                    İletişime Geç
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>{t("paymentHistory")}</CardTitle>
            <CardDescription>Son ödemeleriniz</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Fatura</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.date}</TableCell>
                    <TableCell>{formatCurrency(p.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          p.status === "paid" ? "secondary" : "destructive"
                        }
                      >
                        {p.status === "paid" ? "Ödendi" : "Beklemede"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        {p.invoice}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>{t("paymentMethod")}</CardTitle>
            <CardDescription>{t("cardOnFile")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <CreditCard className="h-10 w-10 text-muted-foreground" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Son kullanma: 12/25</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                {t("updateCard")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>{t("usageStats")}</CardTitle>
          <CardDescription>Plan limitlerinize göre kullanım</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>{t("searchesUsed")}</span>
              <span>
                {formatNumber(usage.searches)}
                {usage.searchesLimit > 0 ? ` / ${formatNumber(usage.searchesLimit)}` : " (sınırsız)"}
              </span>
            </div>
            <Progress
              value={usage.searchesLimit > 0 ? Math.min(100, (usage.searches / usage.searchesLimit) * 100) : 25}
              className="h-2"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>{t("campaignsActive")}</span>
              <span>
                {usage.campaigns}
                {usage.campaignsLimit > 0 && ` / ${usage.campaignsLimit}`}
              </span>
            </div>
            <Progress
              value={
                usage.campaignsLimit > 0
                  ? Math.min(100, (usage.campaigns / usage.campaignsLimit) * 100)
                  : 0
              }
              className="h-2"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>{t("listsCreated")}</span>
              <span>
                {usage.lists}
                {usage.listsLimit > 0 ? ` / ${usage.listsLimit}` : " (sınırsız)"}
              </span>
            </div>
            <Progress
              value={usage.listsLimit > 0 ? Math.min(100, (usage.lists / usage.listsLimit) * 100) : 15}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
