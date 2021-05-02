import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";

import { Link, useHistory } from "react-router-dom";

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

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} classes={{ root: classes.center }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Login
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Register
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
