import request, { USE_MOCK, mockDelay } from "./api";
import { riskBreakdown, overallRiskScore, riskDistribution, highRiskSuppliers, riskExplanation, heatmapData } from "../data/risk";

export function getRiskAnalysis() {
  if (USE_MOCK) {
    return mockDelay({ overallRiskScore, riskBreakdown, riskDistribution, highRiskSuppliers, heatmapData }, 500);
  }
  return request("/api/risk");
}

export function getRiskExplanation(supplierId) {
  if (USE_MOCK) return mockDelay(riskExplanation(supplierId), 400);
  return request(`/api/risk/${supplierId}/explanation`);
}
