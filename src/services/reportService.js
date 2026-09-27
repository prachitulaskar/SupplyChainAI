import request, { USE_MOCK, mockDelay } from "./api";

const REPORT_TYPES = [
  "Supply Chain Risk Report", "Supplier Performance Report", "Inventory Report",
  "Transportation Report", "Demand Forecast Report", "Network Risk Report", "Executive Summary",
];

const PAST_REPORTS = [
  { id: "RPT-2211", type: "Supply Chain Risk Report", range: "Aug 2026", generatedBy: "Priya Nair", date: "2026-09-01", format: "PDF" },
  { id: "RPT-2198", type: "Supplier Performance Report", range: "Q2 2026", generatedBy: "Rahul Verma", date: "2026-08-14", format: "CSV" },
  { id: "RPT-2170", type: "Executive Summary", range: "Jul 2026", generatedBy: "Admin User", date: "2026-08-02", format: "PDF" },
];

export function getReportTypes() {
  return mockDelay(REPORT_TYPES, 200);
}

export function getPastReports() {
  return mockDelay(PAST_REPORTS, 400);
}

export function generateReport(payload) {
  // Real integration would POST to FastAPI and receive a file URL / blob.
  return mockDelay({ id: `RPT-${Math.floor(Math.random() * 9000 + 1000)}`, ...payload, status: "Generated" }, 1200);
}
