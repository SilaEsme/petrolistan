'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type DataPoint = { date: string; value: number }
type PriceChartProps = { data: DataPoint[]; isLoading?: boolean }

const TR_MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']

function formatDate(d: string): string {
  const dt = new Date(d)
  return `${dt.getDate()} ${TR_MONTHS[dt.getMonth()]}`
}

export default function PriceChart({ data, isLoading }: PriceChartProps) {
  if (isLoading) return <div className="h-[220px] bg-gray-100 rounded-lg animate-pulse" />

  return (
    <section className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          BRENT — 30 GÜNLÜK SEYİR
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="brentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0C447C" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#0C447C" stopOpacity={0.0} />
            </linearGradient>
          </defs>
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
            tickFormatter={(v) => `$${v}`}
            width={45}
          />
          <Tooltip
            contentStyle={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 12,
            }}
            formatter={(value: any) => [`${Number(value).toFixed(2)} $/varil`, 'Brent']}
            labelFormatter={(label: any) => formatDate(String(label))}
            cursor={{ stroke: '#0C447C', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0C447C"
            strokeWidth={2}
            dot={false}
            fill="url(#brentGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  )
}
