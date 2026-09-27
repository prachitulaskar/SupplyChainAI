import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Truck, Boxes, Route, TrendingUp, ShieldAlert, Share2,
  UploadCloud, MessageSquare, FileBarChart, Users, Activity, Bell, Settings,
  LogOut, Network,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/suppliers", label: "Suppliers", icon: Truck },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/transportation", label: "Transportation", icon: Route },
  { to: "/forecast", label: "Demand Forecast", icon: TrendingUp },
  { to: "/risk", label: "Risk Analysis", icon: ShieldAlert },
  { to: "/network", label: "Network", icon: Network },
  { to: "/upload", label: "Data Upload", icon: UploadCloud },
  { to: "/chat", label: "AI Assistant", icon: MessageSquare },
  { to: "/reports", label: "Reports", icon: FileBarChart },
];

const ADMIN_NAV = [
  { to: "/admin/users", label: "User Management", icon: Users },
  { to: "/admin/system", label: "System Monitoring", icon: Activity },
];

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const { user, logout } = useAuth();

  const linkCls = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? "bg-accent-600 text-white" : "text-slate-300 hover:bg-navy-700 hover:text-white"
    }`;

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onCloseMobile} />
      )}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64 bg-navy-900 text-white flex flex-col transition-transform duration-200
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-navy-700 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center font-bold text-sm">
            SC
          </div>
          <div>
            <p className="font-semibold text-sm leading-tight">SupplyChainAI</p>
            <p className="text-[11px] text-slate-400 leading-tight">Intelligence Platform</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkCls} onClick={onCloseMobile}>
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}

          {user?.role === "Admin" && (
            <>
              <p className="px-3 pt-4 pb-1 text-[11px] font-semibold text-slate-500 tracking-wide">
                Admin
              </p>
              {ADMIN_NAV.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkCls} onClick={onCloseMobile}>
                  <item.icon size={17} />
                  {item.label}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="px-3 py-4 border-t border-navy-700 space-y-1 shrink-0">
          <NavLink to="/notifications" className={linkCls} onClick={onCloseMobile}>
            <Bell size={17} />
            Notifications
          </NavLink>
          <NavLink to="/settings" className={linkCls} onClick={onCloseMobile}>
            <Settings size={17} />
            Settings
          </NavLink>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-navy-700 hover:text-white"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
