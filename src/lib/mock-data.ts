import type { Influencer, Campaign, DashboardStats, EngagementMetric, AudienceData, InfluencerList, InfluencerListItem, CampaignInfluencer } from "@/types"

const influencersList: Influencer[] = [
  {
    id: "inf-1", name: "Danla Bilic", bio: "Güzellik ve makyaj içerik üreticisi. YouTube & Instagram.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=danla", email: "danla@example.com", website: "https://danla.com", country: "TR", city: "İstanbul", language: "tr", categories: ["beauty", "lifestyle"], qualityScore: 92, fraudScore: 8, isVerified: true, totalReach: 18500000, createdAt: "2024-01-15", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-1", platform: "instagram", username: "danlabilic", profileUrl: "https://instagram.com/danlabilic", followers: 8200000, following: 850, posts: 2340, engagementRate: 4.2, avgLikes: 340000, avgComments: 12000, avgViews: 0, isVerified: true },
      { id: "sa-2", platform: "youtube", username: "DanlaBilic", profileUrl: "https://youtube.com/danlabilic", followers: 6800000, following: 0, posts: 450, engagementRate: 5.1, avgLikes: 180000, avgComments: 8500, avgViews: 2500000, isVerified: true },
      { id: "sa-3", platform: "tiktok", username: "danlabilic", profileUrl: "https://tiktok.com/@danlabilic", followers: 3500000, following: 120, posts: 890, engagementRate: 6.8, avgLikes: 250000, avgComments: 5000, avgViews: 4200000, isVerified: true },
    ],
  },
  {
    id: "inf-2", name: "Enes Batur", bio: "Türkiye'nin en çok takip edilen YouTuber'ı. Eğlence ve oyun içerikleri.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=enes", country: "TR", city: "İstanbul", language: "tr", categories: ["entertainment", "gaming"], qualityScore: 85, fraudScore: 12, isVerified: true, totalReach: 32000000, createdAt: "2024-01-10", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-4", platform: "youtube", username: "EnesBatur", followers: 18000000, following: 0, posts: 1200, engagementRate: 3.8, avgLikes: 450000, avgComments: 25000, avgViews: 5000000, isVerified: true },
      { id: "sa-5", platform: "instagram", username: "enesbatur", followers: 12000000, following: 320, posts: 1800, engagementRate: 2.9, avgLikes: 380000, avgComments: 9000, avgViews: 0, isVerified: true },
      { id: "sa-6", platform: "tiktok", username: "enesbatur", followers: 2000000, following: 85, posts: 340, engagementRate: 5.5, avgLikes: 120000, avgComments: 3500, avgViews: 3000000, isVerified: true },
    ],
  },
  {
    id: "inf-3", name: "Burak Özdemir", bio: "CZN Burak - Dünyaca ünlü şef ve yemek içerik üreticisi.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=burak", country: "TR", city: "Hatay", language: "tr", categories: ["food", "lifestyle"], qualityScore: 95, fraudScore: 5, isVerified: true, totalReach: 75000000, createdAt: "2024-01-05", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-7", platform: "instagram", username: "cznburak", followers: 45000000, following: 200, posts: 3200, engagementRate: 3.5, avgLikes: 1500000, avgComments: 45000, avgViews: 0, isVerified: true },
      { id: "sa-8", platform: "tiktok", username: "cznburak", followers: 25000000, following: 50, posts: 560, engagementRate: 8.2, avgLikes: 3000000, avgComments: 80000, avgViews: 25000000, isVerified: true },
      { id: "sa-9", platform: "youtube", username: "CZNBurak", followers: 5000000, following: 0, posts: 180, engagementRate: 4.1, avgLikes: 250000, avgComments: 12000, avgViews: 8000000, isVerified: true },
    ],
  },
  {
    id: "inf-4", name: "Duygu Özaslan", bio: "Moda ve yaşam tarzı blog yazarı. Stil ipuçları ve günlük.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=duygu", country: "TR", city: "İstanbul", language: "tr", categories: ["fashion", "lifestyle"], qualityScore: 88, fraudScore: 10, isVerified: true, totalReach: 5200000, createdAt: "2024-02-01", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-10", platform: "instagram", username: "duyguozaslan", followers: 3800000, following: 650, posts: 2100, engagementRate: 3.1, avgLikes: 95000, avgComments: 2800, avgViews: 0, isVerified: true },
      { id: "sa-11", platform: "youtube", username: "DuyguÖzaslan", followers: 1400000, following: 0, posts: 320, engagementRate: 3.8, avgLikes: 42000, avgComments: 1800, avgViews: 650000, isVerified: true },
    ],
  },
  {
    id: "inf-5", name: "Berkcan Güven", bio: "Komedi ve günlük vlog içerikleri. Türkiye'nin popüler YouTuber'ı.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=berkcan", country: "TR", city: "İstanbul", language: "tr", categories: ["entertainment", "lifestyle"], qualityScore: 82, fraudScore: 15, isVerified: true, totalReach: 9500000, createdAt: "2024-02-10", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-12", platform: "youtube", username: "BerkcanGuven", followers: 5500000, following: 0, posts: 800, engagementRate: 4.5, avgLikes: 180000, avgComments: 12000, avgViews: 3200000, isVerified: true },
      { id: "sa-13", platform: "instagram", username: "berkcanguven", followers: 3200000, following: 420, posts: 1500, engagementRate: 2.8, avgLikes: 72000, avgComments: 3200, avgViews: 0, isVerified: true },
      { id: "sa-14", platform: "tiktok", username: "berkcanguven", followers: 800000, following: 95, posts: 210, engagementRate: 7.2, avgLikes: 65000, avgComments: 2100, avgViews: 1800000, isVerified: false },
    ],
  },
  {
    id: "inf-6", name: "Şeyda Erdoğan", bio: "Seyahat ve fotoğraf tutkunu. Dünyayı gezip fotoğraflıyor.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seyda", country: "TR", city: "İzmir", language: "tr", categories: ["travel", "art"], qualityScore: 90, fraudScore: 7, isVerified: true, totalReach: 2800000, createdAt: "2024-03-01", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-15", platform: "instagram", username: "seydaerdogan", followers: 2100000, following: 890, posts: 1800, engagementRate: 4.8, avgLikes: 82000, avgComments: 3500, avgViews: 0, isVerified: true },
      { id: "sa-16", platform: "youtube", username: "ŞeydaErdoğan", followers: 700000, following: 0, posts: 150, engagementRate: 3.2, avgLikes: 18000, avgComments: 950, avgViews: 320000, isVerified: false },
    ],
  },
  {
    id: "inf-7", name: "Doğukan Adal", bio: "Oyun ve teknoloji içerik üreticisi. E-spor yorumcusu.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dogukan", country: "TR", city: "Ankara", language: "tr", categories: ["gaming", "technology"], qualityScore: 86, fraudScore: 9, isVerified: true, totalReach: 6800000, createdAt: "2024-02-15", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-17", platform: "youtube", username: "DogukanAdal", followers: 4200000, following: 0, posts: 950, engagementRate: 4.8, avgLikes: 150000, avgComments: 8500, avgViews: 2800000, isVerified: true },
      { id: "sa-18", platform: "instagram", username: "dogukanadal", followers: 1800000, following: 310, posts: 850, engagementRate: 3.5, avgLikes: 52000, avgComments: 2200, avgViews: 0, isVerified: true },
      { id: "sa-19", platform: "tiktok", username: "dogukanadal", followers: 800000, following: 45, posts: 180, engagementRate: 6.5, avgLikes: 55000, avgComments: 1800, avgViews: 1500000, isVerified: false },
    ],
  },
  {
    id: "inf-8", name: "Ezgi Fındık", bio: "Sağlıklı yaşam, fitness ve beslenme koçu. Motivasyon kaynağı.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ezgi", country: "TR", city: "İstanbul", language: "tr", categories: ["fitness", "health"], qualityScore: 91, fraudScore: 6, isVerified: true, totalReach: 3400000, createdAt: "2024-03-10", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-20", platform: "instagram", username: "ezgifindik", followers: 2400000, following: 520, posts: 1600, engagementRate: 5.2, avgLikes: 105000, avgComments: 4200, avgViews: 0, isVerified: true },
      { id: "sa-21", platform: "youtube", username: "EzgiFındık", followers: 650000, following: 0, posts: 280, engagementRate: 4.1, avgLikes: 22000, avgComments: 1100, avgViews: 420000, isVerified: false },
      { id: "sa-22", platform: "tiktok", username: "ezgifindik", followers: 350000, following: 78, posts: 420, engagementRate: 8.5, avgLikes: 32000, avgComments: 1500, avgViews: 890000, isVerified: false },
    ],
  },
  {
    id: "inf-9", name: "Reynmen", bio: "Müzisyen ve içerik üreticisi. Milyonlarca takipçiye sahip.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=reynmen", country: "TR", city: "İstanbul", language: "tr", categories: ["music", "entertainment"], qualityScore: 87, fraudScore: 11, isVerified: true, totalReach: 22000000, createdAt: "2024-01-20", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-23", platform: "instagram", username: "reynmen", followers: 12000000, following: 280, posts: 950, engagementRate: 3.2, avgLikes: 420000, avgComments: 15000, avgViews: 0, isVerified: true },
      { id: "sa-24", platform: "youtube", username: "Reynmen", followers: 8500000, following: 0, posts: 180, engagementRate: 5.8, avgLikes: 550000, avgComments: 22000, avgViews: 12000000, isVerified: true },
      { id: "sa-25", platform: "tiktok", username: "reynmen", followers: 1500000, following: 42, posts: 150, engagementRate: 7.1, avgLikes: 120000, avgComments: 4500, avgViews: 5000000, isVerified: true },
    ],
  },
  {
    id: "inf-10", name: "Merve Boluğur", bio: "Güzellik, moda ve yaşam tarzı influencer'ı.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=merve", country: "TR", city: "İstanbul", language: "tr", categories: ["beauty", "fashion"], qualityScore: 78, fraudScore: 18, isVerified: true, totalReach: 4500000, createdAt: "2024-04-01", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-26", platform: "instagram", username: "mervebolugur", followers: 3800000, following: 420, posts: 1200, engagementRate: 2.5, avgLikes: 78000, avgComments: 2800, avgViews: 0, isVerified: true },
      { id: "sa-27", platform: "tiktok", username: "mervebolugur", followers: 700000, following: 65, posts: 280, engagementRate: 5.8, avgLikes: 42000, avgComments: 1200, avgViews: 950000, isVerified: false },
    ],
  },
  {
    id: "inf-11", name: "Orkun Işıtmak", bio: "Türkiye'nin en popüler YouTuber'larından. React ve komedi videoları.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=orkun", country: "TR", city: "İstanbul", language: "tr", categories: ["entertainment", "lifestyle"], qualityScore: 84, fraudScore: 13, isVerified: true, totalReach: 14000000, createdAt: "2024-01-25", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-28", platform: "youtube", username: "OIsitmak", followers: 8500000, following: 0, posts: 650, engagementRate: 4.2, avgLikes: 280000, avgComments: 18000, avgViews: 4500000, isVerified: true },
      { id: "sa-29", platform: "instagram", username: "orkunisitmak", followers: 4500000, following: 380, posts: 980, engagementRate: 2.6, avgLikes: 95000, avgComments: 4200, avgViews: 0, isVerified: true },
      { id: "sa-30", platform: "tiktok", username: "orkunisitmak", followers: 1000000, following: 55, posts: 190, engagementRate: 6.8, avgLikes: 72000, avgComments: 2800, avgViews: 2200000, isVerified: false },
    ],
  },
  {
    id: "inf-12", name: "Aslı Afşaroğlu", bio: "Tech reviewer ve yazılımcı. Teknoloji dünyasından güncel haberler.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=asli", country: "TR", city: "Ankara", language: "tr", categories: ["technology", "education"], qualityScore: 93, fraudScore: 5, isVerified: true, totalReach: 1200000, createdAt: "2024-05-01", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-31", platform: "youtube", username: "AsliTech", followers: 680000, following: 0, posts: 420, engagementRate: 5.8, avgLikes: 32000, avgComments: 2800, avgViews: 520000, isVerified: false },
      { id: "sa-32", platform: "instagram", username: "aslitech", followers: 320000, following: 280, posts: 650, engagementRate: 4.2, avgLikes: 12000, avgComments: 850, avgViews: 0, isVerified: false },
      { id: "sa-33", platform: "twitter", username: "aslitech", followers: 200000, following: 1200, posts: 8500, engagementRate: 3.5, avgLikes: 5200, avgComments: 380, avgViews: 0, isVerified: true },
    ],
  },
  {
    id: "inf-13", name: "Alex Johnson", bio: "Lifestyle and travel vlogger based in LA. Sharing authentic experiences.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", country: "US", city: "Los Angeles", language: "en", categories: ["travel", "lifestyle"], qualityScore: 89, fraudScore: 8, isVerified: true, totalReach: 8500000, createdAt: "2024-02-20", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-34", platform: "instagram", username: "alexjtravel", followers: 4200000, following: 620, posts: 2800, engagementRate: 3.8, avgLikes: 145000, avgComments: 5200, avgViews: 0, isVerified: true },
      { id: "sa-35", platform: "youtube", username: "AlexJohnson", followers: 3100000, following: 0, posts: 520, engagementRate: 4.5, avgLikes: 95000, avgComments: 4800, avgViews: 1800000, isVerified: true },
      { id: "sa-36", platform: "tiktok", username: "alexjtravel", followers: 1200000, following: 180, posts: 650, engagementRate: 7.2, avgLikes: 88000, avgComments: 3200, avgViews: 2500000, isVerified: false },
    ],
  },
  {
    id: "inf-14", name: "Sophie Chen", bio: "Beauty guru and skincare expert. Honest reviews and tutorials.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophie", country: "US", city: "New York", language: "en", categories: ["beauty", "health"], qualityScore: 94, fraudScore: 4, isVerified: true, totalReach: 6200000, createdAt: "2024-03-05", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-37", platform: "instagram", username: "sophieskin", followers: 3500000, following: 450, posts: 1950, engagementRate: 4.5, avgLikes: 135000, avgComments: 6800, avgViews: 0, isVerified: true },
      { id: "sa-38", platform: "youtube", username: "SophieChen", followers: 2200000, following: 0, posts: 380, engagementRate: 5.2, avgLikes: 78000, avgComments: 3200, avgViews: 1200000, isVerified: true },
      { id: "sa-39", platform: "tiktok", username: "sophieskin", followers: 500000, following: 95, posts: 420, engagementRate: 9.1, avgLikes: 48000, avgComments: 2100, avgViews: 1500000, isVerified: false },
    ],
  },
  {
    id: "inf-15", name: "Marco Rossi", bio: "Italian food and cooking content creator. Authentic recipes from Italy.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marco", country: "IT", city: "Rome", language: "it", categories: ["food", "lifestyle"], qualityScore: 88, fraudScore: 9, isVerified: true, totalReach: 4800000, createdAt: "2024-04-15", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-40", platform: "instagram", username: "marcocooks", followers: 2800000, following: 380, posts: 2200, engagementRate: 4.1, avgLikes: 98000, avgComments: 4500, avgViews: 0, isVerified: true },
      { id: "sa-41", platform: "youtube", username: "MarcoRossiCooks", followers: 1500000, following: 0, posts: 280, engagementRate: 4.8, avgLikes: 62000, avgComments: 2800, avgViews: 850000, isVerified: true },
      { id: "sa-42", platform: "tiktok", username: "marcocooks", followers: 500000, following: 65, posts: 380, engagementRate: 8.5, avgLikes: 45000, avgComments: 1800, avgViews: 1200000, isVerified: false },
    ],
  },
  {
    id: "inf-16", name: "Ayşe Yılmaz", bio: "Anne ve çocuk içerikleri. Ebeveynlik tavsiyeleri ve aile vlogu.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ayse", country: "TR", city: "İzmir", language: "tr", categories: ["parenting", "lifestyle"], qualityScore: 85, fraudScore: 11, isVerified: false, totalReach: 1800000, createdAt: "2024-05-20", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-43", platform: "instagram", username: "ayseyilmaz.anne", followers: 980000, following: 720, posts: 1400, engagementRate: 5.8, avgLikes: 48000, avgComments: 3200, avgViews: 0, isVerified: false },
      { id: "sa-44", platform: "youtube", username: "AyşeAnne", followers: 520000, following: 0, posts: 180, engagementRate: 4.5, avgLikes: 18000, avgComments: 1200, avgViews: 280000, isVerified: false },
      { id: "sa-45", platform: "tiktok", username: "ayseyilmazanne", followers: 300000, following: 120, posts: 350, engagementRate: 9.2, avgLikes: 28000, avgComments: 1800, avgViews: 650000, isVerified: false },
    ],
  },
  {
    id: "inf-17", name: "Kaan Motorsport", bio: "Otomobil ve motorsporları tutkunu. Test sürüşleri ve incelemeler.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kaan", country: "TR", city: "Bursa", language: "tr", categories: ["automotive", "technology"], qualityScore: 87, fraudScore: 10, isVerified: false, totalReach: 2100000, createdAt: "2024-06-01", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-46", platform: "youtube", username: "KaanMotorsport", followers: 1200000, following: 0, posts: 380, engagementRate: 5.2, avgLikes: 52000, avgComments: 3800, avgViews: 780000, isVerified: false },
      { id: "sa-47", platform: "instagram", username: "kaanmotorsport", followers: 650000, following: 340, posts: 920, engagementRate: 3.8, avgLikes: 22000, avgComments: 1500, avgViews: 0, isVerified: false },
      { id: "sa-48", platform: "tiktok", username: "kaanmotor", followers: 250000, following: 55, posts: 210, engagementRate: 7.8, avgLikes: 20000, avgComments: 950, avgViews: 480000, isVerified: false },
    ],
  },
  {
    id: "inf-18", name: "Emma Wilson", bio: "Fashion designer and style influencer. Sustainable fashion advocate.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", country: "GB", city: "London", language: "en", categories: ["fashion", "lifestyle"], qualityScore: 91, fraudScore: 6, isVerified: true, totalReach: 5600000, createdAt: "2024-03-25", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-49", platform: "instagram", username: "emmawstyle", followers: 3200000, following: 520, posts: 1800, engagementRate: 4.2, avgLikes: 118000, avgComments: 4800, avgViews: 0, isVerified: true },
      { id: "sa-50", platform: "tiktok", username: "emmawstyle", followers: 1800000, following: 150, posts: 520, engagementRate: 7.5, avgLikes: 142000, avgComments: 5200, avgViews: 3500000, isVerified: true },
      { id: "sa-51", platform: "youtube", username: "EmmaWilsonStyle", followers: 600000, following: 0, posts: 120, engagementRate: 3.8, avgLikes: 19000, avgComments: 850, avgViews: 380000, isVerified: false },
    ],
  },
  {
    id: "inf-19", name: "Mehmet Spor", bio: "Profesyonel fitness antrenörü. Antrenman programları ve beslenme.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mehmet", country: "TR", city: "Antalya", language: "tr", categories: ["fitness", "sports"], qualityScore: 83, fraudScore: 14, isVerified: false, totalReach: 1500000, createdAt: "2024-06-15", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-52", platform: "instagram", username: "mehmetspor", followers: 850000, following: 380, posts: 1100, engagementRate: 4.8, avgLikes: 35000, avgComments: 2200, avgViews: 0, isVerified: false },
      { id: "sa-53", platform: "youtube", username: "MehmetSpor", followers: 420000, following: 0, posts: 250, engagementRate: 5.5, avgLikes: 18000, avgComments: 1400, avgViews: 350000, isVerified: false },
      { id: "sa-54", platform: "tiktok", username: "mehmetspor", followers: 230000, following: 65, posts: 380, engagementRate: 8.8, avgLikes: 22000, avgComments: 1100, avgViews: 520000, isVerified: false },
    ],
  },
  {
    id: "inf-20", name: "Elif Sanat", bio: "Dijital sanatçı ve illüstratör. Resim dersleri ve sanat içerikleri.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elif", country: "TR", city: "Eskişehir", language: "tr", categories: ["art", "education"], qualityScore: 96, fraudScore: 3, isVerified: false, totalReach: 900000, createdAt: "2024-07-01", updatedAt: "2024-12-01",
    socialAccounts: [
      { id: "sa-55", platform: "instagram", username: "elifsanat", followers: 520000, following: 680, posts: 2200, engagementRate: 6.2, avgLikes: 28000, avgComments: 1800, avgViews: 0, isVerified: false },
      { id: "sa-56", platform: "youtube", username: "ElifSanat", followers: 280000, following: 0, posts: 180, engagementRate: 5.8, avgLikes: 12000, avgComments: 950, avgViews: 180000, isVerified: false },
      { id: "sa-57", platform: "tiktok", username: "elifsanat", followers: 100000, following: 42, posts: 280, engagementRate: 11.2, avgLikes: 12000, avgComments: 800, avgViews: 350000, isVerified: false },
    ],
  },
]

