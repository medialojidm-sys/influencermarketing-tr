"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import {
  getListById,
  getInfluencers,
  searchInfluencers,
  addInfluencerToList,
  removeInfluencerFromList,
  updateListItemNotes,
} from "@/lib/mock-data"
import { formatNumber, getEngagementColor, getPlatformColor } from "@/lib/utils"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "@/i18n/navigation"
import {
  UserPlus,
  Search,
  Download,
  ChevronRight,
  Trash2,
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

function getAvgEngagement(inf: Influencer): number {
  if (inf.socialAccounts.length === 0) return 0
  return inf.socialAccounts.reduce((s, sa) => s + sa.engagementRate, 0) / inf.socialAccounts.length
}

export default function ListDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const t = useTranslations("lists")
  const tPlatforms = useTranslations("platforms")
  const tCommon = useTranslations("common")

  const [list, setList] = useState(() => getListById(id))
  const [addOpen, setAddOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const allInfluencers = getInfluencers()
  const filteredInfluencers = useMemo(() => {
    if (!searchQuery.trim()) return allInfluencers
    return searchInfluencers(searchQuery)
  }, [searchQuery, allInfluencers])

  const existingIds = new Set(list?.items.map((i) => i.influencer.id) ?? [])
  const availableInfluencers = filteredInfluencers.filter((inf) => !existingIds.has(inf.id))

  const handleAddInfluencer = (inf: Influencer) => {
    if (!list) return
    addInfluencerToList(list.id, inf)
    const updated = getListById(id)
    if (updated) setList({ ...updated, items: [...updated.items] })
    setAddOpen(false)
    setSearchQuery("")
  }

  const handleRemove = (itemId: string) => {
    if (!list) return
    removeInfluencerFromList(list.id, itemId)
    const updated = getListById(id)
    if (updated) setList({ ...updated, items: [...updated.items] })
  }

  if (!list) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-semibold text-muted-foreground">List not found</h2>
        <Button asChild variant="outline">
          <Link href="/lists">Back to Lists</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{list.name}</h1>
          {list.description && (
            <p className="text-muted-foreground mt-1">{list.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                {t("addInfluencer")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t("addInfluencer")}</DialogTitle>
                <DialogDescription>{t("searchInfluencer")}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={tCommon("search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="max-h-[300px] overflow-y-auto border rounded-md">
                  {availableInfluencers.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-8 text-center">
                      {tCommon("noResults")}
                    </p>
                  ) : (
                    availableInfluencers.slice(0, 12).map((inf) => (
                      <button
                        key={inf.id}
                        type="button"
                        className="w-full flex items-center gap-3 p-3 hover:bg-accent text-left transition-colors border-b last:border-0"
                        onClick={() => handleAddInfluencer(inf)}
                      >
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarImage src={inf.avatar} />
                          <AvatarFallback>{inf.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{inf.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatNumber(inf.totalReach)} reach •{" "}
                            {getAvgEngagement(inf).toFixed(1)}% engagement
                          </p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {inf.socialAccounts.slice(0, 3).map((acc) => {
                            const Icon = platformIcons[acc.platform]
                            return (
                              <Badge
                                key={acc.id}
                                variant="secondary"
                                className={cn(
                                  "text-xs px-1",
                                  getPlatformColor(acc.platform),
                                  acc.platform === "tiktok" ? "text-white dark:text-black" : "text-white"
                                )}
                              >
                                {Icon && <Icon className="h-3 w-3" />}
                              </Badge>
                            )
                          })}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t("exportList")}
          </Button>
        </div>
      </div>

      {/* Influencer table */}
      <Card>
        <CardHeader>
          <CardTitle>Influencers ({list.items.length})</CardTitle>
          <CardDescription>Manage influencers in this list</CardDescription>
        </CardHeader>
        <CardContent>
          {list.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground font-medium">No influencers in this list</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add influencers using the button above
              </p>
              <Button className="mt-4" onClick={() => setAddOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                {t("addInfluencer")}
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Followers</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>{t("notes")}</TableHead>
                  <TableHead>{t("tags")}</TableHead>
                  <TableHead className="w-[160px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.items.map((item) => {
                  const inf = item.influencer
                  const avgEng = getAvgEngagement(inf)
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={inf.avatar} />
                            <AvatarFallback>{inf.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{inf.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {inf.socialAccounts.slice(0, 4).map((acc) => {
                            const Icon = platformIcons[acc.platform]
                            return (
                              <Badge
                                key={acc.id}
                                variant="secondary"
                                className={cn(
                                  "text-xs px-1",
                                  getPlatformColor(acc.platform),
                                  acc.platform === "tiktok" ? "text-white dark:text-black" : "text-white"
                                )}
                              >
                                {Icon && <Icon className="h-3 w-3" />}
                              </Badge>
                            )
                          })}
                        </div>
                      </TableCell>
                      <TableCell>{formatNumber(Math.max(...inf.socialAccounts.map((sa) => sa.followers), 0))}</TableCell>
                      <TableCell>
                        <span className={cn("font-medium", getEngagementColor(avgEng))}>
                          {avgEng.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.notes ?? ""}
                          placeholder="Add notes..."
                          className="h-8 text-sm"
                          onChange={(e) => {
                            const updated = list.items.map((i) =>
                              i.id === item.id ? { ...i, notes: e.target.value } : i
                            )
                            setList({ ...list, items: updated })
                          }}
                          onBlur={(e) => updateListItemNotes(list.id, item.id, e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {(!item.tags || item.tags.length === 0) && (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/influencer/${inf.id}`}>
                              {t("viewProfile")}
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleRemove(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
