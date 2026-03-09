"use client"

import * as React from "react"
import { Instagram, Youtube, Twitter, Linkedin } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
]

export function Footer() {
  const t = useTranslations("landing.footer")
  const tNav = useTranslations("nav")

  return (
    <footer className="border-t bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold text-foreground hover:opacity-80"
            >
              InfluencerMarketing.tr
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("product")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/discover"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {tNav("discover")}
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {tNav("campaigns")}
                </Link>
              </li>
              <li>
                <Link
                  href="/market"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {tNav("market")}
                </Link>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("company")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("careers")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("legal")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social + Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InfluencerMarketing.tr. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
