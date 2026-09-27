import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function PageContainer({ title, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}
