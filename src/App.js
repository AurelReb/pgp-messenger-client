import React, { useEffect, useRef } from 'react';
import {
  Router,
  Switch as RouteSwitch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import Login from './containers/Login';
import Conversations from './containers/Conversations';

import StateProvider, { useDispatch, useSelector, useTrackedState } from './config/store';
import { getMuiThemeConfig } from './config/theming';
import routerHistory from './config/history';
import { JUST_LOGGED_IN } from './config/reducers/authentication';

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) history.replace('/login');
  });

  return isAuthenticated ? <Route {...props} /> : null;
};

function AppRouter() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { darkTheme, isAuthenticated } = useTrackedState();
  const mounted = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname.substr(-1) !== '/') history.replace(`${pathname}/`);
  }, [pathname, history]);

  const onComponentMount = () => {
    if (isAuthenticated)
      dispatch({ type: JUST_LOGGED_IN });
    mounted.current = true;
  };

  useEffect(() => {
    if (!mounted.current) onComponentMount();
  });

  return (
    <ThemeProvider theme={getMuiThemeConfig(darkTheme)}>
      <CssBaseline />
      <RouteSwitch>
        <Route exact path="/login">
          <Login />
        </Route>
        <ProtectedRoute exact path="/">
          <Conversations />
        </ProtectedRoute>
        <Route exact path="/register">
          <Login />
        </Route>
      </RouteSwitch>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <StateProvider>
      <Router history={routerHistory}>
        <AppRouter />
      </Router>
    </StateProvider>
  );
}

/*
function Test() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { darkTheme } = useTrackedState();

  const handleToggleDarkTheme = () => {
    dispatch(toggleDarkTheme);
  };
  return (
    <>
      <header>
        <img src={logo} className={classes.logo} alt="logo" />
      </header>
      <footer>
        <FormControlLabel
          control={
            <Switch
              checked={darkTheme}
              onChange={handleToggleDarkTheme}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Dark Theme"
        />
      </footer>
    </>
  );
}
*/
