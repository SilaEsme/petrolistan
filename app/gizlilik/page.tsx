import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası ve Kullanım Şartları | Petrolistan',
  description: 'Petrolistan gizlilik politikası, kullanım şartları, sorumluluk reddi ve telif hakkı bildirimi.',
}

export default function GizlilikPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-medium text-gray-900 mb-8">Gizlilik Politikası ve Kullanım Şartları</h1>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-base font-medium text-gray-800 mb-2">Kişisel Veri (KVKK)</h2>
          <p>
            Petrolistan, ziyaretçilerine ait kişisel veri toplamamakta ve
            işlememektedir. Siteyi kullanmak için kayıt veya hesap oluşturmanız
            gerekmez. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
            kapsamında herhangi bir kişisel veri işleme faaliyeti yürütülmemektedir.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 mb-2">Çerezler ve Reklamlar</h2>
          <p>
            Bu site, reklam göstermek amacıyla <strong>Google AdSense</strong> kullanmaktadır.
            Google AdSense, ziyaretçilerin ilgi alanlarına göre reklam göstermek için çerez
            (cookie) kullanır. Google&apos;ın çerez politikası hakkında daha fazla bilgi almak için{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#185FA5] hover:underline"
            >
              Google Reklam Gizliliği
            </a>{' '}
            sayfasını inceleyebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 mb-2">Veri Kaynakları</h2>
          <p>
            Sitede sunulan petrol ve enerji fiyat verileri; ABD Enerji Bilgi
            İdaresi (EIA), Türkiye Cumhuriyet Merkez Bankası (TCMB) ve Enerji
            Piyasası Düzenleme Kurumu (EPDK) kamuya açık veri kaynaklarından
            derlenmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 mb-3">Site Kullanım Şartları</h2>
          <p className="mb-3">
            Petrolistan&apos;ı ziyaret etmekle aşağıdaki kullanım şartlarını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
          </p>
          <div className="space-y-3">
            <p>
              <strong className="text-gray-700">1. Hizmetin Kapsamı:</strong> Petrolistan, Türkiye enerji piyasasına yönelik güncel veri, haber ve analiz içerikleri sunan bağımsız bir dijital platformdur. Platform; ham petrol fiyatları, akaryakıt fiyatları, döviz kurları ve enerji analizleri gibi bilgilendirme amaçlı içerikler yayımlar.
            </p>
            <p>
              <strong className="text-gray-700">2. Fikri Mülkiyet:</strong> Petrolistan bünyesinde yayımlanan tüm yazılı içerikler, analizler, görseller ve veri derlemeleri Petrolistan&apos;ın fikri mülkiyeti kapsamındadır. Bu içerikler; kaynak gösterilmeksizin kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz. Medya organları ve araştırmacılar, kaynak belirterek alıntı yapabilir.
            </p>
            <p>
              <strong className="text-gray-700">3. Kullanıcı Yükümlülükleri:</strong> Ziyaretçiler, siteyi yalnızca yasal ve etik amaçlarla kullanmayı kabul eder. Otomatik veri toplama (scraping), servis kesintisine yol açabilecek aşırı istek gönderme veya sistemi manipüle etmeye yönelik girişimler yasaktır.
            </p>
            <p>
              <strong className="text-gray-700">4. Üçüncü Taraf Bağlantılar:</strong> Petrolistan, zaman zaman üçüncü taraf web sitelerine bağlantı verebilir. Bu sitelerin içerikleri ve gizlilik politikaları Petrolistan&apos;ın sorumluluğu dışındadır.
            </p>
            <p>
              <strong className="text-gray-700">5. Değişiklik Hakkı:</strong> Petrolistan, kullanım şartlarını ve gizlilik politikasını önceden bildirim yapmaksızın güncelleme hakkını saklı tutar. Güncel şartlar her zaman bu sayfada yayımlanır.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 mb-3">Sorumluluk Reddi</h2>
          <div className="space-y-3">
            <p>
              <strong className="text-gray-700">Yatırım Tavsiyesi Değildir:</strong> Petrolistan&apos;da yer alan tüm fiyat verileri, analizler ve haberler yalnızca bilgilendirme amaçlıdır. Hiçbir içerik, yatırım danışmanlığı, finansal öneri veya alım-satım tavsiyesi niteliği taşımaz. Herhangi bir finansal karar almadan önce yetkili bir finansal danışmana başvurmanız tavsiye edilir.
            </p>
            <p>
              <strong className="text-gray-700">Veri Doğruluğu:</strong> Petrolistan, sunduğu verilerin doğruluğu ve güncelliği için azami özeni göstermektedir. Bununla birlikte ham petrol fiyatları, döviz kurları ve akaryakıt pompa fiyatları anlık piyasa koşullarına bağlı olarak değişkenlik gösterir. Sitedeki verilerle gerçek piyasa fiyatları arasında zaman gecikmesinden kaynaklanan farklılıklar oluşabilir.
            </p>
            <p>
              <strong className="text-gray-700">Kesinti ve Erişim:</strong> Petrolistan, platformun kesintisiz ve hatasız çalışacağını garanti etmez. Planlı veya plansız bakım çalışmaları, teknik arızalar ya da üçüncü taraf API kesintileri nedeniyle hizmet geçici olarak kullanılamaz hale gelebilir.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 mb-2">Telif Hakkı Bildirimi</h2>
          <p>
            &copy; 2026 Petrolistan. Tüm hakları saklıdır. Petrolistan bünyesinde üretilen özgün içerikler Türk Ticaret Kanunu ve Fikir ve Sanat Eserleri Kanunu kapsamında korunmaktadır. EIA, TCMB ve EPDK gibi resmi kaynaklardan derlenen veriler ilgili kurumların kullanım koşulları çerçevesinde kullanılmaktadır.
          </p>
          <p className="mt-3">
            İçerik kullanım talepleri ve telif hakkı sorguları için{' '}
            <a href="mailto:info@petrolistan.com" className="text-[#185FA5] hover:underline">
              info@petrolistan.com
            </a>{' '}
            adresine ulaşabilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 mb-2">İletişim</h2>
          <p>
            Gizlilik politikasına ya da kullanım şartlarına ilişkin sorularınız için{' '}
            <a href="mailto:info@petrolistan.com" className="text-[#185FA5] hover:underline">
              info@petrolistan.com
            </a>{' '}
            adresine ulaşabilirsiniz.
          </p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <a href="/" className="text-sm text-[#185FA5] hover:underline">
          ← Ana sayfaya dön
        </a>
      </div>
    </main>
  )
}