const campaignsList: Campaign[] = [
  {
    id: "cmp-1", name: "Yaz Kampanyası 2024", description: "Yaz sezonu ürün tanıtım kampanyası", status: "active", platform: "instagram", budget: 150000, spent: 85000, startDate: "2024-06-01", endDate: "2024-08-31", createdAt: "2024-05-15", updatedAt: "2024-07-20",
    goals: { reach: 5000000, engagement: 200000, conversions: 5000, impressions: 15000000 },
    results: { totalReach: 3200000, totalEngagement: 145000, totalImpressions: 9500000, totalClicks: 82000, totalConversions: 3200, roi: 2.4 },
  },
  {
    id: "cmp-2", name: "Tech Ürün Lansmanı", description: "Yeni teknoloji ürünü lansmanı için influencer kampanyası", status: "completed", platform: "youtube", budget: 250000, spent: 230000, startDate: "2024-03-01", endDate: "2024-04-30", createdAt: "2024-02-15", updatedAt: "2024-05-01",
    goals: { reach: 10000000, engagement: 500000, conversions: 8000, impressions: 25000000 },
    results: { totalReach: 12500000, totalEngagement: 620000, totalImpressions: 28000000, totalClicks: 195000, totalConversions: 9200, roi: 3.8 },
  },
  {
    id: "cmp-3", name: "Güzellik Serisi", description: "Güzellik ürünleri tanıtım serisi", status: "active", platform: "tiktok", budget: 80000, spent: 35000, startDate: "2024-07-01", endDate: "2024-09-30", createdAt: "2024-06-20", updatedAt: "2024-08-01",
    goals: { reach: 3000000, engagement: 150000, conversions: 2000, impressions: 8000000 },
    results: { totalReach: 1800000, totalEngagement: 95000, totalImpressions: 4200000, totalClicks: 45000, totalConversions: 1200, roi: 1.8 },
  },
  {
    id: "cmp-4", name: "Fitness Challenge", description: "30 günlük fitness challenge kampanyası", status: "draft", platform: "instagram", budget: 120000, spent: 0, startDate: "2024-10-01", endDate: "2024-10-31", createdAt: "2024-09-01", updatedAt: "2024-09-15",
    goals: { reach: 4000000, engagement: 300000, conversions: 3000, impressions: 10000000 },
  },
  {
    id: "cmp-5", name: "Back to School", description: "Okula dönüş sezonu kampanyası - eğitim ve teknoloji ürünleri", status: "completed", platform: "youtube", budget: 95000, spent: 92000, startDate: "2024-08-15", endDate: "2024-09-15", createdAt: "2024-08-01", updatedAt: "2024-09-20",
    goals: { reach: 6000000, engagement: 250000, conversions: 4000, impressions: 12000000 },
    results: { totalReach: 5800000, totalEngagement: 238000, totalImpressions: 11500000, totalClicks: 125000, totalConversions: 3800, roi: 2.9 },
  },
]

