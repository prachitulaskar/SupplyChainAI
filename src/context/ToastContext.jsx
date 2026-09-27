import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = {
  success: <CheckCircle2 size={18} className="text-risk-low" />,
  warning: <AlertTriangle size={18} className="text-risk-medium" />,
  error: <XCircle size={18} className="text-risk-high" />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((text, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 w-80">
        {toasts.map((t) => (
          <div key={t.id} className="flex items-start gap-2.5 bg-white border border-slate-200 shadow-lg rounded-lg px-4 py-3 text-sm text-slate-700 animate-in">
            {ICONS[t.type]}
            <span className="flex-1">{t.text}</span>
            <button onClick={() => dismiss(t.id)} className="text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
