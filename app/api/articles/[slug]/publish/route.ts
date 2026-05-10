import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const apiKey = req.headers.get('x-api-key')
  if (!apiKey || apiKey !== process.env.ARTICLE_API_KEY) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const { slug } = await params
  try {
    const backendUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetch(`${backendUrl}/articles/${slug}/publish`, {
      method: 'PATCH',
      headers: { 'X-Api-Key': apiKey },
      signal: AbortSignal.timeout(8000),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
