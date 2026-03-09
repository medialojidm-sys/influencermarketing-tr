"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { getInfluencers, searchInfluencers } from "@/lib/mock-data"
import { formatNumber } from "@/lib/utils"
import type { Influencer } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "@/i18n/navigation"
import { ChevronLeft, ChevronRight, Search, UserPlus, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: 1, key: "basicInfo" },
  { id: 2, key: "goalsStep" },
  { id: 3, key: "influencersStep" },
  { id: 4, key: "reviewStep" },
] as const

const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter" },
]

export default function NewCampaignPage() {
  const t = useTranslations("campaigns")
  const tPlatforms = useTranslations("platforms")
  const tCommon = useTranslations("common")

  const [step, setStep] = useState(1)
  const [successOpen, setSuccessOpen] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [platform, setPlatform] = useState<string>("")
  const [budget, setBudget] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [targetReach, setTargetReach] = useState("")
  const [targetEngagement, setTargetEngagement] = useState("")
  const [targetConversions, setTargetConversions] = useState("")
  const [targetImpressions, setTargetImpressions] = useState("")

  const [selectedInfluencers, setSelectedInfluencers] = useState<Influencer[]>([])
  const [influencerSearch, setInfluencerSearch] = useState("")
  const [popoverOpen, setPopoverOpen] = useState(false)

  const allInfluencers = getInfluencers()
  const filteredInfluencers = influencerSearch.trim()
    ? searchInfluencers(influencerSearch)
    : allInfluencers
  const availableInfluencers = filteredInfluencers.filter(
    (inf) => !selectedInfluencers.some((s) => s.id === inf.id)
  )

  const addInfluencer = (inf: Influencer) => {
    setSelectedInfluencers((prev) => [...prev, inf])
    setInfluencerSearch("")
  }

  const removeInfluencer = (id: string) => {
    setSelectedInfluencers((prev) => prev.filter((i) => i.id !== id))
  }

  const handleSubmit = () => {
    setSuccessOpen(true)
  }

  const canProceed = () => {
    if (step === 1) return name.trim() && platform && budget && startDate && endDate
    if (step === 2) return true
    if (step === 3) return true
    if (step === 4) return true
    return false
  }

  const stepLabel = t(`basicInfo`)
  const stepKey = STEPS.find((s) => s.id === step)?.key ?? "basicInfo"

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("create")}</h1>
        <p className="text-muted-foreground mt-1">Create a new influencer marketing campaign</p>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={cn(
              "flex-1 h-2 rounded-full transition-colors",
              step >= s.id ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{t(stepKey)}</p>

      <Card>
        <CardHeader>
          <CardTitle>{t(stepKey)}</CardTitle>
          <CardDescription>
            {step === 1 && "Enter your campaign details"}
            {step === 2 && "Set your campaign goals"}
            {step === 3 && "Add influencers to your campaign"}
            {step === 4 && "Review and confirm"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Summer Product Launch 2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t("description")}</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Campaign description..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("platform")}</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {tPlatforms(p.value as "instagram" | "youtube" | "tiktok" | "twitter")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">{t("budget")} (TRY)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="50000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">{t("startDate")}</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">{t("endDate")}</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetReach">{t("targetReach")}</Label>
                <Input
                  id="targetReach"
                  type="number"
                  value={targetReach}
                  onChange={(e) => setTargetReach(e.target.value)}
                  placeholder="5000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetEngagement">{t("targetEngagement")}</Label>
                <Input
                  id="targetEngagement"
                  type="number"
                  value={targetEngagement}
                  onChange={(e) => setTargetEngagement(e.target.value)}
                  placeholder="200000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetConversions">{t("targetConversions")}</Label>
                <Input
                  id="targetConversions"
                  type="number"
                  value={targetConversions}
                  onChange={(e) => setTargetConversions(e.target.value)}
                  placeholder="5000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetImpressions">{t("targetImpressions")}</Label>
                <Input
                  id="targetImpressions"
                  type="number"
                  value={targetImpressions}
                  onChange={(e) => setTargetImpressions(e.target.value)}
                  placeholder="15000000"
                />
              </div>
            </div>
          )}

          {/* Step 3: Influencers */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t("addInfluencer")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[320px] p-0" align="start">
                    <div className="p-2 border-b">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={tCommon("search")}
                          value={influencerSearch}
                          onChange={(e) => setInfluencerSearch(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="max-h-[240px] overflow-y-auto p-2">
                      {availableInfluencers.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">
                          {tCommon("noResults")}
                        </p>
                      ) : (
                        availableInfluencers.slice(0, 10).map((inf) => (
                          <button
                            key={inf.id}
                            type="button"
                            className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent text-left"
                            onClick={() => addInfluencer(inf)}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={inf.avatar} />
                              <AvatarFallback className="text-xs">
                                {inf.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{inf.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatNumber(inf.totalReach)} reach
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Selected Influencers ({selectedInfluencers.length})</Label>
                {selectedInfluencers.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 border rounded-md text-center">
                    No influencers selected. Click Add Influencer to search and add.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedInfluencers.map((inf) => (
                      <div
                        key={inf.id}
                        className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={inf.avatar} />
                          <AvatarFallback className="text-xs">
                            {inf.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{inf.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeInfluencer(inf.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t("name")}</p>
                  <p className="font-medium">{name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("description")}</p>
                  <p className="text-sm">{description || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("platform")}</p>
                  <p className="font-medium">
                    {platform ? tPlatforms(platform as "instagram" | "youtube" | "tiktok" | "twitter") : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("budget")}</p>
                  <p className="font-medium">{budget ? `₺${Number(budget).toLocaleString()}` : "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("startDate")} – {t("endDate")}</p>
                  <p className="font-medium">
                    {startDate} – {endDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Goals</p>
                  <p className="text-sm">
                    Reach: {targetReach || "-"} | Engagement: {targetEngagement || "-"} |
                    Conversions: {targetConversions || "-"} | Impressions: {targetImpressions || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("influencers")}</p>
                  <p className="font-medium">{selectedInfluencers.length} selected</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedInfluencers.map((inf) => (
                      <span key={inf.id} className="text-xs bg-muted px-2 py-0.5 rounded">
                        {inf.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {tCommon("previous")}
            </Button>
            {step < 4 ? (
              <Button
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                disabled={!canProceed()}
              >
                {tCommon("next")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                <Check className="h-4 w-4 mr-1" />
                {tCommon("confirm")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("successTitle")}</DialogTitle>
            <DialogDescription>{t("successMessage")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button asChild>
              <Link href="/campaigns">{tCommon("close")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/campaigns/new">{t("create")}</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
