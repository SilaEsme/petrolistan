import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elektrikli Araç vs. Akaryakıt: Gerçek Maliyet Karşılaştırması | Petrolistan Analiz',
  description: 'Elektrikli araçların şarj maliyeti ile benzinli ve dizel araçların yakıt masraflarının Türkiye koşullarında gerçekçi karşılaştırması.',
}

export default function ElektrikliAracYakitMaliyetiPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Meta */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#E1F5EE', color: '#085041' }}>
          TÜRKİYE
        </span>
        <span className="text-xs text-gray-400">16 Nisan 2026</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">9 dk okuma</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
        Elektrikli Araç vs. Akaryakıt: Gerçek Maliyet Karşılaştırması
      </h1>

      <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-8">
        Türkiye&apos;de elektrik fiyatları yüksek, akaryakıt fiyatları da yüksek. Peki hangisi kilometre başına daha ucuz? Şarj altyapısı, kademeli tarife ve hızlı şarj maliyetlerini de dahil ederek gerçekçi bir hesap yapıyoruz.
      </p>

      {/* Editöryal not */}
      <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
        <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
        <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
      </div>

      <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Temel Karşılaştırma Çerçevesi</h2>
          <p>
            Yakıt maliyeti karşılaştırması yapılırken tek doğru ölçü birimi <strong>kilometre başına maliyet</strong>tir. Litre fiyatını ya da kilovat-saat fiyatını karşılaştırmak yanıltıcı olur; çünkü araçların verimlilik düzeyleri birbirinden önemli ölçüde farklıdır.
          </p>
          <p className="mt-3">
            Ortalama bir benzinli binek araç yüz kilometrede sekiz ila on litre yakıt harcarken, modern bir elektrikli araç aynı mesafe için on beş ila yirmi kilovat-saat (kWh) elektrik tüketir. Bu verimlilik farkı, yakıt maliyeti hesabının temelini oluşturur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Türkiye&apos;de Elektrik Fiyatları ve Kademeli Tarife</h2>
          <p>
            Türkiye&apos;de konut elektrik fiyatları kademeli tarife sistemiyle belirlenir. 2025-2026 döneminde düşük tüketim kademesinde birim fiyat orta gelirli tüketici için yaklaşık üç ila dört TL/kWh aralığında seyrederken, üst kademelerde bu tutar önemli ölçüde yükselir.
          </p>
          <p className="mt-3">
            Geceleri ev şarj cihazıyla şarj eden ve düşük kademedeki birim fiyattan yararlanan bir EV sürücüsü, yüz kilometre başına ödediği enerji maliyetini benzinli araca kıyasla ciddi biçimde aşağıda tutabilir. Hesabı somutlaştıralım: ortalama onsekiz kWh/100 km tüketen bir elektrikli araç için üç TL/kWh tarifesiyle yüz km maliyeti 54 TL&apos;ye denk gelir. Aynı mesafeyi dokuz litre benzin harcayarak kateden bir araçta ise pompa fiyatı çarpanı belirleyici olur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Hızlı Şarj: Avantajı Azaltıyor mu?</h2>
          <p>
            Ev şarjının aksine şehirlerarası hızlı şarj istasyonlarında birim fiyat belirgin biçimde yüksektir. Türkiye&apos;deki özel hızlı şarj ağlarında 2025-2026 döneminde DC hızlı şarj fiyatları altı ila dokuz TL/kWh bandında seyredebilmektedir. Bu durumda yüz km maliyeti yaklaşık yüz ila yüz altmış TL&apos;ye çıkabilir; bu da benzinli araçla farkı önemli ölçüde daraltır.
          </p>
          <p className="mt-3">
            Dolayısıyla elektrikli araçtan en büyük yakıt tasarrufunu elde etmek için ağırlıklı olarak gece ev şarjı kullanmak ve hızlı şarj maliyetini yıllık bütçede makul bir pay olarak tutmak gerekir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Bakım Avantajı: Göz Ardı Edilmemeli</h2>
          <p>
            Elektrikli araçların sahip oldukları en önemli maliyet avantajlarından biri yakıt değil, bakım giderleridir. İçten yanmalı motorlarda rutin bakım kalemlerini oluşturan motor yağı değişimi, yağ filtresi, hava filtresi, bujiler, debriyaj ve egzoz sistemi bileşenleri elektrikli araçlarda büyük ölçüde ortadan kalkar.
          </p>
          <p className="mt-3">
            Elektrikli araçlarda fren balatası ömrü de rejeneratif frenleme sayesinde içten yanmalı araçlara göre çok daha uzundur. Yıllık bakım maliyetleri karşılaştırmalarında elektrikli araçların ortalama yüzde kırk ila altmış daha düşük masraf çıkardığı görülmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Satın Alma Maliyeti ve Geri Ödeme Süresi</h2>
          <p>
            Türkiye&apos;de elektrikli araçların satın alma fiyatı, eşdeğer benzinli araçlara göre hâlâ yüksek bir prim taşımaktadır. ÖTV muafiyetleri ve teşvik paketleri bu farkı kısmen kapatmış olsa da özellikle premium elektrikli modellerde başlangıç maliyeti önemli bir engel olmaya devam etmektedir.
          </p>
          <p className="mt-3">
            Yaygın kullanılan bir hesaplama yöntemi olan <strong>toplam sahip olma maliyeti (TCO)</strong> analizinde; araç alış fiyatı, sigorta, yakıt-enerji maliyeti, bakım ve yedek parça, vergi ve nihayet ikinci el değeri bir arada değerlendirilir. Bu hesap yılda yirmi beş bin kilometre yapan ortalama bir kullanıcı için elektrikli araç lehine sonuçlanabilir; ancak geri ödeme süresi enerji fiyatlarındaki değişimlere ve araç fiyatına göre üç ila altı yıl arasında geniş bir yelpazede yer alabilir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Şarj Altyapısının Gerçeği</h2>
          <p>
            Türkiye&apos;deki hızlı şarj istasyonu sayısı hızla artmakla birlikte, otoyol güzergahları dışında yeterli yoğunluğa ulaşmadığı bölgeler bulunmaktadır. İstanbul, Ankara, İzmir ve büyük turistik güzergahlar iyi kaplansa da Doğu ve İç Anadolu&apos;da altyapı eksiklikleri sürmektedir.
          </p>
          <p className="mt-3">
            Bu durum, uzun mesafe yapan ya da şarj ağının zayıf olduğu bölgelerde yaşayan sürücüler için elektrikli araç tercihini güçleştirmektedir. Sık seyahat edenler için hem şarj ağı haritasını hem de şarj sürelerini dikkate alan gerçekçi bir planlama zorunludur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç: Akıllıca Seçim Kullanım Profiline Bağlı</h2>
          <p>
            Türkiye koşullarında elektrikli araç, yılda yirmi bin kilometre ve üzerinde yol yapan, büyük şehirde yaşayan ve ağırlıklı olarak ev şarjına erişimi olan sürücüler için yakıt ve bakım maliyeti açısından belirgin bir avantaj sunar.
          </p>
          <p className="mt-3">
            Akaryakıt fiyatlarının yüksekliği bu avantajı güçlendiren bir faktördür; ancak elektrik fiyatlarındaki kademeli artışlar ve hızlı şarj maliyetleri hesabı karmaşıklaştırır. Satın alma kararı verilirken TCO analizi ve kişisel kullanım profilinin birlikte değerlendirilmesi, uzun vadede en doğru sonucu verecektir.
          </p>
          <p className="mt-3">
            Güncel akaryakıt fiyatlarını Petrolistan üzerinden takip ederek kendi karşılaştırma hesabınızı yapabilirsiniz.
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
          href="https://twitter.com/intent/tweet?text=Elektrikli+Ara%C3%A7+vs.+Akaryak%C4%B1t%3A+Ger%C3%A7ek+Maliyet+Kar%C5%9F%C4%B1la%C5%9Ft%C4%B1rmas%C4%B1&url=https://petrolistan.com/analizler/elektrikli-arac-yakit-maliyeti"
          target="_blank" rel="noopener noreferrer"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">
          X&apos;te paylaş
        </a>
        <a
          href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/elektrikli-arac-yakit-maliyeti"
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
