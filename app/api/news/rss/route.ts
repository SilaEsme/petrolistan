export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetch(`${goUrl}/news`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error(`Go backend: ${res.status}`)
    const json = await res.json()
    return NextResponse.json(json, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
  } catch (err: any) {
    console.error('[/api/news/rss]', err.message)
    return NextResponse.json({ data: [], error: err.message }, { status: 500 })
  }
}
