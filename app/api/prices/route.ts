// @ts-check
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

const EIA_KEY = process.env.EIA_API_KEY

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' }

interface PriceResult {
  value: number
  change: number
  changePercent: number
}

async function fetchEiaProduct(product: string): Promise<PriceResult> {
  const url = new URL('https://api.eia.gov/v2/petroleum/pri/spt/data/')
  url.searchParams.set('api_key', EIA_KEY!)
  url.searchParams.set('frequency', 'daily')
  url.searchParams.append('data[]', 'value')
  url.searchParams.append(`facets[product][]`, product)
  url.searchParams.append('sort[0][column]', 'period')
  url.searchParams.append('sort[0][direction]', 'desc')
  url.searchParams.set('length', '2')

  const res = await fetch(url.toString(), { next: { revalidate: 300 } })
  const json = await res.json()

  const today = parseFloat(json.response.data[0].value)
  const yesterday = parseFloat(json.response.data[1].value)
  const change = parseFloat((today - yesterday).toFixed(2))
  const changePercent = parseFloat(((change / yesterday) * 100).toFixed(2))

  return { value: today, change, changePercent }
}

async function fetchUSDTRY(): Promise<{ usd: number; eur: number }> {
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
    if (!EIA_KEY) {
      return NextResponse.json(
        { error: 'EIA_API_KEY eksik' },
        { status: 500, headers: JSON_HEADERS }
      )
    }

    const [brent, wti, fx] = await Promise.all([
      fetchEiaProduct('EPCBRENT'),
      fetchEiaProduct('EPCWTI'),
      fetchUSDTRY(),
    ])

    const updatedAt = new Date().toISOString()
    console.log('updatedAt:', updatedAt)

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
            source: 'EIA',
            featured: true,
          },
          {
            label: 'WTI ham petrol',
            value: wti.value,
            unit: 'varil',
            currency: '$',
            change: wti.change,
            changePercent: wti.changePercent,
            source: 'NYMEX',
          },
          {
            label: 'Brent (TL karsiligi)',
            value: parseFloat((brent.value * fx.usd).toFixed(2)),
            unit: 'varil',
            currency: 'TL',
            change: parseFloat((brent.change * fx.usd).toFixed(2)),
            changePercent: brent.changePercent,
            source: 'EIA x TCMB',
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
