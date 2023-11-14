import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  login: (data: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isManager: boolean;
}

interface UserData {
  name: string;
  email: string;
  avatar: string;
  venueManager: boolean;
  accessToken: string;
}

const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
  const [isManager, setIsManager] = useState<boolean>(localStorage.getItem("isManager") === "true" || false);

  const login = (data: UserData) => {
    setAuthToken(data.accessToken);
    localStorage.setItem("authToken", data.accessToken);

    setIsManager(data.venueManager);
    localStorage.setItem("isManeger", JSON.stringify(data.venueManager));
    console.log(isManager);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("isManeger");
  };

  const isAuthenticated: boolean = !!authToken;

  return <AuthContext.Provider value={{ login, logout, isAuthenticated, isManager }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
