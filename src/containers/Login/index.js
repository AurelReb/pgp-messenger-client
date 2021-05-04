import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useSelector } from '../../config/store';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/conversations');
    }
  });

  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/register">
        <RegisterPage />
      </Route>
    </Switch>
  );
};

export default Login;
