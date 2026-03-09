import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

export function formatCurrency(amount: number, currency = "TRY"): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`
}

export function getEngagementColor(rate: number): string {
  if (rate >= 5) return "text-green-500"
  if (rate >= 3) return "text-yellow-500"
  if (rate >= 1) return "text-orange-500"
  return "text-red-500"
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-500"
  if (score >= 60) return "text-yellow-500"
  if (score >= 40) return "text-orange-500"
  return "text-red-500"
}

export function getPlatformColor(platform: string): string {
  switch (platform.toLowerCase()) {
    case "instagram": return "bg-gradient-to-r from-purple-500 to-pink-500"
    case "youtube": return "bg-red-500"
    case "tiktok": return "bg-black dark:bg-white dark:text-black"
    case "twitter": return "bg-blue-400"
    default: return "bg-gray-500"
  }
}

export function getPlatformIcon(platform: string): string {
  switch (platform.toLowerCase()) {
    case "instagram": return "Instagram"
    case "youtube": return "Youtube"
    case "tiktok": return "Music2"
    case "twitter": return "Twitter"
    default: return "Globe"
  }
}

export const platformChartColors: Record<string, string> = {
  instagram: "#E1306C",
  youtube: "#FF0000",
  tiktok: "#00F2EA",
  twitter: "#1DA1F2",
}
