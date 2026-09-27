import request, { USE_MOCK, mockDelay } from "./api";
import { suppliers, supplierHistory, supplierRiskFactors } from "../data/suppliers";

export function getSuppliers(params = {}) {
  if (USE_MOCK) return mockDelay(suppliers, 450);
  const query = new URLSearchParams(params).toString();
  return request(`/api/suppliers${query ? `?${query}` : ""}`);
}

export function getSupplier(id) {
  if (USE_MOCK) {
    const supplier = suppliers.find((s) => s.id === id);
    return mockDelay({
      ...supplier,
      history: supplierHistory(id),
      riskFactors: supplierRiskFactors(id),
    }, 400);
  }
  return request(`/api/suppliers/${id}`);
}
