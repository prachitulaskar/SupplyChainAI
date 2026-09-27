import request, { USE_MOCK, mockDelay } from "./api";
import { buildForecast, products, warehouses } from "../data/forecast";

export function getForecast({ productIndex = 0, warehouse = "All Warehouses", horizon = 30 } = {}) {
  if (USE_MOCK) return mockDelay({ series: buildForecast(productIndex), products, warehouses, horizon }, 500);
  return request(`/api/forecast?product=${productIndex}&warehouse=${warehouse}&horizon=${horizon}`);
}
