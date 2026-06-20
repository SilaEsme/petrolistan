'use client'
import Link from 'next/link'
import { useNews } from '@/lib/api'
import HomeComparisonTable from '@/components/prices/HomeComparisonTable'
import EditorialSection from '@/components/layout/EditorialSection'
import CalculatorsSection from '@/components/calculators/CalculatorsSection'

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
  } catch {
    return ''
  }
}

export default function HomePage() {
  const { news, isLoading: newsLoading } = useNews()

  const previewNews = news.slice(0, 3)

  return (
    <>
      {/* 1. Hero + Marka karşılaştırma tablosu */}
      <HomeComparisonTable />

      {/* 2. Hesaplayıcılar */}
      <CalculatorsSection />

      {/* 3. Editorial */}
      <EditorialSection />

      {/* 4. Son haberler */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 pb-6 sm:pb-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Son Haberler</p>
          <Link href="/haberler" className="text-xs text-[#185FA5] hover:underline">
            Tümünü gör →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {newsLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
              ))
            : previewNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/haberler/${item.slug}`}
                  className="block group p-4 rounded-xl border border-gray-100 hover:border-[#0C447C]/30 hover:bg-gray-50/60 transition-all"
                >
                  <p className="text-[13px] font-semibold text-gray-900 leading-snug group-hover:text-[#0C447C] transition-colors mb-2 line-clamp-2">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2">
                    <span className="font-semibold text-gray-500">{item.source}</span>
                    <span>·</span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <span className="text-[11px] text-[#185FA5] group-hover:underline">
                    Devamını oku →
                  </span>
                </Link>
              ))}
        </div>
      </div>
    </>
  )
}
