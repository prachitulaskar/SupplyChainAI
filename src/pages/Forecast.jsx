import { useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/common/Card";
import Loading from "../components/common/Loading";
import LineChartCard from "../components/charts/LineChartCard";
import { getForecast } from "../services/forecastService";

export default function Forecast() {
  const [productIndex, setProductIndex] = useState(0);
  const [warehouse, setWarehouse] = useState("All Warehouses");
  const [horizon, setHorizon] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getForecast({ productIndex, warehouse, horizon }).then((d) => { setData(d); setLoading(false); });
  }, [productIndex, warehouse, horizon]);

  return (
    <PageContainer title="Demand Forecast">
      <Card>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500">Product</label>
            <select value={productIndex} onChange={(e) => setProductIndex(Number(e.target.value))} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
              {(data?.products || []).map((p, i) => <option key={p} value={i}>{p}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500">Warehouse</label>
            <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
              {(data?.warehouses || []).map((w) => <option key={w}>{w}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500">Forecast Period</label>
            <select value={horizon} onChange={(e) => setHorizon(Number(e.target.value))} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
              <option value={7}>Next 7 days</option>
              <option value={30}>Next 30 days</option>
              <option value={90}>Next 90 days</option>
            </select>
          </div>
        </div>
      </Card>

      {loading ? <Loading /> : (
        <>
          <Card>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Historical Demand & Forecast</h3>
            <p className="text-xs text-slate-400 mb-3">Shaded band represents the forecast confidence range.</p>
            <LineChartCard
              data={data.series}
              lines={[
                { key: "historical", name: "Historical", color: "#2563eb" },
                { key: "predicted", name: "Predicted", color: "#f59e0b", dashed: true },
                { key: "upper", name: "Upper bound", color: "#fde68a" },
                { key: "lower", name: "Lower bound", color: "#fde68a" },
              ]}
              height={320}
            />
          </Card>

          <Card className="bg-accent-100/40 border-accent-100">
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Forecast Summary</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Predicted demand for <strong>{data.products[productIndex]}</strong> is expected to increase over the
              next {horizon} days across {warehouse}. This projection is generated from historical order patterns
              and seasonal trends — actual demand may vary with market and supply conditions.
            </p>
          </Card>
        </>
      )}
    </PageContainer>
  );
}
