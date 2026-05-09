import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Kerkük-Ceyhan Boru Hattı: Türkiye'nin Kuzey Irak Petrolündeki Stratejik Rolü",
  description: "Kerkük-Ceyhan hattı günde 300-400 bin varil kapasitesiyle Irak Kürdistanı petrolünü Türkiye üzerinden ihraç ediyor. Hat anlaşmazlığının Türkiye'ye etkisi ve stratejik önemi.",
  alternates: { canonical: 'https://petrolistan.com/analizler/kuzey-irak-petrol-turkiye' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kuzey Irak Petrolü ve Türkiye: Kerkük-Ceyhan Hattı Analizi',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal Ekibi' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  datePublished: '2026-03-04',
  image: 'https://petrolistan.com/og-image.jpg',
  description: 'Kerkük-Ceyhan boru hattı ve Türkiye\'nin Kuzey Irak enerji ilişkilerinin analizi.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kerkük-Ceyhan boru hattı nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kerkük-Ceyhan boru hattı, Irak Kürdistan Bölgesi\'ndeki petrol sahalarından Türkiye\'nin Akdeniz kıyısındaki Ceyhan ihracat terminaline uzanan yaklaşık 970 km uzunluğundaki boru hattıdır. Teorik kapasitesi günde 300-400 bin varildir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kerkük-Ceyhan hattı neden durdu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Irak merkezi hükümeti ile Kürdistan Bölgesel Yönetimi arasındaki petrol geliri paylaşımı anlaşmazlığı nedeniyle hat 2023 yılından bu yana büyük ölçüde kapalıdır. Taraflar arasındaki müzakereler sürmektedir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Bakü-Tiflis-Ceyhan hattı ne kadar petrol taşıyor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BTC hattı, Azerbaycan\'ın Hazar Denizi petrolünü Gürcistan üzerinden Türkiye\'ye taşımakta ve günde yaklaşık 600-700 bin varil kapasiteyle işletilmektedir. Türkiye için kritik bir transit gelir kaynağıdır.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kuzey Irak petrolü Türkiye\'yi nasıl etkiler?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Türkiye hem transit ülke geliri elde etmekte hem de güvenilir komşu tedarik açısından stratejik kazanım sağlamaktadır. Hattın durması transit ücret gelirlerini azaltmakta, bölgesel enerji jeopolitiğini olumsuz etkilemektedir.',
      },
    },
  ],
}

export default function KuzeyIrakPetrolPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#FAECE7', color: '#712B13' }}>PAZAR</span>
          <span className="text-xs text-gray-400">4 Mart 2026</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">9 dk okuma</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
          Kuzey Irak Petrolü ve Türkiye: Kerkük-Ceyhan Hattı Analizi
        </h1>

        <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-6">
          Türkiye, Kuzey Irak petrolünün Akdeniz&apos;e ulaşmasında vazgeçilmez bir transit ülke konumundadır. Bu ilişki hem enerji güvenliği hem de jeopolitik açıdan kritik önem taşımaktadır.
        </p>

        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
          <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
          <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
        </div>

        <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Kerkük-Ceyhan Boru Hattı</h2>
            <p>
              1970&apos;lerin ortasında inşa edilen Kerkük-Ceyhan (ITP — Iraq-Turkey Pipeline) boru hattı, yaklaşık bin altı yüz kilometre uzunluğuyla Kuzey Irak&apos;taki petrol sahalarını Türkiye&apos;nin Akdeniz kıyısındaki Ceyhan terminaline bağlar. Tasarım kapasitesi günde bir buçuk ila iki milyon varil olmakla birlikte fiili kullanım tarihsel süreçte bu kapasitenin çok altında kalmıştır.
            </p>
            <p className="mt-3">
              Hattın işletimi Irak Petrol Bakanlığı, BOTAŞ ve Kürdistan Bölgesel Yönetimi (KBY) arasındaki karmaşık ilişkiler çerçevesinde şekillenir. Irak merkezi hükümeti ile KBY arasındaki gelir paylaşımı anlaşmazlıkları defalarca hat akışını sekteye uğratmıştır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Kürdistan Bölgesi Petrolü ve Türkiye</h2>
            <p>
              Irak Kürdistan Bölgesi&apos;nin toplam petrol rezervleri yaklaşık kırk ila kırk beş milyar varil olarak tahmin edilmektedir. Bölge, 2014 yılından itibaren Kerkük-Ceyhan hattı üzerinden bağımsız petrol ihracatına başladı; bu gelişme Bağdat ile uzun soluklu hukuki anlaşmazlıkları da beraberinde getirdi.
            </p>
            <p className="mt-3">
              2023 yılında Uluslararası Tahkim Mahkemesi&apos;nin Türkiye aleyhine verdiği kararla Kürdistan petrolü ihracatı durduruldu. Bu gelişme Ceyhan terminalinin kapasitesini önemli ölçüde daralttı ve Türkiye&apos;nin transit gelirlerini azalttı. 2025-2026 döneminde taraflar arasındaki müzakereler yeniden başlamış; hat üzerinde kısmi akışın yeniden sağlanmasına yönelik çabalar sürmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Türkiye için Stratejik Önemi</h2>
            <p>
              Kuzey Irak petrolü Türkiye açısından birkaç kritik boyut taşır. İlk olarak Türkiye, boru hattı transit ücreti ve Ceyhan terminalinden elde ettiği gelirlerle ekonomik kazanım sağlar. İkinci olarak Kuzey Irak&apos;tan doğrudan alınan ham petrol, Türkiye&apos;nin ithalat çeşitlendirme stratejisinin önemli bir parçasını oluşturur.
            </p>
            <p className="mt-3">
              Üçüncü ve belki de en önemli boyut jeopolitiktir: Türkiye, hem Irak merkezi hükümetiyle hem de KBY ile dengeleyici ilişkiler yürütmekte, bölgedeki enerji altyapısındaki kilit rolünü dış politika aracı olarak kullanmaktadır.
            </p>
            <p className="mt-3">
              Ceyhan terminali, Azerbaycan&apos;dan gelen BTC (Bakü-Tiflis-Ceyhan) petrolünün de çıkış noktasıdır. Bu iki hattın aynı terminali paylaşması, Türkiye&apos;nin Avrasya enerji koridorlarındaki merkezi konumunu daha da güçlendirir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Riskler ve Fırsatlar</h2>
            <p>
              Kuzey Irak&apos;taki siyasi istikrarsızlık, Bağdat-Erbil gerginlikleri ve bölgedeki güvenlik sorunları hat akışını doğrudan etkiler. 2014&apos;ten bu yana boru hattı çeşitli sabotaj saldırılarına maruz kalmış; bakım kesintileri de ihracat hacmini zaman zaman önemli ölçüde düşürmüştür.
            </p>
            <p className="mt-3">
              Öte yandan Kürdistan Bölgesi&apos;nin petrol ihracatının yeniden tam kapasiteye kavuşması, hem Türkiye&apos;nin transit gelirleri hem de ithal ham petrol erişimi açısından önemli bir fırsat penceresi sunmaktadır. Uluslararası petrol şirketlerinin bölgedeki yatırımları sürmekte; uzun vadeli rezerv tahmini bölgeyi cazip kılmaya devam etmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
            <p>
              Kuzey Irak petrolü ve Kerkük-Ceyhan hattı, Türkiye&apos;nin hem enerji arz güvenliği hem de bölgesel jeopolitik dengesi açısından stratejik önemi yüksek bir unsurdur. Hattın tam kapasitede ve istikrarlı biçimde çalışması, Türkiye&apos;nin enerji ithalatını çeşitlendirmesine ve transit ülke konumunu pekiştirmesine doğrudan katkı sağlayacaktır.
            </p>
          </section>
        </article>

        <div className="my-8 bg-[#042C53]/5 border border-[#0C447C]/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-[#0C447C] uppercase tracking-wide mb-2">Güncel Veri — Nisan 2026</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
            <span>Brent petrol <strong>~97 $/varil</strong></span>
            <span>USD/TRY <strong>~44,6</strong></span>
            <span>Ceyhan ihracat terminali <strong>aktif</strong></span>
          </div>
        </div>

        <div className="flex gap-2 mb-10">
          <a href="https://twitter.com/intent/tweet?text=Kuzey+Irak+Petrol%C3%BC+ve+T%C3%BCrkiye&url=https://petrolistan.com/analizler/kuzey-irak-petrol-turkiye" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">X&apos;te paylaş</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/kuzey-irak-petrol-turkiye" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">LinkedIn&apos;de paylaş</a>
        </div>

                <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-sm text-gray-600">
          İlgili: Güncel benzin, motorin ve LPG fiyatlarını şehir bazında karşılaştırmak için{' '}
          <Link href="/akaryakit/karsilastirma" className="text-[#185FA5] font-medium hover:underline">
            akaryakıt karşılaştırma sayfamıza bakın →
          </Link>
        </div>
      {/* SSS */}
      <div className="my-10 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Sık Sorulan Sorular</h2>
        {[
          {
            q: 'Kerkük-Ceyhan boru hattı nedir?',
            a: "Kerkük-Ceyhan boru hattı, Irak Kürdistan Bölgesi'ndeki petrol sahalarından Türkiye'nin Akdeniz kıyısındaki Ceyhan ihracat terminaline uzanan yaklaşık 970 km uzunluğundaki boru hattıdır. Teorik kapasitesi günde 300-400 bin varildir.",
          },
          {
            q: 'Kerkük-Ceyhan hattı neden durdu?',
            a: 'Irak merkezi hükümeti ile Kürdistan Bölgesel Yönetimi arasındaki petrol geliri paylaşımı anlaşmazlığı nedeniyle hat 2023 yılından bu yana büyük ölçüde kapalıdır. Taraflar arasındaki müzakereler sürmektedir.',
          },
          {
            q: 'Bakü-Tiflis-Ceyhan hattı ne kadar petrol taşıyor?',
            a: "BTC hattı, Azerbaycan'ın Hazar Denizi petrolünü Gürcistan üzerinden Türkiye'ye taşımakta ve günde yaklaşık 600-700 bin varil kapasiteyle işletilmektedir. Türkiye için kritik bir transit gelir kaynağıdır.",
          },
          {
            q: "Kuzey Irak petrolü Türkiye'yi nasıl etkiler?",
            a: 'Türkiye hem transit ülke geliri elde etmekte hem de güvenilir komşu tedarik açısından stratejik kazanım sağlamaktadır. Hattın durması transit ücret gelirlerini azaltmakta, bölgesel enerji jeopolitiğini olumsuz etkilemektedir.',
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
            <li key="/analizler/2026-petrol-fiyat-tahmini"><a href="/analizler/2026-petrol-fiyat-tahmini" className="text-[#185FA5] text-sm hover:underline leading-snug">2026 Petrol Fiyat Tahmini</a></li>
            <li key="/analizler/opec-plus-nedir-nasil-calisir"><a href="/analizler/opec-plus-nedir-nasil-calisir" className="text-[#185FA5] text-sm hover:underline leading-snug">OPEC+ Nedir, Nasıl Çalışır?</a></li>
            <li key="/analizler/turkiye-enerji-ithalati-ekonomik-etkileri"><a href="/analizler/turkiye-enerji-ithalati-ekonomik-etkileri" className="text-[#185FA5] text-sm hover:underline leading-snug">Türkiye'nin Enerji İthalatı: Ekonomik Etkiler</a></li>
        </ul>
      </div>



        <div className="pt-6 border-t border-gray-200">
          <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">← Tüm analizler</Link>
        </div>
      </main>
    </>
  )
}
