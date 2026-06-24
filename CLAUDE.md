# Petrolistan — Frontend (Next.js 16.2)

> Genel proje konteksti için root `CLAUDE.md`. Bu dosya yalnızca frontend'e özel notlar içerir.
> ⚠️ Next.js 16.2 + React 19 — training data güncel olmayabilir. Bkz. `AGENTS.md`.

## Dev
```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Yapı
- `app/` — App Router. Route başına `page.tsx` + `layout.tsx`.
  - `api/` — Next.js route handlers (Brent, USD/TRY, doğalgaz proxy)
  - `akaryakit/karsilastirma/[il]/` — 81 il sayfaları (index: true, Mayıs 2026)
  - `yazilar/[slug]/` — statik analiz yazıları
  - `haberler/[slug]/` — haber detay (noindex, graceful fallback)
- `components/` — `layout/`, `prices/`, `news/`, `sidebar/`, plus `icons.tsx`
- `lib/` — `api.ts` (fetch helpers), `provinces.ts` (81 il listesi), `rss.ts`
- `types/` — paylaşılan TS tipleri

## Frontend-Özel Kurallar
- Türkçe karakter URL'de YASAK — `lib/provinces.ts` ASCII slug'lar tutar
- Haber sayfaları noindex; 81 il sayfaları index: true (Mayıs 2026'dan itibaren)
- SWR cache süreleri veri tipiyle uyumlu olmalı (root CLAUDE.md "Veri Kaynakları" tablosuna bak)
- Renkler kod içinde literal — Tailwind config'e taşınmadı (deliberate)
- Footer/navbar broken link olmamalı
