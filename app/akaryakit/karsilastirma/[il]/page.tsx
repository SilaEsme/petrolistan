import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { provinceSlugToCode, PROVINCES } from '@/lib/provinces'
import type { BrandsResponse, BrandPrice } from '@/types'
import ComparisonClient from '../ComparisonClient'
import { buildFaqSchema } from '../faqSchema'

// Büyük metropoller — il çapraz linkleri için curated liste (slug sırası)
const POPULAR_SLUGS = [
  'istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'adana',
  'konya', 'gaziantep', 'sanliurfa', 'kocaeli', 'mersin', 'diyarbakir',
]

function nonZeroVals(brands: BrandPrice[], key: 'gasoline' | 'diesel' | 'lpg') {
  return brands.map((b) => b[key]).filter((v) => v > 0)
}

function buildIlContent(cityName: string, initialData: BrandsResponse | null): {
  brandCount: number
  brandNames: string[]
  avgG: number | null
  avgD: number | null
  minG: number | null
  maxG: number | null
  minD: number | null
  maxD: number | null
  hasLpg: boolean
  cheapestG: BrandPrice | null
  cheapestD: BrandPrice | null
} | null {
  if (!initialData?.data?.length) return null
  const brands = initialData.data.filter((b: BrandPrice) => b.brand !== 'Moil')
  const available = brands.filter((b: BrandPrice) => b.gasoline > 0 || b.diesel > 0)
  if (!available.length) return null

  const gVals = nonZeroVals(available, 'gasoline')
  const dVals = nonZeroVals(available, 'diesel')
  const lVals = nonZeroVals(available, 'lpg')

  const avg = (arr: number[]) => arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : null

  const sortedG = available.filter((b: BrandPrice) => b.gasoline > 0).sort((a: BrandPrice, b: BrandPrice) => a.gasoline - b.gasoline)
  const sortedD = available.filter((b: BrandPrice) => b.diesel > 0).sort((a: BrandPrice, b: BrandPrice) => a.diesel - b.diesel)

  return {
    brandCount: available.length,
    brandNames: available.map((b: BrandPrice) => b.brand),
    avgG: avg(gVals),
    avgD: avg(dVals),
    minG: gVals.length ? Math.min(...gVals) : null,
    maxG: gVals.length ? Math.max(...gVals) : null,
    minD: dVals.length ? Math.min(...dVals) : null,
    maxD: dVals.length ? Math.max(...dVals) : null,
    hasLpg: lVals.length > 0,
    cheapestG: sortedG[0] ?? null,
    cheapestD: sortedD[0] ?? null,
  }
}

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

export const dynamicParams = true // on-demand ISR: build'de önceden üretme, ilk istekte render et + cache'le

export async function generateStaticParams() {
  return [] // boş → 81 il build sırasında canlı fetch yapmaz; her il ilk istekte SSR edilir
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { il } = await params
  const code = provinceSlugToCode[il]
  if (!code) return {}
  const cityName = PROVINCES[String(code).padStart(2, '0')] ?? il

  return {
    title: `Opet, Shell, Petrol Ofisi ${cityName} Fiyatları (Güncel) | Petrolistan`,
    description: `${cityName}'de bugün Opet, Shell, Petrol Ofisi, Alpet, Lukoil ve diğer markaların benzin, motorin ve LPG fiyatları. Tüm markaları karşılaştır, en ucuz yakıtı bul.`,
    alternates: { canonical: `https://petrolistan.com/akaryakit/karsilastirma/${il}` },
    robots: { index: true, follow: true },
  }
}

