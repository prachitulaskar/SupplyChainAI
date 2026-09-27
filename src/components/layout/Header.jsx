import { Menu, Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { notifications } from "../../data/notifications";

export default function Header({ title, onMenuClick }) {
  const { user } = useAuth();
  const unread = notifications.filter((n) => !n.read).length;
  const initials = (user?.name || "U").split(" ").map((s) => s[0]).slice(0, 2).join("");

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden text-slate-500">
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-semibold text-slate-800 truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-3 lg:gap-4 shrink-0">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 w-64">
          <Search size={15} className="text-slate-400" />
          <input
            placeholder="Search suppliers, products, shipments…"
            className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400"
          />
        </div>

        <Link to="/notifications" className="relative text-slate-500 hover:text-slate-700">
          <Bell size={19} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-risk-high text-white text-[10px] rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </Link>

        <Link to="/settings" className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-navy-800 text-white text-xs font-semibold flex items-center justify-center">
            {initials}
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-medium text-slate-700">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.role}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
