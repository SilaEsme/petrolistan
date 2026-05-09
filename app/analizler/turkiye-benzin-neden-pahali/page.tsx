import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Türkiye'de Benzin Neden Pahalı? Fiyatın Yüzde 55-60'ı Vergi",
  description: "Türkiye'de benzin fiyatının yüzde 55-60'ı ÖTV ve KDV'den oluşuyor. Döviz kuru, ham petrol ve dağıtım marjlarının pompa fiyatına etkisinin tam analizi.",
  alternates: { canonical: 'https://petrolistan.com/analizler/turkiye-benzin-neden-pahali' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Türkiye'de Benzin Neden Bu Kadar Pahalı? | Petrolistan Analiz",
  description: "Türkiye'de benzin fiyatlarının yüksek olmasının arkasındaki nedenler: ÖTV, KDV, döviz kuru, ham petrol maliyeti ve dağıtım marjları.",
  datePublished: '2026-01-12',
  url: 'https://petrolistan.com/analizler/turkiye-benzin-neden-pahali',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal', url: 'https://petrolistan.com/hakkimizda' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Türkiye'de benzin fiyatının kaçta kaçı vergi?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Türkiye'de bir litre benzinin yaklaşık yüzde elli beş ile altmışı ÖTV (Özel Tüketim Vergisi) ve KDV'den oluşmaktadır. Bu oran, ham petrol fiyatı düşse bile tüketicinin hissettiği indirimi sınırlı tutar.",
      },
    },
    {
      '@type': 'Question',
      name: "Türkiye benzin fiyatı neden Avrupa'dan pahalı?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Hem yüksek vergi yükü hem de TL'nin dolar karşısındaki değer kaybı birleşmektedir. Kişi başı satın alma gücüne göre düzeltildiğinde Türkiye, dünyanın en pahalı benzin ülkeleri arasında yer almaktadır.",
      },
    },
    {
      '@type': 'Question',
      name: 'ÖTV indirimi benzin fiyatını düşürür mü?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Evet. 1 TL ÖTV indirimi, KDV'nin de düşmesiyle pompaya yaklaşık 1.18 TL olarak yansır. 2022'de hükümet geçici ÖTV indirimiyle fiyatları kısmen dizginlemişti.",
      },
    },
    {
      '@type': 'Question',
      name: 'Benzin fiyatları ne zaman düşer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Kalıcı düşüş için hem Brent ham petrolünün 60 dolar altına gerilemesi hem de TL'nin değer kazanması gerekir. Yakın vadede bu kombinasyonun gerçekleşmesi zordur.",
      },
    },
  ],
}
export default function TurkiyeBenzinNedenPahaliPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Meta */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#FAEEDA', color: '#633806' }}>
          ANALİZ
        </span>
        <span className="text-xs text-gray-400">12 Ocak 2026</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">7 dk okuma</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
        Türkiye&apos;de Benzin Neden Bu Kadar Pahalı?
      </h1>

      <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-8">
        Türkiye&apos;de akaryakıt fiyatları Avrupa ortalamasının üzerinde seyrediyor. Bunun ardında yalnızca ham petrol fiyatları değil; ağır vergi yükü, kur riski ve yapısal maliyet unsurları yatıyor.
      </p>

      {/* Editöryal not */}
      <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
        <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
        <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
      </div>

      {/* İçerik */}
      <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Vergiler: Fiyatın Yarısından Fazlası</h2>
          <p>
            Pompadan alınan her litre benzinin fiyatını oluşturan en büyük kalem vergidir. Türkiye&apos;de akaryakıt üzerine iki temel vergi uygulanmaktadır: <strong>Özel Tüketim Vergisi (ÖTV)</strong> ve <strong>Katma Değer Vergisi (KDV)</strong>.
          </p>
          <p className="mt-3">
            ÖTV, litre başına sabit tutar olarak belirlenir ve kısa dönem ham petrol fiyatı değişimlerinden bağımsız biçimde faturaya yansır. Bu yapı, ham petrol ucuzladığında tüketiciye sınırlı indirim geçmesine yol açar. KDV ise ÖTV dahil toplam fiyat üzerinden hesaplandığından "verginin üstüne vergi" pratiği ortaya çıkar.
          </p>
          <p className="mt-3">
            Uluslararası Enerji Ajansı&apos;nın (IEA) karşılaştırmalı verilerine göre Türkiye, benzin vergisi yüküyle OECD ülkeleri arasında sürekli olarak üst sıralarda yer almaktadır. 2025 yılı ortasında yapılan hesaplamalarda Türkiye&apos;deki bir litre 95 oktan benzinin yaklaşık yüzde elli beşi ile altmışı vergi kalemlerinden oluşmaktaydı.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Döviz Kuruna Tam Bağımlılık</h2>
          <p>
            Türkiye, tükettiği ham petrolün tamamına yakınını ithal ediyor. Ham petrol uluslararası piyasalarda ABD doları cinsinden fiyatlanır; bu da TL&apos;nin dolar karşısındaki değerinin doğrudan pompaya yansıdığı anlamına gelir.
          </p>
          <p className="mt-3">
            2021-2025 döneminde Türk lirası dolar karşısında ciddi değer kayıpları yaşadı. Ham petrolün dolar bazlı fiyatı aynı kalsa bile, lira üzerinden ödenen tutar dramatik biçimde artış gösterdi. Örneğin 2021 başında 80 TL/litre düzeyinde seyreden benzin, 2025 sonuna gelindiğinde 50 dolarlık bir varil fiyatı ve çok daha yüksek bir kur ile üç haneli rakamlara ulaşmıştı.
          </p>
          <p className="mt-3">
            Bu ilişki, Türkiye&apos;nin enerji faturasını kur şoklarına karşı savunmasız kılmaktadır. Politika faizindeki değişimler veya dış denge bozulmaları kısa sürede pompa fiyatlarına yansır; bu durum özellikle ticari araç kullanan esnafı ve nakliyecileri derinden etkiler.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Rafinaj ve Dağıtım Maliyetleri</h2>
          <p>
            Ham petrolün akaryakıta dönüşüm sürecinde rafinaj maliyetleri de önemli bir yer tutar. Türkiye&apos;nin en büyük rafinericisi TÜPRAŞ, ürettiği akaryakıtı EPDK tarafından belirlenen referans fiyat çerçevesinde dağıtım şirketlerine satar. Dağıtıcılar, depolama, taşıma ve bayilik komisyonlarını da ekleyerek nihai fiyatı oluşturur.
          </p>
          <p className="mt-3">
            Ülkenin coğrafi büyüklüğü ve karayolu ağırlıklı lojistik yapısı, dağıtım maliyetlerini Batı Avrupa ülkelerine kıyasla görece yüksek tutar. Özellikle Doğu ve Güneydoğu Anadolu&apos;da taşıma mesafelerinin uzunluğu pompa fiyatlarına farklı biçimlerde yansıyabilir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">EPDK Düzenlemeleri ve Fiyat Mekanizması</h2>
          <p>
            Türkiye&apos;de akaryakıt fiyatları serbest piyasa koşullarında belirlense de Enerji Piyasası Düzenleme Kurumu (EPDK) piyasayı yakından izler ve rekabeti bozucu uygulamaları önlemeye çalışır. Zaman zaman "tavan fiyat" benzeri uygulamalara gidilmesi ya da vergi oranlarının güncellenmesi fiyat seviyesini doğrudan etkiler.
          </p>
          <p className="mt-3">
            2022-2023 döneminde yaşanan enerji krizi sırasında hükümet bazı dönemlerde ÖTV indirimlerine başvurarak tüketiciye kısmen nefes aldırmıştır. Ancak bu düzenlemeler geçici nitelik taşımış; bütçe dengesine yönelik kaygılar ÖTV&apos;nin eski seviyelerine çekilmesine zemin hazırlamıştır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Küresel Karşılaştırma</h2>
          <p>
            GlobalPetrolPrices.com verilerine göre Türkiye, benzin fiyatı sıralamasında düzenli olarak dünya ortalamasının üzerinde yer almaktadır. Satın alma gücü paritesine göre yapılan düzeltmelerle değerlendirildiğinde tablo daha da çarpıcı hale gelir: ortalama bir Türk vatandaşı, günlük gelirinin önemli bir bölümünü tank doldurmak için harcamak zorundadır.
          </p>
          <p className="mt-3">
            Komşu Bulgaristan, Yunanistan ve Romanya gibi AB üyesi ülkelerle kıyaslandığında, Türkiye&apos;nin benzin fiyatı bu ülkelere yakın ya da daha yüksek düzeyde seyreder; oysa kişi başı gelir önemli ölçüde daha düşüktür.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
          <p>
            Türkiye&apos;de benzin fiyatlarının yüksekliği tek bir nedene bağlanamaz. Ağır vergi yükü, kronik döviz değer kaybı, ithalata bağımlı enerji yapısı ve dağıtım maliyetleri birlikte bu sonucu doğurmaktadır. Kalıcı bir çözüm için vergi politikasının gözden geçirilmesi, yurt içi yenilenebilir enerji kapasitesinin artırılması ve enerji ithalat bağımlılığının azaltılması gibi yapısal adımların atılması gerekmektedir.
          </p>
          <p className="mt-3">
            Kısa vadede ise tüketiciler için en pratik seçenek, güncel pompa fiyatlarını karşılaştırarak yakıt alımlarını optimize etmektir.
          </p>
        </section>
      </article>

      {/* Güncel Veri Kutusu */}
      <div className="my-8 bg-[#042C53]/5 border border-[#0C447C]/20 rounded-xl p-4">
        <p className="text-xs font-semibold text-[#0C447C] uppercase tracking-wide mb-2">Güncel Veri — Nisan 2026</p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
          <span>Brent petrol <strong>~97 $/varil</strong></span>
          <span>USD/TRY <strong>~44,6</strong></span>
          <span>İstanbul motorin <strong>~75,5 ₺/L</strong></span>
        </div>
      </div>

      {/* Paylaş */}
      <div className="flex gap-2 mt-10 mb-10">
        <a
          href="https://twitter.com/intent/tweet?text=T%C3%BCrkiye%27de%20Benzin%20Neden%20Bu%20Kadar%20Pahal%C4%B1%3F&url=https://petrolistan.com/analizler/turkiye-benzin-neden-pahali"
          target="_blank" rel="noopener noreferrer"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">
          X&apos;te paylaş
        </a>
        <a
          href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/turkiye-benzin-neden-pahali"
          target="_blank" rel="noopener noreferrer"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">
          LinkedIn&apos;de paylaş
        </a>
      </div>

      <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-sm text-gray-600">
        İlgili: Güncel benzin, motorin ve LPG fiyatlarını şehir bazında karşılaştırmak için{' '}
        <Link href="/akaryakit/karsilastirma" className="text-[#185FA5] font-medium hover:underline">
          akaryakıt karşılaştırma sayfamıza bakın →
        </Link>
      </div>

      {/* Geri dön */}
      {/* SSS */}
      <div className="my-10 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Sık Sorulan Sorular</h2>
        {[
          {
            q: "Türkiye'de benzin fiyatının kaçta kaçı vergi?",
            a: "Türkiye'de bir litre benzinin yaklaşık yüzde elli beş ile altmışı ÖTV (Özel Tüketim Vergisi) ve KDV'den oluşmaktadır. Bu oran, ham petrol fiyatı düşse bile tüketicinin hissettiği indirimi sınırlı tutar.",
          },
          {
            q: "Türkiye benzin fiyatı neden Avrupa'dan pahalı?",
            a: "Hem yüksek vergi yükü hem de TL'nin dolar karşısındaki değer kaybı birleşmektedir. Kişi başı satın alma gücüne göre düzeltildiğinde Türkiye, dünyanın en pahalı benzin ülkeleri arasında yer almaktadır.",
          },
          {
            q: 'ÖTV indirimi benzin fiyatını düşürür mü?',
            a: "Evet. 1 TL ÖTV indirimi, KDV'nin de düşmesiyle pompaya yaklaşık 1.18 TL olarak yansır. 2022'de hükümet geçici ÖTV indirimiyle fiyatları kısmen dizginlemişti.",
          },
          {
            q: 'Benzin fiyatları ne zaman düşer?',
            a: "Kalıcı düşüş için hem Brent ham petrolünün 60 dolar altına gerilemesi hem de TL'nin değer kazanması gerekir. Yakın vadede bu kombinasyonun gerçekleşmesi zordur.",
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
            <li key="/analizler/benzin-fiyati-nasil-hesaplanir"><a href="/analizler/benzin-fiyati-nasil-hesaplanir" className="text-[#185FA5] text-sm hover:underline leading-snug">Benzin Fiyatı Nasıl Hesaplanır?</a></li>
            <li key="/analizler/akaryakit-tasarrufu-ipuclari"><a href="/analizler/akaryakit-tasarrufu-ipuclari" className="text-[#185FA5] text-sm hover:underline leading-snug">Akaryakıt Tasarrufu: Kanıtlanmış 12 İpucu</a></li>
            <li key="/analizler/turkiye-enerji-ithalati-ekonomik-etkileri"><a href="/analizler/turkiye-enerji-ithalati-ekonomik-etkileri" className="text-[#185FA5] text-sm hover:underline leading-snug">Türkiye'nin Enerji İthalatı: Ekonomik Etkiler</a></li>
        </ul>
      </div>



      <div className="pt-6 border-t border-gray-200">
        <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">
          ← Tüm analizler
        </Link>
      </div>
    </main>
  )
}
