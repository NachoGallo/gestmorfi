import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./routers/AppRouter";

const App = () => {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
