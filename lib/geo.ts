// Approximate geographic centers of all 81 Turkish provinces.
// Used for nearest-province detection from GPS coordinates.
const PROVINCE_CENTERS: { code: string; lat: number; lng: number }[] = [
  { code: '01', lat: 37.00, lng: 35.32 }, // Adana
  { code: '02', lat: 37.76, lng: 38.28 }, // Adıyaman
  { code: '03', lat: 38.76, lng: 30.54 }, // Afyonkarahisar
  { code: '04', lat: 39.72, lng: 43.05 }, // Ağrı
  { code: '05', lat: 40.65, lng: 35.83 }, // Amasya
  { code: '06', lat: 39.92, lng: 32.85 }, // Ankara
  { code: '07', lat: 36.90, lng: 30.69 }, // Antalya
  { code: '08', lat: 41.18, lng: 41.82 }, // Artvin
  { code: '09', lat: 37.85, lng: 28.03 }, // Aydın
  { code: '10', lat: 39.64, lng: 27.88 }, // Balıkesir
  { code: '11', lat: 40.14, lng: 29.98 }, // Bilecik
  { code: '12', lat: 38.88, lng: 40.50 }, // Bingöl
  { code: '13', lat: 38.40, lng: 42.11 }, // Bitlis
  { code: '14', lat: 40.74, lng: 31.61 }, // Bolu
  { code: '15', lat: 37.72, lng: 30.29 }, // Burdur
  { code: '16', lat: 40.20, lng: 29.07 }, // Bursa
  { code: '17', lat: 40.15, lng: 26.41 }, // Çanakkale
  { code: '18', lat: 40.60, lng: 33.62 }, // Çankırı
  { code: '19', lat: 40.55, lng: 34.96 }, // Çorum
  { code: '20', lat: 37.77, lng: 29.09 }, // Denizli
  { code: '21', lat: 37.91, lng: 40.22 }, // Diyarbakır
  { code: '22', lat: 41.67, lng: 26.56 }, // Edirne
  { code: '23', lat: 38.67, lng: 39.22 }, // Elazığ
  { code: '24', lat: 39.75, lng: 39.50 }, // Erzincan
  { code: '25', lat: 39.90, lng: 41.27 }, // Erzurum
  { code: '26', lat: 39.77, lng: 30.52 }, // Eskişehir
  { code: '27', lat: 37.06, lng: 37.38 }, // Gaziantep
  { code: '28', lat: 40.91, lng: 38.39 }, // Giresun
  { code: '29', lat: 40.46, lng: 39.48 }, // Gümüşhane
  { code: '30', lat: 37.57, lng: 43.74 }, // Hakkari
  { code: '31', lat: 36.40, lng: 36.35 }, // Hatay
  { code: '32', lat: 37.76, lng: 30.55 }, // Isparta
  { code: '33', lat: 36.80, lng: 34.62 }, // Mersin
  { code: '34', lat: 41.01, lng: 28.97 }, // İstanbul
  { code: '35', lat: 38.42, lng: 27.14 }, // İzmir
  { code: '36', lat: 40.60, lng: 43.10 }, // Kars
  { code: '37', lat: 41.37, lng: 33.78 }, // Kastamonu
  { code: '38', lat: 38.73, lng: 35.49 }, // Kayseri
  { code: '39', lat: 41.74, lng: 27.23 }, // Kırklareli
  { code: '40', lat: 39.15, lng: 34.16 }, // Kırşehir
  { code: '41', lat: 40.76, lng: 29.92 }, // Kocaeli
  { code: '42', lat: 37.87, lng: 32.49 }, // Konya
  { code: '43', lat: 39.42, lng: 29.98 }, // Kütahya
  { code: '44', lat: 38.35, lng: 38.31 }, // Malatya
  { code: '45', lat: 38.62, lng: 27.43 }, // Manisa
  { code: '46', lat: 37.58, lng: 36.94 }, // Kahramanmaraş
  { code: '47', lat: 37.31, lng: 40.74 }, // Mardin
  { code: '48', lat: 37.21, lng: 28.37 }, // Muğla
  { code: '49', lat: 38.74, lng: 41.51 }, // Muş
  { code: '50', lat: 38.62, lng: 34.72 }, // Nevşehir
  { code: '51', lat: 37.97, lng: 34.68 }, // Niğde
  { code: '52', lat: 40.98, lng: 37.88 }, // Ordu
  { code: '53', lat: 41.02, lng: 40.52 }, // Rize
  { code: '54', lat: 40.69, lng: 30.43 }, // Sakarya
  { code: '55', lat: 41.29, lng: 36.33 }, // Samsun
  { code: '56', lat: 37.93, lng: 41.95 }, // Siirt
  { code: '57', lat: 42.02, lng: 35.15 }, // Sinop
  { code: '58', lat: 39.75, lng: 37.02 }, // Sivas
  { code: '59', lat: 41.06, lng: 27.43 }, // Tekirdağ
  { code: '60', lat: 40.31, lng: 36.56 }, // Tokat
  { code: '61', lat: 41.00, lng: 39.73 }, // Trabzon
  { code: '62', lat: 39.11, lng: 39.55 }, // Tunceli
  { code: '63', lat: 37.16, lng: 38.80 }, // Şanlıurfa
  { code: '64', lat: 38.68, lng: 29.41 }, // Uşak
  { code: '65', lat: 38.50, lng: 43.38 }, // Van
  { code: '66', lat: 39.82, lng: 34.81 }, // Yozgat
  { code: '67', lat: 41.45, lng: 31.80 }, // Zonguldak
  { code: '68', lat: 38.37, lng: 34.03 }, // Aksaray
  { code: '69', lat: 40.26, lng: 40.23 }, // Bayburt
  { code: '70', lat: 37.18, lng: 33.22 }, // Karaman
  { code: '71', lat: 39.85, lng: 33.52 }, // Kırıkkale
  { code: '72', lat: 37.88, lng: 41.13 }, // Batman
  { code: '73', lat: 37.52, lng: 42.46 }, // Şırnak
  { code: '74', lat: 41.63, lng: 32.34 }, // Bartın
  { code: '75', lat: 41.11, lng: 42.70 }, // Ardahan
  { code: '76', lat: 39.92, lng: 44.05 }, // Iğdır
  { code: '77', lat: 40.66, lng: 29.27 }, // Yalova
  { code: '78', lat: 41.21, lng: 32.63 }, // Karabük
  { code: '79', lat: 36.71, lng: 37.12 }, // Kilis
  { code: '80', lat: 37.07, lng: 36.25 }, // Osmaniye
  { code: '81', lat: 40.84, lng: 31.16 }, // Düzce
]

export function getProvinceCenter(code: string): { lat: number; lng: number } {
  return PROVINCE_CENTERS.find(p => p.code === code) ?? PROVINCE_CENTERS[33] // fallback İstanbul
}

export function findProvinceCode(lat: number, lng: number): string {
  let best = PROVINCE_CENTERS[33] // default İstanbul
  let minDist = Infinity

  for (const p of PROVINCE_CENTERS) {
    const d = (lat - p.lat) ** 2 + (lng - p.lng) ** 2
    if (d < minDist) {
      minDist = d
      best = p
    }
  }
  return best.code
}
