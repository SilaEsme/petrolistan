'use client'

import { useRef, useState, useTransition } from 'react'
import dynamic from 'next/dynamic'
import { BRANDS, BRAND_KEY_TO_NAME } from '@/lib/brands'

const LocationPicker = dynamic(() => import('@/components/stations/LocationPicker'), {
  ssr: false,
  loading: () => <div className="h-56 w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />,
})

export interface AdminStation {
  id: number
  osm_id: number
  name: string
  brand: string
  brand_key: string
  brand_source?: string
  lat: number
  lng: number
  address: string
  city: string
  province: string
  has_benzin: boolean
  has_motorin: boolean
  has_lpg: boolean
  has_carwash: boolean
  has_market: boolean
  is_open_24h: boolean
  has_ev: boolean
  edited?: boolean
}

// ─── shared UI helpers (mirror KeysTable pattern) ────────────────────────────

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

function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
          role="button"
          tabIndex={0}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === 'Escape') && onClose()}
          aria-label="Kapat"
        />
      <div className="relative bg-white dark:bg-[#0D1B2A] rounded-xl shadow-xl border border-gray-200 dark:border-white/10 w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-white/20 rounded-lg text-sm bg-white dark:bg-[#09121E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0C447C]/40 dark:focus:ring-blue-500/40'

// ─── edit modal ───────────────────────────────────────────────────────────────

