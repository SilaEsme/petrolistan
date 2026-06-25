// Canonical brand registry for /ara station display.
// Backend counterpart: petrolistan-api/main/storage/brands.go — keep display names in sync.

export interface Brand {
  key: string
  name: string
  /** Path under /public/brands/, or undefined if no logo exists (falls back to initials). */
  logo?: string
}

export const BRANDS: Brand[] = [
  { key: 'opet',        name: 'Opet',               logo: '/brands/opet.png' },
  { key: 'shell',       name: 'Shell',              logo: '/brands/shell.png' },
  { key: 'petrolofisi', name: 'Petrol Ofisi',       logo: '/brands/petrolofisi.png' },
  { key: 'aytemiz',     name: 'Aytemiz',            logo: '/brands/aytemiz.png' },
  { key: 'lukoil',      name: 'Lukoil',             logo: '/brands/lukoil.svg' },
  { key: 'total',       name: 'Total',              logo: '/brands/total.svg' },
  { key: 'moil',        name: 'Moil',               logo: '/brands/moil.png' },
  { key: 'alpet',       name: 'Alpet',              logo: '/brands/alpet.png' },
  { key: 'bpet',        name: 'Bpet',               logo: '/brands/bpet.png' },
  { key: 'sunpet',      name: 'Sunpet',             logo: '/brands/sunpet.png' },
  { key: 'kadoil',      name: 'Kadoil',             logo: '/brands/kadoil.png' },
  { key: 'classpetrol', name: 'Class Petrol',       logo: '/brands/classpetrol.svg' },
  { key: 'tp',          name: 'Türkiye Petrolleri', logo: '/brands/tp.svg' },
  { key: 'gopetrol',    name: 'Go Petrol',          logo: '/brands/gopetrol.png' },
  // No logo files on disk for the brands below — BrandLogo falls back to initials.
  { key: 'onur',        name: 'Onur' },
  { key: 'omsan',       name: 'Ömsan' },
  { key: 'ural',        name: 'Ural' },
  { key: 'hdpetrol',    name: 'HD Petrol' },
  { key: 'akpet',       name: 'Akpet' },
  { key: 'bepetrol',    name: 'Be Petrol' },
  { key: 'bp',          name: 'BP' },
]

/** brand_key → display name lookup. */
export const BRAND_KEY_TO_NAME: Record<string, string> = Object.fromEntries(
  BRANDS.map((b) => [b.key, b.name])
)

/** display name → logo path lookup (undefined when no logo). */
export const NAME_TO_LOGO: Record<string, string | undefined> = Object.fromEntries(
  BRANDS.map((b) => [b.name, b.logo])
)
