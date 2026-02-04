import { AuthContext } from "@/context/auth";
import type { User } from "@/types/user";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState, type ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    setUser(jwtDecode<User>(token));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(jwtDecode<User>(token));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
