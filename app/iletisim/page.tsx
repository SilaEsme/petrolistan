export default function IletisimPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-medium text-gray-900 mb-8">İletişim</h1>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-base font-medium text-gray-800 mb-2">Genel</h2>
          <p>
            Her türlü soru, öneri ve geri bildirim için:
          </p>
          <a
            href="mailto:info@petrolistan.com"
            className="mt-1 inline-block text-[#185FA5] hover:underline"
          >
            info@petrolistan.com
          </a>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-800 mb-2">Reklam & İş Birliği</h2>
          <p>
            Sponsorluk, reklam ve iş birliği teklifleri için:
          </p>
          <a
            href="mailto:reklam@petrolistan.com"
            className="mt-1 inline-block text-[#185FA5] hover:underline"
          >
            reklam@petrolistan.com
          </a>
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
