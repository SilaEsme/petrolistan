import Link from 'next/link'
import { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import AdUnit, { AD_SLOTS } from '@/components/ads/AdUnit'

export const metadata: Metadata = {
  title: 'Doğalgaz Fiyatları 2026 | TTF, BOTAŞ ve Türkiye | Petrolistan',
  description: 'Güncel TTF ve Henry Hub doğalgaz fiyatları. Türkiye\'nin doğalgaz ithalatı, BOTAŞ tarifeleri, TürkAkım ve TANAP boru hatları hakkında kapsamlı bilgi.',
  alternates: { canonical: 'https://petrolistan.com/dogalgaz' },
}

export default function DogalgazPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <BreadcrumbSchema items={[
        { name: 'Ana Sayfa', url: 'https://petrolistan.com' },
        { name: 'Doğalgaz', url: 'https://petrolistan.com/dogalgaz' },
      ]} />
      <h1 className="text-3xl font-bold text-dark mb-2">Doğalgaz Fiyatları</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Küresel doğalgaz piyasaları, TTF endeksi ve Türkiye&apos;nin doğalgaz tedarik dengesi.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">TTF ve Henry Hub Nedir?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            <strong>TTF (Title Transfer Facility)</strong>, Hollanda merkezli Avrupa doğalgaz piyasasının temel referans fiyat endeksidir.
            Avrupa&apos;da doğalgaz alım-satım sözleşmelerinin büyük çoğunluğu TTF üzerinden fiyatlanmaktadır.
            Türkiye&apos;nin doğalgaz fiyatları büyük ölçüde TTF&apos;ye endeksli olup, bu endeksteki dalgalanmalar
            sanayi ve konut kullanıcılarının ödediği tarifeleri doğrudan etkiler.
          </p>
          <p>
            <strong>Henry Hub</strong> ise ABD&apos;de Louisiana eyaletinde bulunan bir boru hattı kavşağının adıdır ve
            Amerikan doğalgaz piyasasının referans fiyat noktasını oluşturur. LNG ticaretinin küreselleşmesiyle birlikte
            Henry Hub fiyatları, Asya ve Avrupa piyasalarını da etkilemeye başlamıştır.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Türkiye&apos;de Doğalgaz</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Türkiye, doğalgaz ihtiyacının büyük bölümünü ithalatla karşılamakta olup tedarikçiler arasında
            <strong> Rusya</strong>, <strong>Azerbaycan</strong> ve <strong>İran</strong> öne çıkmaktadır.
            TürkAkım boru hattı Rusya gazını, TANAP boru hattı ise Azerbaycan gazını Türkiye&apos;ye taşımaktadır.
          </p>
          <p>
            <strong>BOTAŞ (Boru Hatları ile Petrol Taşıma A.Ş.)</strong>, Türkiye&apos;nin ulusal doğalgaz dağıtım ve iletim şirketidir.
            Doğalgaz alımı ve iletim altyapısının işletiminden sorumlu olan BOTAŞ, tarife düzenlemelerinde de belirleyici rol oynamaktadır.
          </p>
          <p>
            Enerji arz güvenliğini artırmak amacıyla Türkiye, LNG terminallerine yatırım yapmakta ve
            tedarik kaynaklarını çeşitlendirme politikası izlemektedir. Karadeniz&apos;deki Sakarya doğalgaz sahası,
            yurt içi üretimi artırma hedefiyle geliştirilmektedir.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Doğalgaz Fiyatını Etkileyen Faktörler</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Doğalgaz fiyatları, ham petrole kıyasla farklı dinamikler tarafından şekillenmektedir. Başlıca faktörler şunlardır:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong>Mevsimsel talep:</strong> Kış aylarında ısınma amaçlı talebin artması TTF fiyatlarını yukarı iter. Yaz aylarında talep düşer, stoklar yenilenir.
            </li>
            <li>
              <strong>Avrupa depo doluluk oranları:</strong> Kış öncesinde Avrupa&apos;nın doğalgaz depolarının doluluk durumu, fiyatlar üzerinde belirleyici etkiye sahiptir.
            </li>
            <li>
              <strong>Rusya-Avrupa gerilimleri:</strong> 2022 krizi ardından Avrupa&apos;nın Rus gazına bağımlılığı azalsa da jeopolitik gelişmeler fiyat volatilitesini artırmaktadır.
            </li>
            <li>
              <strong>LNG arzı ve navlun maliyetleri:</strong> Küresel LNG tesislerinin kapasitesi ve tanker navlun fiyatları kısa vadeli denge üzerinde etkilidir.
            </li>
            <li>
              <strong>Yenilenebilir enerji üretimi:</strong> Güneş ve rüzgar santrallerinden üretilen elektriğin miktarı, gaz kullanımını azaltabilir; soğuk veya bulutlu dönemlerde gaz talebi artar.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Türkiye&apos;nin Sakarya Gaz Sahası</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            2020 yılında Karadeniz&apos;de keşfedilen Sakarya doğalgaz sahası, Türkiye tarihinin en büyük doğalgaz keşfi olarak kayıtlara geçmiştir. Rezervlerin <strong>540 milyar metreküp</strong> civarında olduğu tahmin edilmektedir. Saha, Filyos kıyılarına bağlı boru hatları aracılığıyla 2023 yılında üretime geçmiş ve aşamalı olarak kapasitesi artırılmaktadır.
          </p>
          <p>
            Bu saha tam kapasiteye ulaştığında Türkiye&apos;nin yurt içi doğalgaz üretimini önemli ölçüde artırması ve ithalat bağımlılığını azaltması beklenmektedir. Ancak Sakarya&apos;nın Türkiye&apos;nin toplam tüketimini karşılama oranı uzun vadede bile sınırlı kalmaya devam edecektir.
          </p>
        </div>
      </section>

      <AdUnit slot={AD_SLOTS.articleInContent} format="rectangle" className="mb-8" />

      <div className="bg-dark/5 border border-brand/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-dark">Canlı fiyatları takip edin</p>
          <p className="text-xs text-gray-500 mt-0.5">TTF başta olmak üzere güncel enerji fiyatlarını izleyin.</p>
        </div>
        <Link
          href="/"
          className="shrink-0 bg-brand text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-dark transition-colors"
        >
          Ana sayfaya git →
        </Link>
      </div>
    </main>
  )
}
