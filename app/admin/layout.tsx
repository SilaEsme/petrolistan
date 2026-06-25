import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Petrolistan',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#09121E]">
      <header className="bg-[#0C447C] text-white px-6 py-3 flex items-center justify-between shadow">
        <span className="font-semibold text-sm tracking-wide">Petrolistan Admin</span>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            Çıkış
          </button>
        </form>
      </header>
      <nav className="bg-[#0a386a] text-white/80 px-6 py-2 flex gap-5 text-sm">
        <a href="/admin/keys" className="hover:text-white transition-colors">
          API Anahtarları
        </a>
        <a href="/admin/brands" className="hover:text-white transition-colors">
          Markalar
        </a>
        <a href="/admin/stations" className="hover:text-white transition-colors">
          İstasyonlar
        </a>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
