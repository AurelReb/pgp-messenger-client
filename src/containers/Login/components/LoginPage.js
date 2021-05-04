import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import ArrowForwardIosRounded from '@material-ui/icons/ArrowForwardIosRounded';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useDispatch, useSelector } from '../../../config/store';
import { getToken } from '../../../config/reducers/authentication';

import logo from '../../../logo.f08';

const useStyles = makeStyles((theme) => ({
  button: {
    width: 130,
    alignSelf: 'center',
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
    textAlign: 'center',
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
    alignSelf: 'center',
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
  const [keepConnected, setKeepConnected] = useState(false);

  const handleChangeKeepConnected = (e) => {
    setKeepConnected(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getToken(username, password, keepConnected));
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
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Link to="/">
              <img src={logo} className={classes.logo} alt="logo" />
            </Link>
          </div>
          <Typography className={classes.header_text} variant="h5">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl margin="normal">
              <TextField
                required
                label="Username"
                name="username"
                variant="outlined"
                color="primary"
                onChange={handleChangeUsername}
                value={username}
                error={Boolean(error)}
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                required
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                color="primary"
                onChange={handleChangePassword}
                value={password}
                error={Boolean(error)}

              />
            </FormControl>
            <FormControl margin="normal">
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={keepConnected}
                    onChange={handleChangeKeepConnected}
                    name="keepConnected"
                    color="primary"
                  />
              )}
                label="Keep me logged in"
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                endIcon={<ArrowForwardIosRounded>send</ArrowForwardIosRounded>}
                fullWidth
              >
                Login
              </Button>
            </FormControl>
          </form>
          <div className={classes.error}>{error}</div>
          <Link to="/register" className={classes.register}>
            <div>
              <center>
                Have not an account yet? Register
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