export const dashboardStats: DashboardStats = {
  totalInfluencers: 15420,
  totalCampaigns: 48,
  activeCampaigns: 12,
  totalReach: 125000000,
  avgEngagement: 4.2,
  totalBudget: 2500000,
  totalSpent: 1850000,
  roi: 3.2,
}

export function getInfluencers(): Influencer[] {
  return influencersList
}

export function getInfluencerById(id: string): Influencer | undefined {
  return influencersList.find((inf) => inf.id === id)
}

export function searchInfluencers(query: string): Influencer[] {
  const q = query.toLowerCase()
  return influencersList.filter(
    (inf) =>
      inf.name.toLowerCase().includes(q) ||
      inf.categories.some((c) => c.toLowerCase().includes(q)) ||
      inf.socialAccounts.some((sa) => sa.username.toLowerCase().includes(q)) ||
      inf.country?.toLowerCase().includes(q) ||
      inf.city?.toLowerCase().includes(q)
  )
}

export function filterInfluencers(options: {
  platform?: string
  country?: string
  category?: string
  minFollowers?: number
  maxFollowers?: number
  minEngagement?: number
  maxEngagement?: number
  minQualityScore?: number
  isVerified?: boolean
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}): Influencer[] {
  let result = [...influencersList]

  if (options.search) {
    result = searchInfluencers(options.search)
  }

  if (options.platform) {
    result = result.filter((inf) => inf.socialAccounts.some((sa) => sa.platform === options.platform))
  }

  if (options.country) {
    result = result.filter((inf) => inf.country === options.country)
  }

  if (options.category) {
    result = result.filter((inf) => inf.categories.includes(options.category!))
  }

  if (options.minFollowers) {
    result = result.filter((inf) => {
      const maxFollowers = Math.max(...inf.socialAccounts.map((sa) => sa.followers))
      return maxFollowers >= options.minFollowers!
    })
  }

  if (options.maxFollowers) {
    result = result.filter((inf) => {
      const maxFollowers = Math.max(...inf.socialAccounts.map((sa) => sa.followers))
      return maxFollowers <= options.maxFollowers!
    })
  }

  if (options.minEngagement) {
    result = result.filter((inf) => {
      const avgEng = inf.socialAccounts.reduce((sum, sa) => sum + sa.engagementRate, 0) / inf.socialAccounts.length
      return avgEng >= options.minEngagement!
    })
  }

  if (options.minQualityScore) {
    result = result.filter((inf) => inf.qualityScore >= options.minQualityScore!)
  }

  if (options.isVerified !== undefined) {
    result = result.filter((inf) => inf.isVerified === options.isVerified)
  }

  const sortBy = options.sortBy || "totalReach"
  const order = options.sortOrder === "asc" ? 1 : -1

  result.sort((a, b) => {
    switch (sortBy) {
      case "followers":
        return (Math.max(...b.socialAccounts.map((sa) => sa.followers)) - Math.max(...a.socialAccounts.map((sa) => sa.followers))) * order
      case "engagement":
        const aEng = a.socialAccounts.reduce((s, sa) => s + sa.engagementRate, 0) / a.socialAccounts.length
        const bEng = b.socialAccounts.reduce((s, sa) => s + sa.engagementRate, 0) / b.socialAccounts.length
        return (bEng - aEng) * order
      case "qualityScore":
        return (b.qualityScore - a.qualityScore) * order
      case "name":
        return a.name.localeCompare(b.name) * order
      default:
        return (b.totalReach - a.totalReach) * order
    }
  })

  return result
}

