import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainPage from "../pages";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import { Context } from "../context/Context";

const AppRouter = () => {
  const { setToken, token } = useContext(Context);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/orders" component={MainPage} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
