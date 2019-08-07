import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const propTypes = {
  auth: PropTypes.object.isRequired
};

const defaultProps = {
  auth: {}
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logoutHandler = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.history.push("/login");
    document.location.reload();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/dashboard">
          <img
            src={user.avatar}
            alt={user.name}
            title="You must have a Gravatar connected to your email to display an image"
            style={{ borderRadius: "50%", width: "25px", marginRight: "5px" }}
          />
        </Nav.Link>
        <Nav.Link href="/" onClick={this.logoutHandler}>
          Log Out
        </Nav.Link>
      </Nav>
    );
    const guestLinks = (
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/login">
          Log In
        </Nav.Link>
        <Nav.Link as={Link} to="/register">
          Sign Up
        </Nav.Link>
      </Nav>
    );
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="md">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Face-Bot
            </Navbar.Brand>
            <Nav.Link as={Link} className="text-secondary" to="/profiles">
              Developers
            </Nav.Link>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              {isAuthenticated ? authLinks : guestLinks}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withRouter(Header));
