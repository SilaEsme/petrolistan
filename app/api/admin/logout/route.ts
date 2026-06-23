export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { clearAdminCookie } from '@/lib/admin-auth'

export async function POST(request: Request) {
  const u = new URL('/admin/login', request.url)
  if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') u.protocol = 'http:'
  const response = NextResponse.redirect(u, 303)
  clearAdminCookie(response)
  return response
}
