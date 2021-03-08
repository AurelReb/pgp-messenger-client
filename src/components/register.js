import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ArrowBack, ArrowForwardIosRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  center: {
    textAlign: "center",
  },
}));

export default function Register() {
  const classes = useStyles();

  const history = useHistory();

  const BackRoute = () => {
    let path = "/";
    history.push(path);
  };
  return (
    <React.Fragment>
      <header className="App-header">
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper elevation={3}>
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
                  required
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
                  required
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
                  endIcon={
                    <ArrowForwardIosRounded>send</ArrowForwardIosRounded>
                  }
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </header>
    </React.Fragment>
  );
}
