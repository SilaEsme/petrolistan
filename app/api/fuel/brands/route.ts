export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const province = searchParams.get('province') ?? '34'

  try {
    const goUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetch(
      `${goUrl}/fuel/brands?province=${province}`,
      { signal: AbortSignal.timeout(10000) }
    )
    if (!res.ok) throw new Error(`Go backend: ${res.status}`)
    const json = await res.json()
    return NextResponse.json(json, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
  } catch (err: any) {
    console.error('[/api/fuel/brands]', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
