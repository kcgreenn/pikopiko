import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import {
  CssBaseline,
  CircularProgress,
  Modal,
  makeStyles
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { lightTheme, darkTheme } from './theme/Theme';
import Profile from './components/Profile/Profile';
import ErrorBoundary from './errors/ErrorBoundary';
import { authContext } from './context/auth/AuthProvider';
import Axios, { AxiosResponse } from 'axios';
import Alert from './components/Alerts/Alert';
import Feed from './components/Feed/Feed';
import FullPost from './components/Post/FullPost';

const useStyles = makeStyles({
  modal: {
    position: 'relative',
    width: '100vw',
    height: '100vh'
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
});

// create an axios instance for app
export const axiosInstance = Axios.create();

const App: React.FC = () => {
  const classes = useStyles();
  const authCtxt = useContext(authContext);
  useEffect(() => {
    if (!authCtxt.isAuth) {
      const token = localStorage.getItem('jwToken');
      authCtxt.checkLocalToken(token);
    }
  }, [authCtxt]);
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      if (authCtxt.isAuth && response.status >= 300) {
        authCtxt.setAlert(response);
      }
      return response;
    }
  );
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Modal open={authCtxt.loading} className={classes.modal}>
        <CircularProgress className={classes.spinner} color="secondary" />
      </Modal>
      <Alert />
      <Router>
        <ErrorBoundary>
          <Route path="/" component={authCtxt.isAuth ? Feed : Landing} exact />
        </ErrorBoundary>
        <ErrorBoundary>
          <Route
            path="/profile/:handle"
            exact
            component={authCtxt.isAuth ? Profile : Landing}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <Route
            path="/feed"
            exact
            component={authCtxt.isAuth ? Feed : Landing}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <Route
            path="/post/:id"
            exact
            component={authCtxt.isAuth ? FullPost : Landing}
          />
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
};

export default App;
