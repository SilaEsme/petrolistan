export interface PriceData {
  label: string;
  value: number;
  unit: string;
  currency: string;
  change: number;
  changePercent: number;
  source: string;
  updatedAt: string; // ISO 8601
  featured?: boolean;
}

export interface TickerItem {
  label: string;
  value: string;
  change: number;
  unit?: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  source: string;
  readingTime: number;
  featured?: boolean;
  content?: string;
  externalUrl?: string;
}

export interface FuelPrice {
  type: "motorin" | "benzin95" | "benzin98" | "lpg" | "kalorifer";
  label: string;
  price: number;
  currency: "TRY";
  unit: "litre";
  updatedAt: string;
  city?: string;
}

export interface CurrencyRate {
  base: string;
  target: string;
  rate: number;
  change: number;
  changePercent: number;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  updatedAt: string;
  source: string;
  ok: boolean;
  error?: string;
}

export interface BrandPrice {
  brand: string
  gasoline: number
  diesel: number
  lpg: number
  updatedAt: string
  error?: string
}

export interface BrandsResponse {
  data: BrandPrice[]
  cached: boolean
  cachedAt: string
  status: boolean
}
