import icerik1 from '@/content/yazilar/turkiyede-yakit-fiyatlarini-kim-belirler'
import icerik2 from '@/content/yazilar/brent-petrol-fiyati-turkiyeyi-nasil-etkiler'
import icerik3 from '@/content/yazilar/benzin-mi-motorin-mi-yakit-ekonomisi'
import icerik4 from '@/content/yazilar/lpg-elektrikli-arac-karsilastirma'
import icerik5 from '@/content/yazilar/mevsimsel-yakit-trendleri'

export interface Yazi {
  slug: string
  baslik: string
  ozet: string
  tarih: string // ISO 8601
  etiketler: string[]
}

export const YAZILAR: Yazi[] = [
  {
    slug: 'turkiyede-yakit-fiyatlarini-kim-belirler',
    baslik: "Türkiye'de Yakıt Fiyatlarını Kim Belirler? EPDK ve ÖTV Sistemi Rehberi",
    ozet:
      "Pompada ödediğiniz yakıt fiyatının büyük bölümü vergi. EPDK tavan fiyatı, ÖTV, KDV ve maliyet bileşenlerini adım adım açıklıyoruz.",
    tarih: '2026-01-15',
    etiketler: ['EPDK', 'ÖTV', 'Akaryakıt Fiyatı', 'Vergi'],
  },
  {
    slug: 'brent-petrol-fiyati-turkiyeyi-nasil-etkiler',
    baslik: "Brent Petrol Fiyatı Türkiye'yi Nasıl Etkiler? 2026 Analizi",
    ozet:
      "Brent petrol fiyatı düşünce Türkiye'de pompa fiyatları neden hemen düşmüyor? Kur, gecikme süresi ve OPEC+ etkisini analiz ediyoruz.",
    tarih: '2026-02-10',
    etiketler: ['Brent Petrol', 'Ham Petrol', 'USD/TRY', 'OPEC+'],
  },
  {
    slug: 'benzin-mi-motorin-mi-yakit-ekonomisi',
    baslik: "Benzin mi Motorin mi? Türkiye'de Araç Yakıt Ekonomisi Rehberi 2026",
    ozet:
      "Km başına maliyet, araç seçimi ve uzun vadeli yakıt ekonomisi hesabı. Hangi yakıt sizin kullanım profiliniz için daha kazançlı?",
    tarih: '2026-03-05',
    etiketler: ['Benzin', 'Motorin', 'Yakıt Ekonomisi', 'Araç Seçimi'],
  },
  {
    slug: 'lpg-elektrikli-arac-karsilastirma',
    baslik: "LPG mi Elektrikli Araç mı? 2026 Türkiye Maliyet Karşılaştırması",
    ozet:
      "100 km'de kaç lira harcarsınız? LPG dönüşüm maliyeti, elektrikli araç şarj ücreti ve altyapı durumunu karşılaştıran kapsamlı analiz.",
    tarih: '2026-04-01',
    etiketler: ['LPG', 'Elektrikli Araç', 'Yakıt Maliyeti', 'EV'],
  },
  {
    slug: 'mevsimsel-yakit-trendleri',
    baslik: "Mevsimsel Yakıt Trendleri: Türkiye'de Yaz-Kış Akaryakıt Fiyat Değişimleri",
    ozet:
      "Yaz tatil sezonunda benzin, kışın motorin fiyatları neden yükselir? Mevsimsel talep döngülerini ve OPEC+ zamanlamasını açıklıyoruz.",
    tarih: '2026-05-12',
    etiketler: ['Mevsimsel Trend', 'Benzin', 'Motorin', 'Talep'],
  },
]

const ICERIK_MAP: Record<string, string> = {
  'turkiyede-yakit-fiyatlarini-kim-belirler': icerik1,
  'brent-petrol-fiyati-turkiyeyi-nasil-etkiler': icerik2,
  'benzin-mi-motorin-mi-yakit-ekonomisi': icerik3,
  'lpg-elektrikli-arac-karsilastirma': icerik4,
  'mevsimsel-yakit-trendleri': icerik5,
}

export function getYazi(slug: string): Yazi | undefined {
  return YAZILAR.find((y) => y.slug === slug)
}

export function getYaziIcerik(slug: string): string | null {
  return ICERIK_MAP[slug] ?? null
}
