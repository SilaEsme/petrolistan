import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Türkiye\'nin Enerji İthalatı: Ekonomik Etkiler ve Riskler | Petrolistan Analiz',
  description: 'Yılda 50 milyar doları aşan enerji ithalatının Türkiye ekonomisine, cari açığa ve döviz rezervlerine etkileri.',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Türkiye\'nin Enerji İthalatı: Ekonomik Etkiler ve Riskler',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal Ekibi' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  datePublished: '2026-04-16',
  description: 'Yılda 50 milyar doları aşan enerji ithalatının Türkiye ekonomisine, cari açığa ve döviz rezervlerine etkileri.',
}

export default function TurkiyeEnerjiIthalatiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#E1F5EE', color: '#085041' }}>TÜRKİYE</span>
          <span className="text-xs text-gray-400">16 Nisan 2026</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">9 dk okuma</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
          Türkiye&apos;nin Enerji İthalatı: Ekonomik Etkiler ve Riskler
        </h1>

        <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-6">
          Türkiye her yıl elli milyar doları aşan enerji ithalatı gerçekleştiriyor. Bu rakam toplam ithalat faturasının yaklaşık dörtte birini oluşturuyor ve ekonominin en önemli dış kırılganlık noktası olmaya devam ediyor.
        </p>

        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
          <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
          <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
        </div>

        <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Enerji İthalatının Boyutu</h2>
            <p>
              Türkiye İstatistik Kurumu (TÜİK) ve Enerji ve Tabii Kaynaklar Bakanlığı verilerine göre Türkiye, 2024 yılında yaklaşık elli iki milyar dolar değerinde enerji ithalatı gerçekleştirdi. Bu tutarın büyük bölümü doğalgaz ve ham petrolden oluşurken kömür, elektrik ve petrol ürünleri de tabloya dahildir.
            </p>
            <p className="mt-3">
              Ham petrol ithalatı yıllık ortalama yüz yirmi ile yüz otuz milyon ton aralığında seyreder. Başlıca tedarikçiler Irak, Rusya, Suudi Arabistan, İran ve Kazakistan'dır. Doğalgaz tarafında ise Rusya, Azerbaycan, İran ve LNG tedarikçileri (Katar, ABD, Cezayir) öne çıkmaktadır.
            </p>
            <p className="mt-3">
              Bu tablo Türkiye&apos;yi enerji ithalatı açısından dünyanın en büyük on ülkesinden biri konumuna taşımaktadır. Yurt içi üretim — ağırlıklı olarak linyit kömürü, jeotermal ve küçük çaplı petrol — toplam birincil enerji tüketiminin yalnızca yüzde yirmi beş ila otuz'unu karşılayabilmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Cari Açığa Etkisi</h2>
            <p>
              Türkiye&apos;nin kronik cari açık sorununda enerji ithalatı yapısal bir belirleyici olarak öne çıkmaktadır. Cari açığın enerji bileşeni, ham petrol ve doğalgaz fiyatlarına ve dolar/TL kuruna son derece duyarlıdır.
            </p>
            <p className="mt-3">
              Brent petrolün her on dolar artışı, Türkiye&apos;nin yıllık enerji faturasına yaklaşık dört ila beş milyar dolar ek yük bindirir. 2022 yılında Rusya&apos;nın Ukrayna&apos;yı işgaliyle birlikte küresel enerji fiyatlarının keskin yükselişi, Türkiye&apos;nin cari açığını gayrisafi yurt içi hasılanın yüzde beş buçuğuna taşımıştı; bu oran son on beş yılın en yükseklerinden biriydi.
            </p>
            <p className="mt-3">
              2025 yılında enerji fiyatlarının görece gerilemesi ve enerji çeşitlendirme politikalarının kısmen meyvesini vermesiyle cari açık daraldı; ancak yapısal bağımlılık varlığını sürdürmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Döviz Rezervleri ve Kur Baskısı</h2>
            <p>
              Enerji ithalatının dolar bazlı ödeme zorunluluğu, Türkiye Cumhuriyet Merkez Bankası (TCMB) döviz rezervleri üzerinde sürekli bir talep baskısı oluşturur. Enerji şirketlerinin kur alım talebinin yoğunlaştığı dönemlerde TL üzerindeki değer kaybı baskısı da artar.
            </p>
            <p className="mt-3">
              Merkez Bankası&apos;nın net rezervleri, 2021-2023 döneminde belirgin biçimde eridi; bu süreçte enerji ithalatının döviz kullanımı önemli bir pay taşıyordu. 2024-2025 döneminde yüksek faiz politikasının desteklediği rezerv toparlanması, sıkı para politikasıyla birlikte kısmen sağlandı.
            </p>
            <p className="mt-3">
              Enerji faturasının azaltılması, yalnızca ekonomik bir tercih değil aynı zamanda para politikasının manevra alanını genişleten stratejik bir zorunluluktur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Enerji Güvenliği Stratejileri</h2>
            <p>
              Ankara, dışa bağımlılığı azaltmak amacıyla birkaç paralel strateji izlemektedir. Yenilenebilir enerji alanında güneş ve rüzgar kurulu gücü 2025 yılında elli gigavatı aştı. 2030 yılına kadar elektrik üretiminde yenilenebilir payının yüzde altmışın üzerine çıkarılması hedeflenmektedir.
            </p>
            <p className="mt-3">
              Nükleer enerji cephesinde Akkuyu Nükleer Güç Santrali&apos;nin ilk ünitesinin 2025-2026 döneminde devreye girmesi beklenmektedir. Tam kapasitede dört reaktörle santral, Türkiye&apos;nin elektrik ihtiyacının yaklaşık yüzde onunu karşılayacak.
            </p>
            <p className="mt-3">
              Karadeniz doğalgaz keşfi ise uzun vadeli bir oyun değiştirici olma potansiyeli taşımaktadır. BOTAŞ&apos;ın Sakarya Gaz Sahası&apos;ndan 2023 sonunda başlayan üretimi, iç tüketime katkı sağlamakla birlikte keşfedilen rezervin tamamının üretilmesi yıllar alacaktır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
            <p>
              Türkiye&apos;nin enerji ithalat bağımlılığı kısa vadede çözüme kavuşacak bir sorun değildir. Ancak yenilenebilir enerji yatırımları, nükleer kapasite ve yerli doğalgaz üretimi birlikte ilerlediğinde 2030&apos;lu yıllarda fatura belirgin biçimde hafifleyebilir. O güne kadar enerji fiyatlarındaki her dalgalanma, Türkiye ekonomisini doğrudan etkilemeye devam edecektir.
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
          <a href="https://twitter.com/intent/tweet?text=T%C3%BCrkiye%27nin+Enerji+%C4%B0thalat%C4%B1&url=https://petrolistan.com/analizler/turkiye-enerji-ithalati-ekonomik-etkileri" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">X&apos;te paylaş</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/turkiye-enerji-ithalati-ekonomik-etkileri" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">LinkedIn&apos;de paylaş</a>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">← Tüm analizler</Link>
        </div>
      </main>
    </>
  )
}
