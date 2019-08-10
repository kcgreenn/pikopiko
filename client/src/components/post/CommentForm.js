import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextAreaGroup from "../common/TextAreaGroup";
import { addComment } from "../../actions/postActions";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const propTypes = {
  addComment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string
};

const defaultProps = {};

class CommentForm extends React.Component {
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
    const { _id } = this.props.post.post;
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(newComment, _id);
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
              label="Leave a comment"
              value={this.state.text}
              handleChange={this.inputChangeHandler}
              error={this.state.errors.text}
              reuired={true}
              placeholder="Reply to post"
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

CommentForm.propTypes = propTypes;
CommentForm.defaultProps = defaultProps;

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
