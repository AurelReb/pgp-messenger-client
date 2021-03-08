import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./logo.svg";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 100,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <header>
        <img src={logo} className={classes.logo} alt="logo" />
      </header>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}
