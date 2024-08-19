"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const LOCAL_STORAGE_KEY = "has-logged-in";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuthStatus) {
      const storedAuthStatusInt = parseInt(storedAuthStatus);
      setIsAuthenticated(storedAuthStatusInt === 1);
    }
  }, []);
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, "1");
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
