import { useCallback, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import Modal from "../components/common/Modal";
import { getRiskAnalysis, getRiskExplanation } from "../services/riskService";

function riskLevel(score) {
  if (score >= 65) return { label: "HIGH", color: "#dc2626" };
  if (score >= 40) return { label: "MEDIUM", color: "#d97706" };
  return { label: "LOW", color: "#16a34a" };
}

const HEAT_COLORS = ["#dcfce7", "#bbf7d0", "#fef3c7", "#fde68a", "#fecaca", "#fca5a5"];

export default function Risk() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [explanationFor, setExplanationFor] = useState(null);
  const [explanation, setExplanation] = useState(null);

  const load = useCallback(() => {
    setError(false);
    setData(null);
    getRiskAnalysis().then(setData).catch(() => setError(true));
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!explanationFor) { setExplanation(null); return; }
    getRiskExplanation(explanationFor).then(setExplanation);
  }, [explanationFor]);

  if (error) return <PageContainer title="Risk Analysis"><ErrorState onRetry={load} /></PageContainer>;
  if (!data) return <PageContainer title="Risk Analysis"><Loading /></PageContainer>;

  const level = riskLevel(data.overallRiskScore);

  return (
    <PageContainer title="Risk Analysis">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1 flex flex-col items-center justify-center text-center py-8">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Overall Risk Score</p>
          <div className="relative w-36 h-36 my-4">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="12" />
              <circle
                cx="60" cy="60" r="52" fill="none" stroke={level.color} strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${(data.overallRiskScore / 100) * 327} 327`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-800">{data.overallRiskScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${level.color}1A`, color: level.color }}>
            {level.label} RISK
          </span>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Risk Factor Breakdown</h3>
          <div className="space-y-3">
            {data.riskBreakdown.map((f) => (
              <div key={f.category} className="flex items-center gap-3">
                <span className="text-sm text-slate-600 w-48 shrink-0">{f.category}</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${f.score}%`, background: riskLevel(f.score).color }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-500 w-8 text-right">{f.score}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padded={false}>
        <h3 className="font-semibold text-slate-800 text-sm p-4 pb-2">Risk Heatmap</h3>
        <div className="overflow-x-auto p-4 pt-0">
          <table className="text-sm border-separate border-spacing-1">
            <thead>
              <tr className="text-slate-400 text-xs">
                <th className="text-left font-medium pr-3">Supplier</th>
                {["Reliability", "Delay", "Inventory", "Defect", "Network"].map((h) => (
                  <th key={h} className="font-medium px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.heatmapData.map((row) => (
                <tr key={row.supplier}>
                  <td className="pr-3 font-medium text-slate-600">{row.supplier}</td>
                  {["reliability", "delay", "inventory", "defect", "network"].map((k) => (
                    <td key={k} className="px-1">
                      <div className="w-14 h-9 rounded-md flex items-center justify-center text-xs font-semibold text-slate-700" style={{ background: HEAT_COLORS[row[k]] }}>
                        {row[k]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card padded={false}>
        <h3 className="font-semibold text-slate-800 text-sm p-4 pb-2">High-Risk Suppliers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-100 text-left">
                <th className="pl-4 pb-2 font-medium">Supplier</th>
                <th className="pb-2 font-medium">Risk Score</th>
                <th className="pb-2 font-medium">Main Risk</th>
                <th className="pb-2 font-medium">Disruption Probability</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 pr-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {data.highRiskSuppliers.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                  <td className="pl-4 py-3 font-medium text-slate-700">{s.name} <span className="text-xs text-slate-400">({s.id})</span></td>
                  <td className="py-3 text-slate-500">{s.riskScore}</td>
                  <td className="py-3 text-slate-500">{s.mainRisk}</td>
                  <td className="py-3 text-slate-500">{s.disruptionProbability}</td>
                  <td className="py-3"><Badge label={s.status} /></td>
                  <td className="py-3 pr-4">
                    <button onClick={() => setExplanationFor(s.id)} className="text-accent-600 text-xs font-medium hover:underline">
                      Why high risk?
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={!!explanationFor} onClose={() => setExplanationFor(null)} title="Why is this supplier high risk?">
        {!explanation ? <Loading /> : (
          <div className="space-y-4">
            <div className="flex gap-3 p-3.5 rounded-lg bg-risk-high-bg border-l-[3px] border-risk-high">
              <AlertTriangle size={17} className="text-risk-high shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{explanation.summary}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Contributing factors</h4>
              <ul className="space-y-1.5">
                {explanation.factors.map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-slate-300">—</span>{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Recommended actions</h4>
              <ul className="space-y-1.5">
                {explanation.recommendations.map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-accent-500">✓</span>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
}
