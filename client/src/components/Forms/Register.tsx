import React, { useState, useContext } from 'react';
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
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import ShowIcon from '@material-ui/icons/Visibility';
import HideIcon from '@material-ui/icons/VisibilityOff';
import { authContext } from '../../context/auth/AuthProvider';

interface Props {}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '360px',
  },
  registerBtn: {
    borderColor: theme.palette.background.default,
    color: '#f1f1f1',
  },
  dialogContent: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '10vh',
    },
  },
  dialogActions: {
    marginTop: '5vh',
    [theme.breakpoints.down('sm')]: {
      margin: '10vh 0',
    },
  },
}));

const Register: React.FC<Props> = () => {
  const classes = useStyles();
  const authCtxt = useContext(authContext);
  const [open, setOpen] = useState(false);
  const [pwShow, setPwShow] = useState(false);
  const [registerData, setRegisterData] = useState({
    handle: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      [target]: value,
    });
  };
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      // dispatch login request
      // Check if passwords match
      if (registerData.password === registerData.confirmPassword) {
        await authCtxt.register({
          handle: registerData.handle,
          email: registerData.email,
          password: registerData.password,
        });
      } else {
        authCtxt.setAlert('Passwords Do Not Match');
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        style={{
          borderColor: '#f1f1f1',
          color: '#f1f1f1',
        }}
        onClick={handleClickOpen}
      >
        Join Our Community
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        className={classes.root}
        onClose={handleClose}
        aria-labelledby="register-dialog-title"
      >
        <DialogTitle id="register-dialog-title" disableTypography>
          <h1>Register</h1>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              required
              id="registerEmail"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              fullWidth
              value={registerData.email}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="registerHandle"
              label="Choose A Username"
              name="handle"
              autoComplete="handle"
              type="text"
              fullWidth
              value={registerData.handle}
              onChange={handleInputChange}
              inputProps={{
                minLength: 4,
                maxLength: 32,
              }}
            />
            <FormControl fullWidth required>
              <InputLabel htmlFor="register-password">Password</InputLabel>
              <Input
                inputProps={{
                  minLength: 8,
                  maxLength: 32,
                }}
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
              />
            </FormControl>{' '}
            <FormControl fullWidth required>
              <InputLabel htmlFor="register-password-confirm">
                Confirm Password
              </InputLabel>
              <Input
                inputProps={{
                  minLength: 8,
                  maxLength: 32,
                }}
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
              />
            </FormControl>
            <DialogActions className={classes.dialogActions}>
              <Button
                onClick={handleClose}
                variant="outlined"
                style={{ borderColor: '#f44336', color: '#f44336' }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
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
