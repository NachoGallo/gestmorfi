import React, { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [layout, setLayout] = useState("LOGIN_PAGE");
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
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
