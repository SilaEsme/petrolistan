'use client'

import { useState, useEffect } from 'react'
import type { NewsItem } from '@/types'

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'az önce'
  if (mins < 60) return `${mins} dakika önce`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} saat önce`
  const days = Math.floor(hours / 24)
  return `${days} gün önce`
}

interface Props {
  item: NewsItem
  isLast?: boolean
}

export default function NewsCard({ item, isLast = false }: Props) {
  const [timeLabel, setTimeLabel] = useState<string>('')

  useEffect(() => {
    setTimeLabel(relativeTime(item.publishedAt))
    const id = setInterval(() => setTimeLabel(relativeTime(item.publishedAt)), 60_000)
    return () => clearInterval(id)
  }, [item.publishedAt])

  const href = item.externalUrl ?? `/haberler/${item.slug}`
  const isExternal = !!item.externalUrl

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="block hover:bg-gray-50/50 transition-colors cursor-pointer"
    >
      <article
        className={`py-4 ${
          item.featured ? 'border-l-[3px] border-[#0E7C7B] pl-4 -ml-4' : ''
        } ${!isLast ? 'border-b border-gray-100' : ''}`}
      >
        {/* Category + Time */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[#0E7C7B] font-semibold text-[10px] uppercase tracking-[0.04em]">
            {item.category}
          </span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-[11px] text-gray-400">{timeLabel}</span>
        </div>

        {/* Title */}
        <h3
          className={`font-semibold text-[#0A1628] leading-snug line-clamp-2 mb-1.5 ${
            item.featured ? 'text-[17px]' : 'text-[15px]'
          }`}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        {item.excerpt && (
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-2">
            {item.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="text-[11px] text-gray-400">
          {item.source} · {item.readingTime} dk okuma
        </div>
      </article>
    </a>
  )
}
