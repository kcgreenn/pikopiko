import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPosts } from "../../actions/postActions";

import PostForm from "./PostForm";
import PostFeed from "./PostFeed";

import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const propTypes = {
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const defaultProps = {};

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <Container className="full-height mb-5">
        <Row>
          <Col md={12}>
            <PostForm />
          </Col>
        </Row>
        <Row>
          <Col md={12}>{postContent}</Col>
        </Row>
      </Container>
    );
  }
}

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
