import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const defaultProps = {};

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitHandler = e => {
    e.preventDefault();
    // Collect form data to register user
    const { email, password } = this.state;
    const userData = { email, password };
    this.props.loginUser(userData, this.props.history);
  };
  render() {
    return (
      <Container className="full-height">
        <h1 className="display-4 mt-5 text-center">Log In</h1>
        <p className="lead text-center">Login to your Face-Bot Account</p>
        <Form onSubmit={this.submitHandler} className="my-5">
          <Row>
            <Col md={6}>
              <TextFieldGroup
                name="email"
                label="Email Address"
                error={this.state.errors.email}
                value={this.state.email}
                type="email"
                handleChange={this.inputChangeHandler}
                required="true"
              />
            </Col>
            <Col md={6}>
              <TextFieldGroup
                name="password"
                label="Password"
                error={this.state.errors.password}
                value={this.state.password}
                type="password"
                handleChange={this.inputChangeHandler}
                required="true"
              />
            </Col>
          </Row>
          <Row>
            <Col />
            <Col md={6}>
              <Button className="mt-5" block type="Submit" variant="primary">
                Submit
              </Button>
            </Col>
            <Col />
          </Row>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
