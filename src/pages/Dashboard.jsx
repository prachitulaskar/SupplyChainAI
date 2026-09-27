import { useEffect, useState } from "react";
import { AlertTriangle, Info, TrendingUp as TrendIcon } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import StatCard from "../components/common/StatCard";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loading from "../components/common/Loading";
import LineChartCard from "../components/charts/LineChartCard";
import DonutChartCard from "../components/charts/DonutChartCard";
import { kpis, aiInsights, supplierPerformance } from "../data/dashboardData";
import { inventoryTrend } from "../data/inventory";
import { riskDistribution } from "../data/risk";
import { buildForecast } from "../data/forecast";
import { networkNodes } from "../data/network";
import { useAuth } from "../context/AuthContext";

const INSIGHT_STYLE = {
  high: { border: "#dc2626", icon: AlertTriangle, color: "text-risk-high" },
  medium: { border: "#d97706", icon: Info, color: "text-risk-medium" },
  low: { border: "#16a34a", icon: TrendIcon, color: "text-risk-low" },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const forecast = buildForecast(0).slice(6);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const visibleKpis = user?.role === "Analyst" ? kpis.filter((k) => !["Inventory Value"].includes(k.label)) : kpis;

  return (
    <PageContainer title="Supply Chain Overview">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {visibleKpis.map((k) => (
              <StatCard key={k.label} {...k} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800 text-sm">Inventory vs. Demand Trend</h3>
                <span className="text-xs text-slate-400">Last 12 months</span>
              </div>
              <LineChartCard
                data={inventoryTrend}
                lines={[
                  { key: "stock", name: "Stock on hand", color: "#2563eb" },
                  { key: "demand", name: "Demand", color: "#94a3b8", dashed: true },
                ]}
              />
            </Card>

            <Card>
              <h3 className="font-semibold text-slate-800 text-sm mb-3">Risk Distribution</h3>
              <DonutChartCard data={riskDistribution} height={200} />
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800 text-sm">Supplier Performance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400 text-xs border-b border-slate-100">
                      <th className="pb-2 font-medium">Supplier</th>
                      <th className="pb-2 font-medium">Category</th>
                      <th className="pb-2 font-medium">Reliability</th>
                      <th className="pb-2 font-medium">Delay</th>
                      <th className="pb-2 font-medium">Risk</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierPerformance.map((s) => (
                      <tr key={s.supplier} className="border-b border-slate-50 last:border-0">
                        <td className="py-2.5 font-medium text-slate-700">{s.supplier}</td>
                        <td className="py-2.5 text-slate-500">{s.category}</td>
                        <td className="py-2.5 text-slate-500">{s.reliability}%</td>
                        <td className="py-2.5 text-slate-500">{s.delay}d</td>
                        <td className="py-2.5 text-slate-500">{s.riskScore}</td>
                        <td className="py-2.5"><Badge label={s.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-slate-800 text-sm mb-3">Demand Forecast Preview</h3>
              <LineChartCard
                data={forecast}
                xKey="month"
                lines={[
                  { key: "historical", name: "Historical", color: "#2563eb" },
                  { key: "predicted", name: "Predicted", color: "#f59e0b", dashed: true },
                ]}
                height={200}
              />
            </Card>
          </div>

          <Card>
            <h3 className="font-semibold text-slate-800 text-sm mb-4">AI Insights</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {aiInsights.map((insight, i) => {
                const style = INSIGHT_STYLE[insight.level];
                const Icon = style.icon;
                return (
                  <div key={i} className="flex gap-3 p-3.5 rounded-lg bg-slate-50 border-l-[3px]" style={{ borderColor: style.border }}>
                    <Icon size={17} className={`${style.color} shrink-0 mt-0.5`} />
                    <p className="text-sm text-slate-600 leading-snug">{insight.text}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Supply Chain Network Preview</h3>
            <p className="text-xs text-slate-400 mb-4">Supplier → Warehouse → Distributor → Retailer</p>
            <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2">
              {["supplier", "warehouse", "distributor", "retailer"].map((type, i) => (
                <div key={type} className="flex items-center gap-2 shrink-0">
                  <div className="flex flex-col gap-1.5">
                    {networkNodes.filter((n) => n.type === type).slice(0, 3).map((n) => (
                      <div
                        key={n.id}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium border ${
                          n.risk === "high" ? "border-risk-high text-risk-high bg-risk-high-bg" :
                          n.risk === "medium" ? "border-risk-medium text-risk-medium bg-risk-medium-bg" :
                          "border-slate-200 text-slate-600 bg-white"
                        }`}
                      >
                        {n.label}
                      </div>
                    ))}
                  </div>
                  {i < 3 && <span className="text-slate-300 text-lg px-1">→</span>}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </PageContainer>
  );
}
