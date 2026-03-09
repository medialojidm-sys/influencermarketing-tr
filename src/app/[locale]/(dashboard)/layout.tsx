"use client"

import { useState } from "react"
import { Sidebar, useSidebarCollapsed } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const collapsed = useSidebarCollapsed()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileOpenChange={setMobileSidebarOpen}
        isAdmin={true}
      />
      <div
        className={cn(
          "flex flex-col transition-[padding-left] duration-200",
          collapsed ? "lg:pl-[72px]" : "lg:pl-64"
        )}
      >
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
