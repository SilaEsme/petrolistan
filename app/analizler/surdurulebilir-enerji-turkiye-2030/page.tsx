import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sürdürülebilir Enerji ve Türkiye\'nin 2030 Hedefleri | Petrolistan Analiz',
  description: 'Türkiye\'nin yenilenebilir enerji kapasitesi, güneş-rüzgar yatırımları, 2030 hedefleri ve fosil yakıt bağımlılığının azaltılması stratejileri.',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sürdürülebilir Enerji ve Türkiye\'nin 2030 Hedefleri',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal Ekibi' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  datePublished: '2026-04-16',
  description: 'Türkiye\'nin yenilenebilir enerji kapasitesi ve 2030 enerji dönüşüm hedefleri.',
}

export default function SurdurulebilirEnerjiPage() {
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
          Sürdürülebilir Enerji ve Türkiye&apos;nin 2030 Hedefleri
        </h1>

        <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-6">
          Türkiye yenilenebilir enerji kurulu gücünde hızla büyüyor. 2030 hedefleri, elektrik üretiminin yüzde altmışından fazlasını temiz kaynaklardan karşılamayı öngörüyor. Bu dönüşüm akaryakıt bağımlılığını ne ölçüde azaltacak?
        </p>

        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
          <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
          <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
        </div>

        <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Türkiye&apos;nin Yenilenebilir Enerji Kapasitesi</h2>
            <p>
              Enerji ve Tabii Kaynaklar Bakanlığı verilerine göre Türkiye&apos;nin toplam elektrik kurulu gücü 2025 yılı sonunda yüz yirmi gigavatı aştı. Bu kapasitenin yaklaşık yüzde elli beşi — altmış altı gigavat — yenilenebilir kaynaklardan (hidroelektrik, rüzgar, güneş, jeotermal ve biyokütle) oluşmaktadır.
            </p>
            <p className="mt-3">
              Güneş enerjisinde kurulu güç 2025 sonunda otuz gigavatı aştı; 2020&apos;deki yedi gigavat seviyesine kıyasla dört yılda dört kattan fazla büyüme kaydedildi. Rüzgar kapasitesi ise yaklaşık on bir gigavatt düzeyinde seyrederken yeni lisanslarla büyümeye devam ediyor. Hidro kapasite yaklaşık otuz bir gigavat ile hâlâ en büyük pay.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">2030 Hedefleri ve Yol Haritası</h2>
            <p>
              Türkiye, 2030 yılına kadar elektrik üretiminde yenilenebilir payını yüzde altmış iki ile yüzde altmış beşe yükseltmeyi hedefliyor. Bu doğrultuda güneş kapasitesinin elli iki ile altmış gigavata, rüzgar kapasitesinin yirmi bir gigavata ulaştırılması planlanmaktadır.
            </p>
            <p className="mt-3">
              Nükleer enerji de bu tabloya eklenecek: Akkuyu NGS&apos;nin dört ünitesinin tamamlanmasıyla toplam yaklaşık dört virgül sekiz gigavat nükleer kapasite devreye girecek. İlk ünitenin 2025-2026 döneminde ticari faaliyete geçmesi beklenmektedir.
            </p>
            <p className="mt-3">
              Türkiye aynı zamanda karbon nötralite yolunda 2053 net sıfır taahhüdünü sürdürmekte; bu çerçevede kömür santrallerini kademeli olarak devredışı bırakmayı planlamaktadır. Ancak kömürün 2025 itibarıyla hâlâ toplam elektrik üretiminin yaklaşık yüzde otuz beşini oluşturması, geçişin kolay olmayacağına işaret etmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Enerji Dönüşümü Akaryakıt Talebini Nasıl Etkiler?</h2>
            <p>
              Elektrik üretiminin temiz kaynaklara kayması, doğrudan akaryakıt tüketimini azaltmaz; zira benzin ve motorin ağırlıklı olarak ulaşım ve sanayide kullanılır, elektrik üretiminde değil. Ancak dolaylı etkiler önemlidir.
            </p>
            <p className="mt-3">
              Elektrikli araç penetrasyonunun artmasıyla birlikte yenilenebilir elektrikle şarj edilen araçların sayısı çoğaldıkça ulaşım sektörünün akaryakıt talebi düşecektir. Türkiye 2030 yılına kadar otomobil satışlarında elektrikli araç payını yüzde otuz ile kırk arasına taşımayı öngörüyor.
            </p>
            <p className="mt-3">
              Sanayi sektöründe elektrik ve hidrojen temelli proseslerin fosil yakıt yerini alması ise daha uzun vadeli bir dönüşüm gerektirmektedir. Bu sürecin 2035-2045 döneminde belirginleşmesi beklenmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Karadeniz Doğalgazı: Yerli Kaynak Katkısı</h2>
            <p>
              Türkiye&apos;nin enerji bağımsızlığı yolculuğundaki en önemli gelişmelerden biri, 2020 yılında Karadeniz&apos;de keşfedilen Sakarya Gaz Sahası&apos;dır. Tahmin edilen rezerv yaklaşık altı yüz milyar metreküp olup üretim 2023 sonunda başladı.
            </p>
            <p className="mt-3">
              Sakarya sahası tam kapasiteye ulaştığında Türkiye&apos;nin yıllık doğalgaz tüketiminin yüzde yirmi beş ile otuz'unu karşılayabileceği değerlendirilmektedir. Bu gelişme doğalgaz ithalat faturasını önemli ölçüde hafifletme potansiyeli taşımaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
            <p>
              Türkiye, enerji dönüşümünde kayda değer adımlar atıyor. Yenilenebilir enerji kapasitesindeki hızlı büyüme, yerli doğalgaz üretiminin başlaması ve nükleer santralin devreye girmesi bir arada değerlendirildiğinde 2030&apos;lu yıllarda enerji ithalat faturasının bugünkünden belirgin biçimde hafifleyebileceği öngörülmektedir. Ancak bu dönüşüm henüz akaryakıt pompa fiyatlarına yansımıyor; orta vadeli etki, elektrikli araç altyapısının ve şarj ağının olgunlaşmasıyla birlikte hissedilecektir.
            </p>
          </section>
        </article>

        <div className="my-8 bg-[#042C53]/5 border border-[#0C447C]/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-[#0C447C] uppercase tracking-wide mb-2">Güncel Veri — Nisan 2026</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
            <span>Türkiye yenilenebilir kurulu güç <strong>~66 GW</strong></span>
            <span>USD/TRY <strong>~44,6</strong></span>
            <span>Brent petrol <strong>~97 $/varil</strong></span>
          </div>
        </div>

        <div className="flex gap-2 mb-10">
          <a href="https://twitter.com/intent/tweet?text=S%C3%BCrd%C3%BCr%C3%BClebilir+Enerji+ve+T%C3%BCrkiye%27nin+2030+Hedefleri&url=https://petrolistan.com/analizler/surdurulebilir-enerji-turkiye-2030" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">X&apos;te paylaş</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/surdurulebilir-enerji-turkiye-2030" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">LinkedIn&apos;de paylaş</a>
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
