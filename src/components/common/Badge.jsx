const STYLES = {
  "Low Risk": "bg-risk-low-bg text-risk-low",
  "Medium Risk": "bg-risk-medium-bg text-risk-medium",
  "High Risk": "bg-risk-high-bg text-risk-high",
  "Healthy": "bg-risk-low-bg text-risk-low",
  "Low Stock": "bg-risk-medium-bg text-risk-medium",
  "Critical": "bg-risk-high-bg text-risk-high",
  "Overstock": "bg-accent-100 text-accent-600",
  "Delivered": "bg-risk-low-bg text-risk-low",
  "In Transit": "bg-accent-100 text-accent-600",
  "Delayed": "bg-risk-high-bg text-risk-high",
  "Active": "bg-risk-low-bg text-risk-low",
  "Inactive": "bg-slate-100 text-slate-500",
  "Stored": "bg-risk-low-bg text-risk-low",
  "Failed": "bg-risk-high-bg text-risk-high",
  "Generated": "bg-risk-low-bg text-risk-low",
};

export default function Badge({ label, className = "" }) {
  const style = STYLES[label] || "bg-slate-100 text-slate-600";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${style} ${className}`}>
      {label}
    </span>
  );
}
