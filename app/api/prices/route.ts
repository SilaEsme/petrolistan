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
  const changePercent = parseFloat(((price - prev) / prev * 100).toFixed(2))
  const change = parseFloat((prev * changePercent / 100).toFixed(2))
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
  const changePercent = parseFloat(((price - prev) / prev * 100).toFixed(2))
  const change = parseFloat((prev * changePercent / 100).toFixed(2))
  return { value: price, change, changePercent }
}

function getPrevBusinessDay(): Date {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1)
  return d
}

function parseRate(xml: string, currency: string): number {
  const match = xml.match(
    new RegExp(`<Currency[^>]*CurrencyCode="${currency}"[^>]*>[\\s\\S]*?<ForexBuying>([\\d.]+)<\\/ForexBuying>`)
  )
  return match ? parseFloat(match[1]) : 0
}

async function fetchRates(): Promise<{
  usd: number; eur: number
  usdChange: number; usdChangePercent: number
  eurChange: number; eurChangePercent: number
}> {
  const todayXml = await fetch(
    'https://www.tcmb.gov.tr/kurlar/today.xml',
    { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) }
  )
  const todayText = await todayXml.text()
  const usdToday = parseRate(todayText, 'USD')
  const eurToday = parseRate(todayText, 'EUR')

  const yesterday = getPrevBusinessDay()
  const dd = String(yesterday.getDate()).padStart(2, '0')
  const mm = String(yesterday.getMonth() + 1).padStart(2, '0')
  const yyyy = yesterday.getFullYear()

  const yestXml = await fetch(
    `https://www.tcmb.gov.tr/kurlar/${yyyy}${mm}/${dd}${mm}${yyyy}.xml`,
    { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
  ).catch(() => null)

  let usdChange = 0, usdChangePercent = 0
  let eurChange = 0, eurChangePercent = 0

  if (yestXml?.ok) {
    const yestText = await yestXml.text()
    const usdYest = parseRate(yestText, 'USD')
    const eurYest = parseRate(yestText, 'EUR')

    if (usdYest > 0) {
      usdChange = parseFloat((usdToday - usdYest).toFixed(4))
      usdChangePercent = parseFloat(((usdChange / usdYest) * 100).toFixed(2))
    }
    if (eurYest > 0) {
      eurChange = parseFloat((eurToday - eurYest).toFixed(4))
      eurChangePercent = parseFloat(((eurChange / eurYest) * 100).toFixed(2))
    }
  }

  return { usd: usdToday, eur: eurToday, usdChange, usdChangePercent, eurChange, eurChangePercent }
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
        usdtryChange: fx.usdChange,
        usdtryChangePercent: fx.usdChangePercent,
        eurtry: fx.eur,
        eurtryChange: fx.eurChange,
        eurtryChangePercent: fx.eurChangePercent,
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
            changePercent: brent.changePercent,
            change: parseFloat((brent.value * fx.usd * brent.changePercent / 100).toFixed(2)),
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
