"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { HistoryPoint } from "@/lib/api";

interface Props {
  data: HistoryPoint[];
  isLoading?: boolean;
  title?: string;
}

function formatDate(iso: string) {
  const [, month, day] = iso.split("-");
  return `${day}/${month}`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#042C53] text-white text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="text-white/60 mb-0.5">{label}</p>
      <p className="font-semibold">
        {payload[0].value.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        USD/varil
      </p>
    </div>
  );
}

export default function PriceChart({
  data,
  isLoading = false,
  title = "Brent — Son 30 Gün",
}: Props) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm">
        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="h-48 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm">
      <h2 className="text-[#042C53] font-bold text-sm mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="brentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0C447C" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#0C447C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `$${v}`}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0C447C"
            strokeWidth={2}
            fill="url(#brentGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#BA7517" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
