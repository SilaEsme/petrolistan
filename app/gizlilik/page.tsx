import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası ve Kullanım Şartları | Petrolistan',
  description: 'Petrolistan gizlilik politikası, kullanım şartları, sorumluluk reddi ve telif hakkı bildirimi.',
  alternates: { canonical: 'https://petrolistan.com/gizlilik' },
}

export default function GizlilikPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-medium text-gray-900 dark:text-[#E2E8F0] mb-8">Gizlilik Politikası ve Kullanım Şartları</h1>

      <div className="space-y-8 text-sm text-gray-600 dark:text-slate-400 leading-relaxed">

        <section>
          <h2 className="text-base font-medium text-gray-800 dark:text-slate-200 mb-2">Kişisel Veri (KVKK)</h2>
          <p>
            Petrolistan kişisel veri toplamaz. Siteyi kullanmak için kayıt veya hesap oluşturmanız gerekmez. KVKK kapsamında herhangi bir kişisel veri işleme faaliyeti yürütülmemektedir.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 dark:text-slate-200 mb-2">Çerezler ve Reklamlar</h2>
          <p>
            Sitemizde reklam göstermek için <strong>Google AdSense</strong> kullanılmaktadır. AdSense, ilgi alanlarınıza göre reklam sunmak amacıyla çerez kullanır. Daha fazla bilgi için{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#185FA5] dark:text-blue-400 hover:underline"
            >
              Google Reklam Gizliliği
            </a>{' '}
            sayfasını inceleyebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 dark:text-slate-200 mb-2">Veri Kaynakları</h2>
          <p>
            Sitedeki petrol ve enerji fiyat verileri; EIA (ABD Enerji Bilgi İdaresi), TCMB ve EPDK&apos;nın kamuya açık kaynaklarından derlenmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 dark:text-slate-200 mb-3">Kullanım Şartları</h2>
          <div className="space-y-3">
            <p>
              <strong className="text-gray-700 dark:text-slate-300">1. Hizmetin Kapsamı:</strong> Petrolistan, Türkiye enerji piyasasına yönelik güncel veri, haber ve analiz içerikleri sunan bağımsız bir dijital platformdur.
            </p>
            <p>
              <strong className="text-gray-700 dark:text-slate-300">2. Fikri Mülkiyet:</strong> Sitemizde yayımlanan yazılı içerikler, analizler ve veri derlemeleri Petrolistan&apos;a aittir. Kaynak gösterilmeksizin kopyalanamaz veya ticari amaçla kullanılamaz. Medya ve araştırmacılar kaynak belirterek alıntı yapabilir.
            </p>
            <p>
              <strong className="text-gray-700 dark:text-slate-300">3. Kullanıcı Yükümlülükleri:</strong> Siteyi yalnızca yasal ve etik amaçlarla kullanmanızı bekliyoruz. Otomatik veri çekme (scraping) ve hizmeti aksatacak aşırı istek gönderme yasaktır.
            </p>
            <p>
              <strong className="text-gray-700 dark:text-slate-300">4. Üçüncü Taraf Bağlantılar:</strong> Zaman zaman harici sitelere bağlantı verebiliriz. Bu sitelerin içerik ve gizlilik politikalarından sorumlu değiliz.
            </p>
            <p>
              <strong className="text-gray-700 dark:text-slate-300">5. Değişiklik Hakkı:</strong> Kullanım şartlarını ve gizlilik politikasını önceden bildirim yapmaksızın güncelleyebiliriz. Güncel metin her zaman bu sayfada yayımlanır.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 dark:text-slate-200 mb-3">Sorumluluk Reddi</h2>
          <div className="space-y-3">
            <p>
              <strong className="text-gray-700 dark:text-slate-300">Yatırım Tavsiyesi Değildir:</strong> Sitedeki fiyat verileri, analizler ve haberler yalnızca bilgilendirme amaçlıdır. Hiçbir içerik yatırım danışmanlığı veya finansal öneri niteliği taşımaz. Finansal karar almadan önce yetkili bir danışmana başvurunuz.
            </p>
            <p>
              <strong className="text-gray-700 dark:text-slate-300">Veri Doğruluğu:</strong> Sunduğumuz verilerin doğruluğu için azami özeni gösteriyoruz. Ancak ham petrol fiyatları, döviz kurları ve pompa fiyatları anlık olarak değişir; sitedeki verilerle gerçek fiyatlar arasında zaman gecikmesinden kaynaklanan farklılıklar oluşabilir.
            </p>
            <p>
              <strong className="text-gray-700 dark:text-slate-300">Kesinti ve Erişim:</strong> Platformun kesintisiz çalışacağını garanti etmiyoruz. Teknik arızalar veya üçüncü taraf API kesintileri nedeniyle hizmet geçici olarak kullanılamaz hale gelebilir.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 dark:text-slate-200 mb-2">Telif Hakkı</h2>
          <p>
            &copy; 2026 Petrolistan. Tüm hakları saklıdır. EIA, TCMB ve EPDK gibi resmi kaynaklardan derlenen veriler, ilgili kurumların kullanım koşulları çerçevesinde kullanılmaktadır.
          </p>
          <p className="mt-3">
            İçerik kullanım talepleri ve sorularınız için{' '}
            <a href="mailto:info@petrolistan.com" className="text-[#185FA5] dark:text-blue-400 hover:underline">
              info@petrolistan.com
            </a>{' '}
            adresine yazabilirsiniz.
          </p>
        </section>

      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-700">
        <a href="/" className="text-sm text-[#185FA5] dark:text-blue-400 hover:underline">
          ← Ana sayfaya dön
        </a>
      </div>
    </main>
  )
}
