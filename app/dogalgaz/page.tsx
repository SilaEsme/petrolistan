import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Doğalgaz Fiyatları | Petrolistan',
  description: 'TTF ve Henry Hub doğalgaz fiyat endeksleri, Türkiye\'nin doğalgaz ithalatı ve BOTAŞ hakkında bilgi.',
}

export default function DogalgazPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">Doğalgaz Fiyatları</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Küresel doğalgaz piyasaları ve Türkiye&apos;nin doğalgaz tedarik dengesi hakkında temel bilgiler.
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
