import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  center: {
    textAlign: 'center',
  },
}));

export default function Home() {
  const classes = useStyles();

  const history = useHistory();

  const LoginRoute = () => {
    const path = '/login';
    history.push(path);
  };
  const RegisterRoute = () => {
    const path = '/register';
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
