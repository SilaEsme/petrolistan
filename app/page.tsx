'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePrices, usePriceHistory } from '@/lib/api'
import PriceGrid from '@/components/prices/PriceGrid'
import PriceChart from '@/components/prices/PriceChart'
import FuelSidebar from '@/components/sidebar/FuelSidebar'
import { PROVINCES } from '@/lib/provinces'

const sonAnalizler = [
  {
    slug: 'surdurulebilir-enerji-turkiye-2030',
    category: 'TÜRKİYE',
    categoryBg: '#E1F5EE',
    categoryColor: '#085041',
    title: 'Sürdürülebilir Enerji ve Türkiye\'nin 2030 Hedefleri',
    excerpt: 'Yenilenebilir kapasite, Akkuyu ve 2030 enerji dönüşüm hedefleri.',
    readingTime: 9,
  },
  {
    slug: 'dolar-kuru-akaryakit-fiyat-etkisi',
    category: 'TÜRKİYE',
    categoryBg: '#E1F5EE',
    categoryColor: '#085041',
    title: 'Dolar Kuru Akaryakıt Fiyatını Nasıl Etkiler?',
    excerpt: 'USD/TRY kurunun pompa fiyatlarına geçişkenliği ve 2021-2026 verileri.',
    readingTime: 8,
  },
  {
    slug: 'akaryakit-tasarrufu-ipuclari',
    category: 'TÜRKİYE',
    categoryBg: '#E1F5EE',
    categoryColor: '#085041',
    title: 'Akaryakıt Tasarrufu: Kanıtlanmış 12 İpucu',
    excerpt: 'Yakıt tüketiminizi %15-20 azaltacak sürüş teknikleri ve bakım önerileri.',
    readingTime: 7,
  },
]

export default function HomePage() {
  const { prices, updatedAt, isLoading } = usePrices()
  const { history, isLoading: historyLoading } = usePriceHistory()
  const [province, setProvince] = useState('34')

  const formattedTime = (() => {
    if (!updatedAt) return undefined
    try {
      const d = new Date(updatedAt)
      if (isNaN(d.getTime())) return undefined
      return d.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return undefined
    }
  })()

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      {/* Son Analizler */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Son Analizler</h2>
          <Link href="/analizler" className="text-xs text-[#185FA5] hover:underline">
            Tümünü gör →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sonAnalizler.map((a) => (
            <Link
              key={a.slug}
              href={`/analizler/${a.slug}`}
              className="block group p-4 rounded-xl border border-gray-100 hover:border-[#0C447C]/20 hover:bg-gray-50/60 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: a.categoryBg, color: a.categoryColor }}>
                  {a.category}
                </span>
                <span className="text-[10px] text-gray-400">{a.readingTime} dk</span>
              </div>
              <p className="text-[13px] font-semibold text-gray-900 leading-snug group-hover:text-[#0C447C] transition-colors mb-1">
                {a.title}
              </p>
              <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <PriceGrid
            items={prices}
            lastUpdated={formattedTime}
            isLoading={isLoading}
          />
          <PriceChart data={history} isLoading={historyLoading} />
        </div>
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <div className="flex flex-col gap-0.5">
            <label htmlFor="sidebar-province" className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              Şehir
            </label>
            <select
              id="sidebar-province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full border border-[#0C447C]/40 rounded-md px-2 py-1 text-[13px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0C447C]/30 focus:border-[#0C447C]"
            >
              {Object.entries(PROVINCES).map(([code, name]) => (
                <option key={code} value={code}>{code} — {name}</option>
              ))}
            </select>
          </div>
          <FuelSidebar province={province} />
        </div>
      </div>
    </main>
  )
}
