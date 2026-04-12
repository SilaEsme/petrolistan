"use client";

import useSWR from "swr";
import type { ApiResponse, NewsItem, PriceData, BrandPrice, BrandsResponse } from "@/types";

export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`API hatası: ${res.status}`);
    return res.json();
  });

interface PricesResponse extends ApiResponse<PriceData[]> {
  usdtry?: number;
  eurtry?: number;
}

export interface HistoryPoint {
  date: string;
  value: number;
}

export function usePrices() {
  const { data, error, isLoading } = useSWR<PricesResponse>(
    "/api/prices",
    fetcher,
    { refreshInterval: 300_000 }
  );
  return {
    data,
    prices: data?.data ?? [],
    updatedAt: data?.updatedAt as string | undefined,
    usdtry: data?.usdtry,
    eurtry: data?.eurtry,
    isLoading,
    isError: !!error,
  };
}

export function usePriceHistory() {
  const { data, isLoading } = useSWR<{ data: HistoryPoint[] }>(
    "/api/prices/history",
    fetcher,
    { refreshInterval: 3_600_000 }
  );
  return {
    history: data?.data ?? [],
    isLoading,
  };
}

export function useNews() {
  const { data, isLoading } = useSWR<{ data: NewsItem[] }>(
    '/api/news/rss',
    fetcher,
    { refreshInterval: 3_600_000 }
  )
  return {
    news: data?.data ?? [],
    isLoading,
  }
}

export type { BrandPrice, BrandsResponse }

export function useFuelBrands(province = '34', fallbackData?: BrandsResponse) {
  const { data, isLoading, error } = useSWR<BrandsResponse>(
    `/api/fuel/brands?province=${province}`,
    fetcher,
    { refreshInterval: 3_600_000, fallbackData }
  )
  return {
    data,
    isLoading,
    isError: !!error,
  }
}
