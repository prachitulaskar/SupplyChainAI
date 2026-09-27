import { useCallback, useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import StatCard from "../components/common/StatCard";
import LineChartCard from "../components/charts/LineChartCard";
import { getTransportation } from "../services/transportationService";

export default function Transportation() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setError(false);
    setData(null);
    getTransportation().then(setData).catch(() => setError(true));
  }, []);

  useEffect(() => { load(); }, [load]);

  if (error) return <PageContainer title="Transportation"><ErrorState onRetry={load} /></PageContainer>;
  if (!data) return <PageContainer title="Transportation"><Loading /></PageContainer>;

  const { shipments, transitTimeTrend, routeNodes, routeEdges } = data;
  const summary = [
    { label: "Active Shipments", value: shipments.filter((s) => s.status === "In Transit").length, trend: "Stable", direction: "flat" },
    { label: "Delivered", value: shipments.filter((s) => s.status === "Delivered").length, trend: "+4", direction: "up" },
    { label: "Delayed", value: shipments.filter((s) => s.status === "Delayed").length, trend: "+2", direction: "down" },
    { label: "On-Time Rate", value: "91.4%", trend: "+0.6%", direction: "up" },
  ];

  const nodeById = Object.fromEntries(routeNodes.map((n) => [n.id, n]));
  const colorForType = { origin: "#2563eb", warehouse: "#0f172a", distributor: "#16a34a" };

  return (
    <PageContainer title="Transportation & Logistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summary.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <h3 className="font-semibold text-slate-800 text-sm mb-3">Average Transit Time</h3>
          <LineChartCard data={transitTimeTrend} xKey="week" lines={[{ key: "avgTransit", name: "Days", color: "#2563eb" }]} height={220} />
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-800 text-sm mb-3">Route Visualization</h3>
          <svg viewBox="0 0 640 320" className="w-full h-56">
            {routeEdges.map(([a, b], i) => {
              const from = nodeById[a], to = nodeById[b];
              return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#e2e8f0" strokeWidth="2" />;
            })}
            {routeNodes.map((n) => (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r="6" fill={colorForType[n.type]} />
                <text x={n.x + 10} y={n.y + 4} fontSize="11" fill="#475569">{n.label}</text>
              </g>
            ))}
          </svg>
        </Card>
      </div>

      <Card padded={false}>
        <h3 className="font-semibold text-slate-800 text-sm p-4 pb-2">Shipments</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-100 text-left">
                <th className="pl-4 pb-2 font-medium">Shipment ID</th>
                <th className="pb-2 font-medium">Supplier</th>
                <th className="pb-2 font-medium">Origin</th>
                <th className="pb-2 font-medium">Destination</th>
                <th className="pb-2 font-medium">Mode</th>
                <th className="pb-2 font-medium">Expected</th>
                <th className="pb-2 font-medium">Actual</th>
                <th className="pb-2 font-medium">Delay</th>
                <th className="pb-2 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                  <td className="pl-4 py-3 font-mono text-xs text-slate-500">{s.id}</td>
                  <td className="py-3 font-medium text-slate-700">{s.supplier}</td>
                  <td className="py-3 text-slate-500">{s.origin}</td>
                  <td className="py-3 text-slate-500">{s.destination}</td>
                  <td className="py-3 text-slate-500">{s.mode}</td>
                  <td className="py-3 text-slate-500">{s.expected}</td>
                  <td className="py-3 text-slate-500">{s.actual || "—"}</td>
                  <td className="py-3 text-slate-500">{s.delay > 0 ? `${s.delay}d` : "—"}</td>
                  <td className="py-3 pr-4"><Badge label={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}
