import Link from 'next/link'

export default function EditorialSection() {
  return (
    <section className="max-w-5xl mx-auto px-3 sm:px-4 pb-10 sm:pb-14">
      <div className="border-t border-gray-200 pt-8">
        <div className="max-w-2xl">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Petrolistan Nedir?</h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              Petrolistan, Türkiye&apos;deki akaryakıt, ham petrol ve doğalgaz fiyatlarını takip eden bağımsız bir enerji veri platformudur. OPET, Shell, Petrol Ofisi, Aytemiz, Lukoil ve Moil gibi tüm büyük markaların güncel fiyatlarını 81 ilde karşılaştırmalı olarak sunar.
            </p>
            <p>
              Fiyat verileri EIA, TCMB ve EPDK başta olmak üzere resmi kaynaklardan derlenmekte; ham petrol ve döviz kurları Yahoo Finance üzerinden anlık olarak güncellenmektedir.
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
