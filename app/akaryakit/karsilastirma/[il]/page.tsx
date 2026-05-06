import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { provinceSlugToCode, PROVINCES } from '@/lib/provinces'
import type { BrandsResponse } from '@/types'
import ComparisonClient from '../ComparisonClient'

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
    title: `${cityName} Benzin Motorin Fiyatları — OPET Shell Petrol Ofisi | Petrolistan`,
    description: `${cityName} güncel benzin, motorin ve LPG fiyatları. OPET, Shell, Petrol Ofisi, Aytemiz, Lukoil, Total karşılaştırması. ${new Date().toLocaleDateString('tr-TR')} itibarıyla güncellendi.`,
    alternates: { canonical: `https://petrolistan.com/akaryakit/karsilastirma/${il}` },
    robots: { index: true, follow: true },
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
        <ComparisonClient initialData={initialData} initialProvince={provinceStr} />
      </Suspense>
      <div className="max-w-5xl mx-auto px-4 md:px-8 pb-10">
        <section className="mt-8 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-base font-semibold text-gray-800 mb-2">
            {cityName} Akaryakıt Fiyatları Hakkında
          </h2>
          <p>
            {cityName} ili için güncel benzin 95, motorin ve LPG fiyatları
            yukarıdaki tabloda anlık olarak güncellenmektedir.
            OPET, Shell, Petrol Ofisi, Aytemiz, Lukoil ve Total gibi
            başlıca akaryakıt markalarının {cityName} pompa fiyatlarını
            karşılaştırarak en uygun istasyonu bulabilirsiniz.
          </p>
          <p>
            Akaryakıt fiyatları EPDK (Enerji Piyasası Düzenleme Kurumu)
            düzenlemeleri çerçevesinde belirlenmekte olup günlük
            değişkenlik gösterebilir. Petrolistan, {cityName} için
            tüm marka fiyatlarını saatlik olarak güncellemektedir.
          </p>
        </section>
      </div>
    </>
  )
}
