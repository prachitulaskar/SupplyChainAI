import request, { USE_MOCK, mockDelay } from "./api";
import { inventory, inventoryTrend, stockByWarehouse, inventoryTurnover, demandVsInventory } from "../data/inventory";

export function getInventory() {
  if (USE_MOCK) {
    return mockDelay({
      items: inventory,
      trend: inventoryTrend,
      byWarehouse: stockByWarehouse,
      turnover: inventoryTurnover,
      demandVsInventory,
    }, 450);
  }
  return request("/api/inventory");
}
