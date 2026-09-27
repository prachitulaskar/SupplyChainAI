import request, { USE_MOCK, mockDelay } from "./api";
import { users } from "../data/notifications";

// Demo credentials map role -> user for local/demo login.
const DEMO_USERS = {
  admin: { name: "Admin User", email: "admin@supplychainai.io", role: "Admin" },
  manager: { name: "Priya Nair", email: "priya.nair@supplychainai.io", role: "Manager" },
  analyst: { name: "Rahul Verma", email: "rahul.verma@supplychainai.io", role: "Analyst" },
  viewer: { name: "Kevin Ortiz", email: "kevin.ortiz@supplychainai.io", role: "Viewer" },
};

export async function loginWithRole(role) {
  if (USE_MOCK) {
    const user = DEMO_USERS[role] || DEMO_USERS.viewer;
    const token = `demo-${role}-token`;
    return mockDelay({ token, user }, 600);
  }
  // Real FastAPI call once auth endpoint is available:
  return request("/api/auth/demo-login", { method: "POST", body: { role } });
}

export async function login(email, password) {
  if (USE_MOCK) {
    const match = Object.values(DEMO_USERS).find((u) => u.email === email);
    if (!match) throw new Error("Invalid credentials");
    return mockDelay({ token: "demo-token", user: match }, 700);
  }
  return request("/api/auth/login", { method: "POST", body: { email, password } });
}

export function getAllUsers() {
  if (USE_MOCK) return mockDelay(users, 400);
  return request("/api/admin/users");
}
