import React from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import { Route, Switch } from "react-router-dom";

const Login = () => (
  <Switch>
    <Route exact path="/login">
      <LoginPage />
    </Route>
    <Route exact path="/register">
      <RegisterPage />
    </Route>
  </Switch>
);

export default Login;
