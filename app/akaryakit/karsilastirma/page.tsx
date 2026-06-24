import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { provinceSlugToCode, PROVINCES } from '@/lib/provinces'
import type { BrandsResponse } from '@/types'
import ComparisonClient from './ComparisonClient'
import { buildFaqSchema } from './faqSchema'

type SearchParams = Promise<{ province?: string }>

async function fetchInitialData(province: string): Promise<BrandsResponse | null> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    const res = await fetch(`${base}/api/fuel/brands?province=${province}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { province = '34' } = await searchParams
  const name = PROVINCES[province] ?? 'Türkiye'

  return {
    title: `${name} Benzin Motorin Fiyatları — Marka Karşılaştırması | Petrolistan`,
    description: `${name} için OPET, Shell, Petrol Ofisi, Alpet, Lukoil, Total, Bpet, Sunpet, Kadoil ve daha fazlası — 11 markada güncel benzin ve motorin fiyat karşılaştırması.`,
    keywords: `${name} akaryakıt fiyatları, ${name} benzin fiyatı, ${name} motorin fiyatı, OPET Shell Petrol Ofisi fiyat karşılaştırması`,
    alternates: { canonical: 'https://petrolistan.com/akaryakit/karsilastirma' },
  }
}

export default async function KarsilastirmaPage({ searchParams }: { searchParams: SearchParams }) {
  const { province = '34' } = await searchParams
  const initialData = await fetchInitialData(province)
  const cityName = PROVINCES[province] ?? 'Türkiye'

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cityName} Akaryakıt Fiyatları Karşılaştırması`,
    description: `${cityName} için güncel benzin, motorin ve LPG fiyatları`,
    url: `https://petrolistan.com/akaryakit/karsilastirma?province=${province}`,
  }

  const faqSchema = buildFaqSchema(cityName, initialData)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BreadcrumbSchema items={[
        { name: 'Ana Sayfa', url: 'https://petrolistan.com' },
        { name: 'Akaryakıt', url: 'https://petrolistan.com/akaryakit' },
        { name: 'Karşılaştırma', url: 'https://petrolistan.com/akaryakit/karsilastirma' },
      ]} />
      <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-10 text-sm text-gray-400">Yükleniyor…</div>}>
        <ComparisonClient initialData={initialData} />
      </Suspense>

      {/* 81 il hub'ı — crawler için gerçek <a> linkleri */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 pb-10">
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            İle Göre Akaryakıt Fiyatları
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(provinceSlugToCode).map(([slug, code]) => {
              const name = PROVINCES[String(code).padStart(2, '0')] ?? slug
              return (
                <Link
                  key={slug}
                  href={`/akaryakit/karsilastirma/${slug}`}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#0C447C]/25 dark:border-gray-700 text-[#0C447C] dark:text-[#5B9BD5] hover:bg-[#0C447C]/5 dark:hover:bg-white/5 transition-colors"
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}
