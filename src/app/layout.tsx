import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "InfluencerMarketing.tr",
  description: "Türkiye'nin lider influencer marketing platformu",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
