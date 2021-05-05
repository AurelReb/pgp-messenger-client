import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from '../../../config/store';
import { changeCurrentConversation } from '../../../config/reducers/conversations';

export default function SingleConversation({ conversation }) {
  const dispatch = useDispatch();

  const handleSelectConversation = () => {
    dispatch(changeCurrentConversation(conversation.id));
    dispatch((conversation.id));
  };

  return (
    <ListItem button key={conversation.id} onClick={handleSelectConversation}>
      <ListItemText primary={conversation.name} />
    </ListItem>
  );
}
SingleConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};
