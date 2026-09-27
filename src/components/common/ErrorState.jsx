import { AlertCircle } from "lucide-react";

export default function ErrorState({ message = "Something went wrong while loading this data.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-12 h-12 rounded-full bg-risk-high-bg flex items-center justify-center mb-4">
        <AlertCircle size={22} className="text-risk-high" />
      </div>
      <h3 className="text-sm font-semibold text-slate-700">Unable to load data</h3>
      <p className="text-sm text-slate-400 mt-1 max-w-sm">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 text-sm font-medium text-accent-600 hover:text-accent-500">
          Retry
        </button>
      )}
    </div>
  );
}
