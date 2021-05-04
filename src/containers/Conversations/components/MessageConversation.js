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
  messageContainer: {
    '&:last-child': {
      marginBottom: 'auto',
    },
  },
  dateTypo: {
    display: 'block',
  },
}));

export default function MessageConversation({ message }) {
  const classes = useStyles();

  return (
    <Grid className={classes.messageContainer} item container direction="row-reverse">
      <Paper className={classes.messages}>
        <Typography color="textPrimary">
          {message.message}
        </Typography>
        <Typography className={classes.dateTypo} color="textSecondary" variant="caption" align="right">
          {new Date(message.created_at * 1000).getHours()}
          :
          {new Date(message.created_at * 1000).getMinutes()}
        </Typography>
      </Paper>
    </Grid>
  );
}
MessageConversation.propTypes = {
  message: PropTypes.object.isRequired,
};
