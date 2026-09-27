import { useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const TABS = ["Profile", "Password", "Notifications", "Theme", "System"];

export default function Settings() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [tab, setTab] = useState("Profile");

  return (
    <PageContainer title="Settings">
      <Card padded={false}>
        <div className="flex border-b border-slate-100 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${tab === t ? "border-accent-600 text-accent-600" : "border-transparent text-slate-500"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-6 max-w-lg">
          {tab === "Profile" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500">Full Name</label>
                <input defaultValue={user?.name} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Email</label>
                <input defaultValue={user?.email} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Role</label>
                <input disabled value={user?.role} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-400" />
              </div>
              <Button size="sm" onClick={() => showToast("Profile updated", "success")}>Save Changes</Button>
            </div>
          )}
          {tab === "Password" && (
            <div className="space-y-4">
              {["Current password", "New password", "Confirm new password"].map((label) => (
                <div key={label}>
                  <label className="text-xs font-medium text-slate-500">{label}</label>
                  <input type="password" className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" />
                </div>
              ))}
              <Button size="sm" onClick={() => showToast("Password updated", "success")}>Update Password</Button>
            </div>
          )}
          {tab === "Notifications" && (
            <div className="space-y-3">
              {["High-risk supplier alerts", "Inventory threshold alerts", "Shipment delay alerts", "Weekly summary email"].map((n) => (
                <label key={n} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300" /> {n}
                </label>
              ))}
            </div>
          )}
          {tab === "Theme" && (
            <div className="grid grid-cols-2 gap-3">
              {["Light", "Dark (coming soon)"].map((th, i) => (
                <button key={th} disabled={i === 1} className={`border rounded-lg p-3 text-sm text-left disabled:opacity-40 ${i === 0 ? "border-accent-500 ring-2 ring-accent-100" : "border-slate-200"}`}>
                  {th}
                </button>
              ))}
            </div>
          )}
          {tab === "System" && (
            <div className="space-y-3 text-sm text-slate-600">
              <p>API Base URL: <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">{import.meta.env.VITE_API_BASE_URL}</span></p>
              <p>Environment: <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">Development (mock data)</span></p>
            </div>
          )}
        </div>
      </Card>
    </PageContainer>
  );
}
