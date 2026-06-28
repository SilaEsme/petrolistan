export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetch(`${goUrl}/health`, { cache: 'no-store' })
    const json = await res.json()
    return NextResponse.json(json, { status: res.ok ? 200 : 503 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ status: 'backend_unreachable', error: message }, { status: 503 })
  }
}
