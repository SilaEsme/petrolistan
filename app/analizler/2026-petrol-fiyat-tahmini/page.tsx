import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2026 Petrol Fiyat Tahmini: Brent Nereye Gider? | Petrolistan Analiz',
  description: '2026 yılı için küresel ham petrol fiyat tahminleri: OPEC+ politikası, talep görünümü, jeopolitik riskler ve analist beklentileri.',
}

export default function PetrolFiyatTahmini2026Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Meta */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#FAECE7', color: '#712B13' }}>
          PAZAR
        </span>
        <span className="text-xs text-gray-400">16 Nisan 2026</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">9 dk okuma</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
        2026 Petrol Fiyat Tahmini: Brent Nereye Gider?
      </h1>

      <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-8">
        Küresel ekonomik yavaşlama kaygıları, OPEC+ üretim politikaları ve enerji dönüşümü tartışmaları 2026 yılında ham petrol fiyatlarını birbiriyle çelişen güçlerin etkisine bırakıyor. Analist tahminleri ve piyasa dinamiklerinin kapsamlı değerlendirmesi.
      </p>

      <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">2025&apos;ten Devralınan Miras</h2>
          <p>
            2025 yılı, ham petrol piyasası için belirsizliklerle dolu geçti. Brent ham petrol fiyatı yıl boyunca büyük ölçüde yetmiş ile seksen beş dolar aralığında dalgalandı. Bir yanda OPEC+&apos;ın üretim kesintilerini koruma kararlılığı, diğer yanda ABD şeyl üretiminin beklentilerin üzerinde seyretmesi ve Çin&apos;in talep toparlanmasındaki yavaşlık fiyatları sıkıştırdı.
          </p>
          <p className="mt-3">
            Rusya&apos;nın Ukrayna savaşına bağlı yaptırım riski ve Ortadoğu&apos;daki gerilimler piyasaya zaman zaman risk primi eklerken, küresel enflasyonla mücadele amacıyla uygulanan sıkı para politikaları ekonomik büyüme beklentilerini dizginledi.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Arz Tarafı: OPEC+ ve ABD Şeyli</h2>
          <p>
            2026 yılında arz tarafının en belirleyici aktörü yine OPEC+ olmaya devam edecek. Örgüt, 2024 yılından bu yana ertelemeye devam ettiği üretim artışlarını 2026&apos;da kademeli olarak hayata geçirme sinyali verdi. Ancak Suudi Arabistan, fiyatların seksen dolar seviyesinin altına düşmesine izin vermeyeceğini açıkça ortaya koymuştur.
          </p>
          <p className="mt-3">
            ABD tarafında ise Permian Havzası&apos;ndaki üretim artış temposu dikkatle izlenmektedir. 2025 yılında günde yaklaşık on üç milyonu aşan ABD petrol üretimi, OPEC+ kesintilerinin etkisini kısmen dengelemektedir. Artan sermaye maliyetleri ve yatırımcı baskısının şeyl şirketlerini daha temkinli davranmaya sevk etmesi, 2026&apos;da büyüme hızının yavaşlayabileceğine işaret ediyor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Talep Tarafı: Çin, Hindistan ve Enerji Geçişi</h2>
          <p>
            Küresel petrol talebinin seyri büyük ölçüde Asya&apos;ya bağlıdır. Çin, 2024 yılında beklentilerin altında bir talep büyümesi sergiledi; 2026 için analist tahminleri temkinli bir iyimserliği yansıtıyor. Özellikle elektrikli araç penetrasyonunun hızla arttığı Çin&apos;de benzin talebi yapısal bir çöküşle karşı karşıya kalabilir.
          </p>
          <p className="mt-3">
            Hindistan ise çarpıcı bir büyüme hikayesi sunmaktadır. Güçlü ekonomik büyümesi, hızlı araçlaşma oranı ve sınırlı EV penetrasyonuyla Hindistan, küresel petrol talebi artışının başlıca motoru konumuna yükseliyor.
          </p>
          <p className="mt-3">
            Uluslararası Enerji Ajansı (IEA), küresel petrol talebinin 2026&apos;da günde yaklaşık yüz dört ila yüz beş milyon varil düzeyinde dengeleneceğini tahmin etmektedir. Bu görece ılımlı büyüme, fiyatların çarpıcı bir yükseliş yaşamadan mevcut seviyelerde tutunabileceğine işaret eder.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Jeopolitik Risk Faktörleri</h2>
          <p>
            Petrol piyasaları jeopolitik gelişmelere aşırı duyarlıdır. 2026 yılında takip edilmesi gereken başlıca risk unsurları şunlardır:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 mt-3">
            <li><strong>Rusya-Ukrayna:</strong> Savaşın seyri ve Rusya&apos;ya yönelik yaptırımların kapsamı Avrupa&apos;nın enerji piyasasını doğrudan etkiler.</li>
            <li><strong>Ortadoğu:</strong> İran&apos;ın nükleer programı ve İsrail-Filistin meselesi bölgesel istikrarsızlık riskini canlı tutar.</li>
            <li><strong>ABD-Çin gerilimi:</strong> Ticaret savaşlarının tırmanması küresel büyümeyi ve dolayısıyla talep görünümünü olumsuz etkileyebilir.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Analist Tahminleri</h2>
          <p>
            Goldman Sachs, 2026 ortası için Brent fiyat tahminini yetmiş beş ile seksen beş dolar bandında tutmaktadır. JPMorgan ise küresel resesyon risklerine dikkat çekerek yetmiş ila seksen dolar aralığını temel senaryo olarak öngörmektedir. Morgan Stanley ve Citigroup gibi büyük bankalar da benzer seviyeleri işaret ederken öngörülemeyen jeopolitik olayların bu tahminleri kolayca bozabileceğini vurgulamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Türkiye İçin Senaryolar</h2>
          <p>
            Brent&apos;in yetmiş ila seksen beş dolar aralığında kalması Türkiye için görece yönetilebilir bir tablo çizer; ancak TL değer kaybı devam ederse dolar bazlı sabit fiyat bile lira cinsinden ağırlaşabilir. Brent&apos;in doksan dolar üzerine çıkması halinde Türkiye&apos;nin cari açığı belirgin biçimde genişler ve enflasyon üzerinde yukarı yönlü baskı artar.
          </p>
          <p className="mt-3">
            Öte yandan Brent&apos;in altmış beş doların altına gerilemesi, enerji ithalatı faturasını hafifletirken petrol ihracatçısı ticaret ortaklarının Türkiye&apos;ye yönelik talebini azaltabilir; bu da net etkiyi sınırlayabilir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
          <p>
            2026 yılında ham petrol fiyatları için temel senaryo, OPEC+ yönetiminde görece istikrarlı bir bant hareketi olmaya devam ediyor. Ancak sürpriz üretim artışları, talep şokları veya jeopolitik krizler bu denklemi hızla değiştirebilir. Türkiye gibi ithalatçı ülkeler için en akıllıca strateji, hem iç talebi yönetmek hem de yenilenebilir enerji kapasitesini sürdürülebilir biçimde genişletmektir.
          </p>
        </section>
      </article>

      {/* Paylaş */}
      <div className="flex gap-2 mt-10 mb-10">
        <a
          href="https://twitter.com/intent/tweet?text=2026+Petrol+Fiyat+Tahmini%3A+Brent+Nereye+Gider%3F&url=https://petrolistan.com/analizler/2026-petrol-fiyat-tahmini"
          target="_blank" rel="noopener noreferrer"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">
          X&apos;te paylaş
        </a>
        <a
          href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/2026-petrol-fiyat-tahmini"
          target="_blank" rel="noopener noreferrer"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">
          LinkedIn&apos;de paylaş
        </a>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">
          ← Tüm analizler
        </Link>
      </div>
    </main>
  )
}
