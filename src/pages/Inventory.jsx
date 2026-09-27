import { useCallback, useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import StatCard from "../components/common/StatCard";
import LineChartCard from "../components/charts/LineChartCard";
import BarChartCard from "../components/charts/BarChartCard";
import GroupedBarChartCard from "../components/charts/GroupedBarChartCard";
import { getInventory } from "../services/inventoryService";

export default function Inventory() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    getInventory()
      .then((d) => setData(d))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <PageContainer title="Inventory Analytics"><Loading /></PageContainer>;
  if (error || !data) return <PageContainer title="Inventory Analytics"><ErrorState onRetry={load} /></PageContainer>;

  const { items, trend, byWarehouse, turnover, demandVsInventory } = data;
  const summary = [
    { label: "Total Inventory", value: items.reduce((a, b) => a + b.stock, 0).toLocaleString(), trend: "+2.4%", direction: "up" },
    { label: "Low Stock Items", value: items.filter((i) => i.status === "Low Stock").length, trend: "+1", direction: "down" },
    { label: "Critical Items", value: items.filter((i) => i.status === "Critical").length, trend: "+2", direction: "down" },
    { label: "Overstocked Items", value: items.filter((i) => i.status === "Overstock").length, trend: "Stable", direction: "flat" },
  ];

  return (
    <PageContainer title="Inventory Analytics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summary.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <h3 className="font-semibold text-slate-800 text-sm mb-3">Inventory vs. Demand Trend</h3>
          <LineChartCard data={trend} lines={[{ key: "stock", name: "Stock", color: "#2563eb" }, { key: "demand", name: "Demand", color: "#94a3b8", dashed: true }]} />
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-800 text-sm mb-3">Stock by Warehouse</h3>
          <BarChartCard data={byWarehouse} xKey="warehouse" barKey="value" color="#3b82f6" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <h3 className="font-semibold text-slate-800 text-sm mb-1">Inventory Turnover</h3>
          <p className="text-xs text-slate-400 mb-3">Times inventory is sold and replaced per year, by warehouse</p>
          <BarChartCard data={turnover} xKey="warehouse" barKey="turnover" color="#16a34a" height={220} />
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-800 text-sm mb-1">Demand vs. Inventory</h3>
          <p className="text-xs text-slate-400 mb-3">Current stock against active demand, by category</p>
          <GroupedBarChartCard
            data={demandVsInventory}
            xKey="category"
            bars={[
              { key: "inventory", name: "Inventory", color: "#2563eb" },
              { key: "demand", name: "Demand", color: "#f59e0b" },
            ]}
            height={220}
          />
        </Card>
      </div>

      <Card padded={false}>
        <h3 className="font-semibold text-slate-800 text-sm p-4 pb-2">Inventory Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-100 text-left">
                <th className="pl-4 pb-2 font-medium">Product ID</th>
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Warehouse</th>
                <th className="pb-2 font-medium">Current Stock</th>
                <th className="pb-2 font-medium">Safety Stock</th>
                <th className="pb-2 font-medium">Demand</th>
                <th className="pb-2 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                  <td className="pl-4 py-3 font-mono text-xs text-slate-500">{p.id}</td>
                  <td className="py-3 font-medium text-slate-700">{p.name}</td>
                  <td className="py-3 text-slate-500">{p.category}</td>
                  <td className="py-3 text-slate-500">{p.warehouse}</td>
                  <td className="py-3 text-slate-500">{p.stock.toLocaleString()}</td>
                  <td className="py-3 text-slate-500">{p.safetyStock.toLocaleString()}</td>
                  <td className="py-3 text-slate-500">{p.demand.toLocaleString()}</td>
                  <td className="py-3 pr-4"><Badge label={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}
