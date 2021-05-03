import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  messages: {
    padding: '10px 16px',
    borderRadius: '18px',
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
MessageConversation.propTypes = {
  message: PropTypes.object.isRequired,
};
