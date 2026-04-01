@AGENTS.md

# Petrolistan — proje bağlamı

## Ne yapıyoruz
Türkiye odaklı petrol & enerji haber/veri platformu.
Gelir modeli: Google AdSense + doğrudan sponsorluk.

## Stack
- Frontend: React (Next.js önerilen)
- Backend: Go
- Veri kaynakları: EIA API, TCMB API, EPDK scrape

## Renk paleti
Ana: #0C447C | Vurgu: #BA7517 | Koyu bg: #042C53

## Öncelikli görevler
1. EIA API entegrasyonu — Brent/WTI fiyatları
2. TCMB API — TL kur çevirisi
3. EPDK scraper — akaryakıt fiyatları
4. PriceCard, TickerBar, NewsItem, AdSlot komponentleri

# Petrolistan — Claude Code bağlamı
Stack: Next.js 14 + Tailwind + SWR + Recharts
Renkler: Ana #0C447C | Amber #BA7517 | Koyu #042C53
Artış: #3B6D11 | Düşüş: #A32D2D

Öncelik:
1. components/layout/ — Topbar, Navbar, Ticker, Footer
2. components/prices/ — PriceCard, PriceGrid, PriceChart
3. app/api/prices/  — EIA + TCMB proxy
4. components/ads/  — AdSlot wrapper
5. components/sidebar/ — FuelSidebar, Newsletter
