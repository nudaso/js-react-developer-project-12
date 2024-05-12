import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(JSON.parse(window.localStorage.getItem("authData")));

  const logIn = (newAuthData) => {
    window.localStorage.setItem("authData", JSON.stringify(newAuthData))
    setAuthData(() => newAuthData );
  }

  const logOut = () => {
    window.localStorage.removeItem("authData")
    setAuthData(() => null);
  }
  return (
    <AuthContext.Provider value={ {authData, setAuthData, logIn, logOut} }>
      {children}
    </AuthContext.Provider>
  )
}
