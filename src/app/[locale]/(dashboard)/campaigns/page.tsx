"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { getCampaigns, getCampaignById } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Link } from "@/i18n/navigation"
import {
  Megaphone,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Calendar,
  Users,
  Instagram,
  Youtube,
  Music2,
  Twitter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Campaign } from "@/types"

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

export default function CampaignsListPage() {
  const t = useTranslations("campaigns")
  const tPlatforms = useTranslations("platforms")
  const tCommon = useTranslations("common")

  const [statusFilter, setStatusFilter] = useState<string>("all")
  const campaigns = getCampaigns()
  const filteredCampaigns =
    statusFilter === "all"
      ? campaigns
      : campaigns.filter((c) => c.status === statusFilter)

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-"
    return new Date(dateStr).toLocaleDateString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
        </div>
        <Button asChild>
          <Link href="/campaigns/new">
            <Plus className="h-4 w-4 mr-2" />
            {t("newCampaign")}
          </Link>
        </Button>
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList>
          <TabsTrigger value="all">{tCommon("all")}</TabsTrigger>
          <TabsTrigger value="draft">{t("draft")}</TabsTrigger>
          <TabsTrigger value="active">{t("active")}</TabsTrigger>
          <TabsTrigger value="paused">{t("paused")}</TabsTrigger>
          <TabsTrigger value="completed">{t("completed")}</TabsTrigger>
        </TabsList>

        {(["all", "draft", "active", "paused", "completed"] as const).map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-6">
          {filteredCampaigns.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Megaphone className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-medium">{t("noCampaigns")}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Create your first campaign to get started
                </p>
                <Button asChild className="mt-4">
                  <Link href="/campaigns/new">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("newCampaign")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  formatDate={formatDate}
                  t={t}
                  tPlatforms={tPlatforms}
                />
              ))}
            </div>
          )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function CampaignCard({
  campaign,
  formatDate,
  t,
  tPlatforms,
}: {
  campaign: Campaign
  formatDate: (d?: string) => string
  t: ReturnType<typeof useTranslations<"campaigns">>
  tPlatforms: ReturnType<typeof useTranslations<"platforms">>
}) {
  const progress =
    campaign.budget && campaign.budget > 0
      ? Math.min(100, (campaign.spent / campaign.budget) * 100)
      : 0

  const PlatformIcon = campaign.platform ? platformIcons[campaign.platform] : null

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="line-clamp-1">{campaign.name}</CardTitle>
            {campaign.description && (
              <CardDescription className="line-clamp-2 mt-1">
                {campaign.description}
              </CardDescription>
            )}
          </div>
          <Badge className={cn("shrink-0", statusConfig[campaign.status]?.className ?? "")}>
            {t(campaign.status)}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {campaign.platform && (
            <Badge variant="secondary" className="gap-1">
              {PlatformIcon && <PlatformIcon className="h-3.5 w-3.5" />}
              {tPlatforms(campaign.platform as "instagram" | "youtube" | "tiktok" | "twitter")}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">{t("budget")}</span>
            <span>
              {formatCurrency(campaign.spent)} / {campaign.budget ? formatCurrency(campaign.budget) : "-"}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {getCampaignById(campaign.id)?.influencers?.length ?? 0} {t("influencerCount")}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-0">
        <Button variant="default" size="sm" asChild>
          <Link href={`/campaigns/${campaign.id}`}>
            <Eye className="h-4 w-4 mr-1" />
            {t("viewDetails")}
          </Link>
        </Button>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4 mr-1" />
          {t("editCampaign")}
        </Button>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4 mr-1" />
          {t("deleteCampaign")}
        </Button>
      </CardFooter>
    </Card>
  )
}
