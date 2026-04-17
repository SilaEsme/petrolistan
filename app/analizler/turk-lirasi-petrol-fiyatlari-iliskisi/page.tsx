import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Türk Lirası ile Petrol Fiyatları Arasındaki İlişki | Petrolistan Analiz',
  description: 'TL/USD kurunun ham petrol fiyatlarıyla etkileşimi, kur-pompa fiyatı geçişkenliği ve Türkiye\'nin enerji maliyetine yansımaları.',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Türk Lirası ile Petrol Fiyatları Arasındaki İlişki',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal Ekibi' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  datePublished: '2026-04-16',
  description: 'TL/USD kurunun ham petrol fiyatlarıyla etkileşimi ve Türkiye enerji maliyetine yansımaları.',
}

export default function TurkLirasıPetrolPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#E1F5EE', color: '#085041' }}>TÜRKİYE</span>
          <span className="text-xs text-gray-400">16 Nisan 2026</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">8 dk okuma</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
          Türk Lirası ile Petrol Fiyatları Arasındaki İlişki
        </h1>

        <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-6">
          Petrol fiyatı sabit kalsa bile TL değer kaybederse benzin pahalanır. Bu mekanizma Türkiye&apos;yi küresel enerji fiyatlarından bağımsız bir biçimde ek baskıya maruz bırakır. Kur-petrol ilişkisini rakamlarla inceliyoruz.
        </p>

        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
          <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
          <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
        </div>

        <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Mekanizma: Neden Doğrudan Bağlantı Var?</h2>
            <p>
              Ham petrol uluslararası piyasalarda ABD doları cinsinden fiyatlanır. Türkiye&apos;nin ithal ettiği her varil ham petrol için ödeme dolar üzerinden yapılır. Bu doların TL karşılığı ise güncel döviz kuruna göre şekillenir. Sonuç olarak pompa fiyatı hem ham petrolün dolar değişimine hem de TL&apos;nin dolar karşısındaki değerine aynı anda duyarlıdır.
            </p>
            <p className="mt-3">
              Bu çift taraflı bağımlılık Türkiye&apos;yi benzersiz biçimde kırılgan kılar. Çoğu gelişmiş ülkede yerel para birimi göreceli olarak istikrarlı seyrettiğinden pompa fiyatı ağırlıklı olarak ham petrol fiyatını takip eder. Türkiye&apos;de ise iki değişken eş zamanlı oynadığından volatilite çok daha yüksektir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">2021–2025 Döneminin Çarpıcı Verileri</h2>
            <p>
              2021 başında USD/TRY kuru yaklaşık sekiz ile dokuz TL aralığındayken 2025 sonunda kırk iki ile kırk beş TL bandına ulaştı. Bu dönemde kur yaklaşık dört buçuk kat arttı. Aynı dönemde Brent ham petrol fiyatı elli beş ile seksen beş dolar arasında oldukça geniş bir aralıkta dalgalandı.
            </p>
            <p className="mt-3">
              Sonuç olarak TL cinsinden pompa fiyatları bu dönemde hem kur kaynaklı hem de zaman zaman ham petrol kaynaklı baskıyla üç ila dört katına çıktı. Brent&apos;in yüz yirmi doları aştığı 2022 yazında ise Türkiye&apos;de pompa fiyatları neredeyse bütçe krizine dönüşecek bir noktaya yaklaştı; bu gelişme hükümeti geçici ÖTV indirimleri uygulamaya yöneltti.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Kur Geçişkenliği: Pompaya Ne Kadar Yansır?</h2>
            <p>
              Ekonomistlerin "kur geçişkenliği" (exchange rate pass-through) olarak tanımladığı kavram, döviz kurundaki yüzde birlik değişimin tüketici fiyatlarına ne ölçüde yansıdığını ölçer. Akaryakıt sektöründe bu geçişkenlik hızlı ve yüksektir; çünkü hammadde doğrudan dolar bazlı fiyatlanır ve sektörde rekabetçi bir ortam vardır.
            </p>
            <p className="mt-3">
              Ampirik çalışmalar Türkiye&apos;de akaryakıt fiyatlarındaki kur geçişkenliğinin yüzde seksen ile yüz arasında olduğunu ortaya koymaktadır. Yani kur yüzde on artarsa pompa fiyatları kısa vadede yüzde sekiz ile on arasında yükselir. Bu oran, dayanıklı tüketim malları veya gıda gibi kategorilerin geçişkenlik oranının çok üzerindedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">TCMB Politikası ve Enerji Fiyatları</h2>
            <p>
              Türkiye Cumhuriyet Merkez Bankası&apos;nın faiz politikası, TL&apos;nin değeri üzerinden enerji fiyatlarını dolaylı biçimde etkiler. 2021-2023 döneminde uygulanan düşük faiz politikası TL&apos;yi aşındırmış ve enerji faturasını ağırlaştırmıştır. 2023 ortasından itibaren benimsenen ortodoks para politikası yüksek faizle TL değer kayıplarını yavaşlatmış; bu gelişme enerji ithalat maliyetindeki artış hızını kısmen frenlemiştir.
            </p>
            <p className="mt-3">
              Enflasyonla mücadele ve kur istikrarı bağlamında enerji fiyatları iki yönlü bir dinamik içindedir: yüksek enflasyon TL&apos;yi zayıflatarak enerji fiyatlarını yukarı iter; yüksek enerji fiyatları ise girdi maliyetleri üzerinden enflasyonu besler. Bu kısır döngüden çıkmak için yapısal enerji çeşitlendirmesi ve döviz kazandıran ihracat artışı birlikte ilerlemelidir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
            <p>
              TL ile petrol fiyatları arasındaki ilişki, Türkiye&apos;nin enerji güvenliğinin özünde yatan bir kırılganlıktır. Ham petrol dolar bazlı fiyatlandığı sürece ve TL değer kaybetmeye devam ettiği sürece pompa fiyatları üzerindeki baskı yapısal biçimde sürecektir. Kısa vadede vatandaş için pratik yanıt güncel fiyatları karşılaştırarak en uygun istasyonu tercih etmek; orta vadede ise alternatif yakıt araçlarına geçiş olabilir.
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
          <a href="https://twitter.com/intent/tweet?text=T%C3%BCrk+Liras%C4%B1+ile+Petrol+Fiyatlar%C4%B1+%C4%B0li%C5%9Fkisi&url=https://petrolistan.com/analizler/turk-lirasi-petrol-fiyatlari-iliskisi" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">X&apos;te paylaş</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/turk-lirasi-petrol-fiyatlari-iliskisi" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">LinkedIn&apos;de paylaş</a>
        </div>

                <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-sm text-gray-600">
          İlgili: Güncel benzin, motorin ve LPG fiyatlarını şehir bazında karşılaştırmak için{' '}
          <Link href="/akaryakit/karsilastirma" className="text-[#185FA5] font-medium hover:underline">
            akaryakıt karşılaştırma sayfamıza bakın →
          </Link>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">← Tüm analizler</Link>
        </div>
      </main>
    </>
  )
}
