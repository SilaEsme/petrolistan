# Petrolistan — Frontend

## Stack
- Next.js 16.2 (App Router, Turbopack)
- Tailwind CSS
- SWR (data fetching)
- Recharts (grafik)
- TypeScript

## Deploy
```bash
cd /var/www/petrolistan
git pull && npm run build && pm2 restart petrolistan --update-env
sleep 3 && systemctl reload nginx
```

## PM2
- ID 0: petrolistan (port 3000)

## Renkler
- Lacivert: #0C447C | Amber: #BA7517 | Koyu bg: #042C53
- Artış: #3B6D11 | Düşüş: #A32D2D

## Veri Kaynakları
- Brent/WTI/Doğalgaz: Yahoo Finance (BZ=F, CL=F, NG=F) — 5 dk cache
- USD/TRY, EUR/TRY + değişim: TCMB XML + TCMB arşiv — 5 dk cache
- Akaryakıt fiyatları: Go backend (localhost:8080) — 1 saat cache
- Haberler: Go backend /news — 4 saat cache

## Önemli Sayfalar
- / — Ana sayfa (PriceCards, AreaChart, FuelSidebar, NewsPreview)
- /akaryakit/karsilastirma — Marka karşılaştırma (query param: ?province=34)
- /akaryakit/karsilastirma/[il] — 81 il SEO sayfaları (noindex)
- /analizler/[slug] — 15 analiz yazısı (indexli)
- /haberler/[slug] — Haber detayı (noindex, graceful fallback)

## Kurallar
- Türkçe karakter URL: daima ASCII (ı→i, ü→u, ş→s)
- Haber detay sayfaları noindex — içerik dinamik değişiyor
- 81 il sayfaları noindex — ince içerik
- Footer/navbar'da broken link olmamalı
- Cloudflare cache: değişiklik sonrası "Purge Everything" + nginx reload

## Analitik & Reklam
- Google Analytics: G-0R88KQWF2W
- AdSense: ca-pub-5969246291079798 (incelemede)
- ads.txt: google.com, pub-5969246291079798, DIRECT, f08c47fec0942fa0
