export const shipments = [
  { id: "SHP-3301", supplier: "Meridian Components Ltd.", origin: "Shenzhen, CN", destination: "WH-North, US", mode: "Ocean", expected: "2026-09-20", actual: "2026-09-20", delay: 0, status: "Delivered" },
  { id: "SHP-3302", supplier: "Vantage Circuit Systems", origin: "Chennai, IN", destination: "WH-East, US", mode: "Air", expected: "2026-09-18", actual: "2026-09-24", delay: 6, status: "Delayed" },
  { id: "SHP-3303", supplier: "Atlas Precision Metals", origin: "Pittsburgh, US", destination: "WH-Central, US", mode: "Road", expected: "2026-09-26", actual: null, delay: 0, status: "In Transit" },
  { id: "SHP-3304", supplier: "Summit Alloys Corp.", origin: "Ulsan, KR", destination: "WH-South, US", mode: "Ocean", expected: "2026-09-15", actual: "2026-09-21", delay: 6, status: "Delayed" },
  { id: "SHP-3305", supplier: "Coral Bay Logistics Supply", origin: "Rotterdam, NL", destination: "WH-North, US", mode: "Ocean", expected: "2026-09-28", actual: null, delay: 0, status: "In Transit" },
  { id: "SHP-3306", supplier: "Nordic PolyPack", origin: "Gothenburg, SE", destination: "WH-Central, US", mode: "Rail", expected: "2026-09-19", actual: "2026-09-19", delay: 0, status: "Delivered" },
  { id: "SHP-3307", supplier: "Everline Textiles", origin: "Dhaka, BD", destination: "WH-East, US", mode: "Ocean", expected: "2026-09-22", actual: "2026-09-27", delay: 5, status: "Delayed" },
];

export const transitTimeTrend = Array.from({ length: 8 }, (_, i) => ({
  week: `Wk ${i + 1}`,
  avgTransit: Math.round(6 + Math.sin(i / 2) * 1.5),
}));

export const routeNodes = [
  { id: "shenzhen", label: "Shenzhen", type: "origin", x: 40, y: 60 },
  { id: "rotterdam", label: "Rotterdam", type: "origin", x: 40, y: 160 },
  { id: "chennai", label: "Chennai", type: "origin", x: 40, y: 260 },
  { id: "whnorth", label: "WH-North", type: "warehouse", x: 320, y: 60 },
  { id: "whcentral", label: "WH-Central", type: "warehouse", x: 320, y: 160 },
  { id: "wheast", label: "WH-East", type: "warehouse", x: 320, y: 260 },
  { id: "dist1", label: "Distributor A", type: "distributor", x: 560, y: 110 },
  { id: "dist2", label: "Distributor B", type: "distributor", x: 560, y: 220 },
];

export const routeEdges = [
  ["shenzhen", "whnorth"], ["rotterdam", "whnorth"], ["chennai", "wheast"],
  ["whnorth", "dist1"], ["whcentral", "dist1"], ["wheast", "dist2"], ["whcentral", "dist2"],
];
