import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import ArrowForwardIosRounded from '@material-ui/icons/ArrowForwardIosRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MessageConversation from './components/MessageConversation';
import SingleConversation from './components/SingleConversation';

import { useDispatch, useSelector } from '../../config/store';
import {
  getConversationMessages,
  postConversationMessage,
} from '../../config/reducers/conversations';
import { toggleDarkTheme } from '../../config/reducers';
import { logout } from '../../config/reducers/authentication';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: 'auto',
  },

  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flex: 1,
    padding: theme.spacing(3),
    height: '100vh',
  },
  singleContent: {
    marginTop: theme.spacing(2),
  },
  toolbarColor: {
    backgroundColor: theme.palette.primary.dark,
  },
  textInput: {
    flex: '9',
  },
  gridSend: {
    display: 'flex',
    marginTop: '16px',
  },
  sendButton: {
    padding: '10px',
    marginLeft: '10px',

  },
  messageContent: {
    height: 'calc(100% - 64px - 50px )',
    overflowY: 'auto',
  },
  darkButton: {
    marginLeft: 'auto',
    color: 'white',
  },
  dateBubble: {
    padding: '10px 16px',
    borderRadius: '18px',
    backgroundColor: theme.palette.action.hover,
    margin: 'auto',
  },
}));

const Conversations = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [open, setOpen] = React.useState(false);
  const conversations = useSelector((state) => state.conversations);
  const currentConversation = useSelector((state) =>
    state.conversations.find((x) => x.id === state.currentConversation));
  const messages = useSelector((state) => state.messages);
  let dateBefore = new Date();

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout);
  };

  const handleTextFieldChange = (e) => {
    setTextFieldValue(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageContent = textFieldValue.trim().replace('\n', '\n\n');
    if (messageContent !== '') {
      dispatch(postConversationMessage(currentConversation.id, messageContent));
    }
    setTextFieldValue('');
  };

  const handleEnterKey = (e) => {
    if (e.charCode === 13 && !(e.shiftKey || e.ctrlKey)) {
      handleSendMessage(e);
    }
  };

  const messagesDate = (message, index) => {
    if (index === 0) {
      dateBefore = new Date(message.created_at * 1000);
      return (
        <Paper className={classes.dateBubble}>
          <Typography className={classes.dateTypo} color="textSecondary" variant="caption" align="right">
            {new Date(message.created_at * 1000).toLocaleDateString()}
          </Typography>
        </Paper>
      );
    }

    const currDate = new Date(message.created_at * 1000);
    if (dateBefore.toLocaleDateString() !== currDate.toLocaleDateString()) {
      dateBefore = currDate;
      return (
        <Paper className={classes.dateBubble}>
          <Typography className={classes.dateTypo} color="textSecondary" variant="caption" align="right">
            {currDate.toLocaleDateString()}
          </Typography>
        </Paper>
      );
    }

    return null;
  };

  useEffect(() => {
    if (conversations.length && !messages[currentConversation.id]) {
      dispatch(getConversationMessages(currentConversation.id));
    }
  });

  useEffect(() => {
    const container = document.querySelector('#messages-container');
    container.scrollTo(0, container.scrollHeight);
  }, [messages, currentConversation]);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {conversations.map((conversation) => (
          <SingleConversation conversation={conversation} key={conversation.id} />
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbarColor}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {currentConversation && currentConversation.name}
          </Typography>
          <Tooltip title={theme.palette.type === 'dark' ? 'Toggle light theme' : 'Toggle dark theme'}>
            <IconButton
              variant="contained"
              type="submit"
              className={classes.button}
              onClick={() => dispatch(toggleDarkTheme)}
            >
              <Grid className={classes.darkButton}>
                {theme.palette.type === 'light' ? <Brightness3Icon>send</Brightness3Icon> : <WbSunnyIcon>send</WbSunnyIcon>}
              </Grid>
            </IconButton>
          </Tooltip>
          <Tooltip title="Add a new conversation">
            <IconButton
              variant="contained"
              onClick={handleClickOpen}
            >
              <Fab color="secondary">
                <AddIcon />
              </Fab>
            </IconButton>
          </Tooltip>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New conversation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please write the name of the new conversation and add at least one username.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Conversation name"
                fullWidth
              />

              <Grid container alignItems="flex-end">
                <Grid xs={11} item>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="To"
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} item>
                  <IconButton
                    variant="contained"
                    color="primary"
                    className={classes.sendButton}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
          <Tooltip title="Logout">
            <IconButton
              variant="contained"
              type="submit"
              onClick={handleLogout}
            >
              <Fab color="secondary">
                <ExitToAppIcon>send</ExitToAppIcon>
              </Fab>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {/* ICI L'ESPACE EN HAUT A GAUCHE ! */}
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid id="messages-container" className={classes.messageContent} container spacing={2} alignContent="flex-start">
          {currentConversation
            && messages[currentConversation.id]
            && messages[currentConversation.id].map((message, index) => (
              <>
                {messagesDate(message, index)}
                <MessageConversation message={message} key={message.id} />
              </>
            ))}
        </Grid>
        <Grid>
          <Paper className={classes.gridSend}>
            <form className={classes.textInput} noValidate autoComplete="off" onSubmit={handleSendMessage}>
              <TextField
                id="outlined-secondary"
                onChange={handleTextFieldChange}
                onKeyPress={handleEnterKey}
                label="Enter your message here"
                variant="outlined"
                value={textFieldValue}
                multiline
                color="primary"
                fullWidth
                name="message"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.sendButton}
                        endIcon={
                          <ArrowForwardIosRounded>send</ArrowForwardIosRounded>
                        }
                      >
                        {' '}
                        Send
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Paper>
        </Grid>
      </main>
    </div>

  );
};

export default Conversations;
