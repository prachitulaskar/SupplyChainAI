import { useEffect, useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/common/Card";
import { systemStatus } from "../../data/notifications";

const STATUS_STYLE = {
  operational: { label: "Operational", icon: "✓", color: "text-risk-low", bg: "bg-risk-low-bg" },
  warning: { label: "Warning", icon: "⚠", color: "text-risk-medium", bg: "bg-risk-medium-bg" },
  offline: { label: "Offline", icon: "✕", color: "text-risk-high", bg: "bg-risk-high-bg" },
};

const EVENTS = [
  { time: "09:41", text: "LangGraph agent pipeline completed batch risk scan (142 suppliers)" },
  { time: "09:12", text: "Llama LLM service response latency elevated (620ms avg.)" },
  { time: "08:55", text: "ChromaDB re-indexed 312 new document embeddings" },
  { time: "08:20", text: "Surya OCR processed 4 documents from Data Upload queue" },
];

export default function SystemMonitoring() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <PageContainer title="System Monitoring">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {systemStatus.map((s) => {
          const style = STATUS_STYLE[s.status];
          return (
            <Card key={s.service} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">{s.service}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.latency} response</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-md ${style.bg} ${style.color}`}>{style.icon} {style.label}</span>
            </Card>
          );
        })}
      </div>

      <Card>
        <h3 className="font-semibold text-slate-800 text-sm mb-1">Recent System Events</h3>
        <p className="text-xs text-slate-400 mb-4">Last refreshed {now.toLocaleTimeString()}</p>
        <div className="space-y-3">
          {EVENTS.map((e, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="text-xs text-slate-400 font-mono w-12 shrink-0 pt-0.5">{e.time}</span>
              <p className="text-slate-600">{e.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
}