function fmt(val: number) {
  return val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function calcSavings(initialData: BrandsResponse | null) {
  if (!initialData?.data) return null
  const eligible = initialData.data.filter((b) => b.brand !== 'Moil')
  const withGas = eligible.filter((b) => b.gasoline > 0).sort((a, b) => a.gasoline - b.gasoline)
  if (withGas.length < 2) return null
  const cheapest = withGas[0]
  const priciest = withGas[withGas.length - 1]
  const saving = (priciest.gasoline - cheapest.gasoline) * 50
  if (saving <= 0) return null
  return {
    brand: cheapest.brand,
    price: fmt(cheapest.gasoline),
    saving: Math.round(saving).toLocaleString('tr-TR'),
    priciest: priciest.brand,
    diff: fmt(priciest.gasoline - cheapest.gasoline),
    minG: fmt(cheapest.gasoline),
    maxG: fmt(priciest.gasoline),
  }
}

export default async function IlKarsilastirmaPage({ params }: { params: Params }) {
  const { il } = await params
  const code = provinceSlugToCode[il]
  if (!code) notFound()

  const provinceStr = String(code).padStart(2, '0')
  const initialData = await fetchInitialData(provinceStr)
  const cityName = PROVINCES[provinceStr] ?? il
  const savings = calcSavings(initialData)
  const ilContent = buildIlContent(cityName, initialData)
  const popularLinks = POPULAR_SLUGS
    .filter((s) => s !== il)
    .map((s) => {
      const code = provinceSlugToCode[s]
      const name = PROVINCES[String(code).padStart(2, '0')] ?? s
      return { slug: s, name }
    })

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cityName} Akaryakıt Fiyatları Karşılaştırması`,
    description: `${cityName} için güncel benzin, motorin ve LPG fiyatları`,
    url: `https://petrolistan.com/akaryakit/karsilastirma/${il}`,
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
        { name: cityName, url: `https://petrolistan.com/akaryakit/karsilastirma/${il}` },
      ]} />
      {savings && (
        <div className="max-w-5xl mx-auto px-4 md:px-8 pt-6">
          <div className="bg-[#042C53] text-white rounded-xl px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium mb-0.5">Bu ilde en ucuz benzin</p>
              <p className="font-bold text-sm">{savings.brand} — {savings.price} ₺/L</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium mb-0.5">50L&apos;de tasarruf</p>
              <p className="text-white font-bold text-xl">{savings.saving} ₺</p>
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-10 text-sm text-gray-400">Yükleniyor…</div>}>
        <ComparisonClient
          initialData={initialData}
          initialProvince={provinceStr}
          heading={`${cityName} Benzin, Motorin ve LPG Fiyatları`}
        />
      </Suspense>
      <div className="max-w-5xl mx-auto px-4 md:px-8 pb-10">
        <section className="mt-8 prose prose-sm max-w-none text-gray-600 dark:text-gray-400">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {cityName} Akaryakıt Fiyatları Hakkında
          </h2>
          {ilContent ? (
            <>
              <p>
                {cityName} ilinde {ilContent.brandCount} akaryakıt markası aktif olarak hizmet vermektedir
                ({ilContent.brandNames.join(', ')}).
                {ilContent.minG !== null && ilContent.maxG !== null && ilContent.cheapestG && (
                  <> Bugün {cityName}&apos;da benzin 95 fiyatları{' '}
                  <strong>{ilContent.minG.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺/L</strong>{' '}
                  ile {ilContent.maxG.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺/L arasında seyretmekte olup
                  en uygun benzin <strong>{ilContent.cheapestG.brand}</strong> istasyonlarında sunulmaktadır.</>
                )}
                {ilContent.minD !== null && ilContent.cheapestD && (
                  <> Motorin için en düşük fiyat <strong>{ilContent.minD.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺/L</strong> ile{' '}
                  <strong>{ilContent.cheapestD.brand}</strong> markasında görülmektedir.</>
                )}
                {ilContent.hasLpg && <> {cityName}&apos;da LPG fiyatları da yukarıdaki tabloda listelenmektedir.</>}
              </p>
              <p>
                Akaryakıt fiyatları EPDK (Enerji Piyasası Düzenleme Kurumu) düzenlemeleri çerçevesinde
                belirlenmekte olup haftalık değişkenlik gösterebilir. Petrolistan, {cityName} için
                tüm marka fiyatlarını saatlik olarak güncellemekte; doğrudan markaların resmi kaynaklarından veri çekmektedir.
              </p>
            </>
          ) : (
            <>
              <p>
                {cityName} ili için güncel benzin 95, motorin ve LPG fiyatları
                yukarıdaki tabloda anlık olarak güncellenmektedir.
                OPET, Shell, Petrol Ofisi, Alpet, Lukoil ve daha fazlası gibi
                başlıca akaryakıt markalarının {cityName} pompa fiyatlarını
                karşılaştırarak en uygun istasyonu bulabilirsiniz.
              </p>
              <p>
                Akaryakıt fiyatları EPDK (Enerji Piyasası Düzenleme Kurumu)
                düzenlemeleri çerçevesinde belirlenmekte olup haftalık
                değişkenlik gösterebilir. Petrolistan, {cityName} için
                tüm marka fiyatlarını saatlik olarak güncellemektedir.
              </p>
            </>
          )}
        </section>

        {/* Diğer iller — çapraz iç bağlantı */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Diğer İllerde Fiyatlar
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularLinks.map(({ slug, name }) => (
              <Link
                key={slug}
                href={`/akaryakit/karsilastirma/${slug}`}
                className="text-xs px-3 py-1.5 rounded-full border border-[#0C447C]/25 dark:border-gray-700 text-[#0C447C] dark:text-[#5B9BD5] hover:bg-[#0C447C]/5 dark:hover:bg-white/5 transition-colors"
              >
                {name}
              </Link>
            ))}
            <Link
              href="/akaryakit/karsilastirma"
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              Tüm iller →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