function EditStationModal({
  station,
  onClose,
  onUpdate,
}: {
  station: AdminStation
  onClose: () => void
  onUpdate: (s: AdminStation) => void
}) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: station.name,
    brand: station.brand,
    brand_key: station.brand_key,
    address: station.address,
    city: station.city,
    province: station.province,
    lat: station.lat,
    lng: station.lng,
    has_benzin: station.has_benzin,
    has_motorin: station.has_motorin,
    has_lpg: station.has_lpg,
    has_carwash: station.has_carwash,
    has_market: station.has_market,
    is_open_24h: station.is_open_24h,
    has_ev: station.has_ev,
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const res = await fetch(`/api/admin/stations/${station.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Bir hata oluştu')
        return
      }
      onUpdate(data.data)
    })
  }

  return (
    <Modal title={`İstasyon #${station.id} Düzenle`} onClose={onClose}>
      <div className="mb-4 px-3 py-2.5 bg-gray-50 dark:bg-[#09121E] rounded-lg border border-gray-200 dark:border-white/10">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">OSM ID</p>
        <p className="text-xs font-mono text-gray-700 dark:text-gray-300">{station.osm_id || '—'}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <Field label="İstasyon Adı">
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </Field>

        <Field label="Marka">
          <select
            className={inputClass}
            value={form.brand_key}
            onChange={(e) => {
              const key = e.target.value
              setForm((f) => ({ ...f, brand_key: key, brand: BRAND_KEY_TO_NAME[key] ?? f.brand }))
            }}
          >
            <option value="">— Markasız —</option>
            {/* Protect current value if it's not in the registry */}
            {form.brand_key && !BRANDS.some((b) => b.key === form.brand_key) && (
              <option value={form.brand_key}>{form.brand || form.brand_key} (kayıtlı değil)</option>
            )}
            {BRANDS.map((b) => (
              <option key={b.key} value={b.key}>{b.name}</option>
            ))}
          </select>
        </Field>

        <Field label="Adres">
          <input
            className={inputClass}
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Şehir">
            <input
              className={inputClass}
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            />
          </Field>
          <Field label="Province (İl Kodu)">
            <input
              className={inputClass}
              value={form.province}
              onChange={(e) => setForm((f) => ({ ...f, province: e.target.value }))}
              placeholder="34"
            />
          </Field>
        </div>

        <div>
          <LocationPicker
            lat={form.lat}
            lng={form.lng}
            onChange={(lat, lng) => setForm((f) => ({ ...f, lat, lng }))}
          />
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-gray-500">Marker&apos;ı sürükle veya haritaya tıkla</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${form.lat},${form.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#0C447C] dark:text-blue-400 hover:underline"
            >
              Google Haritalar&apos;da aç ↗
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Enlem (lat)">
            <input
              type="number"
              step="any"
              className={inputClass}
              value={form.lat}
              onChange={(e) => setForm((f) => ({ ...f, lat: Number(e.target.value) }))}
            />
          </Field>
          <Field label="Boylam (lng)">
            <input
              type="number"
              step="any"
              className={inputClass}
              value={form.lng}
              onChange={(e) => setForm((f) => ({ ...f, lng: Number(e.target.value) }))}
            />
          </Field>
        </div>

        {station.brand_source && (
          <div className="px-3 py-2 bg-gray-50 dark:bg-[#09121E] rounded-lg border border-gray-200 dark:border-white/10">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Marka Kaynağı</p>
            <p className="text-xs font-mono text-gray-700 dark:text-gray-300">{station.brand_source}</p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Yakıt</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Toggle
                checked={form.has_benzin}
                onChange={() => setForm((f) => ({ ...f, has_benzin: !f.has_benzin }))}
              />
              <span>Benzin</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Toggle
                checked={form.has_motorin}
                onChange={() => setForm((f) => ({ ...f, has_motorin: !f.has_motorin }))}
              />
              <span>Motorin</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Toggle
                checked={form.has_lpg}
                onChange={() => setForm((f) => ({ ...f, has_lpg: !f.has_lpg }))}
              />
              <span>LPG</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Toggle
                checked={form.has_ev}
                onChange={() => setForm((f) => ({ ...f, has_ev: !f.has_ev }))}
              />
              <span>EV</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Özellikler</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Toggle
                checked={form.has_carwash}
                onChange={() => setForm((f) => ({ ...f, has_carwash: !f.has_carwash }))}
              />
              <span>Yıkama</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Toggle
                checked={form.has_market}
                onChange={() => setForm((f) => ({ ...f, has_market: !f.has_market }))}
              />
              <span>Market</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Toggle
                checked={form.is_open_24h}
                onChange={() => setForm((f) => ({ ...f, is_open_24h: !f.is_open_24h }))}
              />
              <span>7/24</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-white/20 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={pending}
            className="flex-1 px-4 py-2 text-sm bg-[#BA7517] hover:bg-[#9a6010] text-white rounded-lg font-medium transition-colors disabled:opacity-60"
          >
            {pending ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

// ─── fuel badge ───────────────────────────────────────────────────────────────

function FuelBadges({ benzin, motorin, lpg }: { benzin: boolean; motorin: boolean; lpg: boolean }) {
  return (
    <div className="flex gap-1">
      <span
        className={`px-1.5 py-0.5 rounded text-xs font-medium ${
          benzin
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
        }`}
      >
        B
      </span>
      <span
        className={`px-1.5 py-0.5 rounded text-xs font-medium ${
          motorin
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
        }`}
      >
        M
      </span>
      <span
        className={`px-1.5 py-0.5 rounded text-xs font-medium ${
          lpg
            ? 'bg-amber-50 text-[#BA7517] dark:bg-amber-900/30 dark:text-amber-400'
            : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
        }`}
      >
        L
      </span>
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

interface Props {
  initialStations: AdminStation[]
  initialTotal: number
  initialFilters: { q: string; province: string; brand_key: string; needsReview?: boolean }
  pageSize: number
}

export default function StationsTable({
  initialStations,
  initialTotal,
  initialFilters,
  pageSize,
}: Props) {
  const [rows, setRows] = useState(initialStations)
  const [total, setTotal] = useState(initialTotal)
  const [filters, setFilters] = useState({ ...initialFilters, needsReview: initialFilters.needsReview ?? false })
  const [page, setPage] = useState(1)
  const [isPending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<number | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  function fetchPage(f: typeof filters, p: number) {
    startTransition(async () => {
      const qs = new URLSearchParams({
        ...(f.q ? { q: f.q } : {}),
        ...(f.province ? { province: f.province } : {}),
        ...(f.brand_key ? { brand_key: f.brand_key } : {}),
        ...(f.needsReview ? { needs_review: '1' } : {}),
        limit: String(pageSize),
        offset: String((p - 1) * pageSize),
      })
      try {
        const res = await fetch(`/api/admin/stations?${qs}`)
        const data = await res.json()
        if (res.ok) {
          setRows(data.data ?? [])
          setTotal(data.total ?? 0)
        }
      } catch {
        // fetch hatası — mevcut liste kalır
      }
    })
  }

  function handleQChange(val: string) {
    const newFilters = { ...filters, q: val }
    setFilters(newFilters)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      setPage(1)
      fetchPage(newFilters, 1)
    }, 300)
  }

  function handleFilterChange(key: 'province' | 'brand_key', val: string) {
    const newFilters = { ...filters, [key]: val }
    setFilters(newFilters)
    setPage(1)
    fetchPage(newFilters, 1)
  }

  function handleNeedsReviewChange(val: boolean) {
    const newFilters = { ...filters, needsReview: val }
    setFilters(newFilters)
    setPage(1)
    fetchPage(newFilters, 1)
  }

  function handlePageChange(newPage: number) {
    setPage(newPage)
    fetchPage(filters, newPage)
  }

  function deleteStation(id: number) {
    if (!confirm('Bu istasyonu silmek istediğinizden emin misiniz?')) return
    startTransition(async () => {
      const res = await fetch(`/api/admin/stations/${id}`, { method: 'DELETE' })
      if (res.ok || res.status === 204) {
        setRows((prev) => prev.filter((s) => s.id !== id))
        setTotal((t) => t - 1)
      }
    })
  }

  const editingStation = editingId !== null ? rows.find((s) => s.id === editingId) : undefined

  return (
    <>
      {editingStation && (
        <EditStationModal
          station={editingStation}
          onClose={() => setEditingId(null)}
          onUpdate={(updated) => {
            setRows((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
            setEditingId(null)
          }}
        />
      )}

      {/* Filtre bar */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          value={filters.q}
          onChange={(e) => handleQChange(e.target.value)}
          placeholder="İstasyon adı, şehir veya adres..."
          className={`${inputClass} max-w-xs`}
        />
        <input
          type="search"
          value={filters.province}
          onChange={(e) => handleFilterChange('province', e.target.value)}
          placeholder="İl kodu (ör. 34)"
          className={`${inputClass} max-w-[140px]`}
        />
        <input
          type="search"
          value={filters.brand_key}
          onChange={(e) => handleFilterChange('brand_key', e.target.value)}
          placeholder="Brand key (ör. opet)"
          className={`${inputClass} max-w-[180px]`}
        />
        <label className="flex items-center gap-2 cursor-pointer self-center text-xs text-gray-700 dark:text-gray-300 select-none">
          <input
            type="checkbox"
            checked={filters.needsReview}
            onChange={(e) => handleNeedsReviewChange(e.target.checked)}
            className="w-3.5 h-3.5 rounded accent-[#BA7517]"
          />
          Sadece haritada gizli olanlar
        </label>
        {isPending && (
          <span className="self-center text-xs text-gray-400 dark:text-gray-500">Yükleniyor…</span>
        )}
      </div>

      {/* Tablo */}
      <div className={`overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10 transition-opacity ${isPending ? 'opacity-60' : ''}`}>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-[#0D1B2A] text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Ad</th>
              <th className="px-4 py-3 font-medium">Marka / Key</th>
              <th className="px-4 py-3 font-medium">Şehir / İl</th>
              <th className="px-4 py-3 font-medium">Konum</th>
              <th className="px-4 py-3 font-medium">Yakıt</th>
              <th className="px-4 py-3 font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#09121E]">
            {rows.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 tabular-nums text-gray-400 dark:text-gray-600 text-xs">
                  {s.id}
                </td>
                <td className="px-4 py-3 max-w-[180px]">
                  <div className="flex items-start gap-1.5 flex-wrap">
                    <span className="font-medium text-gray-900 dark:text-white truncate">
                      {s.name || <span className="text-gray-400 italic text-xs">—</span>}
                    </span>
                    {s.edited && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#0C447C]/10 text-[#0C447C] dark:bg-blue-900/30 dark:text-blue-400">
                        ✎
                      </span>
                    )}
                    {!s.edited && s.brand_source === 'name' && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Şüpheli marka
                      </span>
                    )}
                    {!s.edited && !s.brand_key && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        Markasız
                      </span>
                    )}
                  </div>
                  {s.address && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">{s.address}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-900 dark:text-white text-xs font-medium">{s.brand || '—'}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs font-mono">{s.brand_key || '—'}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-700 dark:text-gray-300 text-xs">{s.city || '—'}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs">{s.province || '—'}</p>
                </td>
                <td className="px-4 py-3 tabular-nums text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {s.lat.toFixed(4)}, {s.lng.toFixed(4)}
                </td>
                <td className="px-4 py-3">
                  <FuelBadges benzin={s.has_benzin} motorin={s.has_motorin} lpg={s.has_lpg} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditingId(s.id)}
                      className="text-gray-400 hover:text-[#BA7517] transition-colors text-xs"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => deleteStation(s.id)}
                      className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors text-xs"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-14 text-center text-gray-400 dark:text-gray-600 text-sm"
                >
                  {isPending ? 'Yükleniyor…' : 'İstasyon bulunamadı.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Sayfalama */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>
          Toplam {total.toLocaleString('tr-TR')} istasyon — Sayfa {page} / {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1 || isPending}
            className="px-3 py-1.5 border border-gray-300 dark:border-white/20 rounded-lg text-xs hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Önceki
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages || isPending}
            className="px-3 py-1.5 border border-gray-300 dark:border-white/20 rounded-lg text-xs hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Sonraki →
          </button>
        </div>
      </div>
    </>
  )
}
