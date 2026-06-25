export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'

function goUrl() {
  return process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
}
function adminSecret() {
  return process.env.ADMIN_SECRET ?? ''
}

type Params = { params: Promise<{ slug: string }> }

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { slug } = await params
  const body = await request.json()
  const res = await fetch(`${goUrl()}/admin/brands/${slug}`, {
    method: 'PATCH',
    headers: {
      'X-Admin-Secret': adminSecret(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
