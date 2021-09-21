import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from '../../../config/store';
import { changeCurrentConversation } from '../../../config/reducers/conversations';

export default function SingleConversation({ conversation }) {
  const dispatch = useDispatch();

  const handleSelectConversation = () => {
    dispatch(changeCurrentConversation(conversation.id));
  };

  const useStyles = makeStyles(() => ({
    convName: {
      overflowWrap: 'anywhere',
    },
  }));

  const classes = useStyles();

  return (
    <>
      <ListItem button className={classes.convName} onClick={handleSelectConversation}>
        <ListItemText
          primary={conversation.name}
          key="singleConversation"
        />
      </ListItem>
      <Divider />
    </>
  );
}
SingleConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};
