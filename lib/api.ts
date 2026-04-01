"use client";

import useSWR from "swr";
import type { ApiResponse, PriceData } from "@/types";

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export type PricesResponse = ApiResponse<PriceData[]>;

export interface HistoryPoint {
  date: string;
  value: number;
}

export interface HistoryResponse {
  data: HistoryPoint[];
}

export function usePrices() {
  return useSWR<PricesResponse>("/api/prices", fetcher, {
    refreshInterval: 300_000,
  });
}

export function usePriceHistory() {
  return useSWR<HistoryResponse>("/api/prices/history", fetcher);
}
