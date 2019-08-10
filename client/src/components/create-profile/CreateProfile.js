import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import SelectGroup from "../common/SelectGroup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

import { createProfile } from "../../actions/profileActions";

const propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const defaultProps = {};

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  inputChangeHandler = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };
  submitHandler = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  };
  render() {
    //   Status select options
    const options = [
      {
        label: "* Select Status",
        value: 0,
        selected: true
      },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <Container className="full-height">
        <h1 className="display-4 mt-5 text-center">Create Your Profile</h1>
        <p className="lead text-center">Tell us a bit about yourself</p>
        <small className="d-block pb-3 text-center">* = Required Fields</small>
        <Form onSubmit={this.submitHandler} className="my-5">
          <Row>
            <Col md={8} className="m-auto">
              <TextFieldGroup
                name="handle"
                label="* Choose a Handle"
                error={this.state.errors.handle}
                value={this.state.handle}
                type="text"
                info="A unique handle for your profile URL. Your full name, company name, nickname, etc..."
                handleChange={this.inputChangeHandler}
              />
              <SelectGroup
                name="status"
                label="Current Occupation"
                options={options}
                error={this.state.errors.status}
                value={this.state.status}
                handleChange={this.inputChangeHandler}
              />
              <TextFieldGroup
                name="company"
                label="Company Name"
                error={this.state.errors.company}
                value={this.state.company}
                type="text"
                handleChange={this.inputChangeHandler}
              />
              <TextFieldGroup
                name="website"
                label="Personal Website"
                error={this.state.errors.website}
                value={this.state.website}
                type="text"
                handleChange={this.inputChangeHandler}
              />
              <TextFieldGroup
                name="location"
                label="Location"
                info="City or City, State (eg. Philadelphia, PA)"
                error={this.state.errors.location}
                value={this.state.location}
                type="text"
                handleChange={this.inputChangeHandler}
              />
              <TextFieldGroup
                name="skills"
                label="Professional Skills"
                info="Please use comma seperated values (eg. HTML, CSS, Javascript)"
                error={this.state.errors.skills}
                value={this.state.skills}
                type="text"
                handleChange={this.inputChangeHandler}
              />
              <TextFieldGroup
                name="githubusername"
                label="Github Username"
                info="If you want your latest repos and a Gitthub link, include your username"
                error={this.state.errors.githubusername}
                value={this.state.githubusername}
                type="text"
                handleChange={this.inputChangeHandler}
              />
              <TextAreaGroup
                name="bio"
                label="A Short Bio"
                error={this.state.errors.bio}
                value={this.state.bio}
                handleChange={this.inputChangeHandler}
              />
              <Accordion>
                <Accordion.Toggle as={Button} className="my-3 " eventKey="0">
                  Add Social Media Accounts
                </Accordion.Toggle>
                <span className="text-muted ml-5">Optional</span>
                <Accordion.Collapse eventKey="0">
                  <>
                    <TextFieldGroup
                      name="twitter"
                      label="Twitter"
                      prepend='<ion-icon name="logo-twitter"></ion-icon>'
                      error={this.state.errors.twitter}
                      value={this.state.twitter}
                      type="text"
                      handleChange={this.inputChangeHandler}
                    />
                    <TextFieldGroup
                      name="facebook"
                      label="Facebook"
                      prepend='<ion-icon name="logo-facebook"></ion-icon>'
                      error={this.state.errors.facebook}
                      value={this.state.facebook}
                      type="text"
                      handleChange={this.inputChangeHandler}
                    />
                    <TextFieldGroup
                      name="linkedin"
                      label="Linkedin "
                      prepend='<ion-icon name="logo-linkedin"></ion-icon>'
                      error={this.state.errors.linkedin}
                      value={this.state.linkedin}
                      type="text"
                      handleChange={this.inputChangeHandler}
                    />
                    <TextFieldGroup
                      name="youtube"
                      label="Youtube"
                      prepend='<ion-icon name="logo-youtube"></ion-icon>'
                      error={this.state.errors.youtube}
                      value={this.state.youtube}
                      type="text"
                      handleChange={this.inputChangeHandler}
                    />
                    <TextFieldGroup
                      name="instagram"
                      label="Instagram"
                      prepend='<ion-icon name="logo-instagram"></ion-icon>'
                      error={this.state.errors.instagram}
                      value={this.state.instagram}
                      type="text"
                      handleChange={this.inputChangeHandler}
                    />
                  </>
                </Accordion.Collapse>
              </Accordion>
            </Col>
          </Row>
          <Row>
            <Col />
            <Col md={8} className="m-auto">
              <Button className="mt-5" block type="Submit" variant="primary">
                Create Profile
              </Button>
            </Col>
            <Col />
          </Row>
        </Form>
      </Container>
    );
  }
}

CreateProfile.propTypes = propTypes;
CreateProfile.defaultProps = defaultProps;

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
