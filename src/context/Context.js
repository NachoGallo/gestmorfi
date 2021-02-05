import React, { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [layout, setLayout] = useState("MAIN_PAGE");
  const [errorMessage, setErrorMessage] = useState(
    "Hubo un error, intente nuevamente."
  );

  const value = {
    layout,
    setLayout,
    errorMessage,
    setErrorMessage,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
