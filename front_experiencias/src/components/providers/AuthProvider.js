import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const AuthContext = React.createContext("");

export const AuthProvider = ({ children, value: initialValue }) => {
  const [value, setValue] = useLocalStorage("auth", initialValue);
  return (
    <AuthContext.Provider value={[value, setValue]}>
      {children}
    </AuthContext.Provider>
  );
};

