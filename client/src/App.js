import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Container from "react-bootstrap/Container";

import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";
import Footer from "./components/Layout/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" component={Landing} exact />
      <Container>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
