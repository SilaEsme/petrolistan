import type { NewsItem } from '@/types'

const CATEGORY_STYLES: Record<string, { badge: string; icon: string }> = {
  'OPEC+':   { badge: 'bg-[#E6F1FB] text-[#0C447C]', icon: 'bg-[#E6F1FB]' },
  'TÜRKİYE': { badge: 'bg-[#E1F5EE] text-[#085041]', icon: 'bg-[#E1F5EE]' },
  'ANALİZ':  { badge: 'bg-[#FAEEDA] text-[#633806]', icon: 'bg-[#FAEEDA]' },
  'PAZAR':   { badge: 'bg-[#FAECE7] text-[#712B13]', icon: 'bg-[#FAECE7]' },
  'DÜNYA':   { badge: 'bg-[#F1EFE8] text-[#444441]', icon: 'bg-[#F1EFE8]' },
}

const CATEGORY_INITIALS: Record<string, string> = {
  'OPEC+':   'O+',
  'TÜRKİYE': 'TR',
  'ANALİZ':  'AN',
  'PAZAR':   'PZ',
  'DÜNYA':   'DY',
}

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
  const style = CATEGORY_STYLES[item.category] ?? CATEGORY_STYLES['DÜNYA']
  const initials = CATEGORY_INITIALS[item.category] ?? item.category.slice(0, 2)

  return (
    <a
      href={`/haberler/${item.slug}`}
      className="block hover:bg-gray-50/50 transition-colors cursor-pointer"
    >
    <article
      className={`flex gap-3 py-3 ${
        item.featured ? 'border-l-2 border-[#378ADD] pl-3 -ml-3' : ''
      } ${!isLast ? 'border-b border-gray-100' : ''}`}
    >
      {/* Sol: içerik */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${style.badge}`}>
            {item.category}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1">
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">
          {item.excerpt}
        </p>
        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <span>{relativeTime(item.publishedAt)}</span>
          <span>·</span>
          <span>{item.source}</span>
          <span>·</span>
          <span>{item.readingTime} dk okuma</span>
        </div>
      </div>

      {/* Sağ: dekoratif ikon */}
      <div
        className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold ${style.icon}`}
        style={{ color: style.badge.match(/text-\[([^\]]+)\]/)?.[1] }}
      >
        {initials}
      </div>
    </article>
    </a>
  )
}
