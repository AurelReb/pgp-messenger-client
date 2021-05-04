import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserApi } from 'api/userApi';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3,
    )}px`,
  },
  header: {
    margin: theme.spacing(1),
  },
  header_text: {
    marginTop: theme.spacing(5),
  },

  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  signin: {
    marginTop: theme.spacing(1),
  },
}));

function ResetForm(props) {
  const [loader, setLoader] = useState(false);
  const [submitError, setSumbitError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [success, setSuccess] = useState(false);
  const classes = useStyles();
  const { resetToken } = useParams();

  const onChange = () => {
    const newPassword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password')
      .value;
    setConfirmError(newPassword !== confirmPassword);
  };

  const submit = (e) => {
    e.preventDefault();
    const email = new URLSearchParams(window.location.search).get('email');
    const newPassword = document.getElementById('password').value;
    if (!confirmError) {
      setLoader(true);
      UserApi.resetPassword(resetToken, email, newPassword)
        .then(() => {
          setLoader(false);
          setSuccess(true);
        })
        .catch((err) => {
          setSumbitError(
            err.response
              ? err.response.data.error
              : 'Servers unreachable. Please try again.',
          );
          setLoader(false);
        });
    }
  };

  return (
    <div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Link to="/" />
          </div>
          {!success ? (
            <>
              <Typography
                className={classes.header_text}
                variant="h5"
              >
                Reset Password
              </Typography>
              <form className={classes.form} onSubmit={submit}>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  autoFocus
                  required
                  margin="normal"
                  fullWidth
                  onChange={onChange}
                  error={Boolean(submitError)}
                  label="New Password"
                />
                <TextField
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  margin="normal"
                  fullWidth
                  required
                  label="Confirm Password"
                  onChange={onChange}
                  error={Boolean(submitError || confirmError)}
                  helperText={
                                        (confirmError
                                            && 'Password must match.')
                                        || submitError
                                    }
                />
                {!loader ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                                      Reset Password
                  </Button>
                ) : (
                  <center>
                      <Fade in unmountOnExit>
                          <CircularProgress size="10%" />
                        </Fade>
                    </center>
                )}
              </form>
              <Link to="/login" className={classes.signin}>
                <center>
                  Cancel and go back to login page 
{' '}
<br />
                </center>
              </Link>
            </>
          ) : (
            <>
              <Typography
                className={classes.header_text}
                variant="h5"
              >
                Password Successfully Reset!
              </Typography>
              <Link to="/login">
                <Typography variant="h6" color="primary">
                  Go to login page
                          </Typography>
              </Link>
            </>
          )}
        </Paper>
      </main>
    </div>
  );
}

export default ResetForm;
