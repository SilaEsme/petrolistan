import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EPDK Akaryakıt Fiyatları 2026 | Benzin Motorin Güncel Fiyat | Petrolistan',
  description: 'EPDK haftalık akaryakıt tavan fiyatlarını her Salı-Çarşamba açıklıyor. Türkiye\'de güncel benzin, motorin ve LPG fiyatları, ÖTV-KDV hesabı ve 81 ilde marka karşılaştırması.',
  alternates: { canonical: 'https://petrolistan.com/akaryakit' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'EPDK akaryakıt fiyatlarını nasıl belirler?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPDK (Enerji Piyasası Düzenleme Kurumu), her hafta ham petrol fiyatı ve döviz kurunu baz alarak akaryakıt tavan fiyatlarını hesaplar ve Salı veya Çarşamba günü yayımlar. Akaryakıt şirketleri bu tavan fiyatın altında istedikleri fiyatı uygulayabilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'EPDK akaryakıt fiyatları ne zaman açıklanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPDK akaryakıt tavan fiyatları her hafta genellikle Salı veya Çarşamba günü resmi web sitesinde yayımlanır. Yeni fiyatlar gece yarısından itibaren geçerli olur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Benzin fiyatının ne kadarı vergi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Türkiye\'de bir litre benzinin yaklaşık yüzde 55-60\'ı ÖTV (Özel Tüketim Vergisi) ve KDV\'den oluşmaktadır. Bu nedenle ham petrol ucuzlasa bile pompa fiyatı sınırlı düşer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hangi marka akaryakıt daha ucuz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Marka fiyatları ile ve konuma göre değişir. Petrolistan\'ın karşılaştırma sayfasında OPET, Shell, Petrol Ofisi, Aytemiz, Alpet, Lukoil ve diğer markaların güncel fiyatlarını 81 ilde yan yana görebilirsiniz.',
      },
    },
  ],
}

