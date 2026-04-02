import PriceCard from "./PriceCard";
import type { PriceData } from "@/types";

interface Props {
  items: PriceData[];
  isLoading?: boolean;
  lastUpdated?: string;
  title?: string;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200/80 flex flex-col gap-3 animate-pulse">
      <div className="flex justify-between">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-10 bg-gray-100 rounded" />
      </div>
      <div className="flex items-baseline gap-2">
        <div className="h-8 w-28 bg-gray-200 rounded" />
        <div className="h-4 w-12 bg-gray-100 rounded" />
      </div>
      <div className="h-4 w-20 bg-gray-100 rounded" />
      <div className="h-3 w-32 bg-gray-100 rounded mt-auto" />
    </div>
  );
}

export default function PriceGrid({
  items,
  isLoading = false,
  lastUpdated,
  title = "Piyasa Fiyatları",
}: Props) {
  return (
    <section className="bg-white rounded-lg p-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#042C53] font-bold text-lg">{title}</h2>
        {lastUpdated && lastUpdated !== 'Invalid Date' && (
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B6D11] inline-block" />
            Güncellendi {lastUpdated}
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : items.map((item) => <PriceCard key={item.label} {...item} />)}
      </div>
    </section>
  );
}
