# SupplyChainAI — Frontend

AI-Driven Supply Chain Intelligence Platform — React frontend for a final-year
B.E. (CSE-AIML) project. Built with React + Vite, React Router, Tailwind CSS,
and Recharts. Ships with realistic mock data and a clean service layer so it
can be pointed at a FastAPI backend with a one-line config change.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL. On the login screen, use one of the four **demo
role** buttons (Admin / Manager / Analyst / Viewer) to skip auth and explore
role-specific views — this is exactly what you'd use in a viva/demo.

## Project structure

```
src/
  components/
    layout/        Sidebar, Header, PageContainer
    charts/         Recharts wrappers (Line/Bar/Area/Donut)
    common/         Button, Card, Modal, Badge, Loading, EmptyState, ErrorState
    suppliers/      SupplierDetails modal, etc.
  pages/            One file per route (Dashboard.jsx, Suppliers.jsx, ...)
    admin/          Admin-only pages (User Management, System Monitoring)
  context/          AuthContext (role/session), ToastContext (notifications)
  services/         API layer — one file per domain, see below
  data/             Mock data, structured to mirror expected API responses
```

## Connecting the FastAPI backend

Every service file in `src/services/` currently returns bundled mock data
through the `USE_MOCK` flag in `src/services/api.js`. Each function already
contains the real `fetch`/`request` call, ready to use — switch the flag off
once your endpoints exist:

```js
// src/services/api.js
export const USE_MOCK = false;
```

Set the backend URL in `.env`:

```
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_BASE_URL=ws://localhost:8000
```

Expected REST endpoints (adjust paths in the matching service file if your
FastAPI routes differ):

| Service              | Endpoint(s)                                    |
|-----------------------|------------------------------------------------|
| authService           | `POST /api/auth/login`, `/api/auth/demo-login` |
| supplierService        | `GET /api/suppliers`, `/api/suppliers/{id}`   |
| inventoryService       | `GET /api/inventory`                          |
| transportationService  | `GET /api/transportation`                     |
| forecastService        | `GET /api/forecast`                           |
| riskService            | `GET /api/risk`, `/api/risk/{id}/explanation` |
| networkService         | `GET /api/network`, `/api/network/nodes/{id}` |
| uploadService          | `POST /api/upload` (multipart, progress via XHR) |
| chatService            | `WS /ws/chat` (streaming agent steps + final answer) |
| reportService          | `POST /api/reports/generate`, `GET /api/reports` |

The AI Chat page's multi-agent trace (Query Router → Analytics Agent → Risk
Agent → Network Agent → Recommendation Agent → Llama LLM) expects the backend
to stream step names over the WebSocket as each LangGraph node completes,
followed by the final structured answer (`text`, `riskLevel`, `data[]`,
`recommendation`).

## Notes

- Role-based access is enforced in `App.jsx` via `<ProtectedRoute roles={[...]}>`;
  the sidebar also conditionally renders the Admin section.
- Charts and the network graph render from mock data shaped like the real API
  response, so swapping `USE_MOCK` off shouldn't require touching components.
- Quantum optimization (QAOA/QUBO) is intentionally **not** implemented — per
  the project brief it's future scope only, not a current feature.
