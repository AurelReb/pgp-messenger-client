import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";

export default function MessageConversation({ message }) {
  const classes = makeStyles((theme) => ({
    root: {
      maxWidth: 600,
      "& > * + *": {
        marginTop: theme.spacing(10),
      },
    },
  }));

  return (
    <div className={classes.root}>
      <SnackbarContent message={message.message} />
    </div>
  );
}
