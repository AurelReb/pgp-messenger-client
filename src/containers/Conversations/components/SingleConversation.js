import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from '../../../config/store';
import { changeCurrentConversation, deleteConversation } from '../../../config/reducers/conversations';

export default function SingleConversation({ conversation }) {
  const dispatch = useDispatch();

  const handleSelectConversation = () => {
    dispatch(changeCurrentConversation(conversation.id));
  };

  const handleDeleteConversation = () => {
    console.log(conversation);
    dispatch(deleteConversation(conversation.id));
  };

  const useStyles = makeStyles(() => ({
    convName: {
      overflowWrap: 'anywhere',
    },
  }));

  const classes = useStyles();

  return (
    <ListItem button className={classes.convName}>
      <ListItemText
        primary={conversation.name}
        key={conversation.name}
        onClick={handleSelectConversation}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={handleDeleteConversation}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
SingleConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};
