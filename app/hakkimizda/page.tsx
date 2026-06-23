import Link from 'next/link'
import { Metadata } from 'next'
import AdUnit, { AD_SLOTS } from '@/components/ads/AdUnit'

export const metadata: Metadata = {
  title: 'Hakkımızda — Bağımsız Enerji Veri Platformu',
  description: 'Petrolistan, Türkiye\'deki akaryakıt, ham petrol ve doğalgaz fiyatlarını EPDK, TCMB ve EIA verilerine dayalı olarak yayınlayan bağımsız bir platform.',
  alternates: { canonical: 'https://petrolistan.com/hakkimizda' },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Petrolistan',
  url: 'https://petrolistan.com',
  description: 'Türkiye\'nin petrol ve enerji fiyatları platformu',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@petrolistan.com',
    contactType: 'editorial',
  },
}

export default function HakkimizdaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-dark dark:text-gray-100 mb-2">Hakkımızda</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 border-b border-gray-100 dark:border-gray-800 pb-6">
          Petrolistan kimdir, ne yapar?
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand mb-3">Biz Kimiz?</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
            <p>
              <strong className="text-gray-900 dark:text-gray-100">Petrolistan</strong>, Türkiye&apos;nin petrol ve enerji sektörüne odaklanan bağımsız bir
              veri ve haber platformudur. 2026 yılında kurulan platform; güncel ham petrol fiyatları,
              akaryakıt fiyatları, döviz kurları, enerji haberleri ve derinlemesine analizler sunmaktadır.
            </p>
            <p>
              Amacımız, enerji piyasalarını takip eden profesyonellere, araç sahiplerine ve meraklı
              okuyuculara güvenilir ve erişilebilir bir bilgi kaynağı sunmaktır. Tüm veriler kamuya
              açık resmi kaynaklardan derlenmekte; bağımsız bir editoryal çizgiyle aktarılmaktadır.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand mb-3">Misyonumuz</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
            <p>
              Türkiye&apos;de enerji fiyatları milyonlarca hane halkını ve işletmeyi doğrudan etkiler. Akaryakıt
              giderleri nakliyecinin, çiftçinin, esnafın ve her sabah işe giden vatandaşın bütçesinde kritik
              bir yer tutar. Oysa bu fiyatların nasıl oluştuğu, ne zaman değişeceği ve alternatiflerinin ne
              anlama geldiği konusunda erişilebilir, güvenilir Türkçe kaynak sayısı son derece sınırlıdır.
            </p>
            <p>
              Petrolistan bu boşluğu doldurmak için kurulmuştur. <strong className="text-gray-900 dark:text-gray-100">Türkiye&apos;nin güvenilir enerji fiyat
              platformu</strong> olmak; ham petrol ve akaryakıt verilerini anlık olarak sunmak, fiyat
              oluşumunu şeffaf biçimde açıklamak ve enerji gündemini bağımsız bir gözle değerlendirmek
              temel misyonumuzdur.
            </p>
            <p>
              Platform bağımsız olarak işletilmektedir. Herhangi bir enerji şirketi, dağıtıcı ya da
              siyasi aktörle organik bir bağımız bulunmamaktadır.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand mb-3">Editöryal Ekip</h2>
          <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
              <span className="text-brand font-bold text-sm">PE</span>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Petrolistan Editöryal Ekibi</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enerji sektörü haberciliği ve veri gazeteciliği alanında uzman
              </p>
              <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">
                Petrolistan&apos;ın tüm analiz ve haber içerikleri; enerji ekonomisi, uluslararası petrol
                piyasaları ve Türkiye makroekonomisi alanlarında deneyimli editörler tarafından
                hazırlanmaktadır. Her içerik yayınlanmadan önce kaynak doğrulaması ve veri tutarlılık
                kontrolünden geçer. Editoryal kararlar tamamen bağımsız biçimde alınır; hiçbir reklam
                veren veya sponsor içerik üretim sürecini etkileyemez.
              </p>
              <a
                href="mailto:info@petrolistan.com"
                className="inline-block text-xs text-[#185FA5] dark:text-[#5B9BD5] hover:underline mt-1"
              >
                info@petrolistan.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 mt-4">
            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
              <span className="text-brand font-bold text-sm">T</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Teknik Ekip</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-2">Veri mühendisliği ve platform geliştirme</p>
              <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">
                Platform, EIA, TCMB ve Yahoo Finance gibi resmi API kaynaklarından sürekli veri çeken
                otomatize bir altyapı üzerine kuruludur. Veriler saatlik güncelleme döngüleriyle
                tazelenirken anormallik tespiti için otomatik kontroller devreye girer.
              </p>
            </div>
          </div>
        </section>

        <AdUnit slot={AD_SLOTS.articleInContent} format="rectangle" className="my-6" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand mb-3">Neden Güvenilir?</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
              <span className="text-brand text-lg leading-none mt-0.5">✓</span>
              <div>
                <p className="text-[15px] font-medium text-gray-800 dark:text-gray-200">Birincil kaynaklardan doğrudan veri</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Tüm fiyat verileri EIA, TCMB ve marka sitelerinden API veya resmi yayın aracılığıyla
                  çekilir. Herhangi bir üçüncü taraf veri aracısına veya veri satıcısına bağımlılık yoktur.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
              <span className="text-brand text-lg leading-none mt-0.5">✓</span>
              <div>
                <p className="text-[15px] font-medium text-gray-800 dark:text-gray-200">Resmi kaynak entegrasyonu</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Ham petrol ve kur verileri doğrudan Yahoo Finance ve TCMB üzerinden çekilir.
                  Veri bütünlüğü otomatik doğrulama adımlarıyla korunur; tutarsız veriler canlıya
                  geçmeden önce işaretlenir.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
              <span className="text-brand text-lg leading-none mt-0.5">✓</span>
              <div>
                <p className="text-[15px] font-medium text-gray-800 dark:text-gray-200">Şeffaf kaynak gösterimi</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Her veri noktasının kaynağı açıkça belirtilir: Yahoo Finance vadeli fiyatlar için,
                  TCMB döviz kuru için standart referans kaynağımızdır.
                  Okuyucu her zaman verinin nereden geldiğini bilebilir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand mb-3">Veri Kaynakları</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
            <ul className="space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Türkiye Cumhuriyet Merkez Bankası (TCMB)</strong>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Döviz kurları (USD/TRY, EUR/TRY). TL bazlı akaryakıt hesaplamalarında kullanılan resmi
                    gösterge kur kaynağıdır.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Yahoo Finance</strong>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Brent ve WTI ham petrol vadeli işlem fiyatları ile doğalgaz fiyatları.
                    Günlük güncelleme ile canlı piyasa verisi sunulmaktadır.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Marka Web Siteleri ve API&apos;leri</strong>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Türkiye akaryakıt pompa fiyatları; Petrol Ofisi, Shell, OPET, Aytemiz, Total, Lukoil
                    ve diğer markaların resmi fiyat listeleri temel alınarak derlenmektedir.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-brand mb-3">Sorumluluk Beyanı</h2>
          <div className="space-y-3 text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <p>
              Petrolistan&apos;da sunulan tüm fiyat ve piyasa verileri <strong className="text-gray-800 dark:text-gray-200">yalnızca
              bilgilendirme amaçlıdır</strong>. Bu veriler herhangi bir yatırım, alım-satım veya finansal
              tavsiye niteliği taşımaz.
            </p>
            <p>
              Ham petrol fiyatları, döviz kurları ve akaryakıt pompa fiyatları anlık piyasa koşullarına
              bağlı olarak değişkenlik gösterebilir. Sitede görüntülenen fiyatlar ile gerçek pompa
              fiyatları arasında güncelleme gecikmesinden kaynaklanan farklılıklar oluşabilir.
            </p>
            <p>
              Ticari kararlar, yatırım planlamaları veya hukuki işlemler için verilerin resmi ve
              birincil kaynaklardan doğrulanması zorunludur. Petrolistan, sitedeki verilerin
              kullanımından doğabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamaz.
            </p>
          </div>
        </section>

        <div className="bg-dark/5 dark:bg-white/5 border border-brand/20 dark:border-white/10 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-dark dark:text-gray-200">Bize ulaşın</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Soru, öneri veya iş birliği teklifleri için.</p>
          </div>
          <Link
            href="/iletisim"
            className="shrink-0 bg-brand text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-dark transition-colors"
          >
            İletişim →
          </Link>
        </div>
      </main>
    </>
  )
}
