import React, { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [layout, setLayout] = useState("LOGIN_PAGE");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [errorMessage, setErrorMessage] = useState(
    "Hubo un error, intente nuevamente."
  );
  const [loadOrders, setLoadOrders] = useState(false);

  //Functions

  const closeSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
    closeSession,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
