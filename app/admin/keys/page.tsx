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

  try {
    const res = await fetch(`${goUrl}/admin/keys`, {
      headers: { 'X-Admin-Secret': process.env.ADMIN_SECRET ?? '' },
      cache: 'no-store',
    })
    if (res.ok) {
      const json = await res.json()
      keys = json.data ?? []
    }
  } catch {
    // backend unreachable — show empty table
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">API Anahtarları</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {keys.length} anahtar kayıtlı
        </p>
      </div>
      <KeysTable initialKeys={keys} />
    </div>
  )
}
