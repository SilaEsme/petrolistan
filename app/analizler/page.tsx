import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enerji Analizleri | Petrolistan',
  description: 'Petrolistan enerji piyasası analizleri: OPEC kararları, benzin fiyatları, motorin karşılaştırması, petrol tahmini ve elektrikli araç maliyeti.',
}

const articles = [
  {
    slug: 'turkiye-benzin-neden-pahali',
    category: 'ANALİZ',
    categoryBg: '#FAEEDA',
    categoryColor: '#633806',
    title: 'Türkiye\'de Benzin Neden Bu Kadar Pahalı?',
    excerpt: 'ÖTV, KDV, döviz kuru ve dağıtım marjlarının pompa fiyatına yansıması. Vergi yükü ve yapısal nedenlerle kapsamlı analiz.',
    date: '16 Nisan 2026',
    readingTime: 7,
  },
  {
    slug: 'opec-turkiye-etkisi',
    category: 'OPEC+',
    categoryBg: '#E6F1FB',
    categoryColor: '#0C447C',
    title: 'OPEC Kararları Türkiye\'yi Nasıl Etkiler?',
    excerpt: 'OPEC+ üretim kotalarının Türkiye\'nin akaryakıt fiyatlarına, cari açığına ve enflasyonuna yansımaları.',
    date: '16 Nisan 2026',
    readingTime: 8,
  },
  {
    slug: 'motorin-mi-benzin-mi',
    category: 'ANALİZ',
    categoryBg: '#FAEEDA',
    categoryColor: '#633806',
    title: 'Motorin mi Benzin mi? Hangisi Daha Avantajlı?',
    excerpt: 'Yakıt maliyeti, bakım giderleri, kullanım profili ve çevre etkisi açısından kapsamlı karşılaştırma.',
    date: '16 Nisan 2026',
    readingTime: 8,
  },
  {
    slug: '2026-petrol-fiyat-tahmini',
    category: 'PAZAR',
    categoryBg: '#FAECE7',
    categoryColor: '#712B13',
    title: '2026 Petrol Fiyat Tahmini: Brent Nereye Gider?',
    excerpt: 'OPEC+ politikası, Çin talebi, jeopolitik riskler ve büyük bankaların 2026 Brent tahminlerinin analizi.',
    date: '16 Nisan 2026',
    readingTime: 9,
  },
  {
    slug: 'elektrikli-arac-yakit-maliyeti',
    category: 'TÜRKİYE',
    categoryBg: '#E1F5EE',
    categoryColor: '#085041',
    title: 'Elektrikli Araç vs. Akaryakıt: Gerçek Maliyet Karşılaştırması',
    excerpt: 'Türkiye koşullarında km başına şarj maliyeti ile benzin-motorin maliyetinin gerçekçi ve rakamsal karşılaştırması.',
    date: '16 Nisan 2026',
    readingTime: 9,
  },
]

export default function AnalizlerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">Enerji Analizleri</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Derinlemesine enerji piyasası analizleri ve yorumları.
      </p>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/analizler/${article.slug}`}
            className="block group p-5 rounded-xl border border-gray-100 hover:border-brand/30 hover:bg-gray-50/60 transition-all"
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded"
                style={{ background: article.categoryBg, color: article.categoryColor }}
              >
                {article.category}
              </span>
              <span className="text-xs text-gray-400">{article.date}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{article.readingTime} dk okuma</span>
            </div>
            <h2 className="text-[17px] font-semibold text-gray-900 leading-snug group-hover:text-brand transition-colors mb-1.5">
              {article.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-dark/5 border border-brand/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-dark">Bültene kaydolun</p>
          <p className="text-xs text-gray-500 mt-0.5">Yeni analizler yayınlandığında ilk siz haberdar olun.</p>
        </div>
        <Link
          href="/bulten"
          className="shrink-0 bg-brand text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-dark transition-colors"
        >
          Kaydol →
        </Link>
      </div>
    </main>
  )
}
