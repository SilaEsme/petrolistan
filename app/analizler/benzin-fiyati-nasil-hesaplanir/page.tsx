import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Benzin Fiyatı Nasıl Hesaplanır? Pompa Fiyatının Anatomisi | Petrolistan Analiz',
  description: 'Ham petrolden pompa fiyatına uzanan yolda hangi maliyet kalemleri var? ÖTV, KDV, rafinaj, dağıtım ve bayi marjlarının detaylı analizi.',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Benzin Fiyatı Nasıl Hesaplanır? Pompa Fiyatının Anatomisi',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal Ekibi' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  datePublished: '2026-04-16',
  description: 'Ham petrolden pompa fiyatına uzanan yolda hangi maliyet kalemleri var?',
}

export default function BenzinFiyatiNasilHesaplanirPage() {
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
          Benzin Fiyatı Nasıl Hesaplanır? Pompa Fiyatının Anatomisi
        </h1>

        <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-6">
          Pompadaki fiyatın yalnızca küçük bir dilimi ham petrole gider. Büyük çoğunluğu vergi, dağıtım ve rafinaj maliyetlerinden oluşur. Her kalemin ne kadar pay aldığını inceleyelim.
        </p>

        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
          <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
          <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
        </div>

        <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Ham Petrolden Pompaya: Genel Şema</h2>
            <p>
              Bir litre benzinin pompa fiyatı beş temel bileşenden oluşur: ham petrol maliyeti, rafinaj maliyeti, dağıtım ve lojistik giderleri, bayi komisyonu ve vergi kalemleri. Bu son kategori — Özel Tüketim Vergisi (ÖTV) ve Katma Değer Vergisi (KDV) — fiyatın en ağır dilimini oluşturur.
            </p>
            <p className="mt-3">
              Türkiye&apos;de 2026 yılı başı itibarıyla 95 oktan kurşunsuz benzinin pompa fiyatı İstanbul&apos;da yaklaşık yetmiş dört ile yetmiş altı TL/litre aralığında seyrediyordu. Bu fiyatı oluşturan kalemleri sıralamak gerekirse: ÖTV ve KDV birlikte yaklaşık kırk beş ile kırk sekiz TL — yani toplam fiyatın yüzde atmış ile altmış beş'i. Ham petrol maliyeti on ila on iki TL. Rafinaj, dağıtım ve bayi marjı ise kalan on ila on beş TL'yi oluşturur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Vergi Kalemleri: ÖTV ve KDV</h2>
            <p>
              Özel Tüketim Vergisi, litre başına TL cinsinden belirlenen sabit bir tutardır. Bu yapının kritik bir sonucu vardır: ham petrol fiyatı düşse bile ÖTV sabit kaldığı için tüketiciye geçen tasarruf sınırlı olur. Tersine ham petrol artışlarında ÖTV değişmese de kur kaynaklı maliyet artışı pompa fiyatına yansır.
            </p>
            <p className="mt-3">
              KDV ise ÖTV dahil toplam tutar üzerinden yüzde yirmi olarak hesaplanır. Bu "verginin vergisi" yapısı, Türkiye&apos;nin akaryakıt üzerindeki vergi yükünü OECD ülkelerinin büyük bölümüne kıyasla yüksek tutar.
            </p>
            <p className="mt-3">
              Hükümet, ham petrol fiyatlarının aşırı yükseldiği dönemlerde zaman zaman geçici ÖTV indirimleri uygulamıştır. 2022 yılında Brent&apos;in yüz yirmi doları aştığı dönemde bu yola başvurulmuş; ancak bütçe gelirleri normalleşince ÖTV eski seviyesine geri çekilmiştir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Rafinaj: TÜPRAŞ&apos;ın Rolü</h2>
            <p>
              Türkiye&apos;nin en büyük sanayi kuruluşu ve tek büyük rafinericisi TÜPRAŞ, İzmit, İzmir, Kırıkkale ve Batman&apos;daki tesisleriyle yıllık yaklaşık yirmi sekiz ile otuz milyon ton kapasiteye sahiptir. Ham petrolü işleyerek benzin, motorin, jet yakıtı, fuel oil ve LPG gibi ürünler üretir.
            </p>
            <p className="mt-3">
              Rafinaj maliyeti ham petrol fiyatına kıyasla görece sabit bir kalem olmakla birlikte, enerji maliyetleri ve işletme giderlerindeki dalgalanmalar bu marjı etkiler. Rafinaj marjı — yani ham petrolle rafine ürünler arasındaki fiyat farkı — küresel ürün talebine ve kapasiteye göre değişir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Dağıtım, Lojistik ve Bayi Marjı</h2>
            <p>
              Rafineriden bayiye uzanan zincirde depolama tesisleri, tanker ve kamyon taşımacılığı, pompa istasyonu yatırımları ve işletme giderleri maliyet oluşturur. Coğrafi açıdan geniş olan Türkiye&apos;de Doğu Anadolu gibi uzak bölgelere taşıma maliyeti, büyük kentlere kıyasla görece yüksektir.
            </p>
            <p className="mt-3">
              Bayi komisyonu ise markayla yapılan anlaşmaya ve istasyonun işletme modelne göre değişir. Ulusal markalar (OPET, Shell, BP, Total gibi) dağıtım altyapısına ortak yatırım yaparak akaryakıt kalitesi ve hizmet standartlarını denetler.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Döviz Kuru Faktörü</h2>
            <p>
              Ham petrol ve rafinaj ara ürünleri dolar cinsinden fiyatlanır. Bu nedenle pompa fiyatı hem ham petrolün dolar bazlı değişimine hem de dolar/TL kuruna aynı anda tepki verir. Petrol fiyatı sabit kalsa bile TL değer kaybederse pompa fiyatı yükselir.
            </p>
            <p className="mt-3">
              2021-2025 döneminde dolar/TL kurunun yaklaşık on iki TL&apos;den kırk dört TL seviyesine yükselmesi, bu mekanizmanın en çarpıcı örneğini oluşturur. Aynı dönemde ham petrol fiyatları geniş bir bandda dalgalanmış; ancak kur kaynaklı artış, pompa fiyatlarının TL cinsinden üç katı aşmasında belirleyici rol oynamıştır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
            <p>
              Benzin fiyatı, ham petrol fiyatından çok daha karmaşık bir denklemin çıktısıdır. Vergi yükü, kur politikası, rafinaj kapasitesi ve lojistik altyapı bir araya gelir. Tüketici açısından yapabileceğin en pratik şey, güncel pompa fiyatlarını karşılaştırarak en ucuz istasyonu bulmaktır; pompa fiyatını belirleyen kalemler ise ancak politika değişiklikleriyle dönüşebilir.
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
          <a href="https://twitter.com/intent/tweet?text=Benzin+Fiyat%C4%B1+Nas%C4%B1l+Hesaplan%C4%B1r%3F&url=https://petrolistan.com/analizler/benzin-fiyati-nasil-hesaplanir" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">X&apos;te paylaş</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/benzin-fiyati-nasil-hesaplanir" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">LinkedIn&apos;de paylaş</a>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">← Tüm analizler</Link>
        </div>
      </main>
    </>
  )
}
