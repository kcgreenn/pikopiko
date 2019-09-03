import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Header from './components/Layout/Header';
import SideDrawer from './components/Layout/SideDrawer';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { lightTheme, darkTheme } from './theme/Theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <Route path="/" exact component={Landing}></Route>
      </Router>
    </ThemeProvider>
  );
};

export default App;
