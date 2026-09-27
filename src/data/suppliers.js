export const suppliers = [
  { id: "S-101", name: "Meridian Components Ltd.", category: "Electronics", location: "Shenzhen, CN", reliability: 94, delay: 1.2, defectRate: 0.6, riskScore: 18, status: "Low Risk", tier: "Tier 1", orders: 312 },
  { id: "S-102", name: "Atlas Precision Metals", category: "Raw Materials", location: "Pittsburgh, US", reliability: 89, delay: 2.1, defectRate: 1.1, riskScore: 27, status: "Low Risk", tier: "Tier 1", orders: 198 },
  { id: "S-103", name: "Nordic PolyPack", category: "Packaging", location: "Gothenburg, SE", reliability: 91, delay: 1.8, defectRate: 0.8, riskScore: 22, status: "Low Risk", tier: "Tier 2", orders: 145 },
  { id: "S-104", name: "Vantage Circuit Systems", category: "Electronics", location: "Chennai, IN", reliability: 62, delay: 5.8, defectRate: 4.2, riskScore: 78, status: "High Risk", tier: "Tier 2", orders: 264 },
  { id: "S-105", name: "Rustlink Fasteners", category: "Hardware", location: "Ningbo, CN", reliability: 85, delay: 2.6, defectRate: 1.4, riskScore: 34, status: "Medium Risk", tier: "Tier 2", orders: 176 },
  { id: "S-106", name: "Everline Textiles", category: "Materials", location: "Dhaka, BD", reliability: 71, delay: 4.3, defectRate: 2.9, riskScore: 61, status: "Medium Risk", tier: "Tier 3", orders: 92 },
  { id: "S-107", name: "Coral Bay Logistics Supply", category: "Components", location: "Rotterdam, NL", reliability: 96, delay: 0.7, defectRate: 0.3, riskScore: 11, status: "Low Risk", tier: "Tier 1", orders: 288 },
  { id: "S-108", name: "Summit Alloys Corp.", category: "Raw Materials", location: "Ulsan, KR", reliability: 68, delay: 4.9, defectRate: 3.1, riskScore: 69, status: "High Risk", tier: "Tier 2", orders: 133 },
  { id: "S-109", name: "Bridgeline Electronics", category: "Electronics", location: "Austin, US", reliability: 92, delay: 1.5, defectRate: 0.9, riskScore: 20, status: "Low Risk", tier: "Tier 1", orders: 221 },
  { id: "S-110", name: "Kestrel Industrial Supply", category: "Hardware", location: "Monterrey, MX", reliability: 79, delay: 3.4, defectRate: 2.0, riskScore: 47, status: "Medium Risk", tier: "Tier 3", orders: 104 },
];

export const supplierHistory = (id) => {
  const base = suppliers.find((s) => s.id === id)?.reliability ?? 80;
  return Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2025, i, 1).toLocaleString("default", { month: "short" }),
    reliability: Math.max(40, Math.min(99, base + Math.round((Math.sin(i / 2) * 8)))),
    delay: Math.max(0.3, (Math.random() * 3 + (base < 75 ? 3 : 1)).toFixed(1) * 1),
  }));
};

export const supplierRiskFactors = (id) => {
  const s = suppliers.find((x) => x.id === id);
  if (!s) return [];
  return [
    { factor: "Delivery Reliability", value: s.reliability, weight: "High" },
    { factor: "Defect Rate", value: Math.max(0, 100 - s.defectRate * 15), weight: "High" },
    { factor: "Financial Stability", value: 100 - s.riskScore * 0.4, weight: "Medium" },
    { factor: "Geopolitical Exposure", value: 100 - s.riskScore * 0.5, weight: "Medium" },
    { factor: "Single-Source Dependency", value: s.tier === "Tier 1" ? 85 : 55, weight: "Low" },
  ];
};
