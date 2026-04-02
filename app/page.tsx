'use client'
import { usePrices, usePriceHistory } from '@/lib/api'
import PriceGrid from '@/components/prices/PriceGrid'
import PriceChart from '@/components/prices/PriceChart'
import FuelSidebar from '@/components/sidebar/FuelSidebar'

export default function HomePage() {
  const { prices, updatedAt, isLoading } = usePrices()
  const { history, isLoading: historyLoading } = usePriceHistory()

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
        <div className="w-64 shrink-0">
          <FuelSidebar />
        </div>
      </div>
    </main>
  )
}
