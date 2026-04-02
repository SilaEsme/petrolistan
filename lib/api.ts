"use client";

import useSWR from "swr";
import type { ApiResponse, NewsItem, PriceData } from "@/types";

export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`API hatası: ${res.status}`);
    return res.json();
  });

interface PricesResponse extends ApiResponse<PriceData[]> {
  usdtry?: number;
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

export interface FuelItem {
  name: string;
  value: number;
  unit: string;
  change: number;
  barPercent: number;
  source: string;
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

export function useFuel() {
  const { data, isLoading } = useSWR<{ data: FuelItem[] }>(
    "/api/fuel",
    fetcher,
    { refreshInterval: 3_600_000 }
  );
  return {
    fuel: data?.data ?? [],
    isLoading,
  };
}
