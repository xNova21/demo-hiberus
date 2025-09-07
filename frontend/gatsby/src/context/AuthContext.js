import React, { createContext, useState } from "react";

const DEFAULT_USER = {
  id: null,
  email: "",
  name: "",
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_USER);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(DEFAULT_USER);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
