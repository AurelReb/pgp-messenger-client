import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from '../../../config/store';
import { changeCurrentConversation } from '../../../config/reducers/conversations';

export default function SingleConversation({ conversation }) {
  const dispatch = useDispatch();

  const handleSelectConversation = () => {
    dispatch(changeCurrentConversation(conversation.id));
    dispatch((conversation.id));
  };

  const useStyles = makeStyles(() => ({

    gridClasse: {
      display: 'flex',
    },
    convName: {
      flex: 1,
    },
    deleteIcon: {
      flex: 2,
      color: 'palette.text.disabled',
    },
  }));

  const classes = useStyles();

  return (
    <Grid className={classes.gridClasse}>
      <ListItem
        className={classes.convName}
        button
        key={conversation.id}
        onClick={handleSelectConversation}
      >
        <ListItemText primary={conversation.name} />
      </ListItem>
      <IconButton className={classes.DeleteIcon} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
}
SingleConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};
