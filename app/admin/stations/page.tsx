export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin-auth'
import StationsTable, { type AdminStation } from './StationsTable'

export default async function AdminStationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; province?: string; brand_key?: string; page?: string }>
}) {
  if (!(await isAuthenticated())) {
    redirect('/admin/login')
  }

  const sp = await searchParams
  const pageSize = 50
  const currentPage = Math.max(1, Number(sp.page) || 1)
  const offset = (currentPage - 1) * pageSize

  const qs = new URLSearchParams({
    ...(sp.q ? { q: sp.q } : {}),
    ...(sp.province ? { province: sp.province } : {}),
    ...(sp.brand_key ? { brand_key: sp.brand_key } : {}),
    limit: String(pageSize),
    offset: String(offset),
  })

  const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
  let stations: AdminStation[] = []
  let total = 0
  let fetchError: string | null = null

  try {
    const res = await fetch(`${goUrl}/admin/stations?${qs}`, {
      headers: { 'X-Admin-Secret': process.env.ADMIN_SECRET ?? '' },
      cache: 'no-store',
    })
    if (res.ok) {
      const json = await res.json()
      stations = json.data ?? []
      total = json.total ?? 0
    } else {
      const text = await res.text()
      fetchError = `Backend ${res.status}: ${text}`
    }
  } catch (e) {
    fetchError = `Bağlantı hatası: ${e instanceof Error ? e.message : String(e)}`
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">İstasyonlar</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {total.toLocaleString('tr-TR')} istasyon kayıtlı
        </p>
      </div>
      {fetchError && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400 font-mono">
          {fetchError}
        </div>
      )}
      <StationsTable
        initialStations={stations}
        initialTotal={total}
        initialFilters={{ q: sp.q ?? '', province: sp.province ?? '', brand_key: sp.brand_key ?? '' }}
        pageSize={pageSize}
      />
    </div>
  )
}
