import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

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
