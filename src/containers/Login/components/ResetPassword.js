import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import { UserApi } from "api/userApi";

const useStyles = makeStyles((theme) => ({
    layout: {
        width: "auto",
        display: "block", // Fix IE11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
            3
        )}px`,
    },
    header: {
        margin: theme.spacing(1),
    },
    header_text: {
        marginTop: theme.spacing(5),
    },

    form: {
        width: "100%", // Fix IE11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    tos: {
        marginTop: theme.spacing(3),
    },
    signin: {
        marginTop: theme.spacing(1),
    },
}));

function ResetPassword(props) {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const classes = useStyles();

    const submit = (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        setLoader(true);
        UserApi.sendResetPasswordEmail(email)
            .then(() => {
                setLoader(false);
                setSuccess(true);
            })
            .catch((err) => {
                setError(
                    err.response
                        ? err.response.data.error
                        : "Servers unreachable. Please try again."
                );
                setLoader(false);
            });
    };

    return (
        <div>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <div className={classes.header}>
                        <Link to="/">
                        </Link>
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
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    autoFocus
                                    label="Email Address"
                                    fullWidth
                                    margin="normal"
                                    error={Boolean(error)}
                                    helperText={error}
                                />
                                {!loader ? (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Send a recovery email
                                    </Button>
                                ) : (
                                    <center>
                                        <Fade in unmountOnExit>
                                            <CircularProgress size={"10%"} />
                                        </Fade>
                                    </center>
                                )}
                            </form>
                            <Link to="/login" className={classes.signin}>
                                <center>
                                    Cancel and go back to login page <br />
                                </center>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Typography
                                className={classes.header_text}
                                variant="h5"
                            >
                                Email Successfully Sent!
                            </Typography>
                            <Link to="/">
                                <Typography variant="h6" color="primary">
                                    Go to the homepage
                                </Typography>
                            </Link>
                        </>
                    )}
                </Paper>
            </main>
        </div>
    );
}

export default ResetPassword;
