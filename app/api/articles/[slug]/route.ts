import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const backendUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetch(`${backendUrl}/articles/${slug}`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    })
    if (res.status === 404) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }
    if (!res.ok) {
      return NextResponse.json({ error: 'backend error' }, { status: res.status })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
