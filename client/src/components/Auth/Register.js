import React from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const propTypes = {};

const defaultProps = {};

export default class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const { name, email, password, confirmPassword } = this.state;
    const newUser = { name, email, password, confirmPassword };
  };
  render() {
    return (
      <>
        <h1 className="display-4 mt-5 text-center">Sign Up</h1>
        <p className="lead text-center">Create your Face-Bot Account</p>
        <Form onSubmit={this.submitHandler} className="my-5">
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>BotName</Form.Label>
                <Form.Control
                  name="name"
                  value={this.state.name}
                  onChange={this.inputChangeHandler}
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  onChange={this.inputChangeHandler}
                  value={this.state.email}
                  type="email"
                />
                <Form.Text className="text-muted">
                  We will never share your email with anyone
                </Form.Text>
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
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  onChange={this.inputChangeHandler}
                  value={this.state.confirmPassword}
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

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
