"use client";

import { PriceGrid, PriceChart } from "@/components/prices";
import { usePrices, usePriceHistory } from "@/lib/api";

export default function Home() {
  const { data: prices, isLoading: pricesLoading, error: pricesError } = usePrices();
  const { data: history, isLoading: historyLoading } = usePriceHistory();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
      {pricesError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Fiyat verileri yüklenemedi. Lütfen daha sonra tekrar deneyin.
        </div>
      )}

      <PriceGrid
        items={prices?.data ?? []}
        isLoading={pricesLoading}
        lastUpdated={prices?.updatedAt}
        title="Güncel Piyasa Fiyatları"
      />

      <PriceChart
        data={history?.data ?? []}
        isLoading={historyLoading}
      />
    </div>
  );
}
