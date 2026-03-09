"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"
import { Link, useRouter } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RegisterPage() {
  const t = useTranslations("auth")
  const router = useRouter()
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setIsLoading(true)
    try {
      // TODO: Wire up to registration API. For now, log and try demo login.
      console.log("Register:", { name, company, email })
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (result?.ok) {
        router.push("/dashboard")
      } else {
        setError("Registration coming soon. Use demo@influencermarketing.tr / demo123 to login.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full border-2 shadow-xl">
      <CardHeader className="space-y-2 text-center pb-2">
        <CardTitle className="text-2xl font-bold">
          InfluencerMarketing.tr
        </CardTitle>
        <CardDescription className="text-base">
          {t("register")}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">{t("company")}</Label>
            <Input
              id="company"
              type="text"
              placeholder="Acme Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-11 text-base"
            disabled={isLoading}
          >
            {isLoading ? "..." : t("register")}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <p className="text-sm text-muted-foreground">
            {t("hasAccount")}{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              {t("login")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
