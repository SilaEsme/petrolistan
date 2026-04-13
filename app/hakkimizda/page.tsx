import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda | Petrolistan',
  description: 'Petrolistan, Türkiye\'nin petrol ve enerji sektörüne odaklanan bağımsız bir veri ve haber platformudur.',
}

export default function HakkimizdaPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">Hakkımızda</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Petrolistan kimdir, ne yapar?
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Biz Kimiz?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            <strong>Petrolistan</strong>, Türkiye&apos;nin petrol ve enerji sektörüne odaklanan bağımsız bir
            veri ve haber platformudur. 2026 yılında kurulan platform; güncel ham petrol fiyatları,
            akaryakıt fiyatları, döviz kurları ve enerji haberleri sunmaktadır.
          </p>
          <p>
            Amacımız, enerji piyasalarını takip eden profesyonellere, araç sahiplerine ve meraklı
            okuyuculara güvenilir ve erişilebilir bir bilgi kaynağı sunmaktır. Tüm veriler kamuya
            açık resmi kaynaklardan derlenmekte; bağımsız bir editoryal çizgiyle aktarılmaktadır.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Veri Kaynaklarımız</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>Sitede sunulan veriler aşağıdaki resmi kaynaklardan derlenmektedir:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong>Ham petrol fiyatları:</strong> ABD Enerji Bilgi İdaresi (EIA)
            </li>
            <li>
              <strong>Döviz kurları:</strong> Türkiye Cumhuriyet Merkez Bankası (TCMB)
            </li>
            <li>
              <strong>Akaryakıt fiyatları:</strong> EPDK ve marka web siteleri
            </li>
            <li>
              <strong>Haberler:</strong> Uluslararası ve ulusal haber kaynakları
            </li>
          </ul>
        </div>
      </section>

      <div className="bg-dark/5 border border-brand/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-dark">Bize ulaşın</p>
          <p className="text-xs text-gray-500 mt-0.5">Soru, öneri veya iş birliği teklifleri için.</p>
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
