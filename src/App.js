import logo from './logo.svg';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, ArrowForwardIosRounded } from '@material-ui/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  logo: {
    maxWidth: 100,
  },
  center: {
    textAlign: 'center',
  },
}));

export default function App() {
  return (
    <Container maxWidth="md">
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

function Home() {
  const classes = useStyles();

  const history = useHistory();

  history.push('/home');

  const LoginRoute = () => {
    let path = '/login';
    history.push(path);
  };
  const RegisterRoute = () => {
    let path = '/register';
    history.push(path);
  };
  return (
    <header>
      <img src={logo} className={classes.logo} alt="logo" />
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
  };
  return (
    <React.Fragment>
      <header className="App-header">
        <CssBaseline />
        <img src={logo} className={classes.logo} alt="logo" />
        <Container maxWidth="sm">
          <TextField
            onclick="console.log('clicked');"
            required
            id="Username"
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
  };
  return (
    <React.Fragment>
      <header className="App-header">
        <CssBaseline />
        <img src={logo} className={classes.logo} alt="logo" />
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} classes={{ root: classes.center }}>
            <TextField
              required
              id="Username"
              label="Username"
              variant="outlined"
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} classes={{ root: classes.center }}>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} classes={{ root: classes.center }}>
            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} classes={{ root: classes.center }}>
            <TextField
              required
              id="pubKey"
              label="Pgp Public Key"
              variant="outlined"
              color="secondary"
              multiline="true"
            />
          </Grid>
          <Grid item xs={12} classes={{ root: classes.center }}>
            <TextField
              required
              id="privKey"
              label="Pgp Private Key"
              variant="outlined"
              color="secondary"
              multiline="true"
            />
          </Grid>
          <Grid item xs={12} classes={{ root: classes.center }}>
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
          </Grid>
        </Grid>
      </header>
    </React.Fragment>
  );
}
