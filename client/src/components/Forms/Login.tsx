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
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import ShowIcon from '@material-ui/icons/Visibility';
import HideIcon from '@material-ui/icons/VisibilityOff';
import { authContext } from '../../context/auth/AuthProvider';

interface Props {}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '360px',
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

const Login: React.FC<Props> = props => {
  const classes = useStyles();
  const authCtxt = useContext(authContext);

  const [open, setOpen] = useState(false);
  const [pwShow, setPwShow] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
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
    setLoginData({
      ...loginData,
      [target]: value,
    });
  };
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    // dispatch login request
    await authCtxt.login({
      username: loginData.username,
      password: loginData.password,
    });
  };

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="inherit"
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
        <DialogTitle id="login-dialog-title" disableTypography>
          <h1>Login</h1>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="loginHandle"
              label="Username"
              name="username"
              autoComplete="handle"
              type="text"
              fullWidth
              value={loginData.username}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="login-password">Password</InputLabel>
              <Input
                id="login-password"
                required
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

export default Login;
