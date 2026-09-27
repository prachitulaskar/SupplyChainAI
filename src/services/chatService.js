import { USE_MOCK, mockDelay, WS_BASE_URL } from "./api";

const AGENT_PIPELINE = [
  "Query Router", "Analytics Agent", "Risk Agent", "Network Agent", "Recommendation Agent", "Llama LLM",
];

const CANNED_RESPONSES = [
  {
    match: /vantage|s-104|high risk/i,
    riskLevel: "HIGH",
    text: "Supplier S-104 (Vantage Circuit Systems) has elevated risk due to repeated delivery delays and a high defect rate.",
    data: ["Reliability: 62%", "Average delay: 5.8 days", "Defect rate: 4.2%"],
    recommendation: "Consider increasing safety stock and evaluating alternate Tier-2 electronics suppliers.",
  },
  {
    match: /inventory|safety stock|p-103/i,
    riskLevel: "MEDIUM",
    text: "Product P-103 (Injection-Molded Housing Kit) is projected to fall below safety stock within 9 days at current demand.",
    data: ["Current stock: 210 units", "Safety stock: 800 units", "Weekly demand: ~225 units"],
    recommendation: "Expedite the next purchase order and flag P-103 for priority replenishment.",
  },
  {
    match: /bottleneck|warehouse|single point/i,
    riskLevel: "MEDIUM",
    text: "Warehouse W-03 is a potential bottleneck — it connects 4 upstream suppliers and 6 downstream distribution routes.",
    data: ["Upstream suppliers: 4", "Downstream routes: 6", "Redundant path coverage: Low"],
    recommendation: "Evaluate a secondary regional warehouse to reduce single-point dependency on W-03.",
  },
  {
    match: /forecast|demand|p-101/i,
    riskLevel: "LOW",
    text: "Predicted demand for Product P-101 is expected to increase over the next 30 days based on the latest forecasting run.",
    data: ["Current avg. weekly demand: 620 units", "30-day forecast: +12.4%", "Model confidence interval: ±8%"],
    recommendation: "Increase safety stock for P-101 moderately ahead of the projected demand rise.",
  },
];

const DEFAULT_RESPONSE = {
  riskLevel: "LOW",
  text: "Based on current supply chain data, no significant anomalies were found for this query.",
  data: ["Network risk score: 68/100", "Active suppliers monitored: 118"],
  recommendation: "Continue routine monitoring; no immediate action required.",
};

export function getSuggestedQueries() {
  return [
    "Which suppliers are currently high risk?",
    "Show inventory items that may go below safety stock.",
    "Which warehouses are potential bottlenecks?",
    "Forecast demand for Product P-101.",
  ];
}

// Simulates the LangGraph multi-agent pipeline executing step by step.
// Once the backend is live, replace this with a WebSocket connection to
// `${WS_BASE_URL}/ws/chat` that streams { agent, status } and final tokens.
export async function sendChatQuery(query, onAgentStep) {
  if (USE_MOCK) {
    for (const agent of AGENT_PIPELINE) {
      await mockDelay(null, 260);
      onAgentStep?.(agent);
    }
    const found = CANNED_RESPONSES.find((r) => r.match.test(query)) || DEFAULT_RESPONSE;
    return mockDelay(found, 200);
  }
  // Real WS usage would look like:
  // const socket = new WebSocket(`${WS_BASE_URL}/ws/chat`);
  throw new Error("Live WebSocket chat not yet connected");
}
