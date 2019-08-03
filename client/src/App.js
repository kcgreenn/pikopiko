import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";

import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";
import Footer from "./components/Layout/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard//Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";

// Redux Configuration
import { Provider } from "react-redux";
import store from "./store";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token for user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check if token expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    //  Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to Login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Route path="/" component={Landing} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
        </Switch>
        <Switch>
          <PrivateRoute
            path="/create-profile"
            component={CreateProfile}
            exact
          />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
