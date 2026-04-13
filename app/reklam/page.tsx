import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reklam Ver | Petrolistan',
  description: 'Petrolistan\'da reklam verin. Türkiye\'nin enerji sektöründeki profesyonellere ve araç sahiplerine ulaşın.',
}

export default function ReklamPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">Reklam Ver</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Petrolistan okuyucularına ulaşın.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Neden Petrolistan?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Petrolistan, Türkiye&apos;nin enerji sektöründe aktif profesyonellere ve araç sahiplerine
            ulaşmanızı sağlar. Ham petrol, akaryakıt ve doğalgaz fiyatlarını takip eden, satın alma
            kararlarında veri odaklı hareket eden bir kitleye hitap ediyoruz.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Reklam Seçenekleri</h2>
        <div className="space-y-3 text-gray-700 text-[15px] leading-relaxed">
          <div className="border border-gray-100 rounded-lg p-4">
            <p className="font-semibold text-dark">Leaderboard Banner <span className="font-normal text-gray-500 text-sm">(728×60)</span></p>
            <p className="text-sm text-gray-600 mt-1">Sayfa üstü konumlandırma, maksimum görünürlük.</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-4">
            <p className="font-semibold text-dark">Sidebar Rectangle <span className="font-normal text-gray-500 text-sm">(300×250)</span></p>
            <p className="text-sm text-gray-600 mt-1">Fiyat verileri yanında, yüksek tıklanma oranı.</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-4">
            <p className="font-semibold text-dark">Native Sponsorluk</p>
            <p className="text-sm text-gray-600 mt-1">İçerik içi marka tanıtımı, okuyucu dostu format.</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-4">
            <p className="font-semibold text-dark">Bülten Sponsorluğu</p>
            <p className="text-sm text-gray-600 mt-1">E-posta listesi reklamı, doğrudan okuyucu erişimi.</p>
          </div>
        </div>
      </section>

      <div className="bg-dark/5 border border-brand/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-dark">Teklif alın</p>
          <p className="text-xs text-gray-500 mt-0.5">Reklam seçenekleri ve fiyatlar için iletişime geçin.</p>
        </div>
        <Link
          href="mailto:reklam@petrolistan.com"
          className="shrink-0 bg-brand text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-dark transition-colors"
        >
          reklam@petrolistan.com →
        </Link>
      </div>
    </main>
  )
}
