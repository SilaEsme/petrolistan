import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dolar Kuru Akaryakıt Fiyatını Nasıl Etkiler? Mekanizma ve Veriler | Petrolistan Analiz',
  description: 'USD/TRY kurunun benzin ve motorin pompa fiyatlarına geçişkenliği, tarihsel örnekler ve 2025-2026 döneminin analizi.',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Dolar Kuru Akaryakıt Fiyatını Nasıl Etkiler?',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal Ekibi' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  datePublished: '2026-04-16',
  description: 'USD/TRY kurunun akaryakıt fiyatlarına etkisi ve geçişkenlik mekanizmasının analizi.',
}

export default function DolarKuruAkaryakitPage() {
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
          Dolar Kuru Akaryakıt Fiyatını Nasıl Etkiler?
        </h1>

        <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-6">
          2021&apos;den bu yana dolar yaklaşık beş katına çıktı, benzin fiyatları da buna paralel yükseldi. Kur hareketlerinin pompa fiyatına yansıma hızı ve büyüklüğü neden bu kadar doğrudan?
        </p>

        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
          <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
          <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
        </div>

        <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Neden Dolar Belirleyici?</h2>
            <p>
              Ham petrol, uluslararası piyasalarda dolar cinsinden fiyatlanır. "Petrodolar" sistemi olarak bilinen bu yapı, 1970&apos;lerin başından bu yana küresel enerji ticaretinin temel dilidir. Türkiye ham petrolün yüzde doksan beşinden fazlasını ithal ettiğinden, satın alım tamamen dolar üzerinden gerçekleşir.
            </p>
            <p className="mt-3">
              Sonuç olarak bir litre benzinin TL maliyeti şu basit denklemle şekillenir: ham petrol fiyatı (dolar) × dolar/TL kuru + rafinaj + dağıtım + vergiler. Bu denklemin ilk iki terimi döviz piyasasına bağlıdır; vergiler ve diğer kalemler ise görece sabittir. Dolayısıyla kur yükseldiğinde pompa fiyatı neredeyse anında yukarı çeker.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Tarihsel Korelasyon: 2020–2026</h2>
            <p>
              2020 yılı başında USD/TRY kuru yaklaşık beş ila altı TL bandındaydı; benzin İstanbul&apos;da yirmi ila yirmi beş TL/litre aralığında. 2021 yılından itibaren TL hızlı değer kaybetmeye başladı.
            </p>
            <p className="mt-3">
              2022 yılı ikinci çeyreğinde dolar otuz TL&apos;yi aşarken Brent ham petrol aynı dönemde yüz yirmi doları gördü. Bu çift baskı altında İstanbul benzin fiyatları kırk ila kırk beş TL&apos;ye tırmandı. 2025 sonuna gelindiğinde kur kırk iki ile kırk beş TL aralığında, benzin ise yetmiş ile seksen TL bandına yerleşmişti.
            </p>
            <p className="mt-3">
              Bu beş yıllık süreçte TL yaklaşık yüzde yetmiş beş ile seksen oranında değer yitirdi. Benzin fiyatı ise TL bazında yaklaşık dört ila beş katına çıktı; bu artışın kur kaynaklı bölümü yüzde altmış ile yetmiş aralığında tahmin edilmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Geçişkenlik Hızı: Neden Anında Yansıyor?</h2>
            <p>
              Akaryakıt sektöründe fiyat ayarlamaları haftalık hatta günlük yapılabilmektedir. Dağıtım şirketleri, ham petrol alım maliyetlerini yakın vadeli vadeli işlem fiyatları ile anlık kur üzerinden hesaplar ve pompa fiyatlarını buna göre günceller.
            </p>
            <p className="mt-3">
              Bu mekanizma sayesinde döviz kurundaki ani bir yükseliş genellikle birkaç gün içinde pompaya yansır. Tersine kur düştüğünde ise piyasadaki rekabet indirimleri daha yavaş getirebilir; bu asimetri tüketici aleyhine bir durum yaratır.
            </p>
            <p className="mt-3">
              EPDK&apos;nın Petrol Piyasası İzleme Raporları, kur değişimlerinin akaryakıt fiyatlarına geçişkenliğini dönemsel olarak analiz etmektedir. 2022 ve 2023 yıllarına ait raporlar, kur yüzde onluk bir artışının kısa vadede pompa fiyatlarına yüzde sekiz ile on arasında yansıdığını ortaya koymuştur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Vatandaş İçin Pratik Sonuçlar</h2>
            <p>
              Merkez Bankası faiz kararları, enflasyon verileri ya da dış denge açıklamaları kur hareketleri üzerinden dolaylı bir enerji fiyatı politikasına dönüşür. Örneğin bir bütçe açığı açıklaması veya yüksek enflasyon verisi TL&apos;yi baskı altına alırsa, pompa fiyatlarına etkisi birkaç gün içinde hissedilir.
            </p>
            <p className="mt-3">
              Dolayısıyla akaryakıt tüketicilerinin yalnızca ham petrol haberlerini değil, döviz piyasasını da takip etmeleri yerinde olur. Beklenen kur yükselişi öncesinde depoyu doldurmak küçük ölçekli bir tasarruf fırsatı sunabilir; ancak kur hareketlerini tahmin etmek uzmanlık gerektiren ve yanılma payı yüksek bir çabadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
            <p>
              Dolar kuruyla akaryakıt fiyatı arasındaki ilişki, Türkiye&apos;nin yapısal enerji bağımlılığının kaçınılmaz bir yansımasıdır. Kur istikrarını sağlamak, doğrudan enerji fiyatı istikrarına ve enflasyonun kontrol altına alınmasına hizmet eder. Bu bağlantıyı kavramak; hem tüketicinin gündelik kararlarını hem de ekonomi politikası tartışmalarını anlamlandırmak için önemlidir.
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
          <a href="https://twitter.com/intent/tweet?text=Dolar+Kuru+Akaryak%C4%B1t+Fiyat%C4%B1n%C4%B1+Nas%C4%B1l+Etkiler%3F&url=https://petrolistan.com/analizler/dolar-kuru-akaryakit-fiyat-etkisi" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">X&apos;te paylaş</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/dolar-kuru-akaryakit-fiyat-etkisi" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">LinkedIn&apos;de paylaş</a>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">← Tüm analizler</Link>
        </div>
      </main>
    </>
  )
}
