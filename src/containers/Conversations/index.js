import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";

import MessageConversation from "./components/MessageConversation";
import SingleConversation from "./components/SingleConversation";

import { useDispatch, useSelector, getConversations, getConversationMessages } from "../../config/store";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  SingleContent: {
    marginTop: theme.spacing(2),
  },
  ToolbarColor: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Conversations = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const conversations = useSelector((state) => state.conversations);
  const currentConversation = useSelector((state) =>
    state.conversations.find((x) => x.id === state.currentConversation)
  );
  const messages = useSelector((state) => state.messages);

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (Object.keys(conversations).length === 0) {
      dispatch(getConversations());
    } else if (!messages[currentConversation.id]) {
      dispatch(getConversationMessages(currentConversation.id));
    }
  });

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {conversations.map((conversation) => (
          <SingleConversation conversation={conversation} />
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.ToolbarColor}>
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
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
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
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container spacing={2}>
          {currentConversation &&
            messages[currentConversation.id] &&
            messages[currentConversation.id].map((message) => (
              <MessageConversation message={message} />
            ))}
        </Grid>
        <Grid>
          <Paper>
            hfjh
          </Paper>
        </Grid>
      </main>
    </div>
    
  );
};

export default Conversations;
