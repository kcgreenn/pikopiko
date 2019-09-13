import React, { useContext, useState, useEffect } from 'react';
import { SnackbarContent, Snackbar, makeStyles } from '@material-ui/core';
import { authContext } from '../../context/auth/AuthProvider';
import { amber } from '@material-ui/core/colors';

interface Props {}

const useStyles = makeStyles(theme => ({
  alert: {
    backgroundColor: amber[700],
    textAlign: 'center',
    margin: '0 auto'
  }
}));

const Alert: React.FC<Props> = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const authCtxt = useContext(authContext);
  useEffect(() => {
    authCtxt.alert ? setOpen(true) : setOpen(false);
  }, [authCtxt.alert]);
  const handleClose = () => {
    if (authCtxt) {
      authCtxt.setAlert(null);
    }
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      className={classes.alert}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes.alert}
        message={authCtxt.alert ? authCtxt.alert : null}
      ></SnackbarContent>
    </Snackbar>
  );
};

export default Alert;
