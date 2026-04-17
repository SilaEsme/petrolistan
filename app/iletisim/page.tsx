import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim | Petrolistan',
  description: 'Petrolistan ile iletişime geçin. Soru, öneri, reklam ve iş birliği teklifleri için formu doldurun.',
}

export default function IletisimPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-medium text-gray-900 mb-2">İletişim</h1>
      <p className="text-sm text-gray-500 mb-10 border-b border-gray-100 pb-6">
        Soru, öneri veya iş birliği teklifleriniz için aşağıdaki formu doldurun.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <form className="space-y-5" action="mailto:info@petrolistan.com" method="post" encType="text/plain">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1.5">
              Ad Soyad
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Adınız Soyadınız"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0C447C]/20 focus:border-[#0C447C]/60 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1.5">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ornek@email.com"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0C447C]/20 focus:border-[#0C447C]/60 transition"
            />
          </div>

          <div>
            <label htmlFor="konu" className="block text-xs font-medium text-gray-600 mb-1.5">
              Konu
            </label>
            <select
              id="konu"
              name="konu"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0C447C]/20 focus:border-[#0C447C]/60 transition"
            >
              <option value="">Konu seçin</option>
              <option value="genel">Genel soru / öneri</option>
              <option value="veri">Veri hatası bildirimi</option>
              <option value="reklam">Reklam & iş birliği</option>
              <option value="basin">Basın & medya</option>
              <option value="diger">Diğer</option>
            </select>
          </div>

          <div>
            <label htmlFor="mesaj" className="block text-xs font-medium text-gray-600 mb-1.5">
              Mesaj
            </label>
            <textarea
              id="mesaj"
              name="mesaj"
              rows={5}
              placeholder="Mesajınızı buraya yazın..."
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0C447C]/20 focus:border-[#0C447C]/60 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0C447C] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0a3a6b] transition-colors"
          >
            Mesaj Gönder
          </button>

          <p className="text-xs text-gray-400 text-center">
            Mesajınıza genellikle 1-2 iş günü içinde yanıt verilir.
          </p>
        </form>

        {/* İletişim bilgileri */}
        <div className="space-y-6 text-sm text-gray-600">
          <div>
            <h2 className="text-base font-medium text-gray-800 mb-3">Doğrudan İletişim</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#0C447C] font-medium shrink-0 mt-0.5">@</span>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Genel sorular</p>
                  <a href="mailto:info@petrolistan.com" className="text-[#185FA5] hover:underline font-medium">
                    info@petrolistan.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0C447C] font-medium shrink-0 mt-0.5">@</span>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Reklam &amp; iş birliği</p>
                  <a href="mailto:reklam@petrolistan.com" className="text-[#185FA5] hover:underline font-medium">
                    reklam@petrolistan.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-2">
            <p className="text-xs font-medium text-gray-700">Veri hatası mı buldunuz?</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sitedeki fiyat veya veri hatalarını bildirmek için lütfen e-posta gönderin. Tüm bildirimler en kısa sürede incelenmektedir.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-2">
            <p className="text-xs font-medium text-gray-700">Basın &amp; Medya</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Petrolistan verilerini veya analizlerini haberlerinizde kullanmak için lütfen iletişime geçin. Kaynak gösterimi şartıyla içeriklerimiz kullanılabilir.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <a href="/" className="text-sm text-[#185FA5] hover:underline">
          ← Ana sayfaya dön
        </a>
      </div>
    </main>
  )
}
