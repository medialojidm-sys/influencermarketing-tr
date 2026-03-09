import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/layout/theme-provider"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: {
    default: "InfluencerMarketing.tr",
    template: "%s | InfluencerMarketing.tr",
  },
  description: "Türkiye'nin lider influencer marketing platformu. Instagram, YouTube ve TikTok influencer'larını keşfedin, analiz edin ve kampanyalarınızı yönetin.",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as "tr" | "en")) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
