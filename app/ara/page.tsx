import type { Metadata } from 'next'
import AraClient from './AraClient'

export const metadata: Metadata = {
  title: 'Yakınımdaki Benzin İstasyonları | Petrolistan',
  description: 'Konumunuza en yakın akaryakıt istasyonlarını bulun. Benzin, motorin ve LPG fiyatlarına göre sıralayın, Google Maps üzerinden yol tarifi alın.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://petrolistan.com/ara' },
  openGraph: {
    title: 'Yakınımdaki Benzin İstasyonları | Petrolistan',
    description: 'En yakın akaryakıt istasyonlarını bulun ve fiyatlarını karşılaştırın.',
    url: 'https://petrolistan.com/ara',
  },
}

export default function AraPage() {
  return (
    <main>
      <div className="bg-[#0C447C] dark:bg-[#070E1A] text-white px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold">Yakınımdaki İstasyonlar</h1>
          <p className="text-white/65 text-sm mt-1">
            Konumunuza en yakın akaryakıt istasyonları
          </p>
        </div>
      </div>
      <AraClient />
    </main>
  )
}
