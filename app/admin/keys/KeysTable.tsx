'use client'

import { useState, useTransition } from 'react'

export interface AdminKey {
  id: number
  key: string
  name: string
  email: string
  tier: string
  is_active: boolean
  rate_limit: number
  created_at: string
  last_used_at: string | null
  current_use: number
}

const TIERS = ['free', 'registered', 'premium'] as const

function TierBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    free: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    registered: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    premium: 'bg-amber-50 text-[#BA7517] dark:bg-amber-900/30 dark:text-amber-300',
  }
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium ${styles[tier] ?? styles.registered}`}
    >
      {tier}
    </span>
  )
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

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#0D1B2A] rounded-xl shadow-xl border border-gray-200 dark:border-white/10 w-full max-w-md p-6">
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

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-white/20 rounded-lg text-sm bg-white dark:bg-[#09121E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0C447C]/40 dark:focus:ring-blue-500/40'

function CreateKeyModal({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (key: AdminKey) => void
}) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    tier: 'registered',
    rate_limit: 120,
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const res = await fetch('/api/admin/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Bir hata oluştu')
        return
      }
      onCreate(data.data)
    })
  }

  return (
    <Modal title="Yeni API Anahtarı" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}
        <Field label="Ad (opsiyonel)">
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Müşteri adı"
          />
        </Field>
        <Field label="E-posta *">
          <input
            type="email"
            required
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="ornek@domain.com"
          />
        </Field>
        <Field label="Tier">
          <select
            className={inputClass}
            value={form.tier}
            onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value }))}
          >
            {TIERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Saatlik İstek Limiti">
          <input
            type="number"
            required
            min={1}
            className={inputClass}
            value={form.rate_limit}
            onChange={(e) => setForm((f) => ({ ...f, rate_limit: Number(e.target.value) }))}
          />
        </Field>
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
            className="flex-1 px-4 py-2 text-sm bg-[#0C447C] hover:bg-[#042C53] text-white rounded-lg font-medium transition-colors disabled:opacity-60"
          >
            {pending ? 'Oluşturuluyor...' : 'Oluştur'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

function EditKeyModal({
  keyData,
  onClose,
  onUpdate,
}: {
  keyData: AdminKey
  onClose: () => void
  onUpdate: (key: AdminKey) => void
}) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: keyData.name,
    tier: keyData.tier,
    rate_limit: keyData.rate_limit,
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const res = await fetch(`/api/admin/keys/${keyData.id}`, {
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
    <Modal title="Anahtarı Düzenle" onClose={onClose}>
      <div className="mb-4 px-3 py-2.5 bg-gray-50 dark:bg-[#09121E] rounded-lg border border-gray-200 dark:border-white/10">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">API Anahtarı</p>
        <p className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">{keyData.key}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}
        <Field label="Ad">
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </Field>
        <Field label="Tier">
          <select
            className={inputClass}
            value={form.tier}
            onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value }))}
          >
            {TIERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Saatlik İstek Limiti">
          <input
            type="number"
            required
            min={1}
            className={inputClass}
            value={form.rate_limit}
            onChange={(e) => setForm((f) => ({ ...f, rate_limit: Number(e.target.value) }))}
          />
        </Field>
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

export default function KeysTable({ initialKeys }: { initialKeys: AdminKey[] }) {
  const [keys, setKeys] = useState(initialKeys)
  const [isPending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  function toggleActive(key: AdminKey) {
    startTransition(async () => {
      const res = await fetch(`/api/admin/keys/${key.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !key.is_active }),
      })
      if (res.ok) {
        const { data } = await res.json()
        setKeys((prev) => prev.map((k) => (k.id === key.id ? data : k)))
      }
    })
  }

  function copyKey(key: AdminKey) {
    navigator.clipboard.writeText(key.key)
    setCopiedId(key.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  function deleteKey(id: number) {
    if (!confirm('Bu anahtarı silmek istediğinizden emin misiniz?')) return
    startTransition(async () => {
      const res = await fetch(`/api/admin/keys/${id}`, { method: 'DELETE' })
      if (res.ok || res.status === 204) {
        setKeys((prev) => prev.filter((k) => k.id !== id))
      }
    })
  }

  const editingKey = editingId !== null ? keys.find((k) => k.id === editingId) : undefined

  return (
    <>
      {showCreate && (
        <CreateKeyModal
          onClose={() => setShowCreate(false)}
          onCreate={(newKey) => {
            setKeys((prev) => [newKey, ...prev])
            setShowCreate(false)
          }}
        />
      )}

      {editingKey && (
        <EditKeyModal
          keyData={editingKey}
          onClose={() => setEditingId(null)}
          onUpdate={(updated) => {
            setKeys((prev) => prev.map((k) => (k.id === updated.id ? updated : k)))
            setEditingId(null)
          }}
        />
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-[#0D1B2A] text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 font-medium">Ad</th>
              <th className="px-4 py-3 font-medium">E-posta</th>
              <th className="px-4 py-3 font-medium">Tier</th>
              <th className="px-4 py-3 font-medium">Limit/sa</th>
              <th className="px-4 py-3 font-medium">Bu saat</th>
              <th className="px-4 py-3 font-medium">Aktif</th>
              <th className="px-4 py-3 font-medium">Oluşturma</th>
              <th className="px-4 py-3 font-medium">Son kullanım</th>
              <th className="px-4 py-3 font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#09121E]">
            {keys.map((k) => (
              <tr key={k.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[120px] truncate">
                  {k.name || <span className="text-gray-400 italic text-xs">—</span>}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-[160px] truncate">
                  {k.email}
                </td>
                <td className="px-4 py-3">
                  <TierBadge tier={k.tier} />
                </td>
                <td className="px-4 py-3 tabular-nums text-gray-700 dark:text-gray-300">
                  {k.rate_limit}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  <span
                    className={
                      k.current_use > k.rate_limit * 0.8
                        ? 'text-amber-600 dark:text-amber-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-300'
                    }
                  >
                    {k.current_use}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Toggle
                    checked={k.is_active}
                    onChange={() => toggleActive(k)}
                    disabled={isPending}
                  />
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
                  {new Date(k.created_at).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
                  {k.last_used_at ? (
                    new Date(k.last_used_at).toLocaleDateString('tr-TR')
                  ) : (
                    <span className="text-gray-300 dark:text-gray-600">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => copyKey(k)}
                      className="text-gray-400 hover:text-[#0C447C] dark:hover:text-blue-400 transition-colors text-xs"
                    >
                      {copiedId === k.id ? '✓ Kopyalandı' : 'Kopyala'}
                    </button>
                    <button
                      onClick={() => setEditingId(k.id)}
                      className="text-gray-400 hover:text-[#BA7517] transition-colors text-xs"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => deleteKey(k.id)}
                      className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors text-xs"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {keys.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-14 text-center text-gray-400 dark:text-gray-600 text-sm"
                >
                  Henüz API anahtarı yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowCreate(true)}
          className="bg-[#0C447C] hover:bg-[#042C53] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Yeni Anahtar
        </button>
      </div>
    </>
  )
}
