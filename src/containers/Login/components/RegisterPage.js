import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';
import { ArrowForwardIosRounded } from '@material-ui/icons';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from '../../../config/store';
import { registerUser, setError } from '../../../config/reducers/authentication';

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
    marginTop: theme.spacing(3),
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
  tos: {
    marginTop: theme.spacing(3),
  },
  signin: {
    marginTop: theme.spacing(1),
  },
  center: {
    marginBottom: theme.spacing(1),
    textAlign: 'center',
  },
  login: {
    marginTop: theme.spacing(3),
    color: theme.palette.primary.main,
  },
  left: {
    marginLeft: theme.spacing(10),
  },

  logo: {
    maxWidth: 150,
  },
  error: {
    color: theme.palette.error.main,
  },
}));

function RegisterPage() {
  const mounted = useRef(false);
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pgpPublic, setPgpPublic] = useState('');
  const [pgpPrivate, setPgpPrivate] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const error = useSelector((state) => state.error);
  const [keepConnected, setKeepConnected] = useState(false);

  const handleChangeKeepConnected = (e) => {
    setKeepConnected(e.target.checked);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!mounted.current) mounted.current = true;
  }, [mounted]);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePgpPublic = (e) => {
    setPgpPublic(e.target.value);
  };

  const handleChangePgpPrivate = (e) => {
    setPgpPrivate(e.target.value);
  };

  const handleChangeTwoFactorAuth = (e) => {
    setTwoFactorAuth(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword)
      dispatch(registerUser(
        username,
        password,
        pgpPublic,
        pgpPrivate,
        twoFactorAuth,
        keepConnected,
      ));
    else dispatch(setError('Passwords doesn\'t match'));
  };

  return (
    <div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Link to="/">
              <img src={logo} className={classes.logo} alt="logo" />
            </Link>
          </div>
          <Typography className={classes.header_text} variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl margin="normal">
              <TextField
                required
                id="Username"
                label="Username"
                variant="outlined"
                color="primary"
                value={username}
                onChange={handleChangeUsername}
                error={Boolean(error)}
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                color="primary"
                value={password}
                onChange={handleChangePassword}
                error={Boolean(error)}
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                required
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                color="primary"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
                error={Boolean(error)}
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                required
                id="pubKey"
                label="Pgp Public Key"
                variant="outlined"
                color="primary"
                multiline="true"
                value={pgpPublic}
                onChange={handleChangePgpPublic}
                error={Boolean(error)}
              />
            </FormControl>
            <FormControl margin="normal">
              <TextField
                id="privKey"
                label="Pgp Private Key"
                variant="outlined"
                color="primary"
                multiline="true"
                value={pgpPrivate}
                onChange={handleChangePgpPrivate}
              />
            </FormControl>
            <FormControl margin="normal">
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={twoFactorAuth}
                    onChange={handleChangeTwoFactorAuth}
                    name="twoFacorAuth"
                    color="primary"
                  />
              )}
                label="Two Factor Authentication"
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
            <br />
            <FormControl margin="normal">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<ArrowForwardIosRounded>send</ArrowForwardIosRounded>}
                type="submit"
              >
                Register
              </Button>
            </FormControl>
          </form>
          <div className={classes.error}>{error}</div>
          <Link to="/login" className={classes.login}>
            <center>
              Already have an account? Sign In
              {' '}
              <br />
            </center>
          </Link>
        </Paper>
      </main>
    </div>
  );
}

export default RegisterPage;
