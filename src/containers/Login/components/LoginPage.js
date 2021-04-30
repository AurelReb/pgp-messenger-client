import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles, TextField } from "@material-ui/core";
import { useDispatch, getToken, useSelector } from "../../../config/store";
import { ArrowBack, ArrowForwardIosRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  header: {
    margin: theme.spacing(1),
  },
  header_text: {
    marginTop: theme.spacing(5),
  },

  form: {
    width: "100%", // Fix IE11 issue.
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
    textAlign: "center",
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const mounted = useRef(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.error);

  useEffect(() => {
    const onConponentMount = () => {
      history.replace("/");
    };
    if (!mounted.current) {
      onConponentMount();
      mounted.current = true;
    }
  }, [error, mounted, history]);

  const submit = () => {
    dispatch(getToken(username,password));
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleBackRoute = () => {
    let path = "/";
    history.push(path);
  };

  return (
    <div>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Link to="/"></Link>
          </div>
          <Typography className={classes.header_text} variant="h5">
            Sign in
          </Typography>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} classes={{ root: classes.center }}>
              <TextField
                required
                label="Username"
                variant="outlined"
                color="secondary"
                onChange={handleChangeUsername}
                value={username}
              />
            </Grid>
            <Grid type item xs={12} classes={{ root: classes.center }}>
              <TextField
                required
                label="Password"
                type="password"
                variant="outlined"
                color="secondary"
                onChange={handleChangePassword}
                value={password}
              />
            </Grid>
            <Grid item xs={12} classes={{ root: classes.center }}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<ArrowBack>send</ArrowBack>}
                onClick={handleBackRoute}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={submit}
                endIcon={<ArrowForwardIosRounded>send</ArrowForwardIosRounded>}
              >
                Login
              </Button>
              <div className = {classes.error} >{error}</div>
            </Grid>
          </Grid>
          <Link to="register" className={classes.register}>
            <center>
              Have not an account yet? Register <br />
            </center>
          </Link>
        </Paper>
      </main>
    </div>
  );
};

export default LoginPage;
