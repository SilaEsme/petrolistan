import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Motorin mi Benzin mi? Hangisi Daha Avantajlı? | Petrolistan Analiz',
  description: 'Motorin ve benzin araçların yakıt maliyeti, bakım giderleri, çevre etkisi ve kullanım profili açısından kapsamlı karşılaştırması.',
}

export default function MotorinMiBenzinMiPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Meta */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#FAEEDA', color: '#633806' }}>
          ANALİZ
        </span>
        <span className="text-xs text-gray-400">16 Nisan 2026</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">8 dk okuma</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
        Motorin mi Benzin mi? Hangisi Daha Avantajlı?
      </h1>

      <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-8">
        Araç alırken verilen en kritik kararlardan biri yakıt türü seçimidir. Günlük kullanım alışkanlıkları, yıllık kilometre ve sürüş profili bu kararı doğrudan etkiler. Rakamlarla motorin ile benzin karşılaştırması.
      </p>

      {/* Editöryal not */}
      <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
        <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
        <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
      </div>

      <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Türkiye&apos;de Fiyat Farkının Anlamı</h2>
          <p>
            Türkiye&apos;de motorin fiyatı tarihsel olarak benzinden litre başına daha düşük seyredebilir; ancak bu fark dönemden döneme değişkenlik gösterir. Vergi yapısındaki farklılıklar iki yakıt türünün pompa fiyatını belirleyen başlıca etkendir.
          </p>
          <p className="mt-3">
            Dizel motorlar, eşdeğer güçteki benzinli araçlara kıyasla genellikle yüzde yirmi ila otuz daha az yakıt harcar. Bu verimlilik farkı, litre fiyatı benzer bile olsa yıllık bazda önemli tasarrufa dönüşebilir. Hesap şu şekilde kurulabilir: yılda yirmi bin kilometre yapan ve ortalama sekiz litre benzin ya da altı litre motorin kullanan iki aracı karşılaştırdığınızda, yakıt tüketimi arasındaki fark belirginleşir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Uzun Yol mu, Şehir içi mi?</h2>
          <p>
            Dizel motorların avantajı özellikle <strong>uzun mesafe ve sürekli seyir</strong> koşullarında belirginleşir. Turbo dizel motorlar, yüksek tork sayesinde otoyol sürüşlerinde çok daha verimli çalışır. Öte yandan şehir içi sık dur-kalk trafiğinde bu avantaj azalır; çünkü dizel motorlar tam çalışma sıcaklığına ulaşmadan egzoz filtresi (DPF) sorunlarıyla karşılaşabilir.
          </p>
          <p className="mt-3">
            Benzinli araçlar ise kısa mesafe ve şehir içi kullanımda daha avantajlıdır. Isınma süreleri daha kısadır, bakım gereksinimleri görece daha basittir ve şehirde yapılan kısa yolculuklarda DPF tıkanması gibi sorunlar yaşanmaz.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Bakım Maliyetleri</h2>
          <p>
            Dizel motorların bakım maliyeti, karmaşık yakıt enjeksiyon sistemleri ve ek filtreler (DPF, AdBlue) nedeniyle benzinli araçlara göre genellikle daha yüksektir. Yağ değişimi aralıkları çoğunlukla benzinli araçlara yakın olmakla birlikte, yağın kendisi ve filtreler daha pahalıya gelebilir.
          </p>
          <p className="mt-3">
            Egzoz Gaz Resirkülasyonu (EGR) valfi, turbo ve DPF sistemi, dizel araçlarda zaman içinde birikim veya arıza riskine giren parçaların başında gelir. Bu onarımlar özellikle yüksek kilometreli araçlarda ciddi bir maliyet kalemi oluşturabilir.
          </p>
          <p className="mt-3">
            Benzinli araçlarda ise ateşleme sistemi bileşenleri (buji, ateşleme kabloları) periyodik olarak değiştirilmelidir. Ancak bu parçaların maliyeti dizel sistemdeki eşdeğer bileşenlerden genellikle daha düşüktür.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Çevre ve Emisyonlar</h2>
          <p>
            Karbon dioksit (CO₂) emisyonu açısından dizel araçlar geleneksel olarak daha avantajlıydı; çünkü yakıt verimlilikleri sayesinde kilometre başına daha az CO₂ üretiyorlardı. Ancak dizel motorlar azot oksit (NOx) ve ince parçacık (PM2.5) emisyonları bakımından benzinli araçlardan daha yüksek kirletici üretir.
          </p>
          <p className="mt-3">
            Avrupa&apos;daki Euro 7 emisyon standartlarının sıkılaşması ve Türkiye&apos;nin bu standartlarla uyumlaşma süreci, özellikle eski dizel araçlar üzerinde ek maliyet baskısı yaratabilir. Şehirlerde düşük emisyon bölgelerinin yaygınlaşması da dizel araç sahipleri için uzun vadede bir risk faktörüdür.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">İkinci El Değeri</h2>
          <p>
            Türkiye ikinci el piyasasında dizel araçlara olan talep, özellikle yüksek kilometreli ticari kullanıcılar arasında güçlü kalmaya devam etmektedir. Ancak şehirli ve düşük kilometreli kullanıcılar arasında benzinli araçların payı artmaktadır.
          </p>
          <p className="mt-3">
            Elektrikli araçların pazar payının büyümesiyle birlikte dizel araçların ikinci el değerlerinin uzun vadede baskı altına girebileceği tahmin edilmektedir. Bu eğilim henüz Türkiye pazarında belirginleşmemiş olsa da alım kararı uzun vadeli perspektifle değerlendirilmelidir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Hangi Kullanıcı Profili için Hangisi Uygun?</h2>
          <p>
            Yılda kırk bin kilometrenin üzerinde yol yapan, özellikle otoyol ve uzun mesafeli sürücüler için dizel hâlâ avantajlıdır; yakıt tasarrufu bakım maliyetlerini aşar. Günde ortalama otuz kilometrenin altında, büyük şehirde yaşayan ve kısa yolculuklar yapan sürücüler içinse benzinli araç genellikle daha mantıklı bir seçimdir.
          </p>
          <p className="mt-3">
            Her iki seçeneğin de değerlendirildiği orta yol kullanım profilinde ise hibrit araçlar ve yakın gelecekte daha erişilebilir hale gelmesi beklenen elektrikli araçlar ciddi bir alternatif oluşturmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
          <p>
            Motorin mi benzin mi sorusunun tek bir doğru yanıtı yoktur. Karar, yıllık kilometre, kullanım ortamı, bütçe ve uzun vadeli planlara göre şekillenmelidir. Yakıt maliyeti hesabı yaparken yalnızca pompa fiyatına değil; bakım, onarım ve ikinci el değerine de bakmak gerekir.
          </p>
          <p className="mt-3">
            Petrolistan üzerinden güncel pompa fiyatlarını ve şehirler arası karşılaştırmaları takip ederek kendi hesabınızı yapabilirsiniz.
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
          href="https://twitter.com/intent/tweet?text=Motorin+mi+Benzin+mi%3F+Hangisi+Daha+Avantajl%C4%B1%3F&url=https://petrolistan.com/analizler/motorin-mi-benzin-mi"
          target="_blank" rel="noopener noreferrer"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">
          X&apos;te paylaş
        </a>
        <a
          href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/motorin-mi-benzin-mi"
          target="_blank" rel="noopener noreferrer"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">
          LinkedIn&apos;de paylaş
        </a>
      </div>      <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-sm text-gray-600">
        İlgili: Güncel benzin, motorin ve LPG fiyatlarını şehir bazında karşılaştırmak için{' '}
        <Link href="/akaryakit/karsilastirma" className="text-[#185FA5] font-medium hover:underline">
          akaryakıt karşılaştırma sayfamıza bakın →
        </Link>
      </div>



      <div className="pt-6 border-t border-gray-200">
        <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">
          ← Tüm analizler
        </Link>
      </div>
    </main>
  )
}
