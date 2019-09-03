import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  DialogActions,
  makeStyles,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import ShowIcon from '@material-ui/icons/Visibility';
import HideIcon from '@material-ui/icons/VisibilityOff';

interface Props {}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '360px'
  }
}));

const Login: React.FC<Props> = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [pwShow, setPwShow] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({ email: null, password: null });

  //   Make dialog responsive
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const togglePw = () => {
    setPwShow(!pwShow);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.currentTarget.name;
    const value = e.currentTarget.value;
    setLoginData({
      ...loginData,
      [target]: value
    });
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO dispatch login request
    // Reset Form
    setLoginData({ email: '', password: '' });
  };
  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Login
      </Button>
      <Dialog
        fullScreen={fullScreen}
        className={classes.root}
        open={open}
        onClose={handleClose}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title">Login</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="loginEmail"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              fullWidth
              value={loginData.email}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="login-password">Password</InputLabel>
              <Input
                id="login-password"
                type={pwShow ? 'text' : 'password'}
                value={loginData.password}
                name="password"
                onChange={handleInputChange}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePw}
                    >
                      {pwShow ? <ShowIcon /> : <HideIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              ></Input>
            </FormControl>
            <DialogActions>
              <Button type="submit" onClick={handleClose} color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
