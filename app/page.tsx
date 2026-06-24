import type { BrandsResponse } from '@/types'
import HomeComparisonTable from '@/components/prices/HomeComparisonTable'
import EditorialSection from '@/components/layout/EditorialSection'
import CalculatorsSection from '@/components/calculators/CalculatorsSection'
import HomeNewsPreview from '@/components/HomeNewsPreview'

async function fetchIstanbulData(): Promise<BrandsResponse | undefined> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    const res = await fetch(`${base}/api/fuel/brands?province=34`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return undefined
    return res.json()
  } catch {
    return undefined
  }
}

export default async function HomePage() {
  const initialData = await fetchIstanbulData()

  return (
    <>
      {/* 1. Hero + Marka karşılaştırma tablosu */}
      <HomeComparisonTable initialData={initialData} />

      {/* 2. Hesaplayıcılar */}
      <CalculatorsSection />

      {/* 3. Editorial */}
      <EditorialSection />

      {/* 4. Son haberler — client (SWR) */}
      <HomeNewsPreview />
    </>
  )
}
