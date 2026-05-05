"use client";

import { useFuelBrands, usePrices } from "@/lib/api";
import type { PriceData } from "@/types";

export type TickerItem = {
  label: string;
  value: string;
  change?: number;
  unit?: string;
};

function avg(vals: number[]) {
  const nonZero = vals.filter((v) => v > 0);
  if (!nonZero.length) return 0;
  return nonZero.reduce((s, v) => s + v, 0) / nonZero.length;
}

function fmt(val: number) {
  return val.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function useTickerItems(): TickerItem[] {
  const { data: pricesData } = usePrices();
  const { data: brandsData } = useFuelBrands("34");
  const brands = brandsData?.data ?? [];

  const gasoline = avg(brands.map((b) => b.gasoline));
  const diesel   = avg(brands.map((b) => b.diesel));
  const lpg      = avg(brands.map((b) => b.lpg));

  const crudItems: TickerItem[] = [];
  const brent = pricesData?.data?.find((d: PriceData) => d.label?.includes("Brent ham"));
  const wti   = pricesData?.data?.find((d: PriceData) => d.label?.includes("WTI"));
  const ng    = pricesData?.data?.find((d: PriceData) => d.label?.includes("Doğalgaz"));
  if ((brent?.value ?? 0) > 0)
    crudItems.push({ label: "Brent", value: brent!.value.toFixed(2), change: brent!.changePercent ?? 0, unit: "$" });
  if ((wti?.value ?? 0) > 0)
    crudItems.push({ label: "WTI", value: wti!.value.toFixed(2), change: wti!.changePercent ?? 0, unit: "$" });
  if ((ng?.value ?? 0) > 0)
    crudItems.push({ label: "Doğalgaz", value: ng!.value.toFixed(2), change: ng!.changePercent ?? 0, unit: "$" });

  const fxItems: TickerItem[] = [];
  if ((pricesData?.usdtry ?? 0) > 0)
    fxItems.push({ label: "USD/TRY", value: pricesData!.usdtry!.toFixed(4), change: pricesData?.usdtryChangePercent ?? 0 });
  if ((pricesData?.eurtry ?? 0) > 0)
    fxItems.push({ label: "EUR/TRY", value: pricesData!.eurtry!.toFixed(4), change: pricesData?.eurtryChangePercent ?? 0 });

  const fuelItems: TickerItem[] = [];
  if (diesel   > 0) fuelItems.push({ label: "Motorin",   value: fmt(diesel),   unit: "₺/L" });
  if (gasoline > 0) fuelItems.push({ label: "Benzin 95", value: fmt(gasoline), unit: "₺/L" });
  if (lpg      > 0) fuelItems.push({ label: "LPG",       value: fmt(lpg),      unit: "₺/L" });

  return [...crudItems, ...fxItems, ...fuelItems];
}

function TickerEntry({ item }: { item: TickerItem }) {
  const hasChange = item.change !== undefined;
  const isUp   = hasChange && item.change! > 0;
  const isDown = hasChange && item.change! < 0;
  const arrow  = isUp ? "▲" : isDown ? "▼" : "—";

  const chipClass = isUp
    ? "text-[#84CC16] bg-[#84CC16]/10"
    : isDown
      ? "text-[#FB7185] bg-[#FB7185]/10"
      : "text-white/50 bg-white/5";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      (e.currentTarget as HTMLSpanElement).click();
    }
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${item.label} ${item.value}${item.unit ? ` ${item.unit}` : ""}`}
      className="inline-flex flex-col justify-center px-4 border-r border-white/[0.07] h-full cursor-pointer hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-colors shrink-0"
    >
      <span className="text-[10px] font-semibold text-white/55 uppercase tracking-[0.06em] leading-none mb-1.5">
        {item.label}
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="text-white font-semibold text-[14px] tabular-nums leading-none whitespace-nowrap">
          {item.value}
          {item.unit && (
            <span className="text-white/40 font-normal text-[11px] ml-0.5">{item.unit}</span>
          )}
        </span>
        {hasChange && (
          <span className={`text-[11px] font-semibold tabular-nums px-1.5 py-[2px] rounded leading-none ${chipClass}`}>
            {item.change !== 0 ? `${arrow} ${Math.abs(item.change!).toFixed(2)}%` : "—"}
          </span>
        )}
      </span>
    </span>
  );
}

export default function Ticker({ items }: { items?: TickerItem[] }) {
  const tickerItems = useTickerItems();
  const resolved = items ?? tickerItems;
  const doubled  = [...resolved, ...resolved];

  return (
    <div className="w-full bg-[#042C53] border-b border-white/10 overflow-hidden h-14 flex items-stretch shadow-[0_4px_12px_rgba(4,44,83,0.18)]">
      {/* CANLI indicator */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 bg-white/[0.04] border-r border-white/[0.08]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84CC16] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84CC16]" />
        </span>
        <span className="text-white text-[11px] font-bold uppercase tracking-[0.08em] whitespace-nowrap">
          CANLI
        </span>
      </div>
      {/* Scrolling stream */}
      <div className="flex-1 overflow-hidden">
        <div className="flex animate-ticker h-full">
          {doubled.map((item, i) => (
            <TickerEntry key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
