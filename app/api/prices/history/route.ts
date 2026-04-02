export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = new URL('https://api.eia.gov/v2/petroleum/pri/spt/data/')
    url.searchParams.set('api_key', process.env.EIA_API_KEY!)
    url.searchParams.set('frequency', 'daily')
    url.searchParams.append('data[]', 'value')
    url.searchParams.append('facets[product][]', 'EPCBRENT')
    url.searchParams.append('sort[0][column]', 'period')
    url.searchParams.append('sort[0][direction]', 'desc')
    url.searchParams.set('length', '30')

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
    const json = await res.json()

    const data = json.response.data
      .map((d: any) => ({ date: d.period, value: parseFloat(d.value) }))
      .reverse()

    return NextResponse.json(
      { data, updatedAt: new Date().toISOString() },
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    )
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
