import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainPage from "../pages";
import LoginPage from "../pages/login";
import MealsManagment from "../pages/mealsManagment";
import RegisterPage from "../pages/register";
import Error from "../pages/error";
import Navbar from "../components/Navbar/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/orders" component={MainPage} />
        <Route exact path="/meals" component={MealsManagment} />
        <Route exact path="/error" component={Error} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
