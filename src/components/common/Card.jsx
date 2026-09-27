export default function Card({ children, className = "", accent, padded = true }) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 ${padded ? "p-5" : ""} ${className}`}
      style={accent ? { borderLeft: `3px solid ${accent}` } : undefined}
    >
      {children}
    </div>
  );
}
