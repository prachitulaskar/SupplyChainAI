import { createContext, useContext, useState, useCallback } from "react";
import { loginWithRole as apiLoginWithRole, login as apiLogin } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("sc_user");
    return stored ? JSON.parse(stored) : null;
  });

  const loginWithRole = useCallback(async (role) => {
    const { token, user: loggedInUser } = await apiLoginWithRole(role);
    localStorage.setItem("sc_token", token);
    localStorage.setItem("sc_user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user: loggedInUser } = await apiLogin(email, password);
    localStorage.setItem("sc_token", token);
    localStorage.setItem("sc_user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("sc_token");
    localStorage.removeItem("sc_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loginWithRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
