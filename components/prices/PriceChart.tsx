'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type DataPoint = { date: string; value: number }
type PriceChartProps = { data: DataPoint[]; isLoading?: boolean }

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs shadow-sm">
      <p className="text-gray-400 mb-0.5">{label}</p>
      <p className="font-medium text-gray-900">${payload[0].value.toFixed(2)}</p>
    </div>
  )
}

export default function PriceChart({ data, isLoading }: PriceChartProps) {
  if (isLoading) return <div className="h-[90px] bg-gray-100 rounded-lg animate-pulse" />

  const last = data.length - 1

  return (
    <section>
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          Brent 30 günlük seyir
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={90}>
        <BarChart data={data} barCategoryGap="15%" margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="date"
            tickFormatter={(d) => new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            interval={6}
          />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={i === last ? '#378ADD' : '#185FA5'} opacity={i === last ? 1 : 0.6} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
