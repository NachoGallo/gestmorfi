import React, { useContext } from "react";
import MainPage from "./pages/index";
import ErrorPage from "./pages/error";
import Navbar from "./components/Navbar/Navbar";
import { Context } from "./context/Context";

const App = () => {
  const { layout } = useContext(Context);

  const displayLayout = () => {
    switch (layout) {
      case "MAIN_PAGE":
        return <MainPage />;
      case "ERROR_PAGE":
        return <ErrorPage />;

      default:
        return <MainPage />;
    }
  };
  return (
    <>
      <Navbar />
      {displayLayout()}
    </>
  );
};

export default App;
