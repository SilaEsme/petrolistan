import Link from 'next/link'

const FEATURED = [
  { slug: 'turkiye-benzin-neden-pahali', title: 'Türkiye\'de Benzin Neden Bu Kadar Pahalı?' },
  { slug: 'benzin-fiyati-nasil-hesaplanir', title: 'Benzin Fiyatı Nasıl Hesaplanır?' },
  { slug: 'dolar-kuru-akaryakit-fiyat-etkisi', title: 'Dolar Kuru Akaryakıt Fiyatını Nasıl Etkiler?' },
  { slug: 'opec-plus-nedir-nasil-calisir', title: 'OPEC+ Nedir, Nasıl Çalışır?' },
]

export default function EditorialSection() {
  return (
    <section className="max-w-5xl mx-auto px-3 sm:px-4 pb-10 sm:pb-14">
      <div className="border-t border-gray-200 pt-8">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Petrolistan nedir */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Petrolistan Nedir?</h2>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                Petrolistan, Türkiye&apos;deki akaryakıt, ham petrol ve doğalgaz fiyatlarını takip eden bağımsız bir enerji veri platformudur. OPET, Shell, Petrol Ofisi, Aytemiz, Lukoil ve Moil gibi tüm büyük markaların güncel fiyatlarını 81 ilde karşılaştırmalı olarak sunar.
              </p>
              <p>
                Fiyat verileri EIA, TCMB ve EPDK başta olmak üzere resmi kaynaklardan derlenmekte; ham petrol ve döviz kurları Yahoo Finance üzerinden anlık olarak güncellenmektedir. Editöryal ekibimiz piyasa gelişmelerini bağımsız bir bakış açısıyla analiz etmektedir.
              </p>
              <p>
                Petrolistan herhangi bir akaryakıt şirketinin sponsorluğunu kabul etmez ve fiyat verilerini tarafsız biçimde yayınlar.
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <Link href="/hakkimizda" className="text-xs text-[#185FA5] hover:underline font-medium">
                Hakkımızda →
              </Link>
              <Link href="/akaryakit/karsilastirma" className="text-xs text-[#185FA5] hover:underline font-medium">
                Fiyat Karşılaştır →
              </Link>
            </div>
          </div>

          {/* Öne çıkan analizler */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Öne Çıkan Analizler</h2>
            <ul className="space-y-2">
              {FEATURED.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/analizler/${a.slug}`}
                    className="flex items-start gap-2 text-sm text-gray-700 hover:text-[#0C447C] transition-colors group"
                  >
                    <span className="mt-1 shrink-0 text-[#BA7517]">›</span>
                    <span className="group-hover:underline leading-snug">{a.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="/analizler" className="text-xs text-[#185FA5] hover:underline font-medium">
                Tüm analizler →
              </Link>
            </div>
          </div>

        </div>

        {/* Veri kaynakları şeridi */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Veri kaynakları:</span>
          {['EIA', 'TCMB', 'EPDK', 'Yahoo Finance', 'Shell.com.tr', 'OPET'].map((src) => (
            <span key={src} className="text-[11px] text-gray-500">{src}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
