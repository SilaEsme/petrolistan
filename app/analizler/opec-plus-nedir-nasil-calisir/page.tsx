import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OPEC+ Nedir, Nasıl Çalışır? Üretim Kotaları ve Küresel Etki | Petrolistan Analiz',
  description: 'OPEC+ örgütünün yapısı, üye ülkeler, üretim kota mekanizması ve küresel petrol fiyatları üzerindeki belirleyici etkisinin kapsamlı analizi.',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'OPEC+ Nedir, Nasıl Çalışır? Üretim Kotaları ve Küresel Etki',
  author: { '@type': 'Organization', name: 'Petrolistan Editöryal Ekibi' },
  publisher: { '@type': 'Organization', name: 'Petrolistan', url: 'https://petrolistan.com' },
  datePublished: '2026-04-16',
  description: 'OPEC+ yapısı, üretim kota mekanizması ve küresel petrol fiyatlarına etkisinin analizi.',
}

export default function OpecPlusNedirPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: '#E6F1FB', color: '#0C447C' }}>OPEC+</span>
          <span className="text-xs text-gray-400">16 Nisan 2026</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">9 dk okuma</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
          OPEC+ Nedir, Nasıl Çalışır? Üretim Kotaları ve Küresel Etki
        </h1>

        <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-6">
          OPEC+ toplantılarında alınan kararlar küresel petrol arzını doğrudan şekillendirir ve her ülkedeki pompa fiyatlarını etkiler. Bu örgütün nasıl çalıştığını, kimlerden oluştuğunu ve kararların nasıl alındığını ayrıntılı inceliyoruz.
        </p>

        <div className="flex items-start gap-2 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-xs text-gray-500">
          <span className="shrink-0 font-bold text-[#0C447C]">✍</span>
          <span>Bu makale <strong className="text-gray-700">Petrolistan editöryal ekibi</strong> tarafından yazılmış, EIA, TCMB ve piyasa verileriyle desteklenmiştir.</span>
        </div>

        <article className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text[#0C447C] mb-3">OPEC&apos;in Kuruluşu ve Evrimi</h2>
            <p>
              Petrol İhraç Eden Ülkeler Örgütü (OPEC), 1960 yılında Bağdat&apos;ta imzalanan bir anlaşmayla kuruldu. Kurucu üyeler Suudi Arabistan, Irak, İran, Kuveyt ve Venezuela&apos;ydı. Örgütün amacı, üye ülkelerin petrol politikalarını koordine ederek fiyatları istikrara kavuşturmak ve üretici devletlerin petrol gelirlerini artırmaktı.
            </p>
            <p className="mt-3">
              2016 yılında yaşanan petrol fiyatı krizi, OPEC&apos;i daha önce görülmemiş bir adıma itti: OPEC üyesi olmayan büyük üreticilerle iş birliği. Bu süreçte Rusya liderliğinde on üç ülkeden oluşan "OPEC dışı" grup masaya oturdu ve <strong>OPEC+</strong> yapısı doğdu. Bugün OPEC+ dünya petrol üretiminin yüzde kırkından fazlasını temsil etmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Üye Ülkeler ve Güç Dengesi</h2>
            <p>
              OPEC&apos;in on üç tam üyesi bulunmaktadır: Suudi Arabistan, Irak, İran, Kuveyt, Birleşik Arap Emirlikleri, Venezuela, Libya, Nijerya, Gabon, Ekvator Ginesi, Kongo, Ekvador ve Cezayir. OPEC+ ise bu ülkelere ek olarak Rusya, Kazakistan, Azerbaycan, Umman, Meksika ve daha birkaç ülkeyi kapsar.
            </p>
            <p className="mt-3">
              Karar mekanizmasında fiiliyatta en belirleyici sesler Suudi Arabistan ve Rusya&apos;dır. Suudi Arabistan günde yaklaşık on milyon varillik üretim kapasitesiyle karteli fiyat hedeflerine yönlendirme gücüne sahipken Rusya, OPEC+ çatısı altında denge unsuru işlevi görür. İki ülke anlaşamadığında kota kararları gecikmekte ya da çözümsüz kalmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Üretim Kota Mekanizması</h2>
            <p>
              OPEC+ üretim kotaları genellikle Viyana&apos;da (bazen çevrimiçi) toplanan Bakanlar Komitesi ve Teknik Uzmanlar Komitesi tarafından belirlenir. Üretim tavanları, her üye ülkenin mevcut kapasitesi ve tarihsel üretim verileri temel alınarak müzakere edilir.
            </p>
            <p className="mt-3">
              Kotalar üretim kesintisi (cut) ya da üretim artışı (ramp-up) biçiminde duyurulur. 2022 yılında günde iki milyon varillik tarihsel kesinti kararı, Batı ülkelerinin şiddetli tepkisine neden olmuş ve enerji güvenliği tartışmalarını alevlendirmiştir.
            </p>
            <p className="mt-3">
              Kota uyumu ise örgütün en kronik sorunlarından biridir. Bazı üyeler özellikle bütçe baskısı altında kotaşımı gerçekleştirir; bu durum fiili üretim ile resmi hedef arasında kalıcı bir makas yaratır. Bağımsız analistler ve IEA, uyumsuzluğu dönemsel olarak raporlamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">ABD Şeyliyle Rekabet ve Değişen Denge</h2>
            <p>
              2010&apos;ların başında başlayan ABD şeyl devrimi, OPEC+&apos;ın piyasa üzerindeki hakimiyetini önemli ölçüde sarsdı. ABD, 2018 yılında Suudi Arabistan&apos;ı geçerek dünyanın en büyük petrol üreticisi konumuna yükseldi. Günde on üç milyonu aşan ABD üretimi, OPEC+ kesintilerini kısmen telafi ederek fiyat tavan etkisini sınırlar.
            </p>
            <p className="mt-3">
              OPEC+ artık piyasayı tek başına yönetemiyor; koordineli kesintiler yerine fiyat koridor yönetimini tercih ediyor. Brent&apos;in seksen dolar altına inmesine izin vermemek ile yüzde yüzün üzerine çıkıp talebi yok etmemek arasındaki dar bant, bugünkü örgütün fiili hedefidir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0C447C] mb-3">Sonuç</h2>
            <p>
              OPEC+ dünya enerji piyasasının en güçlü kurumsal aktörü olmayı sürdürüyor. Kararları pompa fiyatlarından enflasyona, cari açıklardan jeopolitik dengelere uzanan geniş bir yelpazeyi etkiliyor. Türkiye gibi net ithalatçı ülkeler için bu örgütü yakından takip etmek, enerji maliyetlerini anlamlandırmanın temel koşuludur.
            </p>
          </section>
        </article>

        <div className="my-8 bg-[#042C53]/5 border border-[#0C447C]/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-[#0C447C] uppercase tracking-wide mb-2">Güncel Veri — Nisan 2026</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
            <span>Brent petrol <strong>~97 $/varil</strong></span>
            <span>OPEC+ üretim tavanı <strong>aktif</strong></span>
            <span>USD/TRY <strong>~44,6</strong></span>
          </div>
        </div>

        <div className="flex gap-2 mb-10">
          <a href="https://twitter.com/intent/tweet?text=OPEC%2B+Nedir%2C+Nas%C4%B1l+%C3%87al%C4%B1%C5%9F%C4%B1r%3F&url=https://petrolistan.com/analizler/opec-plus-nedir-nasil-calisir" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">X&apos;te paylaş</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/analizler/opec-plus-nedir-nasil-calisir" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">LinkedIn&apos;de paylaş</a>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Link href="/analizler" className="text-sm text-[#185FA5] hover:underline">← Tüm analizler</Link>
        </div>
      </main>
    </>
  )
}
