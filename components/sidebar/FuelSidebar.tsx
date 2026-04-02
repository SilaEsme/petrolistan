'use client'
import { useFuel } from '@/lib/api'

export default function FuelSidebar() {
  const { fuel, isLoading } = useFuel()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200/80 rounded-lg p-3">
      <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
        Akaryakıt fiyatları
      </h3>
      <div className="space-y-2.5">
        {fuel.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs text-gray-500">{item.name}</span>
              <span className="text-sm font-medium text-gray-900 tabular-nums">
                {item.value.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                <span className="text-[10px] text-gray-400 ml-0.5">{item.unit}</span>
              </span>
            </div>
            <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#185FA5] rounded-full"
                style={{ width: `${item.barPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mt-3">Kaynak: EPDK · Haftalık güncelleme</p>
    </div>
  )
}