export function getCampaigns(): Campaign[] {
  return campaignsList
}

export function getCampaignById(id: string): Campaign | undefined {
  const campaign = campaignsList.find((c) => c.id === id)
  if (!campaign) return undefined
  // Enrich with sample influencers if not present
  if (!campaign.influencers || campaign.influencers.length === 0) {
    const platformInfluencers = influencersList.filter((inf) =>
      inf.socialAccounts.some((sa) => sa.platform === (campaign.platform ?? "instagram"))
    )
    const sampleInfluencers = platformInfluencers.slice(0, 4).map((inf, i) => ({
      id: `ci-${campaign.id}-${inf.id}`,
      status: ["invited", "accepted", "completed", "accepted"][i] as "invited" | "accepted" | "declined" | "completed",
      fee: Math.floor(5000 + Math.random() * 45000),
      notes: undefined,
      influencer: inf,
    } satisfies CampaignInfluencer))
    return { ...campaign, influencers: sampleInfluencers }
  }
  return campaign
}

const listsData: InfluencerList[] = [
  {
    id: "list-1",
    name: "Beauty & Fashion Influencers",
    description: "Top beauty and fashion creators for cosmetic campaigns",
    createdAt: "2024-06-15",
    items: [
      { id: "li-1-1", notes: "Great engagement on Reels", tags: ["top-pick", "reels"], influencer: influencersList[0] },
      { id: "li-1-2", notes: "Strong Instagram presence", tags: ["fashion"], influencer: influencersList[3] },
      { id: "li-1-3", notes: "Premium audience", tags: ["verified"], influencer: influencersList[13] },
      { id: "li-1-4", notes: "Budget-friendly", tags: ["micro"], influencer: influencersList[8] },
    ],
  },
  {
    id: "list-2",
    name: "Tech & Gaming",
    description: "Technology reviewers and gaming influencers",
    createdAt: "2024-07-01",
    items: [
      { id: "li-2-1", notes: "Expert reviews", tags: ["youtube"], influencer: influencersList[10] },
      { id: "li-2-2", notes: "Tech focused", tags: ["tech"], influencer: influencersList[11] },
      { id: "li-2-3", notes: "Gaming content", tags: ["gaming"], influencer: influencersList[1] },
      { id: "li-2-4", notes: "E-sports", tags: ["esports"], influencer: influencersList[6] },
    ],
  },
  {
    id: "list-3",
    name: "Food & Lifestyle",
    description: "Food bloggers and lifestyle creators",
    createdAt: "2024-08-10",
    items: [
      { id: "li-3-1", notes: "Viral content", tags: ["viral"], influencer: influencersList[2] },
      { id: "li-3-2", notes: "Italian cuisine", tags: ["international"], influencer: influencersList[14] },
      { id: "li-3-3", notes: "Travel + food", tags: ["travel"], influencer: influencersList[5] },
    ],
  },
  {
    id: "list-4",
    name: "Fitness & Health",
    description: "Fitness trainers and wellness influencers",
    createdAt: "2024-09-01",
    items: [
      { id: "li-4-1", notes: "High engagement", tags: ["fitness"], influencer: influencersList[7] },
      { id: "li-4-2", notes: "Family audience", tags: ["parenting"], influencer: influencersList[15] },
      { id: "li-4-3", notes: "Professional trainer", tags: ["pro"], influencer: influencersList[18] },
    ],
  },
]

