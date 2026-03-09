"use client"

import * as React from "react"
import { Menu, Search, Sun, Moon, Bell, User, Settings, LogOut } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const pathnameToBreadcrumb: Record<string, string> = {
  "/dashboard": "dashboard",
  "/discover": "discover",
  "/compare": "compare",
  "/campaigns": "campaigns",
  "/lists": "lists",
  "/market": "market",
  "/competitors": "competitors",
  "/reports": "reports",
  "/settings": "settings",
  "/settings/billing": "billing",
  "/admin": "admin",
}

interface HeaderProps {
  onMenuClick?: () => void
  notificationCount?: number
  user?: {
    name?: string
    email?: string
    image?: string
  }
}

export function Header({
  onMenuClick,
  notificationCount = 0,
  user,
}: HeaderProps) {
  const t = useTranslations("header")
  const tNav = useTranslations("nav")
  const locale = useLocale()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const breadcrumbKey = Object.keys(pathnameToBreadcrumb)
    .sort((a, b) => b.length - a.length) // Prefer longer matches (e.g. /settings/billing before /settings)
    .find((path) =>
      pathname === path || (path !== "/dashboard" && pathname.startsWith(path))
    )
  const breadcrumbLabel = breadcrumbKey
    ? tNav(pathnameToBreadcrumb[breadcrumbKey])
    : pathname.split("/").filter(Boolean).pop() || tNav("dashboard")

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "tr" | "en" })
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md lg:px-6">
      {/* Left: Mobile menu + Breadcrumb */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <nav aria-label="Breadcrumb" className="flex items-center">
          <span className="text-sm font-medium text-foreground">
            {breadcrumbLabel}
          </span>
        </nav>
      </div>

      {/* Center: Global search */}
      <div className="flex-1 flex justify-center max-w-md mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchPlaceholder")}
            className="pl-9 w-full bg-muted/50"
          />
        </div>
      </div>

      {/* Right: Language, Theme, Notifications, User */}
      <div className="flex items-center gap-2">
        {/* Language switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 px-2">
              <span className="text-sm font-medium">
                {locale.toUpperCase()}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[100px]">
            <DropdownMenuItem onClick={() => handleLocaleChange("tr")}>
              Türkçe (TR)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLocaleChange("en")}>
              English (EN)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full p-0 text-[10px]"
            >
              {notificationCount > 99 ? "99+" : notificationCount}
            </Badge>
          )}
          <span className="sr-only">{t("notifications")}</span>
        </Button>

        {/* User avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback>
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user?.name || "User"}</span>
                <span className="text-xs text-muted-foreground font-normal">
                  {user?.email || "user@example.com"}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {t("profile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                {tNav("settings")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                // TODO: Implement sign out - e.g. signOut from next-auth
              }}
            >
              <LogOut className="h-4 w-4" />
              {t("signOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
