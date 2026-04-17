import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LPG Otogaz: Avantajlar, Dezavantajlar ve Türkiye Verileri | Petrolistan Analiz',
  description: 'LPG otogaz dönüşümünün maliyeti, geri ödeme süresi, yasal düzenlemeler ve Türkiye\'deki otogaz piyasasının kapsamlı analizi.',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LPG Otogaz: Avantajlar, Dezavantajlar ve Türkiye Verileri',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal Ekibi' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  datePublished: '2026-04-16',
  description: 'LPG otogaz dönüşümünün maliyeti, geri ödeme süresi ve Türkiye otogaz piyasasının analizi.',
}

export default function LpgOtogazPage() {
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
          LPG Otogaz: Avantajlar, Dezavantajlar ve Türkiye Verileri
        </h1>

        <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-6">
          Türkiye dünyanın en büyük otogaz pazarlarından birine sahip. Yaklaşık dört milyon LPG&apos;li araçla ülkemiz Avrupa&apos;da otogaz kullanımında ilk sıralarda yer alıyor. Peki bu tercih gerçekten avantajlı mı?
        </p>

        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
          <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
          <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
        </div>

        <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Türkiye&apos;nin Otogaz Piyasası</h2>
            <p>
              Türkiye, Avrupa&apos;nın en büyük ikinci otogaz pazarı konumundadır. Enerji Piyasası Düzenleme Kurumu (EPDK) verilerine göre ülkede yaklaşık üç buçuk ila dört milyon LPG dönüşümlü araç bulunmaktadır. Bu araçların büyük bölümü benzinli motordan LPG&apos;ye dönüştürülmüş binek otomobillerdir.
            </p>
            <p className="mt-3">
              Otogaz talebinin bu denli yüksek olmasının temel nedeni açıktır: LPG pompada benzinden önemli ölçüde ucuzdur. 2026 yılı başı itibarıyla İstanbul&apos;da otogaz fiyatı yaklaşık yirmi beş ila yirmi yedi TL/litre düzeyinde seyrederken aynı dönemde 95 oktan benzin yetmiş dört ile yetmiş altı TL/litre bandındaydı.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">LPG&apos;nin Avantajları</h2>
            <p>
              <strong>Yakıt maliyeti:</strong> LPG ile benzinin litre fiyatı arasındaki fark yüzde altmış ile yetmiş aralığındadır. LPG motorların benzinlilere kıyasla yüzde on beş ile yirmi daha fazla yakıt harcadığı göz önüne alındığında bile net tasarruf oldukça cazip bir düzeyde kalmaktadır. Yüz kilometre başına hesaplandığında LPG yakıt maliyeti benzinin yaklaşık yarısı ile üçte biri arasındadır.
            </p>
            <p className="mt-3">
              <strong>Çevre:</strong> LPG, benzine kıyasla karbonmonoksit ve hidrokarbon emisyonları açısından daha temiz bir yakıttır. Azot oksit emisyonları da görece düşük seyreder. Bu özelliği LPG&apos;yi şehir içi hava kalitesi açısından olumlu konumlandırır.
            </p>
            <p className="mt-3">
              <strong>Motor ömrü:</strong> Doğru kurulu ve bakımlı bir LPG sistemi motorun aşınmasını azaltabilir. LPG&apos;nin yanma karakteristiği, silindir cidarlarını ve supapları benzine kıyasla daha az yorar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">LPG&apos;nin Dezavantajları</h2>
            <p>
              <strong>Dönüşüm maliyeti:</strong> Lisanslı bir serviste gerçekleştirilen LPG sistem montajı 2026 yılı itibarıyla otomobilin tipine göre otuz bin ile altmış bin TL arasında değişmektedir. Bu maliyet, aylık yakıt tasarrufuyla orantılandığında geri ödeme süresi genellikle on iki ile yirmi dört ay arasında gerçekleşir.
            </p>
            <p className="mt-3">
              <strong>Depo kapasitesi ve menzil:</strong> LPG deposu bagaj hacmini kısıtlar. Toroidal (simit) depolar yedek lastik bölümüne yerleştirilir ve bagaj alanını sınırlamaz; ancak silindirik depolar bagajın önemli bir kısmını kaplar. Bunun yanı sıra enerji yoğunluğunun düşüklüğü nedeniyle menzil benzin deposuna kıyasla yüzde yirmi ila otuz daha kısadır.
            </p>
            <p className="mt-3">
              <strong>İstasyon yaygınlığı:</strong> Türkiye&apos;de otogaz istasyonu sayısı benzin ve motorin istasyonlarına kıyasla daha azdır. Büyükşehirlerde sorun yaşanmasa da kırsal bölgelerde ve bazı otoban güzergahlarında LPG bulmak güçleşebilir.
            </p>
            <p className="mt-3">
              <strong>İkinci el değeri:</strong> LPG&apos;li araçlar ikinci el piyasasında bazı alıcılar tarafından daha düşük değerlendirilmektedir; bu da satışta beklenen fiyatın altında kalma riskini beraberinde getirir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Yasal Düzenleme ve Güvenlik</h2>
            <p>
              Türkiye&apos;de araç LPG dönüşümü EPDK tarafından lisanslandırılmış servisler aracılığıyla yapılabilir. Araç tescil belgesi üzerinde LPG kaydı mutlaka yer almalı; aksi hâlde araç trafik sigortası kapsamı dışına çıkabilir ve trafikten men edilebilir.
            </p>
            <p className="mt-3">
              LPG sistemlerinin periyodik muayenesi zorunludur. Tank, regülatör ve enjektörlerin düzenli kontrolü hem güvenlik hem de sistem verimliliği açısından kritiktir. Piyasadaki kalitesiz dönüşüm kitlerinden kaçınmak, uzun vadeli sorunsuz kullanım için belirleyici faktördür.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
            <p>
              LPG otogaz, Türkiye koşullarında yıllık yüksek kilometreli sürücüler için güçlü bir maliyet avantajı sunar. Dönüşüm maliyeti genellikle iki yıl içinde amorti edilebilir. Ancak kısa mesafe ve düşük kilometreli kullanıcılar ile bagaj alanına önem verenler için avantaj daha sınırlı kalır. Kararı vermeden önce kişisel kullanım profilinize ve araç tipinize göre net bir hesap yapmanız önerilir.
            </p>
          </section>
        </article>

        <div className="my-8 bg-[#042C53]/5 border border-[#0C447C]/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-[#0C447C] uppercase tracking-wide mb-2">Güncel Veri — Nisan 2026</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
            <span>Brent petrol <strong>~97 $/varil</strong></span>
            <span>USD/TRY <strong>~44,6</strong></span>
            <span>İstanbul otogaz <strong>~26 ₺/L</strong></span>
          </div>
        </div>

        <div className="flex gap-2 mb-10">
          <a href="https://twitter.com/intent/tweet?text=LPG+Otogaz%3A+Avantajlar+ve+Dezavantajlar&url=https://petrolistan.com/analizler/lpg-otogaz-avantajlari-dezavantajlari" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">X&apos;te paylaş</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/lpg-otogaz-avantajlari-dezavantajlari" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">LinkedIn&apos;de paylaş</a>
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
