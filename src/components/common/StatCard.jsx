import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function StatCard({ label, value, trend, direction }) {
  const trendColor = direction === "up" ? "text-risk-low" : direction === "down" ? "text-risk-high" : "text-slate-400";
  const TrendIcon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="flex items-end justify-between mt-2">
        <span className="text-2xl font-semibold text-slate-900">{value}</span>
        <span className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
          <TrendIcon size={13} />
          {trend}
        </span>
      </div>
    </div>
  );
}
