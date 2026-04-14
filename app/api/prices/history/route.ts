export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/BZ=F?interval=1d&range=30d',
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) }
    )
    const json = await res.json()

    const timestamps = json.chart.result[0].timestamp
    const closes = json.chart.result[0].indicators.quote[0].close

    const data = timestamps
      .map((ts: number, i: number) => ({
        date: new Date(ts * 1000).toISOString().split('T')[0],
        value: parseFloat(closes[i]?.toFixed(2) ?? '0'),
      }))
      .filter((d: any) => d.value > 0)

    return NextResponse.json(
      { data, updatedAt: new Date().toISOString() },
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    )
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
