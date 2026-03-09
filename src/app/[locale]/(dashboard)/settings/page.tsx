"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Key, Palette, Copy, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

const MASKED_API_KEY = "im_live_••••••••••••••••••••••••••••••••abcd"

export default function SettingsPage() {
  const t = useTranslations("settings")
  const tAuth = useTranslations("auth")
  const { theme, setTheme } = useTheme()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)

  const handleCopyKey = () => {
    navigator.clipboard.writeText("im_live_mock_api_key_placeholder")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "tr" | "en" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">Hesap ve tercih ayarlarınızı yönetin</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t("profile")}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {t("notifications")}
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            {t("api")}
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {t("theme")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t("profile")}</CardTitle>
              <CardDescription>Profil bilgileriniz (salt okunur)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback className="text-xl">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">{t("name")}</p>
                  <p className="font-semibold text-lg">John Doe</p>
                  <p className="text-sm text-muted-foreground mt-2">{t("email")}</p>
                  <p className="font-medium">john.doe@example.com</p>
                  <p className="text-sm text-muted-foreground mt-2">{t("company")}</p>
                  <p className="font-medium">Acme Inc.</p>
                </div>
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">{t("role")}</p>
                  <Badge variant="secondary">User</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("plan")}</p>
                  <Badge className="bg-primary/15 text-primary">Professional</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("notifications")}</CardTitle>
              <CardDescription>Bildirim tercihlerinizi yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">{t("emailNotifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    Önemli güncellemeler için e-posta alın
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="campaign-updates">{t("campaignUpdates")}</Label>
                  <p className="text-sm text-muted-foreground">
                    Kampanya durum değişikliklerinde bildirim
                  </p>
                </div>
                <Switch id="campaign-updates" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-reports">{t("weeklyReports")}</Label>
                  <p className="text-sm text-muted-foreground">
                    Haftalık performans özeti e-postası
                  </p>
                </div>
                <Switch id="weekly-reports" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-emails">{t("marketingEmails")}</Label>
                  <p className="text-sm text-muted-foreground">
                    İpuçları, yeni özellikler ve kampanyalar
                  </p>
                </div>
                <Switch id="marketing-emails" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>{t("api")}</CardTitle>
              <CardDescription>API anahtarınızı yönetin ve kullanımı takip edin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>{t("apiKey")}</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 rounded-md border bg-muted px-4 py-2 font-mono text-sm">
                    {MASKED_API_KEY}
                  </code>
                  <Button variant="outline" size="icon" onClick={handleCopyKey}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  {copied && (
                    <span className="text-sm text-green-600 flex items-center">Kopyalandı</span>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2">{t("usageStats")}</h4>
                <div className="flex gap-4">
                  <div className="rounded-lg border p-4">
                    <p className="text-2xl font-bold">847</p>
                    <p className="text-xs text-muted-foreground">{t("requestsToday")}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-2xl font-bold">1000</p>
                    <p className="text-xs text-muted-foreground">{t("requestsLimit")}</p>
                  </div>
                </div>
              </div>
              <Separator />
              <Button variant="destructive" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                {t("regenerateKey")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>{t("theme")}</CardTitle>
              <CardDescription>Tema ve dil tercihlerinizi ayarlayın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-3 block">Görünüm</Label>
                <div className="flex gap-2">
                  {(["light", "dark", "system"] as const).map((mode) => (
                    <Button
                      key={mode}
                      variant={theme === mode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme(mode)}
                    >
                      {t(
                        mode === "light"
                          ? "lightMode"
                          : mode === "dark"
                            ? "darkMode"
                            : "system"
                      )}
                    </Button>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <Label className="mb-3 block">{t("language")}</Label>
                <div className="flex gap-2">
                  <Button
                    variant={locale === "tr" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLocaleChange("tr")}
                  >
                    Türkçe (TR)
                  </Button>
                  <Button
                    variant={locale === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLocaleChange("en")}
                  >
                    English (EN)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
