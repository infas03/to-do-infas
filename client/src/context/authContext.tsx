import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { Role } from "@/constants/role";
import { Employee } from "@/types";

type AuthContextType = {
  isLoggedIn: boolean;
  role: string | null;
  token: string | null;
  userDetails: Employee | null;
  resolved: boolean;
  login: (newToken: string, newRole: Role, userDetails: Employee) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [userDetails, setUserDetails] = useState<Employee | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUserDetails = localStorage.getItem("userDetails");

    if (storedToken && storedRole) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setRole(storedRole);
      setUserDetails(storedUserDetails ? JSON.parse(storedUserDetails) : null);
    }

    setResolved(true);
  }, []);

  const login = (newToken: string, newRole: Role, newUserDetails: Employee) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    localStorage.setItem("userDetails", JSON.stringify(newUserDetails));
    setToken(newToken);
    setRole(newRole);
    setUserDetails(newUserDetails);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userDetails");
    setToken(null);
    setRole(null);
    setUserDetails(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, token, userDetails, resolved, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
