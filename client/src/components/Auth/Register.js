import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const defaultProps = {};

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
    const { name, email, password, password2 } = this.state;
    const newUser = { name, email, password, password2 };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <Container className="full-height">
        <h1 className="display-4 mt-5 text-center">Sign Up</h1>
        <p className="lead text-center">Create your Face-Bot Account</p>
        <Form onSubmit={this.submitHandler} className="my-5 main">
          <Form.Row>
            <Col md={6}>
              <TextFieldGroup
                name="name"
                label="BotName"
                error={errors.name}
                value={this.state.name}
                type="text"
                handleChange={this.inputChangeHandler}
                required="true"
              />
            </Col>
            <Col md={6}>
              <TextFieldGroup
                name="email"
                label="Email Address"
                error={errors.email}
                value={this.state.email}
                info="We will never share your email with anyone"
                type="email"
                handleChange={this.inputChangeHandler}
                required="true"
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={6}>
              <TextFieldGroup
                name="password"
                label="Password"
                error={errors.password}
                value={this.state.password}
                type="password"
                handleChange={this.inputChangeHandler}
                required="true"
              />
            </Col>
            <Col md={6}>
              <TextFieldGroup
                name="password2"
                label="Confirm Password"
                error={errors.password2}
                value={this.state.password2}
                type="password"
                handleChange={this.inputChangeHandler}
                required="true"
              />
            </Col>
          </Form.Row>

          <Row>
            <Col />
            <Col md={6}>
              <Button className="my-5" type="Submit" variant="primary" block>
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

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
