import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useDispatch } from '../../../config/store';
import { postConversation } from '../../../config/reducers/conversations';

export default function AddConversation() {
  const useStyles = makeStyles((theme) => ({
    sendButton: {
      padding: '10px',
      marginLeft: '10px',
    },
    userList: {
      marginTop: '10px',
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [newConvName, setNewConvName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [usersDisplay, setUsersDisplay] = useState([]);
  const [listOfUsersString, setListOfUsersString] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNewConvName('');
    setUsersDisplay([]);
    setListOfUsersString('');
    setOpen(false);
  };

  const createConversation = () => {
    if (newConvName !== '') {
      dispatch(postConversation(newConvName.trim(), usersDisplay));
      setNewConvName('');
      setUsersDisplay([]);
      handleClose();
    }
    setNewConvName('');
    setUsersDisplay([]);
    handleClose();
  };

  const handleNewConvName = (e) => {
    setNewConvName(e.target.value);
  };

  const handleNewUser = (e) => {
    setNewUserName(e.target.value.trim());
  };

  const handleAddUser = () => {
    if (newUserName !== '') {
      if (!usersDisplay.find((x) => x === newUserName)) {
        setUsersDisplay([...usersDisplay, newUserName]);
        setListOfUsersString([...listOfUsersString, ' ', newUserName, ',']);
      }
      setNewUserName('');
    }
  };

  return (
    <>
      <Tooltip title="Add a new conversation">
        <Fab
          color="secondary"
          onClick={handleClickOpen}
          className={classes.button}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please write the name of the new conversation and add at least one username.
          </DialogContentText>
          <TextField
            required
            autoFocus
            inputProps={{ maxLength: 64 }}
            onChange={handleNewConvName}
            margin="dense"
            id="NewConvName"
            value={newConvName}
            label="Conversation name"
            fullWidth
          />

          <Grid container alignItems="flex-end">
            <Grid xs={11} item>

              <TextField
                onChange={handleNewUser}
                margin="dense"
                id="newUsername"
                value={newUserName}
                label="To"
                fullWidth
              />

            </Grid>
            <Grid xs={1} item>
              <IconButton
                variant="contained"
                color="primary"
                onClick={handleAddUser}
                className={classes.sendButton}
              >
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid className={classes.userList}>
              <Typography color="palette.text.secondary">
                Users in the conversation :
                {listOfUsersString}
              </Typography>
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createConversation} color="primary" disabled={!newConvName}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
