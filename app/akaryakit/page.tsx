import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Akaryakıt Fiyatları Türkiye 2026 | EPDK, ÖTV, KDV Etkisi | Petrolistan',
  description: 'Türkiye\'de güncel benzin, motorin ve LPG fiyatları. EPDK düzenlemeleri, ÖTV, KDV ve döviz kurunun pompa fiyatlarına etkisi. 81 ilde marka karşılaştırması.',
}

export default function AkaryakitPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">Akaryakıt Fiyatları</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Türkiye&apos;de akaryakıt fiyatlarının nasıl belirlendiği, etkileyen faktörler ve marka karşılaştırması.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Türkiye&apos;de Akaryakıt Fiyatları Nasıl Belirlenir?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Türkiye&apos;de akaryakıt fiyatları, <strong>EPDK (Enerji Piyasası Düzenleme Kurumu)</strong> tarafından
            belirlenen düzenlemeler çerçevesinde şekillenmektedir. EPDK, yurt içi akaryakıt fiyatlarını haftalık olarak
            günceller; bayiler bu tavan fiyatların altında serbestçe fiyat belirleyebilir.
          </p>
          <p>
            Akaryakıt fiyatlarını belirleyen üç temel etken şunlardır:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Ham petrol fiyatı:</strong> Uluslararası Brent fiyatlarındaki artış veya düşüş, doğrudan pompaya yansır.</li>
            <li><strong>Döviz kuru:</strong> Ham petrol dolar cinsinden işlem gördüğünden TL/USD paritesi belirleyici rol oynar.</li>
            <li><strong>Vergiler:</strong> ÖTV ve KDV, akaryakıt perakende fiyatlarının önemli bir bölümünü oluşturur.</li>
          </ul>
          <p>
            <strong>ÖTV (Özel Tüketim Vergisi)</strong> ve <strong>KDV (Katma Değer Vergisi)</strong>, Türkiye&apos;deki
            akaryakıt maliyetinin yarısından fazlasını oluşturmaktadır. Bu nedenle ham petrol fiyatları düşse dahi
            vergi yükü sabit kaldığından tüketicilerin hissettiği indirim sınırlı kalabilmektedir.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Benzin, Motorin ve LPG Farkları</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Türkiye&apos;de tüketicilere sunulan başlıca akaryakıt çeşitleri <strong>benzin (95 oktan)</strong>, <strong>motorin (dizel)</strong> ve <strong>LPG (otogaz)</strong>&apos;dır. Her birinin fiyatı farklı vergi matrahları ve rafinaj maliyetleri nedeniyle ayrı ayrı belirlenir.
          </p>
          <p>
            Motorin, ticari araçlar ve ağır taşımacılık sektörünün omurgasını oluşturduğundan fiyat değişimlerine karşı özellikle hassastır. Motorindeki her artış, doğrudan nakliye maliyetlerine ve dolayısıyla tüketici fiyatlarına yansır. Bu nedenle EPDK motorin fiyatlarını ayrı bir kalemde takip eder.
          </p>
          <p>
            LPG ise kurulum maliyeti gerektirse de litre başına yakıt maliyeti açısından en ekonomik seçenek olmaya devam etmektedir. Türkiye, Avrupa&apos;nın en büyük otogaz pazarlarından birine sahiptir; araç parkının yaklaşık yüzde yirmi beşi LPG&apos;li olarak işletilmektedir.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">İller Arasındaki Fiyat Farkı Neden Oluşur?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Türkiye&apos;nin 81 ilinde akaryakıt fiyatları birbirinden farklı olabilmektedir. Bu farkın temel nedenleri şunlardır:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Taşıma mesafesi:</strong> Rafinerilerden veya depolardan uzak illerde dağıtım maliyeti daha yüksektir.</li>
            <li><strong>Rekabet yoğunluğu:</strong> Büyükşehirlerde çok sayıda bayinin bulunması fiyat rekabetini artırır.</li>
            <li><strong>Marka politikası:</strong> Her markanın bayi komisyonu ve fiyat taktikleri farklıdır.</li>
            <li><strong>Tüketim hacmi:</strong> Yüksek cirolu istasyonlar daha düşük marjla çalışabilir.</li>
          </ul>
          <p>
            Petrolistan&apos;ın karşılaştırma aracı sayesinde OPET, Shell, Petrol Ofisi, Aytemiz, Lukoil ve Moil gibi tüm büyük markaların güncel fiyatlarını seçtiğiniz ilde yan yana görebilirsiniz.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Akaryakıt Fiyatları Ne Zaman Güncellenir?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Akaryakıt fiyatları Türkiye&apos;de haftalık olarak değişebilmektedir. EPDK, her hafta Salı veya Çarşamba günü tavan fiyatları açıklar. Markalar, açıklanan tavan fiyatın altında kalmak koşuluyla kendi uyguladıkları pompa fiyatlarını belirleme konusunda serbesttir.
          </p>
          <p>
            Petrolistan&apos;da görüntülenen fiyatlar ilgili markaların resmi kanallarından saatlik olarak güncellenmektedir. Ham petrol ve döviz kuru verileri ise beş dakikada bir yenilenmektedir.
          </p>
        </div>
      </section>

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
