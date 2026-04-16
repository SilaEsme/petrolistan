import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OPEC Kararları Türkiye\'yi Nasıl Etkiler? | Petrolistan Analiz',
  description: 'OPEC+ üretim kararlarının Türkiye\'nin akaryakıt fiyatlarına, enflasyona ve dış ticaret dengesine yansımaları.',
}

export default function OpecTurkiyeEtkisiPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Meta */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#E6F1FB', color: '#0C447C' }}>
          OPEC+
        </span>
        <span className="text-xs text-gray-400">16 Nisan 2026</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">8 dk okuma</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
        OPEC Kararları Türkiye&apos;yi Nasıl Etkiler?
      </h1>

      <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-8">
        OPEC+ toplantı salonlarında alınan kararlar, kısa sürede Türk tüketicisinin cebini etkiler. Üretim kotaları, ham petrol fiyatlarını ve dolayısıyla Türkiye&apos;nin enerji ithalat faturasını doğrudan şekillendirir.
      </p>

      {/* Editöryal not */}
      <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
        <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
        <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
      </div>

      <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">OPEC+ Nedir ve Nasıl Çalışır?</h2>
          <p>
            Petrol İhraç Eden Ülkeler Örgütü (OPEC), 1960 yılında beş kurucu üyeyle oluşturulmuş; zamanla genişleyerek bugün 13 tam üyeye ulaşmıştır. 2016&apos;dan itibaren Rusya başta olmak üzere OPEC dışı büyük üreticilerin katılımıyla şekillenen <strong>OPEC+</strong> yapısı, dünya petrol üretiminin yüzde kırkından fazlasını temsil eder.
          </p>
          <p className="mt-3">
            Örgüt, üye ülkelerin üretim tavanlarını belirleyerek arzı yönetir. Piyasanın fazla stok durumunda olduğuna karar verildiğinde kotalar düşürülür; talep canlandığında ya da fiyatların çok yükselmesi istenilmediğinde ise üretim artışına izin verilir. Bu denge kararları, Brent ve WTI vadeli işlem fiyatları aracılığıyla küresel piyasalara anında yansır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Türkiye&apos;nin Petrol İthalat Profili</h2>
          <p>
            Türkiye, ham petrol üretimi açısından dışa bağımlı bir ülkedir. Enerji Piyasası Düzenleme Kurumu (EPDK) verilerine göre yurt içi üretim, toplam tüketimin yüzde beş ila on aralığında kalmakta; geri kalan ihtiyaç tamamen ithalatla karşılanmaktadır.
          </p>
          <p className="mt-3">
            Başlıca tedarik kaynakları arasında Irak, İran, Rusya ve Kazakistan öne çıkar. Bu ülkelerin önemli bir bölümü OPEC+ bünyesinde yer aldığından, örgütün üretim kararları Türkiye&apos;nin tedarik güvenliğini ve alım maliyetlerini doğrudan biçimlendirir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Üretim Kesintisinin Fiyatlara Etkisi</h2>
          <p>
            OPEC+ günlük üretimi önemli miktarda kısmaya karar verdiğinde, küresel arz daralır ve Brent ham petrol fiyatı yükselir. Türkiye bu artışa çift taraflı maruz kalır: hem dolar cinsinden ödediği ham petrol fiyatı artar, hem de bu artış TL cinsinden daha ağır hissedilir çünkü dolar/TL kuru zaten yüksek bir seviyededir.
          </p>
          <p className="mt-3">
            Tarihsel bir örnek vermek gerekirse, 2022 yılında OPEC+&apos;ın günde iki milyon varillik kesinti açıklaması Brent fiyatını kısa sürede seksen beş ila doksan dolar bandına taşımış; bu gelişme Türkiye&apos;nin aylık enerji ithalat faturasına milyarlarca dolar ek yük bindirmişti.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Cari Açığa ve Enflasyona Yansıması</h2>
          <p>
            Türkiye&apos;nin cari işlemler dengesi, enerji fiyatlarına duyarlı bir yapıya sahiptir. Ham petrol ve doğalgaz, toplam ithalat faturasının büyük bir dilimini oluşturur. OPEC+ kaynaklı bir fiyat artışı; cari açığı genişletir, dövize olan talebi artırır ve TL üzerinde değer kaybı baskısı yaratır.
          </p>
          <p className="mt-3">
            Bu mekanizma enflasyona da dolaylı biçimde yansır. Taşıma maliyetlerindeki artış, gıdadan tekstile uzanan geniş bir ürün yelpazesinin fiyatına eklenirken, ısınma ve elektrik üretimindeki maliyet artışları hane halkını ayrıca etkiler.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Türkiye&apos;nin Stratejik Alternatifleri</h2>
          <p>
            Ankara, tek bir tedarikçiye bağımlılığı azaltmak amacıyla çeşitlendirme politikaları izlemektedir. Bakü-Tiflis-Ceyhan (BTC) boru hattı üzerinden gelen Azerbaycan ham petrolü bu stratejinin en somut örneğidir. Bunun yanı sıra Kazakistan ile boru hattı kapasitesi artışına yönelik müzakereler sürdürülmekte ve Körfez ülkelerinden spot alımlar değerlendirilebilmektedir.
          </p>
          <p className="mt-3">
            Yenilenebilir enerji yatırımlarının hızlanması da OPEC bağımlılığını azaltmanın uzun vadeli yoludur. Güneş ve rüzgar kapasitesinin artması, elektrik üretiminde petrol ve gaz kullanımını törpülerken dolaylı yoldan akaryakıt talebini de sınırlayabilir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">2026 Görünümü</h2>
          <p>
            2026 yılı başı itibarıyla OPEC+, kademeli üretim artışı sinyalleri vermiş; küresel talepteki toparlanmayla birlikte Brent fiyatları görece istikrarlı bir seyir izlemektedir. Türkiye açısından bu tablo, enerji faturasında ani sıçrama riskini azaltsa da uzun vadeli yapısal kırılganlıklar varlığını korumaktadır.
          </p>
          <p className="mt-3">
            İzlenecek başlıca riskler arasında Körfez&apos;deki jeopolitik gerilimler, Rusya&apos;nın OPEC+ içindeki tutumu ve Çin&apos;in talep görünümü sayılabilir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
          <p>
            OPEC+ kararları, Türkiye&apos;nin enerji güvenliği, makroekonomik dengesi ve tüketici fiyatları üzerinde belirleyici bir etki taşımaktadır. Türkiye&apos;nin net ithalatçı konumu bu bağlantıyı daha da güçlendirmektedir. Enerji çeşitlendirmesi ve yerli yenilenebilir üretim, bu dışsal şoklara karşı en sağlam kalkan olmaya devam etmektedir.
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
          href="https://twitter.com/intent/tweet?text=OPEC+Kararlar%C4%B1+T%C3%BCrkiye%27yi+Nas%C4%B1l+Etkiler%3F&url=https://petrolistan.com/analizler/opec-turkiye-etkisi"
          target="_blank" rel="noopener noreferrer"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">
          X&apos;te paylaş
        </a>
        <a
          href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/opec-turkiye-etkisi"
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
