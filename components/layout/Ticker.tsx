"use client";

export type TickerItem = {
  label: string;
  value: string;
  change: number; // positive = up, negative = down
  unit?: string;
};

const PLACEHOLDER_ITEMS: TickerItem[] = [
  { label: "Brent", value: "87.42", change: 0.54, unit: "$/varil" },
  { label: "WTI", value: "83.15", change: -0.31, unit: "$/varil" },
  { label: "USD/TRY", value: "32.87", change: 0.12 },
  { label: "EUR/TRY", value: "35.64", change: -0.08 },
  { label: "Motorin", value: "43.85", change: 0.0, unit: "₺/L" },
  { label: "Benzin 95", value: "45.20", change: 0.0, unit: "₺/L" },
  { label: "LPG", value: "18.63", change: 0.0, unit: "₺/L" },
  { label: "Doğalgaz", value: "12.45", change: -1.2, unit: "$/MMBtu" },
];

function TickerEntry({ item }: { item: TickerItem }) {
  const isUp = item.change > 0;
  const isDown = item.change < 0;
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
      <span className={`text-xs font-medium ${changeColor}`}>
        {arrow}
        {item.change !== 0 && (
          <span className="ml-0.5">
            {Math.abs(item.change).toFixed(2)}%
          </span>
        )}
      </span>
    </span>
  );
}

export default function Ticker({ items = PLACEHOLDER_ITEMS }: { items?: TickerItem[] }) {
  const doubled = [...items, ...items];

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
