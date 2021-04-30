import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch as RouteSwitch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Login from "./containers/Login";
import Home from "./components/home";
import Account from "./components/Account";

import StateProvider, {
  useDispatch,
  useTrackedState,
  toggleDarkTheme,
} from "./config/store";
import { getMuiThemeConfig } from "./config/theming";
import { useEffect } from "react";
import UserSettings from "./containers/Settings/Index";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 100,
  },
}));

function AppRouter() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { darkTheme } = useTrackedState();

  useEffect(() => {
    if (pathname.substr(-1) !== "/") history.replace(`${pathname}/`);
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
        <Route exact path="/register">
          <Login />
        </Route>
        <Route exact path="/account">
          <Account />
        </Route>
        <Route exact path="/settings">
          <UserSettings />
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
