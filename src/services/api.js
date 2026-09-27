// Central API client. All service modules route through here.
// Swap USE_MOCK to false once the FastAPI backend endpoints below are live.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || "ws://localhost:8000";

// Flip this to false when the FastAPI backend is reachable.
// Individual service functions already contain the real fetch calls,
// they just fall back to bundled mock data while this is true.
export const USE_MOCK = true;

function getToken() {
  return localStorage.getItem("sc_token");
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new ApiError(message || "Request failed", res.status);
  }
  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : res.text();
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Simulated network latency + occasional-failure hook for mock mode,
// so loading/error states behave like the real thing.
export function mockDelay(data, ms = 500) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function uploadFile(path, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const token = getToken();
    xhr.open("POST", `${API_BASE_URL}${path}`);
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText || "{}"));
      else reject(new ApiError(xhr.statusText, xhr.status));
    };
    xhr.onerror = () => reject(new ApiError("Network error", 0));
    const formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
  });
}

export default request;
