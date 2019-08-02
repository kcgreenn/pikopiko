import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

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
    password2: "",
    errors: {},
    validated: false
  };
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitHandler = e => {
    e.preventDefault();
    // Collect form data to register user
    const { name, email, password, password2 } = this.state;
    const newUser = { name, email, password, password2 };
    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(error => {
        this.setState({
          errors: error.response.data
        });
      });
  };
  render() {
    const { errors } = this.state;
    return (
      <>
        <h1 className="display-4 mt-5 text-center">Sign Up</h1>
        <p className="lead text-center">Create your Face-Bot Account</p>
        <Form
          validate={this.state.validated}
          onSubmit={this.submitHandler}
          className="my-5"
        >
          <Form.Row>
            <Form.Group as={Col} md={6} controlId="name">
              <Form.Label>BotName</Form.Label>
              <Form.Control
                required
                name="name"
                value={this.state.name}
                onChange={this.inputChangeHandler}
                type="text"
                isInvalid={errors.name}
                minLength="4"
                maxLength="32"
              />
              <Form.Control.Feedback type="invalid">
                <p>{errors.name}</p>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                name="email"
                onChange={this.inputChangeHandler}
                value={this.state.email}
                type="email"
                isInvalid={errors.email}
              />
              <Form.Text className="text-muted">
                We will never share your email with anyone
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                <p>{errors.email}</p>
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={6} controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                onChange={this.inputChangeHandler}
                value={this.state.password}
                type="password"
                isInvalid={errors.password}
                minLength="6"
                maxLength="32"
              />
              <Form.Control.Feedback type="invalid">
                <p>{errors.password}</p>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                name="password2"
                onChange={this.inputChangeHandler}
                value={this.state.password2}
                type="password"
                isInvalid={errors.password2}
                minLength="6"
                maxLength="32"
              />
              <Form.Control.Feedback type="invalid">
                <p>{errors.password2}</p>
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Row>
            <Button className="mt-5" block type="Submit" variant="primary">
              Submit
            </Button>
          </Row>
        </Form>
      </>
    );
  }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
