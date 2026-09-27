export const inventory = [
  { id: "P-101", name: "Lithium Cell Module 21700", category: "Electronics", warehouse: "WH-North", stock: 4820, safetyStock: 2000, demand: 3600, status: "Healthy" },
  { id: "P-102", name: "Precision Ball Bearing 6203", category: "Hardware", warehouse: "WH-Central", stock: 950, safetyStock: 1200, demand: 1100, status: "Low Stock" },
  { id: "P-103", name: "Injection-Molded Housing Kit", category: "Components", warehouse: "WH-East", stock: 210, safetyStock: 800, demand: 900, status: "Critical" },
  { id: "P-104", name: "Corrugated Shipping Cartons L", category: "Packaging", warehouse: "WH-South", stock: 12400, safetyStock: 4000, demand: 5200, status: "Overstock" },
  { id: "P-105", name: "PCB Assembly Rev C", category: "Electronics", warehouse: "WH-North", stock: 3100, safetyStock: 1800, demand: 2900, status: "Healthy" },
  { id: "P-106", name: "Aluminum Extrusion Profile", category: "Raw Materials", warehouse: "WH-Central", stock: 640, safetyStock: 900, demand: 850, status: "Low Stock" },
  { id: "P-107", name: "Wiring Harness Assembly", category: "Components", warehouse: "WH-East", stock: 1780, safetyStock: 1200, demand: 1500, status: "Healthy" },
  { id: "P-108", name: "Polycarbonate Sheet 4mm", category: "Raw Materials", warehouse: "WH-South", stock: 90, safetyStock: 600, demand: 720, status: "Critical" },
];

export const inventoryTrend = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2025, i, 1).toLocaleString("default", { month: "short" }),
  stock: 18000 + Math.round(Math.sin(i / 2) * 3000 + i * 200),
  demand: 15000 + Math.round(Math.cos(i / 3) * 2000 + i * 260),
}));

export const stockByWarehouse = [
  { warehouse: "WH-North", value: 7920 },
  { warehouse: "WH-Central", value: 1590 },
  { warehouse: "WH-East", value: 1990 },
  { warehouse: "WH-South", value: 12490 },
];

export const inventoryTurnover = [
  { warehouse: "WH-North", turnover: 6.2 },
  { warehouse: "WH-Central", turnover: 3.4 },
  { warehouse: "WH-East", turnover: 2.1 },
  { warehouse: "WH-South", turnover: 4.8 },
];

export const demandVsInventory = [
  { category: "Electronics", inventory: 7920, demand: 6500 },
  { category: "Hardware", inventory: 1590, demand: 1950 },
  { category: "Components", inventory: 1990, demand: 2400 },
  { category: "Packaging", inventory: 12490, demand: 5200 },
  { category: "Raw Materials", inventory: 730, demand: 1570 },
];
