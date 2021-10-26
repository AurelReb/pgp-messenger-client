import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useDispatch } from '../../../config/store';

import { deleteConversation } from '../../../config/reducers/conversations';

const useStyles = makeStyles(() => ({
  infoButton: {
    verticalAlign: 'sub',
  },
  deleteButton: {
    width: '-webkit-fill-available',
  },
}));

export default function ConversationInfos({ conversation }) {
  const ITEM_HEIGHT = 60;

  const dispatch = useDispatch();
  const classes = useStyles();
  const [openDelete, setOpenDelete] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const open = Boolean(anchorEl);

  /* handle list of users */

  const handleClickUsersList = (event) => {
    if (conversation != null) {
      setUsers(conversation.users);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleCloseUsersList = () => {
    setUsers([]);
    setAnchorEl(null);
  };

  /* handle info dialog */

  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleClickCloseInfo = () => {
    setOpenInfo(false);
  };

  /* handle delete dialog */

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDeleteButton = () => {
    setOpenDelete(false);
  };

  const handleCloseDelete = () => {
    if (conversation != null) {
      dispatch(deleteConversation(conversation.id));
      setOpenDelete(false);
    }
  };

  return (
    <>
      {conversation && conversation.name}
      {conversation && (
      <IconButton className={classes.infoButton} aria-label="info" onClick={handleClickOpenInfo}>
        <InfoIcon />
      </IconButton>
      )}
      {/* Dialog for info button */}
      <Dialog
        open={openInfo}
        onClose={handleClickCloseInfo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        keepMounted
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">{conversation && conversation.name}</DialogTitle>
        <DialogContent>
          <Button className={classes.deleteButton} variant="outlined" color="primary" onClick={handleClickUsersList}>
            List of users
          </Button>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseUsersList}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            {users.map((user) => (
              <MenuItem key={user.username} onClick={handleCloseUsersList}>
                {user.username}
              </MenuItem>
            ))}
          </Menu>
        </DialogContent>
        <DialogContent>
          <Button className={classes.deleteButton} variant="outlined" color="secondary" onClick={handleClickOpenDelete}>
            Delete
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseInfo} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for delete button */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDeleteButton}
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
          <Button onClick={handleCloseDeleteButton} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
ConversationInfos.propTypes = {
  conversation: PropTypes.object,
};

ConversationInfos.defaultProps = {
  conversation: null,
};
