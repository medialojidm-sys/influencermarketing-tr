"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { getLists, createList, deleteList } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "@/i18n/navigation"
import { ListPlus, Plus, Eye, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ListsPage() {
  const t = useTranslations("lists")
  const tCommon = useTranslations("common")

  const [lists, setLists] = useState(() => getLists())
  const [createOpen, setCreateOpen] = useState(false)
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")

  const handleCreate = () => {
    if (!newName.trim()) return
    const list = createList(newName.trim(), newDescription.trim() || undefined)
    setLists(getLists())
    setNewName("")
    setNewDescription("")
    setCreateOpen(false)
  }

  const handleDelete = (listId: string) => {
    if (typeof window !== "undefined" && window.confirm("Are you sure you want to delete this list?")) {
      deleteList(listId)
      setLists(getLists())
    }
  }

  const formatDate = (dateStr: string) => {
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
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t("newList")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("create")}</DialogTitle>
              <DialogDescription>
                Create a new list to organize influencers for your campaigns
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="list-name">{t("name")}</Label>
                <Input
                  id="list-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Beauty Creators"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="list-desc">{t("description")}</Label>
                <Textarea
                  id="list-desc"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Optional description..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                {tCommon("cancel")}
              </Button>
              <Button onClick={handleCreate} disabled={!newName.trim()}>
                {tCommon("create")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {lists.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ListPlus className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-medium">{t("noLists")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first list to organize influencers
            </p>
            <Button className="mt-4" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("newList")}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <Card key={list.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1">{list.name}</CardTitle>
                {list.description && (
                  <CardDescription className="line-clamp-2">{list.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{list.items.length} {t("influencerCount")}</span>
                  <span>•</span>
                  <span>{t("createdAt")}: {formatDate(list.createdAt)}</span>
                </div>
                {list.items.length > 0 && (
                  <div className="flex -space-x-2 mt-3">
                    {list.items.slice(0, 4).map((item) => (
                      <Avatar
                        key={item.id}
                        className="h-8 w-8 border-2 border-background"
                      >
                        <AvatarImage src={item.influencer.avatar} />
                        <AvatarFallback className="text-xs">
                          {item.influencer.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 pt-0">
                <Button variant="default" size="sm" asChild>
                  <Link href={`/lists/${list.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    {t("view")}
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  {tCommon("edit")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(list.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {tCommon("delete")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
