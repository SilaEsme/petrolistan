import { ArrowUp, ArrowDown, Minus } from "@/components/icons";
import type { PriceData } from "@/types";

type Props = PriceData;

function ChangeIndicator({
  change,
  changePercent,
}: {
  change: number;
  changePercent: number;
}) {
  if (change > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-[#3B6D11] font-semibold text-sm">
        <ArrowUp className="w-3.5 h-3.5" />
        <span>
          +{change.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className="text-[#3B6D11]/70 font-normal text-xs">
          ({changePercent > 0 ? "+" : ""}
          {changePercent.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)
        </span>
      </span>
    );
  }

  if (change < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-[#A32D2D] font-semibold text-sm">
        <ArrowDown className="w-3.5 h-3.5" />
        <span>
          {change.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className="text-[#A32D2D]/70 font-normal text-xs">
          ({changePercent.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-gray-400 font-medium text-sm">
      <Minus className="w-3.5 h-3.5" />
      <span>Değişmedi</span>
    </span>
  );
}

export default function PriceCard({
  label,
  value,
  unit,
  currency,
  change,
  changePercent,
  source,
  updatedAt,
  featured = false,
}: Omit<Props, 'updatedAt'> & { updatedAt?: string }) {
  const borderClass = featured
    ? "border-[#378ADD] border-2"
    : "border-gray-200/80 border";

  const formattedValue = value.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const time = updatedAt
    ? new Date(updatedAt).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-sm ${borderClass} flex flex-col gap-3 relative overflow-hidden`}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-[#378ADD] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
          ÖNE ÇIKAN
        </div>
      )}

      {/* Label + Source */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-[#042C53] font-semibold text-sm leading-tight">
          {label}
        </span>
        <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wide shrink-0">
          {source}
        </span>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-[#042C53] tabular-nums">
          {formattedValue}
        </span>
        <span className="text-gray-500 text-sm font-medium">
          {currency}/{unit}
        </span>

      </div>

      {/* Change */}
      <ChangeIndicator change={change} changePercent={changePercent} />

      {/* Footer */}
      {time && (
        <div className="text-gray-400 text-[10px] mt-auto pt-1 border-t border-gray-100">
          Güncellendi: {time}
        </div>
      )}
    </div>
  );
}
