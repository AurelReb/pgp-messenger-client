import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import {
  useDispatch,
  useSelector,
  getUserProfile,
} from "../../../config/store";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/IconButton";
import { green } from "@material-ui/core/colors";

function Profile() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile.username) {
      dispatch(getUserProfile());
    }
    let user = profile.username;
  });

  const useStyles = makeStyles((theme) => ({
    height: 90,
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    box: {
      height: 80,
      margin: theme.spacing(5),
      height: 100 ,/* Magic here */
 
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Container fixed>
          <div style={{ justifyContent: "center" }} className="logo">
            <span>
              <h2>user : </h2>
              <h1>{profile.username}</h1>
            </span>
            <div className={classes.box}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="Username"
                    defaultValue={profile.username}
                  />
                </Grid>
              </Grid>
            </div>
            <div className={classes.box}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label="Password" />
                </Grid>
              </Grid>
            </div>

            <div className={classes.box}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label="PgpKey" />
                </Grid>
              </Grid>
            </div>
            <div>
              <Fab variant="extended">
                <NavigationIcon className={classes.extendedIcon} />
                Submit Changes
              </Fab>
              <Button style={{ color: green[500] }}>Add Pgp key</Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Profile;
