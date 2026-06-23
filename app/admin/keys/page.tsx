export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin-auth'
import KeysTable, { type AdminKey } from './KeysTable'

export default async function AdminKeysPage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login')
  }

  const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
  let keys: AdminKey[] = []
  let fetchError: string | null = null

  try {
    const res = await fetch(`${goUrl}/admin/keys`, {
      headers: { 'X-Admin-Secret': process.env.ADMIN_SECRET ?? '' },
      cache: 'no-store',
    })
    if (res.ok) {
      const json = await res.json()
      keys = json.data ?? []
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">API Anahtarları</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {keys.length} anahtar kayıtlı
        </p>
      </div>
      {fetchError && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400 font-mono">
          {fetchError}
        </div>
      )}
      <KeysTable initialKeys={keys} />
    </div>
  )
}
