import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { lightTheme, darkTheme } from './theme/Theme';
import Profile from './components/Profile/Profile';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/my-profile" exact component={Profile} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
