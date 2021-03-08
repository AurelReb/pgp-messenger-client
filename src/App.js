import logo from './logo.svg';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { ArrowBack, ArrowForwardIosRounded } from '@material-ui/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function App() {
  return (
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
    );
}



function Home() {

  const classes = useStyles();

  const history = useHistory();

  history.push('/home')

  const LoginRoute = () => {
    let path = '/login';
    history.push(path);
  }
  const RegisterRoute = () => {
    let path = '/register';
    history.push(path);
  }
  return(
  <header className="App-header">
    <img src={logo} className = "App-logo" alt="logo"/>
    <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={LoginRoute}
        >
        Login
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={RegisterRoute}
        >
          Register
      </Button>
    </header>
    );
}

function Login() {
  const classes = useStyles();

  const history = useHistory();

  const BackRoute = () => {
    let path = '/';
    history.push(path);
  }
  return (
    <React.Fragment>
      <header className="App-header">
      <CssBaseline />
        <img src={logo} className = "App-logo" alt="logo"/>
        <Container maxWidth="sm">
        <TextField 
        onclick="console.log('clicked');"
        required id="Username"
        label="Username"
        variant="outlined"
        color="secondary"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          color="secondary"
        />
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<ArrowBack>send</ArrowBack>}
        onClick={BackRoute}
        >
        Back
        </Button>
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<ArrowForwardIosRounded>send</ArrowForwardIosRounded>}
        >
        Login
        </Button>
      </Container>
      </header>
    </React.Fragment>
  );
}

function Register() {
  const classes = useStyles();

  const history = useHistory();

  const BackRoute = () => {
    let path = '/';
    history.push(path);
  }
  return (
    <React.Fragment>
      <header className="App-header">
      <CssBaseline />
        <img src={logo} className = "App-logo" alt="logo"/>
        <Container maxWidth="sm">
        <TextField 
        required id="Username"
        label="Username"
        variant="outlined"
        color="secondary"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          color="secondary"
        />
        <TextField
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          color="secondary"
        />
        <TextField 
        required id="pubKey"
        label="Pgp Public Key"
        variant="outlined"
        color="secondary"
        multiline = "true"
        />
        <TextField 
        required id="privKey"
        label="Pgp Private Key"
        variant="outlined"
        color="secondary"
        multiline = "true"
        />
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<ArrowBack>send</ArrowBack>}
        onClick={BackRoute}
        >
        Back
        </Button>
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<ArrowForwardIosRounded>send</ArrowForwardIosRounded>}
        >
        Register
      </Button>
      </Container>
      </header>
    </React.Fragment>
  );
}