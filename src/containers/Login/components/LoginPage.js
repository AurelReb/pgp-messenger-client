import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import ArrowForwardIosRounded from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { useDispatch, useSelector } from '../../../config/store';
import { getToken } from '../../../config/reducers/authentication';

import logo from '../../../logo.f08';

const useStyles = makeStyles((theme) => ({
  button: {
    width: 130,
  },

  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3,
    )}px`,
  },

  header: {
    margin: theme.spacing(1),
  },

  header_text: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },

  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    marginTop: theme.spacing(3),
  },

  register: {
    marginTop: theme.spacing(3),
    color: theme.palette.primary.main,
  },

  center: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },

  error: {
    color: theme.palette.error.main,
  },

  left: {
    marginLeft: theme.spacing(10),
  },

  logo: {
    maxWidth: 150,
  },

}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.error);

  const submit = () => {
    dispatch(getToken(username, password));
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <CssBaseline />
      <header>
        <Grid item xs={6} className={classes.left}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<ArrowBack>send</ArrowBack>}
            >
              Back
            </Button>
          </Link>
        </Grid>
      </header>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Link to="/">
              <img src={logo} className={classes.logo} alt="logo" />
            </Link>
          </div>
          <Typography className={classes.header_text} variant="h5">
            Sign in
          </Typography>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} classes={{ root: classes.center }}>
              <TextField
                required
                label="Username"
                name="username"
                variant="outlined"
                color="primary"
                onChange={handleChangeUsername}
                value={username}
              />
            </Grid>
            <Grid type item xs={12} classes={{ root: classes.center }}>
              <TextField
                required
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                color="primary"
                onChange={handleChangePassword}
                value={password}
              />
            </Grid>
          </Grid>
          <Grid item xs={6} classes={{ root: classes.center }}>
            <Button
              variant="contained"
              color="primary"
              onClick={submit}
              className={classes.button}
              endIcon={<ArrowForwardIosRounded>send</ArrowForwardIosRounded>}
            >
              Login
            </Button>
          </Grid>
          <div className={classes.error}>{error}</div>
          <Link to="/register" className={classes.register}>
            <div>
              <center>
                Have not an account yet? Register
                {' '}
                <br />
              </center>
            </div>
          </Link>
        </Paper>
      </main>
    </div>
  );
};

export default LoginPage;
