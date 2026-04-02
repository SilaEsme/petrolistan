export default function GizlilikPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-medium text-gray-900 mb-8">Gizlilik Politikası</h1>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-base font-medium text-gray-800 mb-2">Kişisel Veri</h2>
          <p>
            Petrolistan, ziyaretçilerine ait kişisel veri toplamamakta ve
            işlememektedir. Siteyi kullanmak için kayıt veya hesap oluşturmanız
            gerekmez.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 mb-2">Çerezler ve Reklamlar</h2>
          <p>
            Sitede Google AdSense reklam hizmeti kullanılmaktadır. Google AdSense,
            ziyaretçilere ilgi alanlarına göre reklam göstermek amacıyla çerez
            (cookie) kullanabilir. Google'ın çerez politikası hakkında daha fazla
            bilgi almak için{' '}
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
          <h2 className="text-base font-medium text-gray-800 mb-2">İletişim</h2>
          <p>
            Gizlilik politikasına ilişkin sorularınız için{' '}
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
