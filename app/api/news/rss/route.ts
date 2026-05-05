export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { fetchWithTimeout } from '@/lib/fetch-with-timeout'

export async function GET() {
  try {
    const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetchWithTimeout(`${goUrl}/news`, {
      next: { revalidate: 300 },
      timeoutMs: 5000,
    })
    if (!res.ok) throw new Error(`Go backend: ${res.status}`)
    const json = await res.json()
    return NextResponse.json(json, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/news/rss]', message)
    return NextResponse.json({ data: [], error: message }, { status: 500 })
  }
}
