import { useEffect, useMemo, useState, useRef } from "react";
import { Search, ZoomIn, ZoomOut, RotateCcw, AlertTriangle } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/common/Card";
import Loading from "../components/common/Loading";
import { getNetwork, getNodeDetails } from "../services/networkService";

const TYPE_COLOR = { supplier: "#2563eb", warehouse: "#0f172a", distributor: "#7c3aed", retailer: "#16a34a" };
const RISK_RING = { high: "#dc2626", medium: "#d97706", low: "transparent" };

export default function NetworkPage() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState(null);
  const [zoom, setZoom] = useState(1);
  const svgRef = useRef(null);

  useEffect(() => { getNetwork().then(setData); }, []);
  useEffect(() => {
    if (!selectedId) { setDetails(null); return; }
    getNodeDetails(selectedId).then(setDetails);
  }, [selectedId]);

  const matchedIds = useMemo(() => {
    if (!data || !search) return null;
    return new Set(data.nodes.filter((n) => n.label.toLowerCase().includes(search.toLowerCase())).map((n) => n.id));
  }, [data, search]);

  if (!data) return <PageContainer title="Supply Chain Network"><Loading /></PageContainer>;

  const nodeById = Object.fromEntries(data.nodes.map((n) => [n.id, n]));
  const connectedIds = selectedId
    ? new Set(data.edges.filter(([a, b]) => a === selectedId || b === selectedId).flat())
    : null;

  const bottleneck = data.nodes.find((n) => n.id === "W-03");

  return (
    <PageContainer title="Supply Chain Network">
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 flex-1 max-w-xs">
            <Search size={15} className="text-slate-400" />
            <input placeholder="Search node…" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm outline-none w-full" />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            {Object.entries(TYPE_COLOR).map(([type, color]) => (
              <span key={type} className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />{type}</span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <button onClick={() => setZoom((z) => Math.min(2, z + 0.2))} className="p-1.5 border border-slate-200 rounded-md text-slate-500"><ZoomIn size={14} /></button>
            <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))} className="p-1.5 border border-slate-200 rounded-md text-slate-500"><ZoomOut size={14} /></button>
            <button onClick={() => setZoom(1)} className="p-1.5 border border-slate-200 rounded-md text-slate-500"><RotateCcw size={14} /></button>
          </div>
        </div>

        <div className="overflow-auto border border-slate-100 rounded-lg" style={{ maxHeight: 480 }}>
          <svg ref={svgRef} viewBox="0 0 900 500" width={900 * zoom} height={500 * zoom} className="min-w-full">
            {data.edges.map(([a, b], i) => {
              const from = nodeById[a], to = nodeById[b];
              const dim = connectedIds && !(connectedIds.has(a) && connectedIds.has(b));
              return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={dim ? "#f1f5f9" : "#cbd5e1"} strokeWidth="2" />;
            })}
            {data.nodes.map((n) => {
              const dimmed = (matchedIds && !matchedIds.has(n.id)) || (connectedIds && !connectedIds.has(n.id) && n.id !== selectedId);
              return (
                <g key={n.id} onClick={() => setSelectedId(n.id)} className="cursor-pointer" opacity={dimmed ? 0.3 : 1}>
                  {n.risk !== "low" && <circle cx={n.x} cy={n.y} r="16" fill="none" stroke={RISK_RING[n.risk]} strokeWidth="2" />}
                  <circle cx={n.x} cy={n.y} r="10" fill={TYPE_COLOR[n.type]} stroke={selectedId === n.id ? "#0f172a" : "white"} strokeWidth={selectedId === n.id ? 2.5 : 1.5} />
                  <text x={n.x} y={n.y + 28} fontSize="11" textAnchor="middle" fill="#475569" fontWeight={selectedId === n.id ? 600 : 400}>{n.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <h3 className="font-semibold text-slate-800 text-sm mb-3">Node Details</h3>
          {!details ? (
            <p className="text-sm text-slate-400">Click a node in the graph to view its details.</p>
          ) : (
            <div className="space-y-2 text-sm">
              <p><span className="text-slate-400">Name:</span> <span className="font-medium text-slate-700">{details.label}</span></p>
              <p><span className="text-slate-400">Type:</span> <span className="capitalize text-slate-700">{details.type}</span></p>
              <p><span className="text-slate-400">Risk Score:</span> <span className="capitalize text-slate-700">{details.risk}</span></p>
              <p><span className="text-slate-400">Connections:</span> <span className="text-slate-700">{details.connections}</span></p>
              <p><span className="text-slate-400">Dependencies:</span> <span className="text-slate-700">{details.dependencies}</span></p>
              <p><span className="text-slate-400">Criticality:</span> <span className="text-slate-700">{details.criticality}</span></p>
            </div>
          )}
        </Card>

        <Card className="bg-risk-medium-bg/40 border-l-[3px]" accent="#d97706">
          <div className="flex gap-3">
            <AlertTriangle size={18} className="text-risk-medium shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Potential Single Point of Failure</h3>
              <p className="text-sm text-slate-600 mt-1">
                {bottleneck?.label} connects multiple upstream suppliers and downstream distribution routes.
                A disruption here would affect a disproportionate share of downstream retailers — consider a
                redundant regional warehouse to reduce dependency.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
