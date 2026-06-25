export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'

function goUrl() {
  return process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
}
function adminSecret() {
  return process.env.ADMIN_SECRET ?? ''
}

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const body = await request.json()
  const res = await fetch(`${goUrl()}/admin/stations/${id}`, {
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

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const res = await fetch(`${goUrl()}/admin/stations/${id}`, {
    method: 'DELETE',
    headers: { 'X-Admin-Secret': adminSecret() },
  })
  if (res.status === 204) {
    return new NextResponse(null, { status: 204 })
  }
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
