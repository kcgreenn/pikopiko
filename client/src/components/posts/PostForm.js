import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextAreaGroup from "../common/TextAreaGroup";
import { addPost } from "../../actions/postActions";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const propTypes = {
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const defaultProps = {};

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
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
  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
    this.setState({
      text: ""
    });
  };
  render() {
    return (
      <Card>
        <Container>
          <Form className="my-3" onSubmit={this.onSubmit}>
            <TextAreaGroup
              name="text"
              label="Say something..."
              value={this.state.text}
              handleChange={this.inputChangeHandler}
              error={this.state.errors.text}
              reuired={true}
              placeholder="Create a post"
            />
            <Button type="submit" variant="primary" size="block">
              Submit
            </Button>
          </Form>
        </Container>
      </Card>
    );
  }
}

PostForm.propTypes = propTypes;
PostForm.defaultProps = defaultProps;

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
