export const networkNodes = [
  { id: "S-101", label: "Meridian Components", type: "supplier", risk: "low", x: 90, y: 80 },
  { id: "S-104", label: "Vantage Circuit Sys.", type: "supplier", risk: "high", x: 90, y: 200 },
  { id: "S-107", label: "Coral Bay Logistics", type: "supplier", risk: "low", x: 90, y: 320 },
  { id: "S-108", label: "Summit Alloys", type: "supplier", risk: "high", x: 90, y: 440 },
  { id: "W-01", label: "Warehouse W-01", type: "warehouse", risk: "low", x: 340, y: 130 },
  { id: "W-03", label: "Warehouse W-03", type: "warehouse", risk: "medium", x: 340, y: 320 },
  { id: "W-02", label: "Warehouse W-02", type: "warehouse", risk: "low", x: 340, y: 440 },
  { id: "D-01", label: "Distributor North", type: "distributor", risk: "low", x: 590, y: 180 },
  { id: "D-02", label: "Distributor South", type: "distributor", risk: "medium", x: 590, y: 380 },
  { id: "R-01", label: "Retailer Group A", type: "retailer", risk: "low", x: 820, y: 130 },
  { id: "R-02", label: "Retailer Group B", type: "retailer", risk: "low", x: 820, y: 260 },
  { id: "R-03", label: "Retailer Group C", type: "retailer", risk: "medium", x: 820, y: 400 },
];

export const networkEdges = [
  ["S-101", "W-01"], ["S-104", "W-03"], ["S-107", "W-03"], ["S-107", "W-01"],
  ["S-108", "W-03"], ["S-108", "W-02"],
  ["W-01", "D-01"], ["W-03", "D-01"], ["W-03", "D-02"], ["W-02", "D-02"],
  ["D-01", "R-01"], ["D-01", "R-02"], ["D-02", "R-02"], ["D-02", "R-03"],
];

export function nodeDetails(id) {
  const node = networkNodes.find((n) => n.id === id);
  if (!node) return null;
  const connections = networkEdges.filter(([a, b]) => a === id || b === id).length;
  return {
    ...node,
    connections,
    dependencies: node.type === "warehouse" ? connections : Math.max(1, connections - 1),
    criticality: node.id === "W-03" ? "Critical — single point of failure" : connections >= 3 ? "High" : "Moderate",
  };
}
