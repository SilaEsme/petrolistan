export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { fetchWithTimeout } from '@/lib/fetch-with-timeout'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const province = searchParams.get('province') ?? '34'
  const brand    = searchParams.get('brand') ?? ''
  const days     = searchParams.get('days') ?? '30'

  if (!brand) {
    return NextResponse.json({ error: 'brand param required' }, { status: 400 })
  }

  try {
    const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetchWithTimeout(
      `${goUrl}/fuel/history?province=${province}&brand=${encodeURIComponent(brand)}&days=${days}`,
      { timeoutMs: 10000 }
    )
    if (!res.ok) throw new Error(`Go backend: ${res.status}`)
    const json = await res.json()
    const headers: Record<string, string> = { 'Content-Type': 'application/json; charset=utf-8' }
    const cc = res.headers.get('Cache-Control')
    if (cc) headers['Cache-Control'] = cc
    return NextResponse.json(json, { headers })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/fuel-history]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
