import request, { USE_MOCK, mockDelay } from "./api";
import { networkNodes, networkEdges, nodeDetails } from "../data/network";

export function getNetwork() {
  if (USE_MOCK) return mockDelay({ nodes: networkNodes, edges: networkEdges }, 500);
  return request("/api/network");
}

export function getNodeDetails(id) {
  if (USE_MOCK) return mockDelay(nodeDetails(id), 250);
  return request(`/api/network/nodes/${id}`);
}
