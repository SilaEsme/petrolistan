"use client";

import { useFuelBrands, usePrices } from "@/lib/api";

export type TickerItem = {
  label: string;
  value: string;
  change?: number; // positive = up, negative = down; omit to hide indicator
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
  const diesel = avg(brands.map((b) => b.diesel));
  const lpg = avg(brands.map((b) => b.lpg));

  const crudItems: TickerItem[] = [];
  const brent = pricesData?.data?.[0]; // featured: true, Brent ham petrol
  const wti = pricesData?.data?.[1];   // WTI ham petrol
  const ng = pricesData?.data?.[3];    // Doğalgaz
  if ((brent?.value ?? 0) > 0)
    crudItems.push({ label: 'Brent', value: brent!.value.toFixed(2), change: brent!.changePercent ?? 0, unit: '$/varil' });
  if ((wti?.value ?? 0) > 0)
    crudItems.push({ label: 'WTI', value: wti!.value.toFixed(2), change: wti!.changePercent ?? 0, unit: '$/varil' });
  if ((ng?.value ?? 0) > 0)
    crudItems.push({ label: 'Doğalgaz', value: ng!.value.toFixed(2), change: ng!.changePercent ?? 0, unit: '$/MMBtu' });

  const fxItems: TickerItem[] = [];
  if ((pricesData?.usdtry ?? 0) > 0)
    fxItems.push({ label: "USD/TRY", value: pricesData!.usdtry!.toFixed(4), change: pricesData?.usdtryChangePercent ?? 0 });
  if ((pricesData?.eurtry ?? 0) > 0)
    fxItems.push({ label: "EUR/TRY", value: pricesData!.eurtry!.toFixed(4), change: pricesData?.eurtryChangePercent ?? 0 });

  const fuelItems: TickerItem[] = [];
  if (diesel > 0)
    fuelItems.push({ label: "Motorin", value: fmt(diesel), unit: "₺/L" });
  if (gasoline > 0)
    fuelItems.push({ label: "Benzin 95", value: fmt(gasoline), unit: "₺/L" });
  if (lpg > 0)
    fuelItems.push({ label: "LPG", value: fmt(lpg), unit: "₺/L" });

  return [...crudItems, ...fxItems, ...fuelItems];
}

function TickerEntry({ item }: { item: TickerItem }) {
  const hasChange = item.change !== undefined;
  const isUp = hasChange && item.change! > 0;
  const isDown = hasChange && item.change! < 0;
  const changeColor = isUp
    ? "text-[#3B6D11]"
    : isDown
      ? "text-[#A32D2D]"
      : "text-white/50";
  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <span className="inline-flex items-center gap-1.5 px-4 border-r border-white/10 whitespace-nowrap">
      <span className="text-white/60 text-xs font-medium">{item.label}</span>
      <span className="text-white font-semibold text-xs">
        {item.value}
        {item.unit && (
          <span className="text-white/50 font-normal ml-0.5">{item.unit}</span>
        )}
      </span>
      {hasChange && (
        <span className={`text-xs font-medium ${changeColor}`}>
          {arrow}
          {item.change !== 0 && (
            <span className="ml-0.5">
              {Math.abs(item.change!).toFixed(2)}%
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export default function Ticker({ items }: { items?: TickerItem[] }) {
  const fuelItems = useTickerItems();
  const resolved = items ?? fuelItems;
  const doubled = [...resolved, ...resolved];

  return (
    <div className="w-full bg-[#042C53] border-b border-white/10 overflow-hidden h-8 flex items-center">
      <div className="flex-shrink-0 bg-[#BA7517] px-3 h-full flex items-center z-10">
        <span className="text-white text-xs font-bold uppercase tracking-wider">
          Canlı
        </span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex animate-ticker">
          {doubled.map((item, i) => (
            <TickerEntry key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