export function getLists(): InfluencerList[] {
  return listsData
}

export function getListById(id: string): InfluencerList | undefined {
  return listsData.find((l) => l.id === id)
}

export function createList(name: string, description?: string): InfluencerList {
  const newList: InfluencerList = {
    id: `list-${Date.now()}`,
    name,
    description,
    createdAt: new Date().toISOString().split("T")[0],
    items: [],
  }
  listsData.push(newList)
  return newList
}

export function addInfluencerToList(listId: string, influencer: Influencer, notes?: string, tags?: string[]): InfluencerListItem | undefined {
  const list = listsData.find((l) => l.id === listId)
  if (!list) return undefined
  const item: InfluencerListItem = {
    id: `li-${listId}-${influencer.id}-${Date.now()}`,
    notes,
    tags,
    influencer,
  }
  list.items.push(item)
  return item
}

export function removeInfluencerFromList(listId: string, itemId: string): boolean {
  const list = listsData.find((l) => l.id === listId)
  if (!list) return false
  const idx = list.items.findIndex((i) => i.id === itemId)
  if (idx === -1) return false
  list.items.splice(idx, 1)
  return true
}

export function updateListItemNotes(listId: string, itemId: string, notes: string): boolean {
  const list = listsData.find((l) => l.id === listId)
  if (!list) return false
  const item = list.items.find((i) => i.id === itemId)
  if (!item) return false
  item.notes = notes
  return true
}

