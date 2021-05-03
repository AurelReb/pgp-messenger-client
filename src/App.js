import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch as RouteSwitch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import Login from './containers/Login';
import Home from './components/home';
import Account from './components/Account';
import Conversations from './containers/Conversations';

import StateProvider, { useTrackedState } from './config/store';
import { getMuiThemeConfig } from './config/theming';

function AppRouter() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { darkTheme } = useTrackedState();

  useEffect(() => {
    if (pathname.substr(-1) !== '/') history.replace(`${pathname}/`);
  }, [pathname, history]);

  return (
    <ThemeProvider theme={getMuiThemeConfig(darkTheme)}>
      <CssBaseline />
      <RouteSwitch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/conversations">
          <Conversations />
        </Route>
        <Route exact path="/register">
          <Login />
        </Route>
        <Route exact path="/account">
          <Account />
        </Route>
      </RouteSwitch>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <StateProvider>
      <Router>
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
