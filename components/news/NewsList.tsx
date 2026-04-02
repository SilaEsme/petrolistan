import Link from 'next/link'
import type { NewsItem } from '@/types'
import NewsCard from './NewsCard'

function SkeletonCard({ isLast = false }: { isLast?: boolean }) {
  return (
    <div className={`flex gap-3 py-3 animate-pulse ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className="flex-1 space-y-2">
        <div className="h-3 w-16 bg-gray-100 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-100 rounded" />
        <div className="h-3 w-40 bg-gray-100 rounded" />
      </div>
      <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-lg" />
    </div>
  )
}

interface Props {
  items: NewsItem[]
  title?: string
  limit?: number
  isLoading?: boolean
}

export default function NewsList({
  items,
  title = 'Son haberler',
  limit,
  isLoading = false,
}: Props) {
  const visible = limit ? items.slice(0, limit) : items
  const hasMore = limit != null && items.length > limit

  return (
    <section className="bg-white rounded-lg p-4">
      <h2 className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">
        {title}
      </h2>

      <div>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} isLast={i === 2} />
            ))
          : visible.map((item, i) => (
              <NewsCard key={item.id} item={item} isLast={i === visible.length - 1} />
            ))}
      </div>

      {hasMore && !isLoading && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Link
            href="/haberler"
            className="text-xs text-[#0C447C] font-medium hover:underline"
          >
            Tüm haberler →
          </Link>
        </div>
      )}
    </section>
  )
}
