"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Search,
  GitCompare,
  Megaphone,
  ListChecks,
  TrendingUp,
  Swords,
  FileBarChart,
  Settings,
  CreditCard,
  PanelLeftClose,
  PanelLeft,
  Shield,
} from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const SIDEBAR_STORAGE_KEY = "im-sidebar-collapsed"

type NavItem = {
  href: string
  icon: React.ComponentType<{ className?: string }>
  labelKey: string
}

type NavGroup = {
  titleKey: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    titleKey: "overview",
    items: [{ href: "/dashboard", icon: LayoutDashboard, labelKey: "dashboard" }],
  },
  {
    titleKey: "discovery",
    items: [
      { href: "/discover", icon: Search, labelKey: "discover" },
      { href: "/compare", icon: GitCompare, labelKey: "compare" },
    ],
  },
  {
    titleKey: "campaigns",
    items: [
      { href: "/campaigns", icon: Megaphone, labelKey: "campaigns" },
      { href: "/lists", icon: ListChecks, labelKey: "lists" },
    ],
  },
  {
    titleKey: "analytics",
    items: [
      { href: "/market", icon: TrendingUp, labelKey: "market" },
      { href: "/competitors", icon: Swords, labelKey: "competitors" },
      { href: "/reports", icon: FileBarChart, labelKey: "reports" },
    ],
  },
  {
    titleKey: "settings",
    items: [
      { href: "/settings", icon: Settings, labelKey: "settings" },
      { href: "/settings/billing", icon: CreditCard, labelKey: "billing" },
    ],
  },
]

interface SidebarProps {
  mobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
  isAdmin?: boolean
}

function SidebarContent({
  collapsed,
  isMobile = false,
  isAdmin = false,
  onToggleCollapse,
}: {
  collapsed: boolean
  isMobile?: boolean
  isAdmin?: boolean
  onToggleCollapse?: () => void
}) {
  const t = useTranslations("nav")
  const pathname = usePathname()

  const NavLink = ({
    item,
    collapsed: isCollapsed,
  }: {
    item: NavItem
    collapsed: boolean
  }) => {
    const Icon = item.icon
    const label = t(item.labelKey)
    const isActive =
      pathname === item.href || pathname.startsWith(item.href + "/")

    const linkContent = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!isCollapsed && <span className="truncate">{label}</span>}
      </Link>
    )

    if (isCollapsed && !isMobile) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      )
    }

    return linkContent
  }

  return (
    <div className="flex h-full flex-col">
      {/* Logo / Brand */}
      <div className="flex h-16 shrink-0 items-center border-b px-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 font-semibold text-foreground transition-opacity hover:opacity-80",
            collapsed && !isMobile && "justify-center w-full"
          )}
        >
          <span
            className={cn(
              "truncate",
              collapsed && !isMobile ? "text-lg" : "text-xl"
            )}
          >
            {collapsed && !isMobile ? "IM.tr" : "InfluencerMarketing.tr"}
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.titleKey}>
              {!collapsed && (
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(group.titleKey)}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NavLink item={item} collapsed={collapsed} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {isAdmin && (
            <>
              <Separator className="my-4" />
              <div>
                {!collapsed && (
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("admin")}
                  </h3>
                )}
                <ul className="space-y-1">
                  <li>
                    <NavLink
                      item={{
                        href: "/admin",
                        icon: Shield,
                        labelKey: "admin",
                      }}
                      collapsed={collapsed}
                    />
                  </li>
                </ul>
              </div>
            </>
          )}
        </nav>
      </ScrollArea>

      {/* Collapse toggle - only on desktop */}
      {!isMobile && onToggleCollapse && (
        <div className="border-t p-3">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-center gap-2 text-muted-foreground hover:text-foreground",
                  collapsed && "px-0"
                )}
                onClick={onToggleCollapse}
              >
                {collapsed ? (
                  <PanelLeft className="h-5 w-5" />
                ) : (
                  <>
                    <PanelLeftClose className="h-5 w-5" />
                    <span>{collapsed ? "" : t("collapse")}</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {collapsed ? t("expand") : t("collapse")}
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export function Sidebar({
  mobileOpen = false,
  onMobileOpenChange,
  isAdmin = false,
}: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
      setCollapsed(stored === "true")
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === SIDEBAR_STORAGE_KEY && e.newValue !== null) {
        setCollapsed(e.newValue === "true")
      }
    }

    const handleCustomEvent = () => {
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
      setCollapsed(stored === "true")
    }

    window.addEventListener("storage", handleStorage)
    window.addEventListener("sidebar-toggle", handleCustomEvent)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("sidebar-toggle", handleCustomEvent)
    }
  }, [])

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed((prev) => {
      const newValue = !prev
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(newValue))
        window.dispatchEvent(new CustomEvent("sidebar-toggle"))
      }
      return newValue
    })
  }, [])

  // Sync collapsed state across tabs via custom event
  React.useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
      setCollapsed(stored === "true")
    }
    window.addEventListener("sidebar-toggle", handler)
    return () => window.removeEventListener("sidebar-toggle", handler)
  }, [])

  const sidebarWidth = collapsed ? "w-[72px]" : "w-64"

  return (
    <TooltipProvider delayDuration={0}>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col lg:border-r lg:bg-card/50 lg:backdrop-blur-sm",
          "fixed left-0 top-0 z-40 h-screen transition-[width] duration-200",
          sidebarWidth
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          isMobile={false}
          isAdmin={isAdmin}
          onToggleCollapse={toggleCollapsed}
        />
      </aside>

      {/* Mobile Sidebar - Sheet */}
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent
          side="left"
          className="w-72 p-0 lg:hidden"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarContent
            collapsed={false}
            isMobile={true}
            isAdmin={isAdmin}
          />
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  )
}

export function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
      setCollapsed(stored === "true")
    }
  }, [])

  return collapsed
}
