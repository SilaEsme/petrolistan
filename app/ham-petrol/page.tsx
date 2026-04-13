import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ham Petrol Fiyatları | Petrolistan',
  description: 'Brent ve WTI ham petrol fiyatları, Türkiye\'nin petrol ithalatı ve ham petrol piyasaları hakkında bilgi.',
}

export default function HamPetrolPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">Ham Petrol Fiyatları</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Küresel ham petrol piyasaları ve Türkiye&apos;nin enerji dengesi hakkında temel bilgiler.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Brent ve WTI Nedir?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            <strong>Brent ham petrolü</strong>, Kuzey Denizi&apos;nden çıkarılan ve dünya petrol fiyatlarına temel referans oluşturan bir petrol çeşididir.
            Avrupa, Afrika ve Orta Doğu kaynaklı petrollerin büyük bölümü Brent fiyatı üzerinden alınıp satılır.
            Küresel petrol ticaretinin yaklaşık yüzde altmışı Brent bazlıdır.
          </p>
          <p>
            <strong>WTI (West Texas Intermediate)</strong> ise ABD kaynaklı hafif ve düşük kükürtlü bir ham petroldür.
            Amerikan petrol piyasasının referans fiyatı olarak kullanılır ve genellikle Brent&apos;e yakın seyreder; ancak
            küresel arz-talep dengeleri ve nakliye maliyetlerine bağlı olarak aralarında fark oluşabilir.
          </p>
          <p>
            Türkiye, ithal ettiği ham petrolü ağırlıklı olarak <strong>Brent bazlı</strong> fiyatlar üzerinden işlem görmektedir.
            Bu nedenle uluslararası Brent fiyatlarındaki dalgalanmalar, akaryakıt fiyatlarını doğrudan etkiler.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Türkiye&apos;de Ham Petrol</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Türkiye, günlük yaklaşık <strong>700–800 bin varil</strong> ham petrol tüketmektedir; bu miktarın büyük bölümü ithalatla karşılanır.
            Yurt içi üretim oldukça sınırlı kalmakta olup ülke, enerjide dışa bağımlılığını azaltmak için yenilenebilir enerji
            yatırımlarını hızlandırmaktadır.
          </p>
          <p>
            Türkiye&apos;nin en büyük ham petrol tedarikçileri <strong>Rusya</strong> ve <strong>Irak</strong>&apos;tır.
            Bunların yanı sıra Azerbaycan, İran ve Suudi Arabistan&apos;dan da ithalat yapılmaktadır.
            Ceyhan Limanı üzerinden gelen Irak Kürdistan bölgesi petrolleri ve Bakü-Tiflis-Ceyhan boru hattı,
            Türkiye&apos;nin ham petrol lojistiğinde kritik rol oynamaktadır.
          </p>
          <p>
            Ham petrol fiyatları; döviz kuru, OPEC+ üretim kararları ve küresel talep koşullarıyla birlikte
            Türkiye&apos;deki akaryakıt fiyatlarının temel belirleyicileri arasındadır.
          </p>
        </div>
      </section>

      <div className="bg-dark/5 border border-brand/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-dark">Canlı fiyatları takip edin</p>
          <p className="text-xs text-gray-500 mt-0.5">Brent, WTI ve doğalgaz fiyatlarını anlık izleyin.</p>
        </div>
        <Link
          href="/"
          className="shrink-0 bg-brand text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-dark transition-colors"
        >
          Ana sayfaya git →
        </Link>
      </div>
    </main>
  )
}
