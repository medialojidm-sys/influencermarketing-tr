import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const influencersData = [
  { name: "Danla Bilic", bio: "Güzellik ve makyaj içerik üreticisi.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=danla", email: "danla@example.com", website: "https://danla.com", country: "TR", city: "İstanbul", language: "tr", categories: JSON.stringify(["beauty", "lifestyle"]), qualityScore: 92, fraudScore: 8, isVerified: true, totalReach: 18500000, socialAccounts: [{ platform: "instagram", username: "danlabilic", followers: 8200000, following: 850, posts: 2340, engagementRate: 4.2, avgLikes: 340000, avgComments: 12000 }, { platform: "youtube", username: "DanlaBilic", followers: 6800000, posts: 450, engagementRate: 5.1, avgLikes: 180000, avgComments: 8500, avgViews: 2500000 }, { platform: "tiktok", username: "danlabilic", followers: 3500000, following: 120, posts: 890, engagementRate: 6.8, avgLikes: 250000, avgComments: 5000, avgViews: 4200000 }] },
  { name: "Enes Batur", bio: "Türkiye'nin en çok takip edilen YouTuber'ı.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=enes", country: "TR", city: "İstanbul", language: "tr", categories: JSON.stringify(["entertainment", "gaming"]), qualityScore: 85, fraudScore: 12, isVerified: true, totalReach: 32000000, socialAccounts: [{ platform: "youtube", username: "EnesBatur", followers: 18000000, posts: 1200, engagementRate: 3.8, avgLikes: 450000, avgComments: 25000, avgViews: 5000000 }, { platform: "instagram", username: "enesbatur", followers: 12000000, following: 320, posts: 1800, engagementRate: 2.9, avgLikes: 380000, avgComments: 9000 }] },
  { name: "Burak Özdemir", bio: "CZN Burak - Dünyaca ünlü şef.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=burak", country: "TR", city: "Hatay", language: "tr", categories: JSON.stringify(["food", "lifestyle"]), qualityScore: 95, fraudScore: 5, isVerified: true, totalReach: 75000000, socialAccounts: [{ platform: "instagram", username: "cznburak", followers: 45000000, following: 200, posts: 3200, engagementRate: 3.5, avgLikes: 1500000, avgComments: 45000 }, { platform: "tiktok", username: "cznburak", followers: 25000000, following: 50, posts: 560, engagementRate: 8.2, avgLikes: 3000000, avgComments: 80000, avgViews: 25000000 }] },
  { name: "Duygu Özaslan", bio: "Moda ve yaşam tarzı blog yazarı.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=duygu", country: "TR", city: "İstanbul", language: "tr", categories: JSON.stringify(["fashion", "lifestyle"]), qualityScore: 88, fraudScore: 10, isVerified: true, totalReach: 5200000, socialAccounts: [{ platform: "instagram", username: "duyguozaslan", followers: 3800000, following: 650, posts: 2100, engagementRate: 3.1, avgLikes: 95000, avgComments: 2800 }] },
  { name: "Berkcan Güven", bio: "Komedi ve günlük vlog içerikleri.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=berkcan", country: "TR", city: "İstanbul", language: "tr", categories: JSON.stringify(["entertainment", "lifestyle"]), qualityScore: 82, fraudScore: 15, isVerified: true, totalReach: 9500000, socialAccounts: [{ platform: "youtube", username: "BerkcanGuven", followers: 5500000, posts: 800, engagementRate: 4.5, avgLikes: 180000, avgComments: 12000, avgViews: 3200000 }, { platform: "instagram", username: "berkcanguven", followers: 3200000, following: 420, posts: 1500, engagementRate: 2.8, avgLikes: 72000, avgComments: 3200 }] },
  { name: "Sophie Chen", bio: "Beauty guru and skincare expert.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophie", country: "US", city: "New York", language: "en", categories: JSON.stringify(["beauty", "health"]), qualityScore: 94, fraudScore: 4, isVerified: true, totalReach: 6200000, socialAccounts: [{ platform: "instagram", username: "sophieskin", followers: 3500000, following: 450, posts: 1950, engagementRate: 4.5, avgLikes: 135000, avgComments: 6800 }, { platform: "youtube", username: "SophieChen", followers: 2200000, posts: 380, engagementRate: 5.2, avgLikes: 78000, avgComments: 3200, avgViews: 1200000 }] },
  { name: "Alex Johnson", bio: "Lifestyle and travel vlogger.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", country: "US", city: "Los Angeles", language: "en", categories: JSON.stringify(["travel", "lifestyle"]), qualityScore: 89, fraudScore: 8, isVerified: true, totalReach: 8500000, socialAccounts: [{ platform: "instagram", username: "alexjtravel", followers: 4200000, following: 620, posts: 2800, engagementRate: 3.8, avgLikes: 145000, avgComments: 5200 }, { platform: "youtube", username: "AlexJohnson", followers: 3100000, posts: 520, engagementRate: 4.5, avgLikes: 95000, avgComments: 4800, avgViews: 1800000 }] },
  { name: "Emma Wilson", bio: "Fashion designer and style influencer.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", country: "GB", city: "London", language: "en", categories: JSON.stringify(["fashion", "lifestyle"]), qualityScore: 91, fraudScore: 6, isVerified: true, totalReach: 5600000, socialAccounts: [{ platform: "instagram", username: "emmawstyle", followers: 3200000, following: 520, posts: 1800, engagementRate: 4.2, avgLikes: 118000, avgComments: 4800 }, { platform: "tiktok", username: "emmawstyle", followers: 1800000, following: 150, posts: 520, engagementRate: 7.5, avgLikes: 142000, avgComments: 5200, avgViews: 3500000 }] },
  { name: "Marco Rossi", bio: "Italian food and cooking content creator.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marco", country: "IT", city: "Rome", language: "it", categories: JSON.stringify(["food", "lifestyle"]), qualityScore: 88, fraudScore: 9, isVerified: true, totalReach: 4800000, socialAccounts: [{ platform: "instagram", username: "marcocooks", followers: 2800000, following: 380, posts: 2200, engagementRate: 4.1, avgLikes: 98000, avgComments: 4500 }] },
  { name: "Elif Sanat", bio: "Dijital sanatçı ve illüstratör.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elif", country: "TR", city: "Eskişehir", language: "tr", categories: JSON.stringify(["art", "education"]), qualityScore: 96, fraudScore: 3, isVerified: false, totalReach: 900000, socialAccounts: [{ platform: "instagram", username: "elifsanat", followers: 520000, following: 680, posts: 2200, engagementRate: 6.2, avgLikes: 28000, avgComments: 1800 }, { platform: "youtube", username: "ElifSanat", followers: 280000, posts: 180, engagementRate: 5.8, avgLikes: 12000, avgComments: 950, avgViews: 180000 }] },
]

