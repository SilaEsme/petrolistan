'use client'

import { useState } from 'react'

export const BRAND_LOGOS: Record<string, string> = {
  'Opet':         '/brands/opet.png',
  'Shell':        '/brands/shell.png',
  'Petrol Ofisi': '/brands/petrolofisi.png',
  'Aytemiz':      '/brands/aytemiz.jpg',
  'Lukoil':       '/brands/lukoil.svg',
  'Total':        '/brands/total.png',
  'Moil':         '/brands/moil.png',
}

function brandInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export function BrandLogo({ name, size = 26 }: { name: string; size?: number }) {
  const [failed, setFailed] = useState(false)
  const src = BRAND_LOGOS[name]

  if (!src || failed) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-md bg-gray-100 text-[#0C447C] text-[11px] font-bold flex items-center justify-center flex-shrink-0"
      >
        {brandInitials(name)}
      </div>
    )
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-md overflow-hidden bg-white border border-gray-100 flex items-center justify-center flex-shrink-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
