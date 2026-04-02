'use client'
import { usePrices } from '@/lib/api'
import PriceGrid from '@/components/prices/PriceGrid'

export default function HomePage() {
  const { prices, updatedAt, isLoading } = usePrices()

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
      <PriceGrid
        items={prices}
        lastUpdated={formattedTime}
        isLoading={isLoading}
      />
    </main>
  )
}
