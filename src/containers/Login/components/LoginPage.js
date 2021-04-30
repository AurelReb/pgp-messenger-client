import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ArrowBack, ArrowForwardIosRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import userApi from "../../../api/userApi"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  center: {
    textAlign: "center",
  },
}));


export default function LoginPage() {
  const classes = useStyles();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const submit = async () => {
    try {
      const {data} = await userApi.getUserToken(username, password)
      sessionStorage.access_token = data.access;
      sessionStorage.refresh_token = data.refresh;
    }
    catch (error) {
      setError("invalid login")
    }
  }

  const handleChangeUsername = e => {
    setUsername(e.target.value)
  }

  const handleChangePassword = e => {
    setPassword(e.target.value)
  }

  const history = useHistory();

  const BackRoute = () => {
    let path = "/";
    history.push(path);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper elevation={3}>
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
            <Grid item xs={12} classes={{ root: classes.center }}>
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
                onClick={BackRoute}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={submit}
                endIcon={<ArrowForwardIosRounded>send</ArrowForwardIosRounded>}
              >
                Login
              </Button>
              {error}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
