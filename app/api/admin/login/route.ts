export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { setAdminCookie } from '@/lib/admin-auth'

export async function POST(request: Request) {
  const formData = await request.formData()
  const password = formData.get('password') as string
  const from = (formData.get('from') as string) || '/admin/keys'

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(
      new URL(`/admin/login?error=1&from=${encodeURIComponent(from)}`, request.url),
      303,
    )
  }

  const response = NextResponse.redirect(new URL(from, request.url), 303)
  await setAdminCookie(response)
  return response
}
