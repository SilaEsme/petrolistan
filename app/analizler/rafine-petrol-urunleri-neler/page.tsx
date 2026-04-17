import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rafine Petrol Ürünleri Nelerdir? Benzinden Bitüme Tam Rehber | Petrolistan Analiz',
  description: 'Ham petrolden elde edilen rafine ürünlerin tam listesi: benzin, motorin, jet yakıtı, fuel oil, LPG, bitüm ve petrokimya hammaddelerinin kullanım alanları.',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Rafine Petrol Ürünleri Nelerdir? Benzinden Bitüme Tam Rehber',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal Ekibi' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  datePublished: '2026-04-16',
  description: 'Ham petrolden elde edilen rafine ürünlerin listesi ve kullanım alanları.',
}

export default function RafinePetrolUrunleriPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#FAEEDA', color: '#633806' }}>ANALİZ</span>
          <span className="text-xs text-gray-400">16 Nisan 2026</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">8 dk okuma</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
          Rafine Petrol Ürünleri Nelerdir? Benzinden Bitüme Tam Rehber
        </h1>

        <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-6">
          Ham petrolün refineriden geçmesiyle onlarca farklı ürün ortaya çıkar. Benzin ve motorin bunların yalnızca en bilinenleridir. Plastikten yola kadar modern yaşamın pek çok unsuru bu sürecin çıktısıdır.
        </p>

        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
          <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
          <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
        </div>

        <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Rafinaj Süreci</h2>
            <p>
              Ham petrol, doğada çeşitli hidrokarbon bileşiklerinin karışımından oluşur. Rafineri tesislerindeki atmosferik damıtma kulesi, ham petrolü farklı kaynama noktalarına göre fraksiyonlara ayırır. Hafif fraksiyonlar üstten çıkarken ağır fraksiyonlar alta çöker. Bu ilk ayrıştırmanın ardından çeşitli dönüşüm ve arıtma işlemleri ürünleri nihai kullanıma hazır hale getirir.
            </p>
            <p className="mt-3">
              Türkiye&apos;nin en büyük rafinericisi TÜPRAŞ, İzmit, İzmir, Kırıkkale ve Batman rafinerilerinde bu süreci işletmektedir. Şirket, yılda yaklaşık yirmi sekiz milyon ton kapasitesiyle Türkiye akaryakıt tüketiminin büyük bölümünü karşılar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Başlıca Rafine Ürünler</h2>
            <p>
              <strong>Benzin (Gasoline):</strong> Binek otomobiller ve hafif ticari araçların içten yanmalı motorlarında kullanılan yakıttır. Türkiye&apos;de 95 ve 97 oktan olmak üzere iki ana kalite grubu satışa sunulmaktadır. Kurşunsuz formülasyonla çevresel etkisi azaltılmıştır.
            </p>
            <p className="mt-3">
              <strong>Motorin (Dizel):</strong> Kamyon, otobüs, traktör ve dizel binek araçlarda kullanılır. Ham petrolün orta fraksiyonundan elde edilir. Türkiye&apos;de motorin, toplam akaryakıt tüketiminin en büyük payını oluşturur; ticari taşımacılık ve tarım sektörlerinin temel yakıtıdır.
            </p>
            <p className="mt-3">
              <strong>Jet Yakıtı (Jet-A1):</strong> Ticari ve askeri uçaklarda kullanılır. Yüksek enerji yoğunluğu ve düşük donma noktası bu yakıtın en kritik özellikleridir. Türkiye&apos;deki havacılık sektörünün büyümesiyle jet yakıtı talebi son on yılda belirgin biçimde artmıştır.
            </p>
            <p className="mt-3">
              <strong>LPG (Sıvılaştırılmış Petrol Gazı):</strong> Bütan ve propan karışımından oluşur. Otomotiv yakıtı (otogaz), mutfak tüpü ve sanayi uygulamalarında kullanılır. Türkiye yaklaşık dört milyon LPG&apos;li araçla Avrupa&apos;nın en büyük otogaz pazarlarından birini oluşturur.
            </p>
            <p className="mt-3">
              <strong>Fuel Oil (Ağır Yakıt Yağı):</strong> Gemi yakıtı ve bazı sanayi tesislerinde ısıtma amacıyla kullanılır. Uluslararası Denizcilik Örgütü&apos;nün (IMO) 2020 sülfür sınırlamasıyla birlikte yüksek sülfürlü fuel oil kullanımı büyük ölçüde düşmüştür.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Petrokimya ve Diğer Ürünler</h2>
            <p>
              <strong>Nafta:</strong> Petrokimya sektörünün temel hammaddesidir. Etilen, propilen ve diğer temel kimyasalların üretiminde başlangıç maddesi olarak kullanılır. Bu kimyasallar plastik, gübre, ilaç ve sentetik lif üretiminin ham maddesini oluşturur.
            </p>
            <p className="mt-3">
              <strong>Bitüm (Asfalt):</strong> Ham petrolün en ağır fraksiyonudur. Yol yapımında asfalt kaplaması olarak kullanılır. Türkiye&apos;nin karayolu genişleme programları ve köy yolu yatırımları bitüm talebini istikrarlı kılmaktadır.
            </p>
            <p className="mt-3">
              <strong>Madeni Yağlar ve Bazlar:</strong> Motor yağı, sanayi yağıtlayıcısı ve çeşitli kimyasal ürünlerin üretiminde kullanılan yağ bazları da rafinerinin önemli çıktıları arasındadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Türkiye&apos;de Ürün Dengesi ve İthalat</h2>
            <p>
              TÜPRAŞ&apos;ın üretim kapasitesi iç talebi tam karşılamamaktadır. Özellikle motorin ve jet yakıtı gibi orta damıtma ürünlerinde Türkiye net ithalatçı konumundadır. Benzin tarafında ise iç üretim zaman zaman ihracat fazlası verebilmektedir.
            </p>
            <p className="mt-3">
              Rafinaj kapasitesinin artırılması ve dönüşüm ünitelerinin modernize edilmesi, ürün ithalatını azaltabilecek stratejik yatırımlar arasında değerlendirilmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
            <p>
              Ham petrol, modern ekonominin işleyişi için vazgeçilmez onlarca ürünün kaynağıdır. Enerji dönüşümü bu tablonun bir bölümünü değiştirecek olsa da orta vadede petrol rafine ürünleri ulaşımdan sanayiye, tarımdan inşaata kadar pek çok sektörün temel girdisi olmayı sürdürecektir.
            </p>
          </section>
        </article>

        <div className="my-8 bg-[#042C53]/5 border border-[#0C447C]/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-[#0C447C] uppercase tracking-wide mb-2">Güncel Veri — Nisan 2026</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
            <span>Brent petrol <strong>~97 $/varil</strong></span>
            <span>USD/TRY <strong>~44,6</strong></span>
            <span>İstanbul motorin <strong>~75,5 ₺/L</strong></span>
          </div>
        </div>

        <div className="flex gap-2 mb-10">
          <a href="https://twitter.com/intent/tweet?text=Rafine+Petrol+%C3%9Cr%C3%BCnleri+Nelerdir%3F&url=https://petrolistan.com/analizler/rafine-petrol-urunleri-neler" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">X&apos;te paylaş</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/rafine-petrol-urunleri-neler" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">LinkedIn&apos;de paylaş</a>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">← Tüm analizler</Link>
        </div>
      </main>
    </>
  )
}
