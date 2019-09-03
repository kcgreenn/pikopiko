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
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import ShowIcon from '@material-ui/icons/Visibility';
import HideIcon from '@material-ui/icons/VisibilityOff';

interface Props {}

const Register: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [pwShow, setPwShow] = useState(false);
  const [registerData, setRegisterData] = useState({
    handle: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({
    handle: null,
    email: null,
    password: null,
    confirmPassword: null
  });

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
    setRegisterData({
      ...registerData,
      [target]: value
    });
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO dispatch login request
    // Reset Form
    setRegisterData({
      handle: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };
  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Join Our Community
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="register-dialog-title"
      >
        <DialogTitle id="register-dialog-title">Register</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="registerHandle"
              label="Choose A Username"
              name="handle"
              autoComplete="handle"
              type="text"
              fullWidth
              value={registerData.handle}
              onChange={handleInputChange}
              inputProps={{}}
            />
            <TextField
              margin="dense"
              id="registerEmail"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              fullWidth
              value={registerData.email}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="register-password">Password</InputLabel>
              <Input
                id="register-password"
                type={pwShow ? 'text' : 'password'}
                value={registerData.password}
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
            </FormControl>{' '}
            <FormControl fullWidth>
              <InputLabel htmlFor="register-password-confirm">
                Confirm Password
              </InputLabel>
              <Input
                id="register-password-confirm"
                type={pwShow ? 'text' : 'password'}
                value={registerData.confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
                autoComplete="password"
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

export default Register;
