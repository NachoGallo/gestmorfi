import React, { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [layout, setLayout] = useState("LOGIN_PAGE");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [errorMessage, setErrorMessage] = useState(
    "Hubo un error, intente nuevamente."
  );
  const [loadOrders, setLoadOrders] = useState(false);
  const value = {
    layout,
    setLayout,
    errorMessage,
    setErrorMessage,
    loadOrders,
    setLoadOrders,
    token,
    setToken,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
