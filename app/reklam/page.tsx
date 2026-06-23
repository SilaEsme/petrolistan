import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reklamcılık | Petrolistan',
  description: 'Petrolistan\'ın reklamcılık politikası hakkında bilgi. Şu an yalnızca Google AdSense ile çalışmaktayız.',
  alternates: { canonical: 'https://petrolistan.com/reklam' },
}

export default function ReklamPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark dark:text-gray-100 mb-2">Reklamcılık</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 border-b border-gray-100 dark:border-gray-800 pb-6">
        Petrolistan&apos;ın reklam politikası ve iş birliği seçenekleri.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Mevcut Durum</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
          <p>
            Petrolistan şu anda yalnızca <strong className="text-gray-900 dark:text-gray-100">Google AdSense</strong> üzerinden
            reklam yayınlamaktadır. Doğrudan reklam plasmanı veya sponsorluk anlaşması kabul etmiyoruz.
          </p>
          <p>
            Bu politika editoryal bağımsızlığımızı korumak için bilinçli bir tercih olup ilerleyen dönemde
            değişebilir.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Neden Petrolistan?</h2>
        <div className="space-y-3 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
          <p>
            Platformumuz; günlük Brent ve WTI petrol fiyatlarını, akaryakıt pompasını ve döviz kurlarını
            takip eden, satın alma kararlarında veri odaklı hareket eden bir kitleye hitap etmektedir.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 text-center">
              <p className="text-lg font-bold text-dark dark:text-gray-100">81 il</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Türkiye geneli akaryakıt fiyatları</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 text-center">
              <p className="text-lg font-bold text-dark dark:text-gray-100">11 marka</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Anlık pompa fiyatı karşılaştırması</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 text-center">
              <p className="text-lg font-bold text-dark dark:text-gray-100">Günlük</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ham petrol &amp; döviz güncelleme</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-dark/5 dark:bg-white/5 border border-brand/20 dark:border-white/10 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-dark dark:text-gray-200">İleride iş birliği yapmak ister misiniz?</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Gelecekteki fırsatlar için iletişime geçebilirsiniz.</p>
        </div>
        <Link
          href="/iletisim"
          className="shrink-0 bg-brand text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-dark transition-colors"
        >
          İletişim →
        </Link>
      </div>
    </main>
  )
}
