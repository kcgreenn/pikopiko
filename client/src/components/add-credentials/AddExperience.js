import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { addExp } from "../../actions/profileActions";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExp: PropTypes.func.isRequired
};

const defaultProps = {};

class AddExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disableToField: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  submitHandler = e => {
    e.preventDefault();
    this.props.addExp({ ...this.state }, this.props.history);
  };
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  disableToHandler = () => {
    this.setState({
      disableToField: !this.state.disableToField,
      current: !this.state.current
    });
  };
  render() {
    const { errors } = this.state;

    return (
      <Container className="full-height">
        <h1 className="display-4 mt-5 text-center">Add Experience</h1>
        <p className="text-center lead">
          Add any job you have had or currently have
        </p>
        <small className="d-block pb-3 text-center">* = Required Fields</small>
        <Form onSubmit={this.submitHandler} className="my-5">
          <Row>
            <Col md={8} className="m-auto">
              <TextFieldGroup
                label="* Company"
                name="company"
                handleChange={this.inputChangeHandler}
                error={errors.company}
                value={this.state.company}
              />
              <TextFieldGroup
                label="* Job Title"
                name="title"
                handleChange={this.inputChangeHandler}
                error={errors.title}
                value={this.state.title}
              />
              <TextFieldGroup
                label="Location"
                name="location"
                handleChange={this.inputChangeHandler}
                error={errors.location}
                value={this.state.location}
              />
              <Row>
                <Col md={5}>
                  <TextFieldGroup
                    label="* From Date"
                    name="from"
                    type="date"
                    handleChange={this.inputChangeHandler}
                    error={errors.from}
                    value={this.state.from}
                  />
                </Col>
                <Col md={2}>
                  <Form.Check
                    className="mt-5"
                    onChange={this.disableToHandler}
                    name="current"
                    label="Current Job"
                    checked={this.state.current ? true : false}
                    // value={this.state.current ? "checked" : false}
                  />
                </Col>
                <Col md={5}>
                  <TextFieldGroup
                    label="* To Date"
                    name="to"
                    type="date"
                    disabled={this.state.disableToField}
                    handleChange={this.inputChangeHandler}
                    error={errors.to}
                    value={this.state.to}
                  />
                </Col>
              </Row>
              <TextAreaGroup
                label="Job Description"
                name="description"
                value={this.state.description}
                handleChange={this.inputChangeHandler}
                error={errors.description}
                info="Tell us about the position"
              />
              <Row className="mt-5">
                <Col md={4}>
                  <Link to="/dashboard" className="btn btn-danger d-block">
                    Cancel
                  </Link>
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                  <Button block type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

AddExperience.propTypes = propTypes;
AddExperience.defaultProps = defaultProps;

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExp }
)(withRouter(AddExperience));
