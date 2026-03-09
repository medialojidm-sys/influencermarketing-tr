"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/layout/footer"
import {
  Search,
  BarChart3,
  Megaphone,
  ShieldCheck,
  Users,
  TrendingUp,
  Check,
  LogIn,
} from "lucide-react"

const FEATURE_ICONS = [
  Search,
  BarChart3,
  Megaphone,
  ShieldCheck,
  Users,
  TrendingUp,
] as const
const FEATURE_KEYS = [
  "discovery",
  "analytics",
  "campaigns",
  "fraud",
  "crm",
  "market",
] as const

const STATS = [
  { value: "200K+", key: "influencers" },
  { value: "4", key: "platforms" },
  { value: "35+", key: "metrics" },
  { value: "500+", key: "campaigns" },
] as const

const PRICING_PLANS = [
  "free",
  "starter",
  "professional",
  "enterprise",
] as const

export default function LandingPage() {
  const t = useTranslations("landing.hero")
  const tFeatures = useTranslations("landing.features")
  const tStats = useTranslations("landing.stats")
  const tPricing = useTranslations("landing.pricing")
  const tCta = useTranslations("landing.cta")
  const tAuth = useTranslations("auth")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              IM
            </div>
            <span className="text-lg font-bold hidden sm:inline">InfluencerMarketing.tr</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">{tFeatures("title")}</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">{tPricing("title")}</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login" className="gap-2">
                <LogIn className="h-4 w-4" />
                {tAuth("login")}
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">{t("cta")}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-primary/5 py-24 sm:py-32">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-3 h-3 rounded-full bg-primary/30 animate-float" />
          <div className="absolute top-40 right-[20%] w-2 h-2 rounded-full bg-primary/40 animate-float delay-300" />
          <div className="absolute top-60 left-[30%] w-4 h-4 rounded-full bg-primary/20 animate-float delay-500" />
          <div className="absolute top-32 right-[35%] w-2 h-2 rounded-full bg-primary/25 animate-float delay-700" />
          <div className="absolute bottom-40 left-[15%] w-3 h-3 rounded-full bg-primary/20 animate-float delay-1000" />
          <div className="absolute bottom-60 right-[25%] w-2 h-2 rounded-full bg-primary/35 animate-float delay-1500" />
          <div className="absolute top-1/3 left-[5%] w-1 h-1 rounded-full bg-primary/50 animate-float delay-200" />
          <div className="absolute top-1/4 right-[10%] w-2 h-2 rounded-full bg-primary/30 animate-float delay-600" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-foreground">{t("title")}</span>{" "}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/register">{t("cta")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link href="/login">
                <LogIn className="h-4 w-4 mr-2" />
                {tAuth("login")}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-12 px-8 text-base">
              <Link href="/contact">{t("ctaSecondary")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map(({ value, key }) => (
              <div
                key={key}
                className="text-center p-6 rounded-lg bg-background/80 border shadow-sm"
              >
                <p className="text-3xl font-bold text-primary md:text-4xl">
                  {value}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {tStats(key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {tFeatures("title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {tFeatures("subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_KEYS.map((key, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <Card
                  key={key}
                  className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">
                      {tFeatures(`${key}.title`)}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {tFeatures(`${key}.description`)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 sm:py-32 bg-muted/30" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {tPricing("title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {tPricing("subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_PLANS.map((plan) => {
              const isPopular = plan === "professional"
              const isEnterprise = plan === "enterprise"
              const features = tPricing.raw(`${plan}.features`) as string[]

              return (
                <Card
                  key={plan}
                  className={`relative flex flex-col ${
                    isPopular
                      ? "border-primary shadow-lg ring-2 ring-primary/20"
                      : ""
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary">
                        {tPricing("popular")}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">
                      {tPricing(`${plan}.name`)}
                    </CardTitle>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-bold">
                        {tPricing(`${plan}.price`)}
                      </span>
                      <span className="text-muted-foreground">
                        {tPricing(`${plan}.period`)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="mt-6 w-full"
                      variant={isPopular ? "default" : "outline"}
                    >
                      <Link href={isEnterprise ? "/contact" : "/register"}>
                        {isEnterprise
                          ? tPricing("ctaEnterprise")
                          : tPricing("cta")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {tCta("title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {tCta("subtitle")}
          </p>
          <Button asChild size="lg" className="mt-8 h-12 px-10 text-base">
            <Link href="/register">{tCta("button")}</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
