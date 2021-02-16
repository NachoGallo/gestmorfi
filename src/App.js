import React, { useContext } from "react";
import MainPage from "./pages/index";
import ErrorPage from "./pages/error";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
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
      case "LOGIN_PAGE":
        return <LoginPage />;
      case "REGISTER_PAGE":
        return <RegisterPage />;

      default:
        return <LoginPage />;
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
