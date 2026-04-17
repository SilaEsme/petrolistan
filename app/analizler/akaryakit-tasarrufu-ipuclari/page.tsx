import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Akaryakıt Tasarrufu: Kanıtlanmış 12 İpucu | Petrolistan Analiz',
  description: 'Benzin ve motorin tüketiminizi yüzde 15-20 azaltabilecek sürüş teknikleri, araç bakım önerileri ve yakıt alım stratejileri.',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Akaryakıt Tasarrufu: Kanıtlanmış 12 İpucu',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal Ekibi' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  datePublished: '2026-04-16',
  description: 'Benzin ve motorin tüketiminizi azaltacak kanıtlanmış sürüş teknikleri ve bakım önerileri.',
}

export default function AkaryakitTasarrufulPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#E1F5EE', color: '#085041' }}>TÜRKİYE</span>
          <span className="text-xs text-gray-400">16 Nisan 2026</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">7 dk okuma</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
          Akaryakıt Tasarrufu: Kanıtlanmış 12 İpucu
        </h1>

        <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-6">
          Türkiye&apos;de akaryakıt fiyatları yüksek seyrederken doğru sürüş alışkanlıkları ve araç bakımıyla tüketimi yüzde on beş ile yirmi oranında azaltmak mümkündür. Somut ve uygulanabilir öneriler.
        </p>

        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
          <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
          <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
        </div>

        <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sürüş Tekniği ile Tasarruf</h2>
            <p>
              <strong>1. Kademeli hızlanma ve yavaşlama:</strong> Ani gaz ve ani fren, yakıt tüketimini ciddi ölçüde artırır. Avrupa Çevre Ajansı verilerine göre sert sürüş alışkanlıkları tüketimi yüzde yirmi beşe kadar yükseltebilir. Işık döngüsünü önceden okuyarak motoru frenlemek yerine gaz kesmek, hem yakıt hem de fren bakım tasarrufu sağlar.
            </p>
            <p className="mt-3">
              <strong>2. Sabit hız ve hız sabitleme:</strong> Şehirlerarası yolculuklarda hız sabitleme (cruise control) sistemi kullanmak, sürücünün bilinçsizce yaptığı hız dalgalanmalarını ortadan kaldırır. Araştırmalar otoyol koşullarında bu özelliğin tüketimi yüzde yedi ile on beş arasında düşürebildiğini göstermektedir.
            </p>
            <p className="mt-3">
              <strong>3. Uygun vites kullanımı:</strong> Motor devir sayısını düşük tutmak yakıt ekonomisini artırır. Şehir içinde genellikle bin beş yüz ile iki bin beş yüz devir arasında vites değiştirmek ideal aralıktır. Yüksek devirde düşük vites kullanmak motoru yorar ve yakıt tüketimini artırır.
            </p>
            <p className="mt-3">
              <strong>4. Rölantide beklememek:</strong> Motor çalışır durumdayken hareketsiz kalmak gereksiz yakıt harcar. Modern enjeksiyonlu motorlarda motoru kapatıp yeniden başlatmak, otuz saniyeden uzun rölantiye kıyasla daha az yakıt tüketir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Araç Bakımıyla Yakıt Ekonomisi</h2>
            <p>
              <strong>5. Lastik basıncını kontrol edin:</strong> Eksik şişirilmiş lastikler yuvarlanma direncini artırır ve tüketimi yüzde üç ile beş oranında yükseltir. Lastik basınç kontrolü ücretsiz ve dakikalar içinde yapılabilecek bir işlemdir; aylık düzenli kontrolünü alışkanlık haline getirin.
            </p>
            <p className="mt-3">
              <strong>6. Motor yağı değişimi:</strong> Zamanında değiştirilmeyen yağ, motor içi sürtünmeyi artırır ve verimi düşürür. Üretici tarafından önerilen yağ değişim aralıklarına uymak, motor ömrünü uzatmanın yanı sıra yakıt tüketimini de optimize eder.
            </p>
            <p className="mt-3">
              <strong>7. Hava filtresi:</strong> Tıkalı hava filtresi yanma verimliliğini bozar. Araç bakım kitabında belirtilen aralıklarda filtreyi değiştirmek yakıt ekonomisini yüzde iki ile dört arasında iyileştirebilir.
            </p>
            <p className="mt-3">
              <strong>8. Klima kullanımı:</strong> Klima kompresörü motora ek yük bindirir ve tüketimi artırır. Şehir içinde yüzde beş ile on, otoyolda daha düşük oranda bir artış beklenir. Gereksiz soğutmadan kaçınmak veya düşük fan hızıyla yönetmek fark yaratır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Yakıt Alım Stratejileri</h2>
            <p>
              <strong>9. Fiyat karşılaştırması yapın:</strong> Aynı şehirde farklı istasyonlar arasında litre başına birkaç TL fark olabilir. Petrolistan üzerinden güncel fiyatları karşılaştırarak rota üzerindeki en uygun istasyonu bulmak, uzun vadede anlamlı tasarruf sağlar.
            </p>
            <p className="mt-3">
              <strong>10. Seyahati planlayın:</strong> Rota optimizasyonu trafik sıkışıklığından kaçınmayı ve gereksiz km&apos;yi azaltmayı sağlar. Navigasyon uygulamalarının trafik durumunu gerçek zamanlı analiz eden algoritmaları, yüzde on ile on beş yakıt tasarrufu potansiyeli sunabilir.
            </p>
            <p className="mt-3">
              <strong>11. Araç yükünü azaltın:</strong> Bagajda sürekli taşınan gereksiz ağırlık tüketimi artırır. Her yüz kilogram ekstra yük, tüketimi yaklaşık yüzde bir ile üç oranında yükseltir. Bagaj üstü taşıyıcılar ise aerodinamik direnci artırarak otoyolda tüketimi yüzde yirmi ile otuz oranında artırabilir.
            </p>
            <p className="mt-3">
              <strong>12. Araç seçiminde ECO etiketi:</strong> Yeni araç alırken yakıt tüketim etiketini dikkate almak, yıllık binlerce TL tasarruf anlamına gelir. Aynı sınıftaki iki araç arasında yüzde yirmi tüketim farkı nadir değildir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç: Yıllık Tasarruf Potansiyeli</h2>
            <p>
              İstanbul&apos;da yılda yirmi bin kilometre yapan ve ortalama sekiz litre/100 km tüketen bir araç sürücüsü için yıllık yakıt tüketimi yaklaşık bin altı yüz litredir. Yukarıdaki önlemlerle tüketimi yüzde on beş azaltmak, yüz yirmi ila yüz elli litre tasarruf anlamına gelir. 2026 başı fiyatlarıyla bu rakam dokuz bin ile on iki bin TL düzeyine karşılık gelir.
            </p>
            <p className="mt-3">
              Basit sürüş alışkanlıklarının yıllık bir otomobil sigortasına denk tasarruf sağlayabileceği düşünüldüğünde, bu ipuçlarını hayata geçirmek için herhangi bir maliyet gerektirmediği hatırlanmalıdır.
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
          <a href="https://twitter.com/intent/tweet?text=Akaryak%C4%B1t+Tasarrufu%3A+Kan%C4%B1tlanm%C4%B1%C5%9F+12+%C4%B0pucu&url=https://petrolistan.com/analizler/akaryakit-tasarrufu-ipuclari" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">X&apos;te paylaş</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/akaryakit-tasarrufu-ipuclari" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">LinkedIn&apos;de paylaş</a>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">← Tüm analizler</Link>
        </div>
      </main>
    </>
  )
}
