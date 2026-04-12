'use client'
import { useState } from 'react'
import { usePrices, usePriceHistory } from '@/lib/api'
import PriceGrid from '@/components/prices/PriceGrid'
import PriceChart from '@/components/prices/PriceChart'
import FuelSidebar from '@/components/sidebar/FuelSidebar'
import { PROVINCES } from '@/lib/provinces'

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
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <PriceGrid
            items={prices}
            lastUpdated={formattedTime}
            isLoading={isLoading}
          />
          <PriceChart data={history} isLoading={historyLoading} />
        </div>
        <div className="w-64 shrink-0 space-y-2">
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
