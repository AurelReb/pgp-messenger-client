import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  center: {
    textAlign: "center",
  },
}));

export default function Home() {
  const classes = useStyles();

  const history = useHistory();

  history.push("/home");

  const LoginRoute = () => {
    let path = "/login";
    history.push(path);
  };
  const RegisterRoute = () => {
    let path = "/register";
    history.push(path);
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} classes={{ root: classes.center }}>
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
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
