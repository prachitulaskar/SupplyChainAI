import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { getAllUsers } from "../../services/authService";
import { useToast } from "../../context/ToastContext";

const ROLES = ["Admin", "Manager", "Analyst", "Viewer"];

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => { getAllUsers().then(setUsers); }, []);

  function handleAddUser(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const newUser = {
      id: Date.now(),
      name: form.get("name"),
      email: form.get("email"),
      role: form.get("role"),
      status: "Active",
      lastLogin: "—",
    };
    setUsers((u) => [newUser, ...u]);
    setModalOpen(false);
    showToast("User added successfully", "success");
  }

  function toggleStatus(id) {
    setUsers((u) => u.map((x) => x.id === id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x));
  }

  return (
    <PageContainer title="User Management">
      <div className="flex justify-end">
        <Button icon={Plus} size="sm" onClick={() => setModalOpen(true)}>Add User</Button>
      </div>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-100 text-left">
                <th className="pl-4 pb-2 pt-4 font-medium">Name</th>
                <th className="pb-2 pt-4 font-medium">Email</th>
                <th className="pb-2 pt-4 font-medium">Role</th>
                <th className="pb-2 pt-4 font-medium">Status</th>
                <th className="pb-2 pt-4 font-medium">Last Login</th>
                <th className="pb-2 pt-4 pr-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-slate-50 last:border-0">
                  <td className="pl-4 py-3 font-medium text-slate-700">{u.name}</td>
                  <td className="py-3 text-slate-500">{u.email}</td>
                  <td className="py-3">
                    <select
                      value={u.role}
                      onChange={(e) => setUsers((prev) => prev.map((x) => x.id === u.id ? { ...x, role: e.target.value } : x))}
                      className="border border-slate-200 rounded-md text-xs px-2 py-1 outline-none"
                    >
                      {ROLES.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="py-3"><Badge label={u.status} /></td>
                  <td className="py-3 text-slate-500">{u.lastLogin}</td>
                  <td className="py-3 pr-4 flex gap-3">
                    <button onClick={() => toggleStatus(u.id)} className="text-slate-400 hover:text-accent-600" title="Toggle status"><Pencil size={14} /></button>
                    <button onClick={() => setUsers((prev) => prev.filter((x) => x.id !== u.id))} className="text-slate-400 hover:text-risk-high" title="Remove"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add User" width="max-w-md">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500">Full Name</label>
            <input name="name" required className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Email</label>
            <input name="email" type="email" required className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Role</label>
            <select name="role" className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <Button type="submit" className="w-full">Add User</Button>
        </form>
      </Modal>
    </PageContainer>
  );
}
