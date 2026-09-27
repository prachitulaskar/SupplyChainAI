import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Badge from "../common/Badge";
import Loading from "../common/Loading";
import LineChartCard from "../charts/LineChartCard";
import { getSupplier } from "../../services/supplierService";
import { AlertTriangle } from "lucide-react";

export default function SupplierDetails({ supplierId, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!supplierId) { setData(null); return; }
    getSupplier(supplierId).then(setData);
  }, [supplierId]);

  return (
    <Modal open={!!supplierId} onClose={onClose} title={data ? `${data.id} · ${data.name}` : "Supplier"} width="max-w-3xl">
      {!data ? <Loading /> : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ["Category", data.category],
              ["Location", data.location],
              ["Tier", data.tier],
              ["Status", <Badge label={data.status} />],
            ].map(([label, value]) => (
              <div key={label} className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="text-sm font-medium text-slate-700 mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ["Reliability", `${data.reliability}%`],
              ["Avg. Delay", `${data.delay} days`],
              ["Defect Rate", `${data.defectRate}%`],
              ["Risk Score", data.riskScore],
            ].map(([label, value]) => (
              <div key={label} className="border border-slate-200 rounded-lg p-3 text-center">
                <p className="text-lg font-semibold text-slate-800">{value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Reliability Trend</h4>
            <LineChartCard data={data.history} xKey="month" lines={[{ key: "reliability", name: "Reliability %", color: "#2563eb" }]} height={180} />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Risk Factor Breakdown</h4>
            <div className="space-y-2">
              {data.riskFactors.map((f) => (
                <div key={f.factor} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-44 shrink-0">{f.factor}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-600 rounded-full" style={{ width: `${Math.max(0, Math.min(100, f.value))}%` }} />
                  </div>
                  <span className="text-xs text-slate-400 w-16 text-right">{f.weight} wt.</span>
                </div>
              ))}
            </div>
          </div>

          {data.status === "High Risk" && (
            <div className="flex gap-3 p-3.5 rounded-lg bg-risk-high-bg border-l-[3px] border-risk-high">
              <AlertTriangle size={17} className="text-risk-high shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-800">AI risk explanation</p>
                <p className="text-sm text-slate-600 mt-0.5">
                  Elevated risk driven by delivery delays and defect rate trending above the network average.
                  Recommend increasing safety stock and qualifying an alternate supplier for this category.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
