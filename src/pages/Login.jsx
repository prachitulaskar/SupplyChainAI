import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

const DEMO_ROLES = [
  { role: "admin", label: "Admin" },
  { role: "manager", label: "Manager" },
  { role: "analyst", label: "Analyst" },
  { role: "viewer", label: "Viewer" },
];

export default function Login() {
  const { login, loginWithRole } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Try a demo role below instead.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoLogin(role) {
    setLoading(true);
    try {
      await loginWithRole(role);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] bg-navy-900 text-white p-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-accent-600 flex items-center justify-center font-bold text-sm">SC</div>
            <span className="font-semibold text-lg">SupplyChainAI</span>
          </div>
        </div>
        <div className="relative space-y-6">
          <h2 className="text-3xl font-semibold leading-tight max-w-md">
            AI-driven visibility across suppliers, inventory, and logistics.
          </h2>
          <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
            Multi-agent risk analysis, demand forecasting, and network intelligence —
            unified in a single decision platform.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <ShieldCheck size={16} className="text-accent-500" />
            Role-based access · Supplier risk scoring · RAG-powered queries
          </div>
        </div>
        <p className="relative text-xs text-slate-500">Final-year B.E. (CSE-AIML) project</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-9 h-9 rounded-lg bg-accent-600 flex items-center justify-center font-bold text-sm text-white">SC</div>
            <span className="font-semibold text-lg text-navy-900">SupplyChainAI</span>
          </div>

          <h1 className="text-xl font-semibold text-slate-900">Sign in to your workspace</h1>
          <p className="text-sm text-slate-500 mt-1">Enter your credentials to continue.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Email or username</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1.5 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent-100 focus:border-accent-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent-100 focus:border-accent-500 pr-10"
                />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-slate-300" />
                Remember me
              </label>
              <a href="#" className="text-accent-600 font-medium">Forgot password?</a>
            </div>

            {error && <p className="text-sm text-risk-high">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-xs text-slate-400">Demo access for evaluation</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {DEMO_ROLES.map((r) => (
              <button
                key={r.role}
                onClick={() => handleDemoLogin(r.role)}
                disabled={loading}
                className="border border-slate-200 rounded-lg py-2.5 text-sm font-medium text-slate-700 hover:border-accent-500 hover:text-accent-600 transition-colors disabled:opacity-50"
              >
                {r.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center">
            Demo roles skip authentication and load role-specific dashboards for the project viva.
          </p>
        </div>
      </div>
    </div>
  );
}
