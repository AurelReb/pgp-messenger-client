import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { clearError } from '../../config/reducers/authentication';
import { useDispatch, useSelector } from '../../config/store';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/');
    }
    dispatch(clearError);
  }, [history, isAuthenticated, location]);

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
