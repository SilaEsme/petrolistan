'use client'

import { usePathname } from 'next/navigation'
import { Topbar, Navbar, Ticker, Footer, BottomNav } from '.'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <>
      <Topbar />
      <Navbar />
      <Ticker />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </>
  )
}
