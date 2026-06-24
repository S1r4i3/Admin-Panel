import { createContext, useState, useCallback } from "react";
import { api } from "@/lib/api";

// localStorage key names — must be simple strings, never actual token values
const TOKEN_KEY = "smartlogix_access_token";
const REFRESH_KEY = "smartlogix_refresh_token";
const USER_KEY = "smartlogix_user";

export const AuthContext = createContext(null);
export { TOKEN_KEY, REFRESH_KEY, USER_KEY };

// Decode JWT payload without verifying signature (client-side only)
function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return {};
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const login = useCallback(async (email, password) => {
    // SimpleJWT standard endpoint — returns { access, refresh }
    const res = await api.post("/api/token/", { email, password });
    const { access, refresh } = res;
    // Extract user info from JWT payload
    const payload = parseJwt(access);
    const userData = {
      user_id: payload.user_id,
      email: payload.email ?? email,
      username: payload.username ?? email,
    };
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setToken(access);
    setUser(userData);
    return res;
  }, []);

  const logout = useCallback(async () => {
    try {
      const refresh = localStorage.getItem(REFRESH_KEY);
      await api.post("/api/token/blacklist/", { refresh });
    } catch {
      // ignore logout errors
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
    }
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
