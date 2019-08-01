import React from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const propTypes = {};

const defaultProps = {};

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitHandler = e => {
    e.preventDefault();
    // Collect form data to register user
    const { email, password } = this.state;
    const user = { email, password };
  };
  render() {
    return (
      <>
        <h1 className="display-4 mt-5 text-center">Log In</h1>
        <p className="lead text-center">Login to your Face-Bot Account</p>
        <Form onSubmit={this.submitHandler} className="my-5">
          <Row>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  onChange={this.inputChangeHandler}
                  value={this.state.email}
                  type="email"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={this.inputChangeHandler}
                  value={this.state.password}
                  type="password"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col />
            <Col>
              <Button className="mt-5" block type="Submit" variant="primary">
                Submit
              </Button>
            </Col>
            <Col />
          </Row>
        </Form>
      </>
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
