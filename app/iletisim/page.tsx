import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim | Petrolistan',
  description: 'Petrolistan ile iletişime geçin. Soru, öneri ve veri hatası bildirimleri için info@petrolistan.com adresine yazabilirsiniz.',
  alternates: { canonical: 'https://petrolistan.com/iletisim' },
}

export default function IletisimPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark dark:text-gray-100 mb-2">İletişim</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 border-b border-gray-100 dark:border-gray-800 pb-6">
        Soru, öneri veya geri bildirimleriniz için aşağıdaki adresten ulaşabilirsiniz.
      </p>

      <div className="space-y-4 mb-10">
        <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
          <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-brand text-base">✉</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">Genel sorular &amp; geri bildirim</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
              Platform hakkında sorularınız, önerileriniz veya paylaşmak istediğiniz görüşleriniz için.
            </p>
            <a
              href="mailto:info@petrolistan.com"
              className="text-sm text-[#185FA5] dark:text-[#5B9BD5] hover:underline font-medium"
            >
              info@petrolistan.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
          <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-brand text-base">⚠</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">Veri hatası bildirimi</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
              Sitede gördüğünüz yanlış fiyat veya veri hataları için lütfen mail gönderin.
              Konu satırına &ldquo;Veri hatası&rdquo; yazarsanız öncelikli incelenir.
            </p>
            <a
              href="mailto:info@petrolistan.com?subject=Veri%20hatas%C4%B1"
              className="text-sm text-[#185FA5] dark:text-[#5B9BD5] hover:underline font-medium"
            >
              info@petrolistan.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
          <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-brand text-base">📰</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">Basın &amp; medya</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Petrolistan verilerini veya analizlerini haberlerinizde kaynak göstererek kullanabilirsiniz.
              İçerik lisansı veya işbirliği talepleriniz için bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-dark/5 dark:bg-white/5 border border-brand/20 dark:border-white/10 rounded-xl p-5">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Mesajlarınıza genellikle <strong className="text-gray-800 dark:text-gray-200">1–2 iş günü</strong> içinde yanıt verilmektedir.
          Reklam ve iş birliği teklifleri için de aynı adresi kullanabilirsiniz.
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex gap-6">
        <Link href="/" className="text-sm text-[#185FA5] dark:text-[#5B9BD5] hover:underline">
          ← Ana sayfa
        </Link>
        <Link href="/hakkimizda" className="text-sm text-[#185FA5] dark:text-[#5B9BD5] hover:underline">
          Hakkımızda →
        </Link>
      </div>
    </main>
  )
}
