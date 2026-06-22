export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'

function goUrl() {
  return process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
}
function adminSecret() {
  return process.env.ADMIN_SECRET ?? ''
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const res = await fetch(`${goUrl()}/admin/keys`, {
    headers: { 'X-Admin-Secret': adminSecret() },
    cache: 'no-store',
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  const res = await fetch(`${goUrl()}/admin/keys`, {
    method: 'POST',
    headers: {
      'X-Admin-Secret': adminSecret(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
