import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EPDK Akaryakıt Fiyatları Nasıl Belirlenir? Haftalık Tavan Fiyat Sistemi',
  description: 'EPDK her hafta Salı-Çarşamba akaryakıt tavan fiyatlarını açıklıyor. Ham petrol, kur, ÖTV ve KDV\'nin fiyata nasıl yansıdığının adım adım açıklaması.',
  alternates: { canonical: 'https://petrolistan.com/analizler/epdk-akaryakit-fiyatlari' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'EPDK Akaryakıt Fiyatları Nasıl Belirlenir? Haftalık Tavan Fiyat Sistemi',
  description: 'EPDK her hafta Salı-Çarşamba akaryakıt tavan fiyatlarını açıklıyor. Ham petrol, kur, ÖTV ve KDV\'nin fiyata nasıl yansıdığının adım adım açıklaması.',
  datePublished: '2026-05-10',
  url: 'https://petrolistan.com/analizler/epdk-akaryakit-fiyatlari',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal', url: 'https://petrolistan.com/hakkimizda' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  keywords: 'EPDK akaryakıt fiyatları, EPDK benzin fiyatı, akaryakıt tavan fiyat, EPDK fiyat açıklama',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'EPDK akaryakıt fiyatlarını nasıl hesaplar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPDK, ham petrolün dolar bazlı spot fiyatını TL/USD kuruyla çarparak TL maliyet hesaplar. Üzerine rafinaj payı, dağıtım maliyeti, ÖTV ve KDV eklenerek haftalık tavan fiyata ulaşılır.',
      },
    },
    {
      '@type': 'Question',
      name: 'EPDK fiyatları ne zaman açıklanır, ne zaman uygulanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPDK tavan fiyatlar her hafta Salı veya Çarşamba günü resmi sitede yayımlanır. Yeni fiyatlar ilan günü gece yarısından (00:00) itibaren geçerli olur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Akaryakıt şirketleri EPDK fiyatını aşabilir mi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hayır. Akaryakıt şirketleri ve bayiler EPDK tavan fiyatını kesinlikle aşamaz. Tavan altında istedikleri fiyatı uygulayabilirler; bu nedenle markalar ve iller arasında fiyat farkı oluşabilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ham petrol fiyatı düşünce EPDK fiyatı neden düşmüyor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ham petrolün litre maliyeti pompa fiyatının yalnızca yüzde 20-25\'ini oluşturur. Geri kalan yüzde 55-60\'ı ÖTV ve KDV\'dir. Bu sabit vergi yükü nedeniyle ham petrol ucuzlasa bile pompa fiyatındaki indirim sınırlı kalır.',
      },
    },
  ],
}

export default function EpdkAkaryakitFiyatlariPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Meta */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#E1F5EE', color: '#085041' }}>
          TÜRKİYE
        </span>
        <span className="text-xs text-gray-400">10 Mayıs 2026</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">7 dk okuma</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
        EPDK Akaryakıt Fiyatları Nasıl Belirlenir?
      </h1>

      <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-8">
        Türkiye&apos;de akaryakıt fiyatlarını kim, nasıl, ne zaman belirliyor? EPDK&apos;nın haftalık tavan fiyat sisteminin adım adım açıklaması.
      </p>

      <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
        <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
        <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EPDK resmi verileriyle desteklenmiştir.</span>
      </div>

      <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">EPDK Nedir?</h2>
          <p>
            <strong>EPDK (Enerji Piyasası Düzenleme Kurumu)</strong>, Türkiye&apos;de elektrik, doğalgaz, petrol ve LPG piyasalarını düzenleyen bağımsız bir kamu kuruluşudur. 2001 yılında kurulan EPDK, akaryakıt sektöründe lisanslama, denetleme ve fiyat düzenlemesinden sorumludur.
          </p>
          <p className="mt-3">
            Akaryakıt piyasasında EPDK&apos;nın en önemli görevi haftalık <strong>tavan fiyat</strong> belirlemektir. Bu sistem, hem tüketicileri aşırı fiyatlamaya karşı korumakta hem de serbest piyasa rekabetine olanak tanımaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Haftalık Tavan Fiyat Nasıl Hesaplanır?</h2>
          <p>
            EPDK her hafta aşağıdaki bileşenleri toplayarak litre başına tavan fiyat hesaplar:
          </p>
          <ol className="list-decimal list-inside space-y-3 pl-2 mt-3">
            <li>
              <strong>Ham petrol maliyeti (TL/litre):</strong> Brent petrolün haftalık ortalama dolar fiyatı, TL/USD kuruyla çarpılır ve bir varilin kaç litre akaryakıt ürettiği hesaba katılarak litre başına TL maliyet bulunur.
            </li>
            <li>
              <strong>Rafinaj payı:</strong> TÜPRAŞ ve diğer rafinerilerin ham petrolü benzin veya motorine dönüştürme maliyeti eklenir.
            </li>
            <li>
              <strong>Dağıtım ve bayilik payı:</strong> Depolama, taşıma ve istasyon işletim maliyetleri.
            </li>
            <li>
              <strong>ÖTV (Özel Tüketim Vergisi):</strong> Litre başına sabit tutar olarak belirlenir; ham petrol fiyatından bağımsızdır.
            </li>
            <li>
              <strong>KDV (Katma Değer Vergisi):</strong> Tüm yukarıdaki kalemlerin toplamı üzerinden yüzde yirmi oranında hesaplanır.
            </li>
          </ol>
          <p className="mt-4">
            Örnek olarak: Brent petrol 80 dolar ve kur 44 TL/USD iken ham petrol bileşeni yaklaşık 15-18 TL/litre düzeyindedir. Üzerine eklenen ÖTV (~25-30 TL), KDV (~12-15 TL) ve diğer paylarla pompa fiyatı 70-80 TL bandına ulaşır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Fiyatlar Ne Zaman Açıklanır?</h2>
          <p>
            EPDK akaryakıt tavan fiyatlarını her hafta <strong>Salı veya Çarşamba</strong> günü resmi internet sitesinde (epdk.gov.tr) yayımlar. Yeni fiyatlar ilan günü <strong>gece yarısından (00:00)</strong> itibaren geçerli olur.
          </p>
          <p className="mt-3">
            Fiyat değişikliği beklentisi olan haftalarda akaryakıt istasyonlarında uzun kuyruklar oluşabilir; sürücüler düşüş bekliyorsa doldurmayı erteleyip, artış bekliyorsa öne çekebilir. Bu davranış EPDK açıklamalarını yakından takip etmeyi değerli kılar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Tavan Fiyat Sistemi Nasıl Çalışır?</h2>
          <p>
            EPDK&apos;nın belirlediği tavan fiyat bir <strong>üst sınır</strong>dır; akaryakıt dağıtım şirketleri ve bayiler bu fiyatın altında istedikleri pompaya fiyat koyabilir. Bu rekabetçi yapı sayesinde:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
            <li>Büyükşehirlerde yoğun rekabet nedeniyle fiyatlar tavan altında seyredebilir</li>
            <li>Küçük ilçelerde tek bir istasyonun bulunması tavan fiyatın uygulanmasına neden olabilir</li>
            <li>Markalar arasında küçük farklılıklar oluşabilir (genellikle 0.10-0.50 TL/litre)</li>
          </ul>
          <p className="mt-3">
            Petrolistan&apos;ın karşılaştırma aracı sayesinde OPET, Shell, Petrol Ofisi gibi büyük markaların seçtiğiniz ildeki güncel pompaya fiyatlarını yan yana görebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">ÖTV&apos;nin Fiyat Üzerindeki Etkisi</h2>
          <p>
            Türkiye&apos;de akaryakıt fiyatlarının yüksek olmasının temel nedeni <strong>ÖTV yüküdür</strong>. Ham petrolün litre maliyeti pompa fiyatının yalnızca yüzde yirmi ila yirmi beşini oluştururken, ÖTV ve KDV birlikte yüzde elli beş ila altmışını meydana getirir.
          </p>
          <p className="mt-3">
            Bu yapının pratik sonucu şudur: Brent ham petrol yüzde yirmi ucuzlasa bile pompa fiyatı yalnızca yüzde dört ila beş düşebilir. Çünkü ÖTV sabit tutarda belirlenir ve ham petrol fiyatından bağımsız olarak pompa fiyatına yansır.
          </p>
          <p className="mt-3">
            Hükümetler enerji krizlerinde geçici ÖTV indirimine başvurabilir. Nitekim 2022&apos;de akaryakıt fiyatlarının rekor seviyelere ulaştığı dönemde Türkiye kısa süreli ÖTV indirimleri uygulamıştır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Döviz Kurunun Rolü</h2>
          <p>
            Ham petrol uluslararası piyasalarda <strong>ABD doları</strong> cinsinden işlem görür. Türkiye&apos;nin ham petrol ithalat bedelini TL olarak ödemesi gerektiğinden TL/USD kuru, pompa fiyatını doğrudan etkiler.
          </p>
          <p className="mt-3">
            Örneğin Brent fiyatı sabit kalsa bile kur 40&apos;tan 44&apos;e yükselirse ham petrolün TL maliyeti yüzde on artar. EPDK bu kur değişimini haftalık hesaplamaya yansıtır. Bu nedenle dolar güçlendiğinde ham petrol fiyatı değişmese bile Türkiye&apos;de akaryakıt fiyatları artabilir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
          <p>
            EPDK&apos;nın haftalık tavan fiyat sistemi, Türkiye&apos;de akaryakıt piyasasının hem düzenlenmesini hem de rekabetçi kalmasını sağlar. Pompa fiyatının büyük bölümü vergi kökenli olduğundan ham petrol ve kur hareketleri fiyatı sınırlı etkiler. Gerçek zamanlı fiyat takibi ve marka karşılaştırması için Petrolistan&apos;ın karşılaştırma sayfasını kullanabilirsiniz.
          </p>
        </section>

      </article>

      {/* SSS */}
      <div className="my-10 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Sık Sorulan Sorular</h2>
        {[
          {
            q: 'EPDK akaryakıt fiyatlarını nasıl hesaplar?',
            a: 'Ham petrolün dolar fiyatını TL/USD kuruyla çarpar, rafinaj payı ekler, ardından ÖTV (sabit tutar) ve KDV (%20) ilave ederek litre başına tavan fiyata ulaşır.',
          },
          {
            q: 'EPDK fiyatları ne zaman açıklanır, ne zaman uygulanır?',
            a: 'Her hafta Salı veya Çarşamba günü epdk.gov.tr sitesinde yayımlanır. Yeni fiyatlar ilan günü gece yarısından itibaren geçerlidir.',
          },
          {
            q: 'Akaryakıt şirketleri EPDK fiyatını aşabilir mi?',
            a: 'Hayır. Tavan fiyatı kesinlikle aşamazlar. Altında istedikleri fiyatı uygulayabilirler.',
          },
          {
            q: 'Ham petrol fiyatı düşünce EPDK fiyatı neden düşmüyor?',
            a: 'Ham petrol pompa fiyatının sadece %20-25\'ini oluşturur. Geri kalan %55-60 ÖTV ve KDV\'dir. Bu sabit vergi yükü düşüşü sınırlar.',
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

      {/* İlgili Analizler */}
      <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-xl">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">İlgili Analizler</p>
        <ul className="space-y-2 list-none">
          <li><Link href="/analizler/benzin-fiyati-nasil-hesaplanir" className="text-[#185FA5] text-sm hover:underline">Benzin Fiyatı Nasıl Hesaplanır? Pompa Fiyatının Anatomisi</Link></li>
          <li><Link href="/analizler/turkiye-benzin-neden-pahali" className="text-[#185FA5] text-sm hover:underline">Türkiye&apos;de Benzin Neden Pahalı? Fiyatın %55-60&apos;ı Vergi</Link></li>
          <li><Link href="/analizler/dolar-kuru-akaryakit-fiyat-etkisi" className="text-[#185FA5] text-sm hover:underline">Dolar Kuru Akaryakıt Fiyatını Nasıl Etkiler?</Link></li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-sm text-gray-600">
        Güncel benzin, motorin ve LPG fiyatlarını şehir bazında karşılaştırmak için{' '}
        <Link href="/akaryakit/karsilastirma" className="text-[#185FA5] font-medium hover:underline">
          akaryakıt karşılaştırma sayfamıza bakın →
        </Link>
      </div>

      <div className="pt-6 border-t border-gray-200 mt-6">
        <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">
          ← Tüm analizler
        </Link>
      </div>
    </main>
  )
}
