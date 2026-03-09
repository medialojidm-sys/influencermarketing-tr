"use client"

import { type Influencer } from "@/types"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatNumber, getEngagementColor, getScoreColor, getPlatformColor } from "@/lib/utils"
import {
  CheckCircle,
  ListPlus,
  GitCompare,
  ChevronRight,
  Instagram,
  Youtube,
  Music2,
  Twitter,
} from "lucide-react"
import { cn } from "@/lib/utils"

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music2,
  twitter: Twitter,
}

const countryFlags: Record<string, string> = {
  TR: "🇹🇷",
  US: "🇺🇸",
  GB: "🇬🇧",
  DE: "🇩🇪",
  FR: "🇫🇷",
  IT: "🇮🇹",
  ES: "🇪🇸",
  BR: "🇧🇷",
  IN: "🇮🇳",
  JP: "🇯🇵",
}

interface InfluencerCardProps {
  influencer: Influencer
  translations?: {
    viewProfile?: string
    addToList?: string
    addToCompare?: string
    followers?: string
    engagementRate?: string
    qualityScore?: string
    verified?: string
  }
}

export function InfluencerCard({ influencer, translations = {} }: InfluencerCardProps) {
  const avgEngagement =
    influencer.socialAccounts.length > 0
      ? influencer.socialAccounts.reduce((s, sa) => s + sa.engagementRate, 0) /
        influencer.socialAccounts.length
      : 0

  const maxFollowers = Math.max(
    ...influencer.socialAccounts.map((sa) => sa.followers),
    0
  )

  return (
    <TooltipProvider>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-14 w-14 ring-2 ring-background">
                <AvatarImage src={influencer.avatar} alt={influencer.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {influencer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {influencer.isVerified && (
                <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-primary p-0.5">
                  <CheckCircle className="h-4 w-4 text-primary-foreground" />
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate flex items-center gap-2">
                {influencer.name}
                {influencer.isVerified && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                    </TooltipTrigger>
                    <TooltipContent>
                      {translations.verified ?? "Verified"}
                    </TooltipContent>
                  </Tooltip>
                )}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                {influencer.country && (
                  <span>{countryFlags[influencer.country] ?? influencer.country}</span>
                )}
                {influencer.city && (
                  <span className="truncate">{influencer.city}</span>
                )}
              </p>
            </div>
          </div>
          {influencer.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {influencer.bio}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {influencer.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {influencer.categories.slice(0, 3).map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs">
                  {cat}
                </Badge>
              ))}
            </div>
          )}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {translations.followers ?? "Followers"}
            </p>
            <div className="flex flex-wrap gap-3">
              {influencer.socialAccounts.map((acc) => {
                const Icon = platformIcons[acc.platform] ?? null
                return (
                  <div
                    key={acc.id}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium",
                      getPlatformColor(acc.platform),
                      acc.platform === "tiktok"
                        ? "text-white dark:bg-white dark:text-black"
                        : "text-white"
                    )}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    <span>{formatNumber(acc.followers)}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {translations.engagementRate ?? "Engagement"}
              </span>
              <span className={cn("font-semibold", getEngagementColor(avgEngagement))}>
                {avgEngagement.toFixed(1)}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  avgEngagement >= 5
                    ? "bg-green-500"
                    : avgEngagement >= 3
                      ? "bg-yellow-500"
                      : avgEngagement >= 1
                        ? "bg-orange-500"
                        : "bg-red-500"
                )}
                style={{ width: `${Math.min(avgEngagement * 10, 100)}%` }}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {translations.qualityScore ?? "Quality Score"}
              </span>
              <span className={cn("font-semibold", getScoreColor(influencer.qualityScore))}>
                {influencer.qualityScore}
              </span>
            </div>
            <Progress value={influencer.qualityScore} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 pt-0">
          <Button variant="default" size="sm" className="flex-1 min-w-0" asChild>
            <Link href={`/influencer/${influencer.id}`}>
              {translations.viewProfile ?? "View Profile"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <ListPlus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{translations.addToList ?? "Add to List"}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <GitCompare className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{translations.addToCompare ?? "Add to Compare"}</TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}
