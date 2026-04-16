import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
      <div className="text-center max-w-md px-4">
        <div className="text-6xl font-bold text-[#0C447C] mb-4">404</div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Sayfa Bulunamadı
        </h1>
        <p className="text-gray-600 mb-6">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link href="/" className="bg-[#0C447C] text-white px-6 py-3 rounded-lg hover:bg-[#0a3a6b] transition-colors">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
}