const campaignsData = [
  { name: "Yaz Kampanyası 2024", description: "Yaz sezonu ürün tanıtım kampanyası", status: "active", platform: "instagram", budget: 150000, spent: 85000, startDate: new Date("2024-06-01"), endDate: new Date("2024-08-31") },
  { name: "Tech Ürün Lansmanı", description: "Yeni teknoloji ürünü lansmanı", status: "completed", platform: "youtube", budget: 250000, spent: 230000, startDate: new Date("2024-03-01"), endDate: new Date("2024-04-30") },
  { name: "Güzellik Serisi", description: "Güzellik ürünleri tanıtım serisi", status: "active", platform: "tiktok", budget: 80000, spent: 35000, startDate: new Date("2024-07-01"), endDate: new Date("2024-09-30") },
  { name: "Fitness Challenge", description: "30 günlük fitness challenge", status: "draft", platform: "instagram", budget: 120000, spent: 0, startDate: new Date("2024-10-01"), endDate: new Date("2024-10-31") },
  { name: "Back to School", description: "Okula dönüş sezonu kampanyası", status: "completed", platform: "youtube", budget: 95000, spent: 92000, startDate: new Date("2024-08-15"), endDate: new Date("2024-09-15") },
]

async function main() {
  console.log("Seeding database...")

  // Create demo users
  const admin = await prisma.user.upsert({
    where: { email: "admin@influencermarketing.tr" },
    update: {},
    create: {
      email: "admin@influencermarketing.tr",
      name: "Admin User",
      password: "$2a$10$placeholder",
      company: "InfluencerMarketing.tr",
      role: "admin",
      plan: "enterprise",
    },
  })

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@influencermarketing.tr" },
    update: {},
    create: {
      email: "demo@influencermarketing.tr",
      name: "Demo User",
      password: "$2a$10$placeholder",
      company: "Demo Company",
      role: "user",
      plan: "professional",
    },
  })

  // Create influencers with social accounts
  for (const data of influencersData) {
    const { socialAccounts, ...influencerData } = data
    const influencer = await prisma.influencer.create({
      data: {
        ...influencerData,
        socialAccounts: {
          create: socialAccounts.map((sa) => ({
            platform: sa.platform,
            username: sa.username,
            profileUrl: `https://${sa.platform}.com/${sa.username}`,
            followers: sa.followers,
            following: sa.following || 0,
            posts: sa.posts,
            engagementRate: sa.engagementRate,
            avgLikes: sa.avgLikes,
            avgComments: sa.avgComments,
            avgViews: sa.avgViews || 0,
            isVerified: data.isVerified,
          })),
        },
      },
    })

    // Create audience data for the last 12 months
    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date()
      d.setMonth(d.getMonth() - (11 - i))
      return d
    })

    for (const date of months) {
      const baseFollowers = Math.max(...socialAccounts.map((sa) => sa.followers))
      const monthIdx = months.indexOf(date)
      await prisma.audienceData.create({
        data: {
          influencerId: influencer.id,
          platform: socialAccounts[0].platform,
          date,
          followers: Math.floor(baseFollowers * (0.7 + monthIdx * 0.028)),
          ageData: JSON.stringify([
            { range: "13-17", percentage: 8 }, { range: "18-24", percentage: 35 },
            { range: "25-34", percentage: 32 }, { range: "35-44", percentage: 15 },
            { range: "45-54", percentage: 7 }, { range: "55+", percentage: 3 },
          ]),
          genderData: JSON.stringify([
            { type: "female", percentage: 58 + Math.floor(Math.random() * 10) },
            { type: "male", percentage: 35 + Math.floor(Math.random() * 8) },
            { type: "other", percentage: 2 },
          ]),
          locationData: JSON.stringify([
            { country: "TR", percentage: 55 + Math.floor(Math.random() * 20) },
            { country: "DE", percentage: 5 + Math.floor(Math.random() * 5) },
            { country: "US", percentage: 5 + Math.floor(Math.random() * 5) },
            { country: "GB", percentage: 3 + Math.floor(Math.random() * 3) },
            { country: "FR", percentage: 2 + Math.floor(Math.random() * 3) },
          ]),
          interestData: JSON.stringify(
            data.categories.length > 0
              ? JSON.parse(data.categories).map((c: string, i: number) => ({ name: c, percentage: 30 - i * 8 }))
              : [{ name: "general", percentage: 50 }]
          ),
        },
      })

      await prisma.engagementMetric.create({
        data: {
          influencerId: influencer.id,
          platform: socialAccounts[0].platform,
          date,
          engagementRate: socialAccounts[0].engagementRate + (Math.random() - 0.5) * 1.5,
          likes: Math.floor(socialAccounts[0].avgLikes * (0.8 + Math.random() * 0.4)),
          comments: Math.floor(socialAccounts[0].avgComments * (0.7 + Math.random() * 0.6)),
          shares: Math.floor(Math.random() * 5000),
          views: Math.floor((socialAccounts[0].avgViews || 100000) * (0.8 + Math.random() * 0.4)),
          reach: Math.floor(socialAccounts[0].followers * 0.15 * (0.8 + Math.random() * 0.4)),
          impressions: Math.floor(socialAccounts[0].followers * 0.4 * (0.8 + Math.random() * 0.4)),
        },
      })
    }
  }

  // Create campaigns
  for (const campaignData of campaignsData) {
    await prisma.campaign.create({
      data: {
        ...campaignData,
        userId: demoUser.id,
        goals: JSON.stringify({
          reach: Math.floor(Math.random() * 10000000),
          engagement: Math.floor(Math.random() * 500000),
          conversions: Math.floor(Math.random() * 10000),
        }),
        results: campaignData.status === "completed" ? JSON.stringify({
          totalReach: Math.floor(Math.random() * 15000000),
          totalEngagement: Math.floor(Math.random() * 700000),
          totalImpressions: Math.floor(Math.random() * 30000000),
          totalClicks: Math.floor(Math.random() * 200000),
          totalConversions: Math.floor(Math.random() * 10000),
          roi: 1.5 + Math.random() * 3,
        }) : null,
      },
    })
  }

  // Create influencer lists
  await prisma.influencerList.create({
    data: {
      name: "Top Beauty Influencers",
      description: "En iyi güzellik influencer'ları listesi",
      userId: demoUser.id,
    },
  })

  await prisma.influencerList.create({
    data: {
      name: "Tech Reviewers",
      description: "Teknoloji incelemecileri",
      userId: demoUser.id,
    },
  })

  console.log("Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
