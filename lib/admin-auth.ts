import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { signToken, verifyToken } from './admin-token'

export { verifyToken }

const COOKIE_NAME = 'admin_session'
const MAX_AGE_S = 24 * 60 * 60

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyToken(token)
}

export async function setAdminCookie(response: NextResponse): Promise<void> {
  response.cookies.set(COOKIE_NAME, await signToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE_S,
    path: '/',
  })
}

export function clearAdminCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })
}
