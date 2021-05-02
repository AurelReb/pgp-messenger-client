import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles, TextField } from "@material-ui/core";
import { ArrowBack, ArrowForwardIosRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    width: 130,
  },
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
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },

  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing(1),
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
    textAlign: "center",
  },
  login: {
    marginTop: theme.spacing(3),
    color: theme.palette.secondary.main,
  },
  left: {
    marginLeft: theme.spacing(10),
  },
}));

function RegisterPage(props) {
  const mounted = useRef(false);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!mounted.current) mounted.current = true;
  }, [mounted]);

  return (
    <div>
      <CssBaseline />
      <header>
        <Grid item xs={6} className={classes.left}>
          <Link to="/" style={{ textDecoration: "none" }}>
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
            <Link to="/"></Link>
          </div>
          <Typography className={classes.header_text} variant="h5">
            Sign Up
          </Typography>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} classes={{ root: classes.center }}>
              <TextField
                required
                id="Username"
                label="Username"
                variant="outlined"
                color="primary"
              />
            </Grid>
            <Grid item xs={12} classes={{ root: classes.center }}>
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                color="primary"
              />
            </Grid>
            <Grid item xs={12} classes={{ root: classes.center }}>
              <TextField
                required
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                color="primary"
              />
            </Grid>
            <Grid item xs={12} classes={{ root: classes.center }}>
              <TextField
                required
                id="pubKey"
                label="Pgp Public Key"
                variant="outlined"
                color="primary"
                multiline="true"
              />
            </Grid>
          </Grid>
          <Grid item xs={6} classes={{ root: classes.center }}>
            <Link to="/account" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<ArrowForwardIosRounded>send</ArrowForwardIosRounded>}
              >
                Register
              </Button>
            </Link>
          </Grid>
          <Link to="/login" className={classes.login}>
            <center>
              Already have an account? Sign In <br />
            </center>
          </Link>
        </Paper>
      </main>
    </div>
  );
}

export default RegisterPage;
