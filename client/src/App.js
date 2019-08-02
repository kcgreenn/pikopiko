import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Container from "react-bootstrap/Container";
import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";
import Footer from "./components/Layout/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

// Redux Configuration
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Route path="/" component={Landing} exact />
        <Container>
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
