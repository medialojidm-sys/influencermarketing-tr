"use client"

import { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { filterInfluencers } from "@/lib/mock-data"
import { InfluencerCard } from "@/components/influencer/influencer-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Search, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Platform } from "@/types"

const PLATFORMS: { value: "" | Platform; labelKey: string }[] = [
  { value: "", labelKey: "common.all" },
  { value: "instagram", labelKey: "platforms.instagram" },
  { value: "youtube", labelKey: "platforms.youtube" },
  { value: "tiktok", labelKey: "platforms.tiktok" },
  { value: "twitter", labelKey: "platforms.twitter" },
]

const COUNTRIES = ["TR", "US", "GB", "DE", "FR", "IT", "ES", "BR", "IN", "JP"]

const CATEGORIES = [
  "beauty",
  "fashion",
  "technology",
  "gaming",
  "food",
  "travel",
  "fitness",
  "lifestyle",
  "education",
  "entertainment",
  "music",
  "sports",
  "health",
  "parenting",
  "automotive",
  "art",
]

const SORT_OPTIONS = [
  { value: "followers", labelKey: "discover.sortFollowers" },
  { value: "engagement", labelKey: "discover.sortEngagement" },
  { value: "qualityScore", labelKey: "discover.sortQuality" },
  { value: "name", labelKey: "discover.sortName" },
]

export default function DiscoverPage() {
  const t = useTranslations("discover")
  const tCommon = useTranslations("common")
  const tPlatforms = useTranslations("platforms")
  const tCategories = useTranslations("categories")
  const tCountries = useTranslations("countries")

  const [search, setSearch] = useState("")
  const [platform, setPlatform] = useState<"" | Platform>("")
  const [country, setCountry] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [minFollowers, setMinFollowers] = useState<string>("")
  const [maxFollowers, setMaxFollowers] = useState<string>("")
  const [minEngagement, setMinEngagement] = useState<string>("")
  const [minQualityScore, setMinQualityScore] = useState([0])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("followers")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const influencers = useMemo(() => {
    return filterInfluencers({
      search: search || undefined,
      platform: platform || undefined,
      country: country || undefined,
      category: category || undefined,
      minFollowers: minFollowers ? parseInt(minFollowers, 10) : undefined,
      maxFollowers: maxFollowers ? parseInt(maxFollowers, 10) : undefined,
      minEngagement: minEngagement ? parseFloat(minEngagement) : undefined,
      minQualityScore: minQualityScore[0] > 0 ? minQualityScore[0] : undefined,
      isVerified: verifiedOnly ? true : undefined,
      sortBy,
      sortOrder,
    })
  }, [
    search,
    platform,
    country,
    category,
    minFollowers,
    maxFollowers,
    minEngagement,
    minQualityScore,
    verifiedOnly,
    sortBy,
    sortOrder,
  ])

  const hasActiveFilters =
    platform ||
    country ||
    category ||
    minFollowers ||
    maxFollowers ||
    minEngagement ||
    minQualityScore[0] > 0 ||
    verifiedOnly

  const clearFilters = () => {
    setPlatform("")
    setCountry("")
    setCategory("")
    setMinFollowers("")
    setMaxFollowers("")
    setMinEngagement("")
    setMinQualityScore([0])
    setVerifiedOnly(false)
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>{t("platform")}</Label>
        <Select value={platform || "all"} onValueChange={(v) => setPlatform(v === "all" ? "" : (v as Platform))}>
          <SelectTrigger>
            <SelectValue placeholder={tCommon("all")} />
          </SelectTrigger>
          <SelectContent>
            {PLATFORMS.map((p) => (
              <SelectItem key={p.value || "all"} value={p.value || "all"}>
                {p.value ? tPlatforms(p.value) : tCommon("all")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t("country")}</Label>
        <Select value={country || "all"} onValueChange={(v) => setCountry(v === "all" ? "" : v)}>
          <SelectTrigger>
            <SelectValue placeholder={tCommon("all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{tCommon("all")}</SelectItem>
            {COUNTRIES.map((c) => (
              <SelectItem key={c} value={c}>
                {tCountries(c as keyof typeof tCountries)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t("category")}</Label>
        <Select value={category || "all"} onValueChange={(v) => setCategory(v === "all" ? "" : v)}>
          <SelectTrigger>
            <SelectValue placeholder={tCommon("all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{tCommon("all")}</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {tCategories(c as keyof typeof tCategories)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t("followers")}</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">{t("minFollowers")}</Label>
            <Input
              type="number"
              placeholder="0"
              value={minFollowers}
              onChange={(e) => setMinFollowers(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">{t("maxFollowers")}</Label>
            <Input
              type="number"
              placeholder="∞"
              value={maxFollowers}
              onChange={(e) => setMaxFollowers(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t("minEngagement")}</Label>
        <Input
          type="number"
          step="0.1"
          placeholder="0"
          value={minEngagement}
          onChange={(e) => setMinEngagement(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>{t("qualityScore")} ({minQualityScore[0]})</Label>
        <Slider
          value={minQualityScore}
          onValueChange={setMinQualityScore}
          min={0}
          max={100}
          step={5}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="verified"
          checked={verifiedOnly}
          onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
        />
        <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">
          {t("verified")}
        </Label>
      </div>

      <div className="flex gap-2 pt-2">
        <Button variant="outline" className="flex-1" onClick={clearFilters}>
          {t("clearFilters")}
        </Button>
        <Button className="flex-1" onClick={() => setFiltersOpen(false)}>
          {t("apply")}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {t("filters")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FilterSidebar />
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {influencers.length} {t("results")}
              </p>
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden gap-2">
                    <Filter className="h-4 w-4" />
                    {t("filters")}
                    {hasActiveFilters && (
                      <span className="bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{t("filters")}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t("sortBy")}:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
                title={sortOrder === "asc" ? "Ascending" : "Descending"}
              >
                {sortOrder === "desc" ? "↓" : "↑"}
              </Button>
            </div>
          </div>

          {influencers.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-muted-foreground font-medium">{tCommon("noResults")}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  {t("clearFilters")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div
              className={cn(
                "grid gap-4",
                "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              )}
            >
              {influencers.map((influencer) => (
                <InfluencerCard
                  key={influencer.id}
                  influencer={influencer}
                  translations={{
                    viewProfile: t("viewProfile"),
                    addToList: t("addToList"),
                    addToCompare: t("compare"),
                    followers: t("followers"),
                    engagementRate: t("engagement"),
                    qualityScore: t("qualityScore"),
                    verified: t("verified"),
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