export function deleteList(listId: string): boolean {
  const idx = listsData.findIndex((l) => l.id === listId)
  if (idx === -1) return false
  listsData.splice(idx, 1)
  return true
}

export function getEngagementHistory(influencerId: string): EngagementMetric[] {
  const months = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12"]
  const baseRate = 3 + Math.random() * 3
  return months.map((month, i) => ({
    id: `em-${influencerId}-${i}`,
    platform: "instagram",
    date: `${month}-01`,
    engagementRate: baseRate + (Math.random() - 0.5) * 1.5,
    likes: Math.floor(50000 + Math.random() * 200000),
    comments: Math.floor(2000 + Math.random() * 10000),
    shares: Math.floor(500 + Math.random() * 5000),
    views: Math.floor(100000 + Math.random() * 500000),
    reach: Math.floor(200000 + Math.random() * 1000000),
    impressions: Math.floor(500000 + Math.random() * 2000000),
  }))
}

export function getGrowthData(influencerId: string): AudienceData[] {
  const months = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12"]
  const inf = getInfluencerById(influencerId)
  const baseFollowers = inf ? Math.max(...inf.socialAccounts.map((sa) => sa.followers)) * 0.7 : 100000
  return months.map((month, i) => ({
    id: `gd-${influencerId}-${i}`,
    platform: "instagram",
    date: `${month}-01`,
    followers: Math.floor(baseFollowers * (1 + i * 0.035 + Math.random() * 0.02)),
    ageData: [
      { range: "13-17", percentage: 8 },
      { range: "18-24", percentage: 35 },
      { range: "25-34", percentage: 32 },
      { range: "35-44", percentage: 15 },
      { range: "45-54", percentage: 7 },
      { range: "55+", percentage: 3 },
    ],
    genderData: [
      { type: "female", percentage: 62 },
      { type: "male", percentage: 36 },
      { type: "other", percentage: 2 },
    ],
    locationData: [
      { country: "TR", percentage: 65 },
      { country: "DE", percentage: 8 },
      { country: "US", percentage: 7 },
      { country: "GB", percentage: 5 },
      { country: "FR", percentage: 4 },
      { country: "Other", percentage: 11 },
    ],
    interestData: [
      { name: "Fashion", percentage: 28 },
      { name: "Beauty", percentage: 24 },
      { name: "Travel", percentage: 18 },
      { name: "Food", percentage: 15 },
      { name: "Fitness", percentage: 10 },
      { name: "Technology", percentage: 5 },
    ],
  }))
}

