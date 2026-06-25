export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin-auth'
import BrandsTable, { type BrandSetting } from './BrandsTable'

export default async function AdminBrandsPage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login')
  }

  const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
  let brands: BrandSetting[] = []
  let fetchError: string | null = null

  try {
    const res = await fetch(`${goUrl}/admin/brands`, {
      headers: { 'X-Admin-Secret': process.env.ADMIN_SECRET ?? '' },
      cache: 'no-store',
    })
    if (res.ok) {
      const json = await res.json()
      brands = json.data ?? []
    } else {
      const text = await res.text()
      fetchError = `Backend ${res.status}: ${text}`
    }
  } catch (e) {
    fetchError = `Bağlantı hatası: ${e instanceof Error ? e.message : String(e)}`
  }

  const enabledCount = brands.filter((b) => b.enabled).length

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Marka Karşılaştırması
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {enabledCount}/{brands.length} marka karşılaştırmada aktif
        </p>
      </div>
      {fetchError && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400 font-mono">
          {fetchError}
        </div>
      )}
      <BrandsTable initialBrands={brands} />
    </div>
  )
}
