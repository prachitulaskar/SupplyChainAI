export const kpis = [
  { label: "Total Suppliers", value: "142", trend: "+3.1%", direction: "up" },
  { label: "Active Suppliers", value: "118", trend: "+1.4%", direction: "up" },
  { label: "High-Risk Suppliers", value: "9", trend: "+2", direction: "down" },
  { label: "Inventory Value", value: "$4.82M", trend: "-1.8%", direction: "down" },
  { label: "Low Stock Items", value: "14", trend: "+4", direction: "down" },
  { label: "Open Orders", value: "326", trend: "Stable", direction: "flat" },
  { label: "On-Time Delivery", value: "91.4%", trend: "+0.6%", direction: "up" },
  { label: "Avg. Delivery Delay", value: "2.3 days", trend: "-0.4d", direction: "up" },
  { label: "Supply Chain Risk", value: "68 / 100", trend: "+3", direction: "down" },
  { label: "Forecast Accuracy", value: "88.2%", trend: "+1.1%", direction: "up" },
];

export const aiInsights = [
  { level: "high", text: "Supplier S-104 has a high disruption probability due to repeated delivery delays and rising defect rates." },
  { level: "medium", text: "Inventory for Product P-103 may fall below safety stock within the next 9 days at current demand." },
  { level: "medium", text: "Warehouse W-03 is a potential single point of failure, connecting 4 suppliers and 6 downstream routes." },
  { level: "low", text: "Forecast accuracy for Tier-1 electronics components improved 2.1 points after the latest model refresh." },
];

export const supplierPerformance = [
  { supplier: "Meridian Components Ltd.", category: "Electronics", reliability: 94, delay: 1.2, defectRate: 0.6, riskScore: 18, status: "Low Risk" },
  { supplier: "Vantage Circuit Systems", category: "Electronics", reliability: 62, delay: 5.8, defectRate: 4.2, riskScore: 78, status: "High Risk" },
  { supplier: "Coral Bay Logistics Supply", category: "Components", reliability: 96, delay: 0.7, defectRate: 0.3, riskScore: 11, status: "Low Risk" },
  { supplier: "Summit Alloys Corp.", category: "Raw Materials", reliability: 68, delay: 4.9, defectRate: 3.1, riskScore: 69, status: "High Risk" },
  { supplier: "Rustlink Fasteners", category: "Hardware", reliability: 85, delay: 2.6, defectRate: 1.4, riskScore: 34, status: "Medium Risk" },
];
