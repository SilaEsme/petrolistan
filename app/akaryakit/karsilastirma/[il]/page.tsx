import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { provinceSlugToCode, PROVINCES } from '@/lib/provinces'
import type { BrandsResponse } from '@/types'
import KarsilastirmaClient from '../KarsilastirmaClient'

type Params = Promise<{ il: string }>

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

export async function generateStaticParams() {
  return Object.keys(provinceSlugToCode).map((il) => ({ il }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { il } = await params
  const code = provinceSlugToCode[il]
  if (!code) return {}
  const cityName = PROVINCES[String(code).padStart(2, '0')] ?? il

  return {
    title: `${cityName} Akaryakıt Fiyatları — OPET Shell Petrol Ofisi Karşılaştırma | Petrolistan`,
    description: `${cityName} için güncel benzin, motorin ve LPG fiyatları. OPET, Shell, Petrol Ofisi, Aytemiz marka karşılaştırması. ${new Date().toLocaleDateString('tr-TR')} güncel fiyatlar.`,
    alternates: { canonical: `https://petrolistan.com/akaryakit/karsilastirma/${il}` },
  }
}

export default async function IlKarsilastirmaPage({ params }: { params: Params }) {
  const { il } = await params
  const code = provinceSlugToCode[il]
  if (!code) notFound()

  const provinceStr = String(code).padStart(2, '0')
  const initialData = await fetchInitialData(provinceStr)
  const cityName = PROVINCES[provinceStr] ?? il

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cityName} Akaryakıt Fiyatları Karşılaştırması`,
    description: `${cityName} için güncel benzin, motorin ve LPG fiyatları`,
    url: `https://petrolistan.com/akaryakit/karsilastirma/${il}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-10 text-sm text-gray-400">Yükleniyor…</div>}>
        <KarsilastirmaClient initialData={initialData} initialProvince={provinceStr} />
      </Suspense>
    </>
  )
}
