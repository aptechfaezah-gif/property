"use client";

import { useEffect, useState } from "react";
import { getDemoUser, clearDemoLogin, isDemoLoggedIn, type DemoUser } from "@/lib/client-auth";

export function useAuth() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoLoggedIn()) {
      setUser(getDemoUser());
    }
    setLoading(false);
  }, []);

  const logout = () => {
    clearDemoLogin();
    setUser(null);
  };

  return { user, loading, logout };
}
