'use client'
import useSWR from 'swr'
import {
  LineChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import { useState } from 'react'
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'
import { fetcher } from '@/lib/api'

interface DataPoint {
  date: string
  gasoline: number
  diesel: number
  lpg: number
}

interface HistoryResponse {
  brand: string
  province: string
  days: number
  data: DataPoint[]
}

const TR_MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']

function formatDate(d: string): string {
  const dt = new Date(d)
  return `${dt.getDate()} ${TR_MONTHS[dt.getMonth()]}`
}

const SERIES = [
  { key: 'gasoline', label: 'Benzin 95', color: '#0C447C' },
  { key: 'diesel',   label: 'Motorin',   color: '#BA7517' },
  { key: 'lpg',      label: 'LPG',       color: '#3B6D11' },
] as const

interface FuelHistoryChartProps {
  province: string
  brands: string[]
}

export default function FuelHistoryChart({ province, brands }: FuelHistoryChartProps) {
  const [selectedBrand, setSelectedBrand] = useState(brands[0] ?? '')

  const { data, isLoading } = useSWR<HistoryResponse>(
    selectedBrand
      ? `/api/fuel-history?province=${province}&brand=${encodeURIComponent(selectedBrand)}`
      : null,
    fetcher,
    { refreshInterval: 3_600_000, revalidateOnFocus: false }
  )

  const points = data?.data ?? []

  return (
    <section className="mt-6 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      {/* Başlık + marka seçici */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          30 Günlük Fiyat Geçmişi
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={[
                'text-[11px] font-medium px-2.5 py-1 rounded-full border transition-colors',
                selectedBrand === b
                  ? 'bg-[#0C447C] text-white border-[#0C447C]'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#0C447C]/40',
              ].join(' ')}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      {isLoading ? (
        <div className="h-[220px] bg-gray-50 rounded-lg animate-pulse" />
      ) : points.length === 0 ? (
        <div className="h-[220px] flex items-center justify-center text-sm text-gray-400">
          Geçmiş veri henüz oluşuyor.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={points} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              interval={6}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v} ₺`}
              width={52}
            />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: 12,
              }}
              formatter={(value: ValueType | undefined, name: NameType | undefined): [string, string] => {
                const label = SERIES.find((s) => s.key === name)?.label ?? String(name)
                return [`${Number(value ?? 0).toFixed(2)} ₺/L`, label]
              }}
              labelFormatter={(label: React.ReactNode) => formatDate(String(label))}
              cursor={{ stroke: '#0C447C', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Legend
              formatter={(value) => SERIES.find((s) => s.key === value)?.label ?? value}
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            />
            {SERIES.map(({ key, label: _label, color }) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  )
}
