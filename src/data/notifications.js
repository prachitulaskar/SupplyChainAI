export const notifications = [
  { id: 1, type: "warning", text: "High-risk supplier detected: Vantage Circuit Systems (S-104)", time: "12 min ago", read: false },
  { id: 2, type: "warning", text: "Inventory for P-103 is below safety stock threshold", time: "48 min ago", read: false },
  { id: 3, type: "warning", text: "Shipment SHP-3302 delayed by 6 days", time: "2 hours ago", read: false },
  { id: 4, type: "success", text: "Document invoice_batch_09.pdf processed successfully", time: "3 hours ago", read: true },
  { id: 5, type: "success", text: "Demand forecast regenerated for Q4 electronics", time: "5 hours ago", read: true },
  { id: 6, type: "warning", text: "Warehouse W-03 flagged as a potential single point of failure", time: "Yesterday", read: true },
  { id: 7, type: "success", text: "New supplier record for Kestrel Industrial Supply validated", time: "Yesterday", read: true },
];

export const uploadHistory = [
  { file: "supplier_invoice_0912.pdf", type: "PDF", uploadedBy: "Priya Nair", date: "2026-09-25", status: "Stored" },
  { file: "warehouse_scan_north.jpg", type: "Image", uploadedBy: "Admin", date: "2026-09-24", status: "Stored" },
  { file: "q3_shipment_log.csv", type: "CSV", uploadedBy: "Rahul Verma", date: "2026-09-23", status: "Stored" },
  { file: "customs_declaration_88.pdf", type: "PDF", uploadedBy: "Admin", date: "2026-09-21", status: "Failed" },
];

export const systemStatus = [
  { service: "FastAPI Backend", status: "operational", latency: "48ms" },
  { service: "PostgreSQL Database", status: "operational", latency: "12ms" },
  { service: "ChromaDB Vector Store", status: "operational", latency: "31ms" },
  { service: "Llama LLM Service", status: "warning", latency: "620ms" },
  { service: "Surya OCR Engine", status: "operational", latency: "290ms" },
  { service: "LangGraph Agents", status: "operational", latency: "88ms" },
  { service: "WebSocket Gateway", status: "operational", latency: "9ms" },
];

export const users = [
  { id: 1, name: "Admin User", email: "admin@supplychainai.io", role: "Admin", status: "Active", lastLogin: "2026-09-27 09:12" },
  { id: 2, name: "Priya Nair", email: "priya.nair@supplychainai.io", role: "Manager", status: "Active", lastLogin: "2026-09-26 17:44" },
  { id: 3, name: "Rahul Verma", email: "rahul.verma@supplychainai.io", role: "Analyst", status: "Active", lastLogin: "2026-09-27 08:03" },
  { id: 4, name: "Kevin Ortiz", email: "kevin.ortiz@supplychainai.io", role: "Viewer", status: "Inactive", lastLogin: "2026-09-14 11:20" },
  { id: 5, name: "Meera Iyer", email: "meera.iyer@supplychainai.io", role: "Analyst", status: "Active", lastLogin: "2026-09-25 14:58" },
];
