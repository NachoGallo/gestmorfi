import React, { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [layout, setLayout] = useState("LOGIN_PAGE");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userSession, setUserSession] = useState(localStorage.getItem("user"));
  const [errorMessage, setErrorMessage] = useState(
    "Hubo un error, intente nuevamente."
  );
  const [loadOrders, setLoadOrders] = useState(false);

  //Functions

  const logoutSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUserSession(null);
    setLayout("LOGIN_PAGE");
  };

  const value = {
    layout,
    setLayout,
    errorMessage,
    setErrorMessage,
    loadOrders,
    setLoadOrders,
    token,
    setToken,
    logoutSession,
    userSession,
    setUserSession,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
