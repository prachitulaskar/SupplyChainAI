import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Suppliers from "./pages/Suppliers";
import Inventory from "./pages/Inventory";
import Transportation from "./pages/Transportation";
import Forecast from "./pages/Forecast";
import Risk from "./pages/Risk";
import NetworkPage from "./pages/NetworkPage";
import Upload from "./pages/Upload";
import Chat from "./pages/Chat";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import UserManagement from "./pages/admin/UserManagement";
import SystemMonitoring from "./pages/admin/SystemMonitoring";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/transportation" element={<ProtectedRoute><Transportation /></ProtectedRoute>} />
            <Route path="/forecast" element={<ProtectedRoute><Forecast /></ProtectedRoute>} />
            <Route path="/risk" element={<ProtectedRoute><Risk /></ProtectedRoute>} />
            <Route path="/network" element={<ProtectedRoute><NetworkPage /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute roles={["Admin", "Manager", "Analyst"]}><Upload /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute roles={["Admin", "Manager", "Analyst"]}><Reports /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={["Admin"]}><UserManagement /></ProtectedRoute>} />
            <Route path="/admin/system" element={<ProtectedRoute roles={["Admin"]}><SystemMonitoring /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
