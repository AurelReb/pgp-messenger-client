import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HighlightedMarkdown from '../../../components/HighlightedMarkdown';

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
    marginRight: -7,
  },
}));

export default function MessageConversation({ message }) {
  const classes = useStyles();

  return (
    <Grid className={classes.messageContainer} item container direction="row-reverse">
      <Paper className={classes.messages}>
        <Typography color="textPrimary">
          <HighlightedMarkdown>
            {message.message}
          </HighlightedMarkdown>
        </Typography>
        <Typography className={classes.dateTypo} color="textSecondary" variant="caption" align="right">
          {new Date(message.created_at * 1000).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Grid>
  );
}
MessageConversation.propTypes = {
  message: PropTypes.object.isRequired,
};
