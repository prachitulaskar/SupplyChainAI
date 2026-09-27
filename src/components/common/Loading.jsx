export function Skeleton({ className = "" }) {
  return <div className={`bg-slate-200 rounded animate-pulse-soft ${className}`} />;
}

export default function Loading({ label = "Loading data…" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
      <div className="w-8 h-8 border-2 border-slate-200 border-t-accent-600 rounded-full animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
