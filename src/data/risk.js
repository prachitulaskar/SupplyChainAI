export const riskBreakdown = [
  { category: "Supplier Reliability", score: 72 },
  { category: "Delivery Delays", score: 61 },
  { category: "Inventory Levels", score: 55 },
  { category: "Defect Rate", score: 48 },
  { category: "Network Dependency", score: 66 },
];

export const overallRiskScore = 68;

export const riskDistribution = [
  { name: "Low Risk", value: 6, color: "#16a34a" },
  { name: "Medium Risk", value: 2, color: "#d97706" },
  { name: "High Risk", value: 2, color: "#dc2626" },
];

export const highRiskSuppliers = [
  { id: "S-104", name: "Vantage Circuit Systems", riskScore: 78, mainRisk: "Delivery delays + defect rate", disruptionProbability: "High", status: "High Risk" },
  { id: "S-108", name: "Summit Alloys Corp.", riskScore: 69, mainRisk: "Repeated shipment delays", disruptionProbability: "Elevated", status: "High Risk" },
  { id: "S-106", name: "Everline Textiles", riskScore: 61, mainRisk: "Single-region concentration", disruptionProbability: "Moderate", status: "Medium Risk" },
];

export function riskExplanation(supplierId) {
  const explanations = {
    "S-104": {
      summary: "Supplier S-104 shows a high disruption probability due to repeated delivery delays and an elevated defect rate over the last two quarters.",
      factors: [
        "Average delivery delay of 5.8 days, above the 3-day network threshold",
        "Defect rate of 4.2%, more than double the category average",
        "Reliability score has declined 9 points over the last 6 months",
        "Concentrated in a single manufacturing region (Chennai)",
      ],
      recommendations: [
        "Increase safety stock for parts sourced from S-104 by 15–20%",
        "Begin qualifying an alternate Tier-2 electronics supplier",
        "Request a corrective action plan for the defect rate trend",
      ],
    },
  };
  return explanations[supplierId] || {
    summary: "This supplier shows elevated risk indicators relative to the network average.",
    factors: ["Delivery variability above threshold", "Limited historical order volume for reliable scoring"],
    recommendations: ["Monitor delivery performance over the next quarter", "Request updated compliance documentation"],
  };
}

export const heatmapData = [
  { supplier: "S-104", reliability: 3, delay: 4, inventory: 2, defect: 4, network: 3 },
  { supplier: "S-108", reliability: 3, delay: 4, inventory: 2, defect: 3, network: 3 },
  { supplier: "S-106", reliability: 2, delay: 3, inventory: 3, defect: 2, network: 3 },
  { supplier: "S-110", reliability: 2, delay: 2, inventory: 2, defect: 2, network: 2 },
  { supplier: "S-105", reliability: 1, delay: 2, inventory: 1, defect: 2, network: 2 },
];
