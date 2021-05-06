import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as openpgp from 'openpgp';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import ButtonWithTooltip from '../../../components/ButtonWithTooltip';

const useStyles = makeStyles((theme) => ({
  button: {
    width: 130,
  },

  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  generate: {
    color: theme.palette.success.main,
  },
  textCenter: {
    textAlign: 'center',
  },
}));

function Encryption({ setPgpPrivate, setPgpPublic, username }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [passphrase, setPassPhrase] = useState('');
  const [confirmPassPhrase, setConfirmPassPhrase] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePassPhrase = (e) => {
    setPassPhrase(e.target.value);
  };

  const handleChangeConfirmPassPhrase = (e) => {
    setConfirmPassPhrase(e.target.value);
  };

  const generateKeyPair = async () => {
    const
      {
        privateKeyArmored,
        publicKeyArmored,
      } = await openpgp.generateKey(
        {
          type: 'ecc', // Type of the key, defaults to ECC
          curve: 'curve25519', // ECC curve name, defaults to curve25519
          userIDs: [{ name: username }], // you can pass multiple user IDs
          passphrase, // protects the private key
        },
      );
    setPgpPrivate(privateKeyArmored);
    setPgpPublic(publicKeyArmored);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passphrase === confirmPassPhrase) {
      generateKeyPair();
      setOpen(false);
    } else setError('Passwords doesn\'t match');
  };

  return (
    <>
      <ButtonWithTooltip
        tooltipText={username ? '' : 'Type your username first'}
        className={classes.generate}
        onClick={handleOpen}
        size="small"
        disabled={!username}
      >
        Generate a key pair for me
      </ButtonWithTooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.textCenter}>
        <DialogContent>
          <FormControl margin="normal">
            <TextField
              required
              label="PGP PassPhrase"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              color="primary"
              value={passphrase}
              onChange={handleChangePassPhrase}
              error={Boolean(error)}
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              required
              label="Confirm PGP PassPhrase"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              color="primary"
              value={confirmPassPhrase}
              onChange={handleChangeConfirmPassPhrase}
              error={Boolean(error)}
            />
          </FormControl>
          <FormControl margin="normal">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleSubmit}
            >
              Generate
            </Button>
          </FormControl>
          <br />
          <Typography color="textSecondary" variant="caption">
            Disclaimer: If you lose this passphrase,
            you won&lsquo;t be able to acces to any of your conversations!
            {error}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
Encryption.propTypes = {
  setPgpPublic: PropTypes.func.isRequired,
  setPgpPrivate: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,

};

export default Encryption;
