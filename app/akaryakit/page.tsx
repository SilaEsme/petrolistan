import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Akaryakıt Fiyatları | Petrolistan',
  description: 'Türkiye\'de akaryakıt fiyatları nasıl belirlenir? EPDK, ÖTV, KDV ve döviz kurunun etkisi hakkında bilgi.',
}

export default function AkaryakitPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">Akaryakıt Fiyatları</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Türkiye&apos;de akaryakıt fiyatlarının nasıl belirlendiği ve etkileyen faktörler hakkında temel bilgiler.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-brand mb-3">Türkiye&apos;de Akaryakıt Fiyatları Nasıl Belirlenir?</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Türkiye&apos;de akaryakıt fiyatları, <strong>EPDK (Enerji Piyasası Düzenleme Kurumu)</strong> tarafından
            belirlenen düzenlemeler çerçevesinde şekillenmektedir. EPDK, yurt içi akaryakıt fiyatlarını haftalık olarak
            günceller; bayiler bu tavan fiyatların altında serbestçe fiyat belirleyebilir.
          </p>
          <p>
            Akaryakıt fiyatlarını belirleyen üç temel etken şunlardır:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Ham petrol fiyatı:</strong> Uluslararası Brent fiyatlarındaki artış veya düşüş, doğrudan pompaya yansır.</li>
            <li><strong>Döviz kuru:</strong> Ham petrol dolar cinsinden işlem gördüğünden TL/USD paritesi belirleyici rol oynar.</li>
            <li><strong>Vergiler:</strong> ÖTV ve KDV, akaryakıt perakende fiyatlarının önemli bir bölümünü oluşturur.</li>
          </ul>
          <p>
            <strong>ÖTV (Özel Tüketim Vergisi)</strong> ve <strong>KDV (Katma Değer Vergisi)</strong>, Türkiye&apos;deki
            akaryakıt maliyetinin yarısından fazlasını oluşturmaktadır. Bu nedenle ham petrol fiyatları düşse dahi
            vergi yükü sabit kaldığından tüketicilerin hissettiği indirim sınırlı kalabilmektedir.
          </p>
        </div>
      </section>

      <div className="bg-dark/5 border border-brand/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-dark">İl bazlı akaryakıt fiyatlarını karşılaştırın</p>
          <p className="text-xs text-gray-500 mt-0.5">Şehirler arasındaki fiyat farklarını inceleyin.</p>
        </div>
        <Link
          href="/akaryakit/karsilastirma"
          className="shrink-0 bg-brand text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-dark transition-colors"
        >
          Karşılaştırma →
        </Link>
      </div>
    </main>
  )
}
