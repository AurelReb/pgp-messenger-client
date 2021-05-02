import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  messages: {
      padding: "10px 16px",
      borderRadius: "18px",
      backgroundColor: theme.palette.primary.main,
  },
}));

export default function MessageConversation({ message }) {
  const classes = useStyles();

  return (
    <Grid item container direction="row-reverse">
      <Paper className={classes.messages}>
          <Typography color="textPrimary">
            {message.message}
          </Typography>
      </Paper>
    </Grid>
  );
}
