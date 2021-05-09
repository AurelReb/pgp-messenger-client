import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from '../../../config/store';
import { changeCurrentConversation, deleteConversation } from '../../../config/reducers/conversations';

export default function SingleConversation({ conversation }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = () => {
    dispatch(deleteConversation(conversation.id));
    setOpen(false);
  };

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
      <ListItem button className={classes.convName}>
        <ListItemText
          primary={conversation.name}
          key="ConvName"
          onClick={handleSelectConversation}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Do you want to delete this conversation ?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action is irreversible and all messages in this conversation will be deleted.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseDelete} color="secondary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
}
SingleConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};