export const platformStats = [
  { name: "Instagram", value: 8500, color: "#E1306C" },
  { name: "YouTube", value: 4200, color: "#FF0000" },
  { name: "TikTok", value: 6800, color: "#000000" },
  { name: "Twitter", value: 1920, color: "#1DA1F2" },
]

export const categoryStats = [
  { name: "Güzellik", count: 3200 },
  { name: "Moda", count: 2800 },
  { name: "Teknoloji", count: 2100 },
  { name: "Oyun", count: 1800 },
  { name: "Yemek", count: 1500 },
  { name: "Seyahat", count: 1400 },
  { name: "Fitness", count: 1200 },
  { name: "Yaşam", count: 1100 },
  { name: "Eğitim", count: 950 },
  { name: "Eğlence", count: 850 },
]

export const platformMonthlyGrowth = [
  { month: "Oca", instagram: 7800, youtube: 3900, tiktok: 6200 },
  { month: "Şub", instagram: 8100, youtube: 4050, tiktok: 6450 },
  { month: "Mar", instagram: 8350, youtube: 4100, tiktok: 6600 },
  { month: "Nis", instagram: 8200, youtube: 4150, tiktok: 6680 },
  { month: "May", instagram: 8380, youtube: 4180, tiktok: 6720 },
  { month: "Haz", instagram: 8450, youtube: 4190, tiktok: 6780 },
  { month: "Tem", instagram: 8480, youtube: 4200, tiktok: 6800 },
]

export const geographicDistribution = [
  { country: "TR", count: 45, name: "Türkiye" },
  { country: "US", count: 15, name: "Amerika" },
  { country: "DE", count: 8, name: "Almanya" },
  { country: "GB", count: 7, name: "İngiltere" },
  { country: "FR", count: 5, name: "Fransa" },
  { country: "Other", count: 20, name: "Diğer" },
]

export interface CompetitorBrand {
  id: string
  name: string
  website: string
  notes?: string
  influencerCount: number
  avgEngagement: number
  totalSpend: number
  performanceOverTime: { month: string; value: number }[]
}

