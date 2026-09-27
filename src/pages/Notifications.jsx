import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import { notifications as initial } from "../data/notifications";
import { Bell } from "lucide-react";

export default function Notifications() {
  const [items, setItems] = useState(initial);

  return (
    <PageContainer title="Notifications">
      <div className="flex justify-end">
        <Button variant="secondary" size="sm" onClick={() => setItems((i) => i.map((n) => ({ ...n, read: true })))}>
          Mark all as read
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Bell} title="You're all caught up" description="New notifications will appear here." />
      ) : (
        <Card padded={false}>
          <div className="divide-y divide-slate-50">
            {items.map((n) => (
              <div key={n.id} onClick={() => setItems((i) => i.map((x) => x.id === n.id ? { ...x, read: true } : x))} className={`flex gap-3 px-5 py-4 cursor-pointer ${n.read ? "" : "bg-accent-100/20"}`}>
                {n.type === "warning" ? <AlertTriangle size={17} className="text-risk-medium shrink-0 mt-0.5" /> : <CheckCircle2 size={17} className="text-risk-low shrink-0 mt-0.5" />}
                <div className="flex-1">
                  <p className={`text-sm ${n.read ? "text-slate-600" : "text-slate-800 font-medium"}`}>{n.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full bg-accent-600 mt-1.5 shrink-0" />}
              </div>
            ))}
          </div>
        </Card>
      )}
    </PageContainer>
  );
}
