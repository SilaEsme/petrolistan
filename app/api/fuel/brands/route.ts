export const dynamic = 'force-dynamic'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const province = req.nextUrl.searchParams.get('province') ?? '34'

  try {
    const res = await fetch(`http://localhost:8080/fuel/brands?province=${province}`, {
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Backend hatası', status: res.status },
        { status: 502 }
      )
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  } catch (err) {
    console.error('[/api/fuel/brands]', err)
    return NextResponse.json(
      { error: 'Servise ulaşılamıyor' },
      { status: 503 }
    )
  }
}