export default function AkaryakitPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-3xl font-bold text-dark mb-2">Akaryakıt Fiyatları</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Türkiye&apos;de EPDK tarafından belirlenen akaryakıt fiyatları, etkileyen faktörler ve marka karşılaştırması.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">EPDK Akaryakıt Fiyatlarını Nasıl Belirler?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Türkiye&apos;de akaryakıt fiyatları, <strong>EPDK (Enerji Piyasası Düzenleme Kurumu)</strong> tarafından
            belirlenen tavan fiyat sistemi çerçevesinde şekillenmektedir. EPDK, her hafta Salı veya Çarşamba günü
            yeni akaryakıt tavan fiyatlarını açıklar; bu fiyatlar gece yarısından itibaren geçerli olur.
          </p>
          <p>
            EPDK tavan fiyatını hesaplarken şu bileşenleri dikkate alır:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Ham petrol maliyeti:</strong> Brent petrolün dolar bazlı spot fiyatı ile TL/USD kuru</li>
            <li><strong>Rafinaj payı:</strong> TÜPRAŞ ve diğer rafinerilerin işleme maliyeti</li>
            <li><strong>ÖTV:</strong> Litre başına sabit tutar olarak belirlenen Özel Tüketim Vergisi</li>
            <li><strong>KDV:</strong> ÖTV dahil toplam fiyat üzerinden hesaplanan Katma Değer Vergisi</li>
            <li><strong>Dağıtım ve bayi payı:</strong> Depolama, taşıma ve istasyon marjları</li>
          </ul>
          <p>
            Akaryakıt şirketleri EPDK tavan fiyatının <strong>altında</strong> istedikleri pompaya fiyat koyabilir;
            ancak tavan fiyatı aşamazlar. Bu rekabetçi yapı özellikle büyükşehirlerde markalar arası fiyat
            farklılığına yol açar.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Türkiye&apos;de Akaryakıt Fiyatları Neden Yüksek?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            <strong>ÖTV (Özel Tüketim Vergisi)</strong> ve <strong>KDV (Katma Değer Vergisi)</strong>, Türkiye&apos;deki
            akaryakıt maliyetinin yaklaşık yüzde elli beş ile altmışını oluşturmaktadır. Bu nedenle uluslararası
            ham petrol fiyatları düşse dahi vergi yükü sabit kaldığından tüketicilerin hissettiği indirim sınırlı kalabilmektedir.
          </p>
          <p>
            Buna ek olarak Türkiye, tükettiği ham petrolün büyük bölümünü ithal etmektedir. Ham petrol
            dolarla fiyatlandığından TL&apos;nin dolar karşısındaki değer kayıpları pompa fiyatlarına
            doğrudan ve katlanarak yansır.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Benzin, Motorin ve LPG Farkları</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Türkiye&apos;de tüketicilere sunulan başlıca akaryakıt çeşitleri <strong>benzin (95 oktan)</strong>,
            <strong> motorin (dizel)</strong> ve <strong>LPG (otogaz)</strong>&apos;dır. Her birinin fiyatı
            farklı vergi matrahları ve rafinaj maliyetleri nedeniyle ayrı ayrı belirlenir.
          </p>
          <p>
            Motorin, ticari araçlar ve ağır taşımacılık sektörünün omurgasını oluşturduğundan fiyat
            değişimlerine karşı özellikle hassastır. Motorindeki her artış, doğrudan nakliye maliyetlerine
            ve dolayısıyla tüketici fiyatlarına yansır.
          </p>
          <p>
            LPG ise kurulum maliyeti gerektirse de litre başına yakıt maliyeti açısından en ekonomik seçenek
            olmaya devam etmektedir. Türkiye, Avrupa&apos;nın en büyük otogaz pazarlarından birine sahiptir;
            araç parkının yaklaşık yüzde yirmi beşi LPG&apos;li olarak işletilmektedir.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">İller Arasındaki Fiyat Farkı Neden Oluşur?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Türkiye&apos;nin 81 ilinde akaryakıt fiyatları birbirinden farklı olabilmektedir. Bu farkın temel nedenleri:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Taşıma mesafesi:</strong> Rafinerilerden veya depolardan uzak illerde dağıtım maliyeti daha yüksektir.</li>
            <li><strong>Rekabet yoğunluğu:</strong> Büyükşehirlerde çok sayıda bayinin bulunması fiyat rekabetini artırır.</li>
            <li><strong>Marka politikası:</strong> Her markanın bayi komisyonu ve fiyat taktikleri farklıdır.</li>
            <li><strong>Tüketim hacmi:</strong> Yüksek cirolu istasyonlar daha düşük marjla çalışabilir.</li>
          </ul>
          <p>
            Petrolistan&apos;ın karşılaştırma aracı sayesinde OPET, Shell, Petrol Ofisi, Aytemiz, Alpet,
            Lukoil, Total, Bpet, Sunpet, Kadoil ve Moil gibi 11 büyük markanın güncel fiyatlarını
            seçtiğiniz ilde yan yana görebilirsiniz.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">EPDK Akaryakıt Fiyatları Ne Zaman Açıklanır?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            EPDK akaryakıt tavan fiyatları her hafta <strong>Salı veya Çarşamba günü</strong> resmi web sitesinde
            yayımlanır. Yeni fiyatlar o gece yarısından itibaren geçerli olur. Bayiler tavan fiyat
            altında kalmak koşuluyla kendi pompa fiyatlarını serbestçe belirleyebilir.
          </p>
          <p>
            Petrolistan&apos;da görüntülenen fiyatlar ilgili markaların resmi kanallarından saatlik olarak
            güncellenmektedir. Ham petrol ve döviz kuru verileri ise beş dakikada bir yenilenmektedir.
          </p>
        </div>
      </section>

      {/* SSS */}
      <div className="my-10 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Sık Sorulan Sorular</h2>
        {[
          {
            q: 'EPDK akaryakıt fiyatlarını nasıl belirler?',
            a: 'EPDK, ham petrol fiyatı ve TL/USD kurunu baz alarak ÖTV, KDV, rafinaj ve dağıtım paylarını ekleyerek haftalık tavan fiyat hesaplar. Akaryakıt şirketleri bu tavanın altında fiyat belirleyebilir.',
          },
          {
            q: 'EPDK akaryakıt fiyatları ne zaman açıklanır?',
            a: 'Her hafta Salı veya Çarşamba günü EPDK resmi sitesinde yayımlanır ve gece yarısından itibaren geçerli olur.',
          },
          {
            q: 'Benzin fiyatının ne kadarı vergi?',
            a: 'Yaklaşık yüzde 55-60\'ı ÖTV ve KDV\'den oluşur. Ham petrol ucuzlasa bile bu sabit vergi yükü nedeniyle pompa fiyatındaki indirim sınırlı kalır.',
          },
          {
            q: 'Hangi marka akaryakıt daha ucuz?',
            a: 'İle ve konuma göre değişir. Petrolistan karşılaştırma sayfasından OPET, Shell, Petrol Ofisi ve diğer markaların güncel fiyatlarını yan yana görebilirsiniz.',
          },
        ].map(({ q, a }) => (
          <details key={q} className="border border-gray-200 rounded-lg group">
            <summary className="px-4 py-3 text-sm font-medium text-gray-800 cursor-pointer list-none flex justify-between items-center">
              {q}
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>

      <div className="mb-8 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-sm text-gray-600">
        Akaryakıt fiyatlarının oluşum mekanizmasını daha ayrıntılı anlamak için{' '}
        <Link href="/analizler/benzin-fiyati-nasil-hesaplanir" className="text-[#185FA5] font-medium hover:underline">
          Benzin Fiyatı Nasıl Hesaplanır? →
        </Link>
      </div>

      <div className="bg-dark/5 border border-brand/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-dark">İl bazlı akaryakıt fiyatlarını karşılaştırın</p>
          <p className="text-xs text-gray-500 mt-0.5">Şehirler arasındaki fiyat farklarını inceleyin.</p>
        </div>
        <Link
          href="/akaryakit/karsilastirma"
          className="shrink-0 bg-brand text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-dark transition-colors"
        >
          Karşılaştırma →
        </Link>
      </div>
    </main>
  )
}
