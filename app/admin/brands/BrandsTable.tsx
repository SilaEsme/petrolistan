'use client'

import { useState, useTransition } from 'react'

export interface BrandSetting {
  slug: string
  name: string
  enabled: boolean
  enabled_stations: boolean
  updated_at: string
}

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`relative w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0C447C]/40 disabled:opacity-50 ${
        checked ? 'bg-[#0C447C]' : 'bg-gray-300 dark:bg-gray-600'
      }`}
      aria-label={checked ? 'Devre dışı bırak' : 'Aktif et'}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
          checked ? 'left-5' : 'left-0.5'
        }`}
      />
    </button>
  )
}

export default function BrandsTable({ initialBrands }: { initialBrands: BrandSetting[] }) {
  const [brands, setBrands] = useState(initialBrands)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function toggle(b: BrandSetting, field: 'enabled' | 'enabled_stations') {
    setError('')
    startTransition(async () => {
      const res = await fetch(`/api/admin/brands/${b.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !b[field] }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Bir hata oluştu')
        return
      }
      setBrands((prev) => prev.map((x) => (x.slug === b.slug ? data.data : x)))
    })
  }

  const enabledCount = brands.filter((b) => b.enabled).length
  const stationCount = brands.filter((b) => b.enabled_stations).length

  return (
    <>
      {error && (
        <div className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-[#0D1B2A] text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 font-medium">Marka</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">
                Karşılaştırmada ({enabledCount}/{brands.length})
              </th>
              <th className="px-4 py-3 font-medium">
                İstasyon Aramada ({stationCount}/{brands.length})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#09121E]">
            {brands.map((b) => (
              <tr
                key={b.slug}
                className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{b.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                  {b.slug}
                </td>
                <td className="px-4 py-3">
                  <Toggle
                    checked={b.enabled}
                    onChange={() => toggle(b, 'enabled')}
                    disabled={isPending}
                  />
                </td>
                <td className="px-4 py-3">
                  <Toggle
                    checked={b.enabled_stations}
                    onChange={() => toggle(b, 'enabled_stations')}
                    disabled={isPending}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
