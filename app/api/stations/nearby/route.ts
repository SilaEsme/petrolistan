import { NextResponse } from 'next/server'
import { fetchWithTimeout } from '@/lib/fetch-with-timeout'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat ve lng zorunlu' }, { status: 400 })
  }

  const params = new URLSearchParams({ lat, lng })
  if (searchParams.get('fuel_type')) params.set('fuel_type', searchParams.get('fuel_type')!)
  if (searchParams.get('province'))  params.set('province',  searchParams.get('province')!)
  if (searchParams.get('radius'))    params.set('radius',    searchParams.get('radius')!)

  try {
    const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetchWithTimeout(`${goUrl}/stations/nearby?${params}`, { timeoutMs: 10000 })
    if (!res.ok) throw new Error(`Go backend: ${res.status}`)
    const json = await res.json()
    return NextResponse.json(json, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'bilinmeyen hata'
    console.error('[/api/stations/nearby]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
