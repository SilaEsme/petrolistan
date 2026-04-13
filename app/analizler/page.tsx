import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enerji Analizleri | Petrolistan',
  description: 'Petrolistan enerji piyasası analizleri: OPEC kararları, küresel enerji geçişi ve Türkiye enerji politikası.',
}

export default function AnalizlerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">Enerji Analizleri</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Derinlemesine enerji piyasası analizleri ve yorumları.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Petrolistan Analizleri</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Petrolistan, yakında <strong>derinlemesine enerji piyasası analizleri</strong> yayınlamaya başlayacaktır.
            Güncel verilere dayalı bu analizler, enerji piyasalarını yakından takip eden okuyucular için
            kapsamlı bir rehber niteliği taşıyacaktır.
          </p>
          <p>
            Planlanan içerik konuları:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong>OPEC+ kararları:</strong> Üretim kotaları, petrol fiyatlarına etkileri ve piyasa tepkileri.
            </li>
            <li>
              <strong>Küresel enerji geçişi:</strong> Yenilenebilir enerjinin yükselişi, fosil yakıt talebinin geleceği
              ve net sıfır hedefleri.
            </li>
            <li>
              <strong>Türkiye enerji politikası:</strong> Enerji arz güvenliği, doğalgaz çeşitlendirmesi,
              yenilenebilir enerji yatırımları ve elektrik piyasası reformları.
            </li>
          </ul>
          <p>
            Analizlerin yayınlanmasından haberdar olmak için bültenimize kaydolabilirsiniz.
          </p>
        </div>
      </section>

      <div className="bg-dark/5 border border-brand/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
