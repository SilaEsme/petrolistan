import { Suspense } from 'react'
import type { Metadata } from 'next'
import { PROVINCES } from '@/lib/provinces'
import type { BrandsResponse } from '@/types'
import KarsilastirmaClient from './KarsilastirmaClient'

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
    description: `${name} için OPET, Shell, Petrol Ofisi, Aytemiz, Lukoil ve Moil güncel benzin 95 ve motorin fiyat karşılaştırması.`,
    keywords: `${name} akaryakıt fiyatları, ${name} benzin fiyatı, ${name} motorin fiyatı, OPET Shell Petrol Ofisi fiyat karşılaştırması`,
  }
}

export default async function KarsilastirmaPage({ searchParams }: { searchParams: SearchParams }) {
  const { province = '34' } = await searchParams
  const initialData = await fetchInitialData(province)
  const cityName = PROVINCES[province] ?? 'Türkiye'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cityName} Akaryakıt Fiyatları Karşılaştırması`,
    description: `${cityName} için güncel benzin, motorin ve LPG fiyatları`,
    url: `https://petrolistan.com/akaryakit/karsilastirma?province=${province}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-10 text-sm text-gray-400">Yükleniyor…</div>}>
        <KarsilastirmaClient initialData={initialData} />
      </Suspense>
    </>
  )
}
