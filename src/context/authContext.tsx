import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  login: (data: UserData) => void;
  logout: () => void;
  becomeManager: (data: UserData) => void;
  isAuthenticated: boolean;
  isManager: boolean;
  authToken: string | null;
  userName: string | null;
  userAvatar: string | null;
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
  const [isManager, setIsManager] = useState<boolean>(() => {
    const storedIsManager = localStorage.getItem("isManager");
    return storedIsManager ? JSON.parse(storedIsManager) : false;
  });
  const [userName, setUserName] = useState(localStorage.getItem("userName") || null);
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem("userAvatar") || null);

  const login = (data: UserData) => {
    setAuthToken(data.accessToken);
    localStorage.setItem("authToken", data.accessToken);

    setUserName(data.name);
    localStorage.setItem("userName", data.name);

    setIsManager(data.venueManager);
    localStorage.setItem("isManager", JSON.stringify(data.venueManager));

    setUserAvatar(data.avatar);
    localStorage.setItem("userAvatar", data.avatar);
  };

  const logout = () => {
    setAuthToken(null);
    setUserName(null);
    setUserAvatar(null);
    localStorage.clear();
  };

  const becomeManager = (data: UserData) => {
    setIsManager(data.venueManager);
    localStorage.setItem("isManager", JSON.stringify(data.venueManager));
  };

  const isAuthenticated: boolean = !!authToken;

  return (
    <AuthContext.Provider
      value={{ login, logout, isAuthenticated, isManager, authToken, userName, userAvatar, becomeManager }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
