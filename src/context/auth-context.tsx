"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (stored) {
      setToken(stored);
    }
  }, []);

  async function login(email: string, password: string) {
    // demo credentials
    if (email === "demo@example.com" && password === "password") {
      const demoToken = "demo-token";
      localStorage.setItem("token", demoToken);
      setToken(demoToken);
      router.push("/dashboard/analytics");
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

