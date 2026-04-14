// @ts-check
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' }

interface PriceResult {
  value: number
  change: number
  changePercent: number
}

async function fetchBrent(): Promise<PriceResult> {
  const res = await fetch(
    'https://query1.finance.yahoo.com/v8/finance/chart/BZ=F?interval=1d&range=2d',
    { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) }
  )
  const data = await res.json()
  const meta = data.chart.result[0].meta
  const price = meta.regularMarketPrice
  const prev = meta.chartPreviousClose
  const change = parseFloat((price - prev).toFixed(2))
  const changePercent = parseFloat(((change / prev) * 100).toFixed(2))
  return { value: price, change, changePercent }
}

async function fetchWTI(): Promise<PriceResult> {
  const res = await fetch(
    'https://query1.finance.yahoo.com/v8/finance/chart/CL=F?interval=1d&range=2d',
    { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) }
  )
  const data = await res.json()
  const meta = data.chart.result[0].meta
  const price = meta.regularMarketPrice
  const prev = meta.chartPreviousClose
  const change = parseFloat((price - prev).toFixed(2))
  const changePercent = parseFloat(((change / prev) * 100).toFixed(2))
  return { value: price, change, changePercent }
}

async function fetchRates(): Promise<{ usd: number; eur: number }> {
  const res = await fetch(
    'https://www.tcmb.gov.tr/kurlar/today.xml',
    { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) }
  )
  const text = await res.text()

  const usdMatch = text.match(
    /<Currency[^>]*CurrencyCode="USD"[^>]*>[\s\S]*?<ForexBuying>([\d.]+)<\/ForexBuying>/
  )
  const eurMatch = text.match(
    /<Currency[^>]*CurrencyCode="EUR"[^>]*>[\s\S]*?<ForexBuying>([\d.]+)<\/ForexBuying>/
  )

  if (!usdMatch || !eurMatch) throw new Error('TCMB parse hatası')
  return {
    usd: parseFloat(usdMatch[1]),
    eur: parseFloat(eurMatch[1]),
  }
}

export async function GET() {
  try {
    const [brent, wti, fx] = await Promise.all([
      fetchBrent(),
      fetchWTI(),
      fetchRates(),
    ])

    const updatedAt = new Date().toISOString()

    return NextResponse.json(
      {
        updatedAt,
        ttl: 300,
        usdtry: fx.usd,
        eurtry: fx.eur,
        data: [
          {
            label: 'Brent ham petrol',
            value: brent.value,
            unit: 'varil',
            currency: '$',
            change: brent.change,
            changePercent: brent.changePercent,
            source: 'Yahoo Finance',
            featured: true,
          },
          {
            label: 'WTI ham petrol',
            value: wti.value,
            unit: 'varil',
            currency: '$',
            change: wti.change,
            changePercent: wti.changePercent,
            source: 'Yahoo Finance',
          },
          {
            label: 'Brent (TL karsiligi)',
            value: parseFloat((brent.value * fx.usd).toFixed(2)),
            unit: 'varil',
            currency: 'TL',
            change: parseFloat((brent.change * fx.usd).toFixed(2)),
            changePercent: brent.changePercent,
            source: 'Yahoo Finance x TCMB',
          },
        ],
      },
      { headers: JSON_HEADERS }
    )
  } catch (err: any) {
    console.error('[/api/prices] hata:', err)
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: JSON_HEADERS }
    )
  }
}
