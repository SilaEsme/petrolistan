# Frontend Context

## Stack
Next.js 14, Tailwind, SWR, Recharts

## API endpoint'leri
- /api/prices → EIA + ExchangeRate (5 dk cache)
- /api/prices/history → EIA 30 günlük (1 saat cache)
- /api/fuel/brands → Go backend proxy
- /api/news/rss → NewsData.io

## Önemli notlar
- Türkçe karakter içeren dizin adları 404 yapar — ASCII kullan
- Next.js 15: params Promise<{slug}> → await params
- .env.local: EIA_API_KEY, NEWSDATA_API_KEY, GO_BACKEND_URL