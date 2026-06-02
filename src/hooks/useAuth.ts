import { useState, useEffect, useCallback } from 'react';
import { User, UserRole, getCurrentUser, login, register, logout, updateUser } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const loggedIn = await login(email, password);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const handleRegister = useCallback(async (name: string, email: string, password: string, role?: UserRole) => {
    const registered = await register(name, email, password, role);
    setUser(registered);
    return registered;
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setUser(null);
  }, []);

  const handleUpdateUser = useCallback((updates: Partial<User>) => {
    const updated = updateUser(updates);
    setUser(updated);
    return updated;
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateUser: handleUpdateUser,
  };
}