export const competitorBrands: CompetitorBrand[] = [
  { id: "c1", name: "TrendStyle Co", website: "https://trendstyle.com", notes: "Primary fashion competitor", influencerCount: 45, avgEngagement: 4.2, totalSpend: 185000, performanceOverTime: [{ month: "Oca", value: 3.8 }, { month: "Şub", value: 4.0 }, { month: "Mar", value: 4.1 }, { month: "Nis", value: 4.3 }, { month: "May", value: 4.2 }, { month: "Haz", value: 4.5 }] },
  { id: "c2", name: "Güzellik Labs", website: "https://guzelliklabs.com", notes: "Beauty sector leader", influencerCount: 62, avgEngagement: 5.1, totalSpend: 240000, performanceOverTime: [{ month: "Oca", value: 4.5 }, { month: "Şub", value: 4.8 }, { month: "Mar", value: 5.0 }, { month: "Nis", value: 5.2 }, { month: "May", value: 5.1 }, { month: "Haz", value: 5.3 }] },
  { id: "c3", name: "TechZone", website: "https://techzone.io", influencerCount: 28, avgEngagement: 3.9, totalSpend: 92000, performanceOverTime: [{ month: "Oca", value: 3.5 }, { month: "Şub", value: 3.7 }, { month: "Mar", value: 3.8 }, { month: "Nis", value: 4.0 }, { month: "May", value: 3.9 }, { month: "Haz", value: 4.1 }] },
  { id: "c4", name: "Foodie Brand", website: "https://foodiebrand.com", notes: "Food & lifestyle", influencerCount: 38, avgEngagement: 6.2, totalSpend: 155000, performanceOverTime: [{ month: "Oca", value: 5.8 }, { month: "Şub", value: 6.0 }, { month: "Mar", value: 6.1 }, { month: "Nis", value: 6.3 }, { month: "May", value: 6.2 }, { month: "Haz", value: 6.4 }] },
  { id: "c5", name: "FitLife Pro", website: "https://fitlifepro.com", influencerCount: 51, avgEngagement: 4.8, totalSpend: 198000, performanceOverTime: [{ month: "Oca", value: 4.2 }, { month: "Şub", value: 4.5 }, { month: "Mar", value: 4.7 }, { month: "Nis", value: 4.9 }, { month: "May", value: 4.8 }, { month: "Haz", value: 5.0 }] },
]

export const adminUsers = [
  { id: "u1", name: "Ahmet Yılmaz", email: "ahmet@example.com", plan: "professional", role: "user", status: "active", createdAt: "2024-01-15" },
  { id: "u2", name: "Ayşe Demir", email: "ayse@example.com", plan: "starter", role: "user", status: "active", createdAt: "2024-02-20" },
  { id: "u3", name: "Mehmet Kaya", email: "mehmet@example.com", plan: "free", role: "user", status: "active", createdAt: "2024-03-10" },
  { id: "u4", name: "Fatma Öz", email: "fatma@example.com", plan: "enterprise", role: "admin", status: "active", createdAt: "2024-04-05" },
  { id: "u5", name: "Ali Çelik", email: "ali@example.com", plan: "starter", role: "user", status: "suspended", createdAt: "2024-05-12" },
]

export const adminStats = {
  totalUsers: 2847,
  activeUsers: 2654,
  totalSearches: 124500,
  revenue: 1850000,
}

export const usersByPlanData = [
  { name: "Free", value: 1200 },
  { name: "Starter", value: 890 },
  { name: "Professional", value: 650 },
  { name: "Enterprise", value: 107 },
]

export const dailyActiveUsersData = Array.from({ length: 30 }, (_, i) => ({
  day: `Gün ${i + 1}`,
  users: Math.floor(1800 + Math.random() * 400),
}))

export const revenueTrendData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"][i],
  revenue: Math.floor(120000 + Math.random() * 80000 + i * 5000),
}))

export const topSearchCategoriesAdmin = [
  { name: "Güzellik", count: 28500 },
  { name: "Moda", count: 24200 },
  { name: "Teknoloji", count: 19800 },
  { name: "Yemek", count: 16500 },
  { name: "Fitness", count: 14200 },
]

export const monthlyEngagementTrend = [
  { month: "Oca", instagram: 4.2, youtube: 5.1, tiktok: 7.8 },
  { month: "Şub", instagram: 4.0, youtube: 4.8, tiktok: 8.1 },
  { month: "Mar", instagram: 4.3, youtube: 5.3, tiktok: 7.5 },
  { month: "Nis", instagram: 3.9, youtube: 4.9, tiktok: 8.4 },
  { month: "May", instagram: 4.1, youtube: 5.0, tiktok: 7.9 },
  { month: "Haz", instagram: 4.4, youtube: 5.2, tiktok: 8.2 },
  { month: "Tem", instagram: 4.6, youtube: 5.5, tiktok: 8.0 },
  { month: "Ağu", instagram: 4.3, youtube: 5.1, tiktok: 8.5 },
  { month: "Eyl", instagram: 4.1, youtube: 4.7, tiktok: 7.7 },
  { month: "Eki", instagram: 4.5, youtube: 5.4, tiktok: 8.3 },
  { month: "Kas", instagram: 4.2, youtube: 5.0, tiktok: 8.1 },
  { month: "Ara", instagram: 4.7, youtube: 5.6, tiktok: 8.6 },
]
