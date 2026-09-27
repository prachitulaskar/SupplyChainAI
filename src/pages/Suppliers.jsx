import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import SupplierDetails from "../components/suppliers/SupplierDetails";
import { getSuppliers } from "../services/supplierService";

const PAGE_SIZE = 6;

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState("riskScore");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setLoadError(false);
    getSuppliers()
      .then((data) => setSuppliers(data))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    let rows = suppliers.filter((s) =>
      (statusFilter === "All" || s.status === statusFilter) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()))
    );
    rows = [...rows].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      return a[sortKey] > b[sortKey] ? dir : a[sortKey] < b[sortKey] ? -dir : 0;
    });
    return rows;
  }, [suppliers, search, statusFilter, sortKey, sortDir]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  const Th = ({ label, sortable, k }) => (
    <th
      className={`pb-2 font-medium text-left ${sortable ? "cursor-pointer select-none" : ""}`}
      onClick={() => sortable && toggleSort(k)}
    >
      <span className="inline-flex items-center gap-1">{label} {sortable && <ArrowUpDown size={11} />}</span>
    </th>
  );

  return (
    <PageContainer title="Suppliers">
      <Card padded={false}>
        <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-slate-100">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 flex-1">
            <Search size={15} className="text-slate-400" />
            <input
              placeholder="Search by name or supplier ID…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="bg-transparent text-sm outline-none w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="border border-slate-200 rounded-lg text-sm px-3 py-2 text-slate-600 outline-none"
          >
            {["All", "Low Risk", "Medium Risk", "High Risk"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {loading ? <Loading /> : loadError ? <ErrorState onRetry={load} /> : filtered.length === 0 ? (
          <EmptyState icon={Search} title="No suppliers found" description="Try a different search term or filter." />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 text-xs border-b border-slate-100">
                    <th className="pl-4 pb-2 pt-4 text-left font-medium">Supplier ID</th>
                    <th className="pb-2 pt-4 text-left font-medium">Name</th>
                    <th className="pb-2 pt-4 text-left font-medium">Category</th>
                    <th className="pb-2 pt-4 text-left font-medium">Location</th>
                    <th className="pb-2 pt-4"><Th label="Reliability" sortable k="reliability" /></th>
                    <th className="pb-2 pt-4"><Th label="Delay" sortable k="delay" /></th>
                    <th className="pb-2 pt-4"><Th label="Defect %" sortable k="defectRate" /></th>
                    <th className="pb-2 pt-4"><Th label="Risk Score" sortable k="riskScore" /></th>
                    <th className="pb-2 pt-4 pr-4 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => setSelected(s.id)}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer"
                    >
                      <td className="pl-4 py-3 text-slate-500 font-mono text-xs">{s.id}</td>
                      <td className="py-3 font-medium text-slate-700">{s.name}</td>
                      <td className="py-3 text-slate-500">{s.category}</td>
                      <td className="py-3 text-slate-500">{s.location}</td>
                      <td className="py-3 text-slate-500">{s.reliability}%</td>
                      <td className="py-3 text-slate-500">{s.delay}d</td>
                      <td className="py-3 text-slate-500">{s.defectRate}%</td>
                      <td className="py-3 text-slate-500">{s.riskScore}</td>
                      <td className="py-3 pr-4"><Badge label={s.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 text-xs text-slate-500">
              <span>Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
              <div className="flex items-center gap-2">
                <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-40">
                  <ChevronLeft size={14} />
                </button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-40">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </Card>

      <SupplierDetails supplierId={selected} onClose={() => setSelected(null)} />
    </PageContainer>
  );
}
