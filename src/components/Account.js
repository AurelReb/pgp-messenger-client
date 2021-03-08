import Container from "@material-ui/core/Container";
import {ArrowForwardIosRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  left: {
    textAlign: "left",
  },
}));

export default function Home() {
  const classes = useStyles()

  return (
    <Container maxWidth="sm">
      <header>
        <Paper elevation={3}>
          <Grid container>
            <Grid item xs={12} classes={{ root: classes.center }}>
              User 02
            </Grid>
          </Grid>
        </Paper>
      </header>
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} classes={{ root: classes.left }}>
            User 02
          </Grid>
          <Grid item xs={12} classes={{ root: classes.left }}>
            User 03
          </Grid>
          <Grid item xs={12} classes={{ root: classes.left }}>
            User 04
          </Grid>
        </Grid>
      </Paper>
      <footer>
        <Grid container>
          <Grid item xs={12} classes={{ root: classes.right }}>
            <Paper elevation={3}>
              <TextField
                id="Message"
                label="Send Message"
                color="secondary"
                multiline="true"
              />
              <Button
                color="secondary"
                className={classes.button}
                endIcon={<ArrowForwardIosRounded>send</ArrowForwardIosRounded>}
              />
            </Paper>
          </Grid>
        </Grid>
      </footer>
    </Container>
  );
}
