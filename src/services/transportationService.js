import request, { USE_MOCK, mockDelay } from "./api";
import { shipments, transitTimeTrend, routeNodes, routeEdges } from "../data/transportation";

export function getTransportation() {
  if (USE_MOCK) return mockDelay({ shipments, transitTimeTrend, routeNodes, routeEdges }, 450);
  return request("/api/transportation");
}
