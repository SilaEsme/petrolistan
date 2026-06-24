import { NextResponse } from 'next/server'
import { fetchWithTimeout } from '@/lib/fetch-with-timeout'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const north = searchParams.get('north')
  const south = searchParams.get('south')
  const east = searchParams.get('east')
  const west = searchParams.get('west')

  if (!north || !south || !east || !west) {
    return NextResponse.json({ error: 'north, south, east, west zorunlu' }, { status: 400 })
  }

  const params = new URLSearchParams({ north, south, east, west })
  if (searchParams.get('fuel_type')) params.set('fuel_type', searchParams.get('fuel_type')!)
  if (searchParams.get('province'))  params.set('province',  searchParams.get('province')!)

  try {
    const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetchWithTimeout(`${goUrl}/stations/bbox?${params}`, { timeoutMs: 45000 })
    if (!res.ok) throw new Error(`Go backend: ${res.status}`)
    const json = await res.json()
    return NextResponse.json(json, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'bilinmeyen hata'
    console.error('[/api/stations/bbox]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
