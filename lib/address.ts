/**
 * Türkçe-duyarlı adres normalize util'leri.
 * /ara sayfasındaki 3 gösterim yüzeyinde (StationCard, StationMap popup, AraClient dropdown)
 * ortak olarak kullanılır. OSM verisinden gelen combining-mark hatalar, tek-case yazım
 * sorunları ve slash'lı şehir değerlerini temizler.
 */

/**
 * NFC normalize + stray combining mark'ları sil + boşluk collapse.
 * Örnek: 'Kocaeli̇ Yolu' (i+U+0307) → 'Kocaeli Yolu'
 */
export function normalizeText(s?: string): string {
  return (s ?? '').normalize('NFC').replace(/\p{Mn}/gu, '').replace(/\s+/g, ' ').trim()
}

/** Tek kelimeyi Türkçe locale ile title-case'e çevirir. */
function titleWordTr(w: string): string {
  if (!w) return w
  return w.charAt(0).toLocaleUpperCase('tr') + w.slice(1).toLocaleLowerCase('tr')
}

/**
 * Normalize sonrası yalnızca STRİNG'İN TAMAMI tek-case ise title-case uygula.
 * Karışık-case'e (hem büyük hem küçük harf) dokunma.
 * → "KOCAELİ YOLU" → "Kocaeli Yolu"  ✓
 * → "çırpıcı"       → "Çırpıcı"       ✓
 * → "TEM Otoyolu"   → "TEM Otoyolu"   ✓ (karışık, bozulmaz)
 * → "İmrahor Caddesi No:86" → aynen    ✓
 */
export function smartTitle(s?: string): string {
  const t = normalizeText(s)
  const hasLower = /\p{Ll}/u.test(t)
  const hasUpper = /\p{Lu}/u.test(t)
  // karışık-case veya hiç harf yok → aynen döndür
  if ((hasLower && hasUpper) || (!hasLower && !hasUpper)) return t
  return t.split(' ').map(titleWordTr).join(' ')
}

/**
 * Şehir/ilçe değerini temizler:
 * - Slash öncesini al: "Çankaya/Ankara" → "Çankaya"
 * - Ardından smartTitle normalize
 */
export function cleanCity(s?: string): string {
  return smartTitle((s ?? '').split('/')[0])
}

/**
 * Adres + şehir birleştirerek net bir lokasyon stringi üretir.
 * - Adres yoksa sadece şehir döndür
 * - Adres zaten şehri içeriyorsa sadece adres döndür (tekrar önle)
 * - Aksi halde "adres, şehir" biçiminde birleştir (netlik: tek-kelime adresleri bağla)
 */
export function formatStationAddress(s: { address?: string; city?: string }): string {
  const addr = smartTitle(s.address)
  const city = cleanCity(s.city)
  if (!addr) return city
  if (city && !addr.toLocaleLowerCase('tr').includes(city.toLocaleLowerCase('tr'))) {
    return `${addr}, ${city}`
  }
  return addr
}
