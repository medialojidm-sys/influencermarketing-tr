# InfluencerMarketing.tr

Türkiye'nin lider influencer marketing platformu. Instagram, YouTube ve TikTok influencer'larını keşfedin, analiz edin ve kampanyalarınızı yönetin.

## Özellikler

- **Influencer Keşfi** - Gelişmiş filtreler ve AI destekli arama ile influencer bulma
- **Detaylı Analitik** - Takipçi kalitesi, etkileşim oranları, kitle demografisi
- **Sahtecilik Tespiti** - Sahte takipçi ve etkileşim tespiti
- **Kampanya Yönetimi** - Baştan sona kampanya takibi ve ROI hesaplama
- **Influencer CRM** - Listeler, notlar, etiketler ve iletişim yönetimi
- **Karşılaştırma Aracı** - Yan yana influencer karşılaştırma
- **Pazar Analizi** - Sektör trendleri ve rakip analizi
- **Raporlama** - Kampanya ve performans raporları (PDF/CSV)
- **Çoklu Dil** - Türkçe ve İngilizce desteği
- **Karanlık Mod** - Açık/karanlık/sistem tema desteği

## Teknoloji Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **UI**: Tailwind CSS + shadcn/ui
- **ORM / DB**: Prisma + SQLite (dev) / PostgreSQL (prod)
- **Auth**: NextAuth.js
- **Charts**: Recharts
- **i18n**: next-intl (TR/EN)
- **State**: TanStack Query

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Veritabanını oluştur
npx prisma db push

# Örnek verileri yükle
npx tsx prisma/seed.ts

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## Demo Hesaplar

| E-posta | Şifre | Rol | Plan |
|---------|-------|-----|------|
| admin@influencermarketing.tr | admin123 | Admin | Enterprise |
| demo@influencermarketing.tr | demo123 | User | Professional |
| user@influencermarketing.tr | user123 | User | Free |

## Proje Yapısı

```
src/
├── app/
│   ├── [locale]/           # i18n routing
│   │   ├── (auth)/         # Login, Register
│   │   ├── (dashboard)/    # Authenticated pages
│   │   └── page.tsx        # Landing page
│   └── api/                # REST API routes
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Sidebar, Header, Footer
│   └── influencer/         # Influencer components
├── lib/                    # Utilities, auth, prisma, mock data
├── types/                  # TypeScript types
├── messages/               # i18n translations (tr/en)
└── i18n/                   # i18n config
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/influencers | Influencer listesi (filtreli) |
| GET | /api/influencers/:id | Influencer detayı |
| GET | /api/campaigns | Kampanya listesi |
| POST | /api/campaigns | Yeni kampanya oluştur |
| GET | /api/campaigns/:id | Kampanya detayı |
| PUT | /api/campaigns/:id | Kampanya güncelle |
| DELETE | /api/campaigns/:id | Kampanya sil |
| GET | /api/lists | Liste listesi |
| POST | /api/lists | Yeni liste oluştur |
| GET | /api/lists/:id | Liste detayı |
| DELETE | /api/lists/:id | Liste sil |
| GET | /api/analytics | Analitik verileri |

## Sosyal Medya API Entegrasyonu

Platform şu anda mock data ile çalışmaktadır. Gerçek API entegrasyonu için:

1. **Instagram Graph API**: Facebook Developer hesabı oluşturun → Uygulama onayı alın → API key'i `.env` dosyasına ekleyin
2. **YouTube Data API v3**: Google Cloud Console'da proje oluşturun → API'yi etkinleştirin → API key'i `.env` dosyasına ekleyin
3. **TikTok Research API**: TikTok for Developers'a başvurun → API erişimi onaylandığında key'i `.env` dosyasına ekleyin
