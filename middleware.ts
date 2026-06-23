import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/admin-token'

function safeUrl(path: string, base: string | URL): URL {
  const u = new URL(path, base)
  if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') {
    u.protocol = 'http:'
  }
  return u
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get('admin_session')?.value
  if (!token || !(await verifyToken(token))) {
    const loginUrl = safeUrl('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
