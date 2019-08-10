import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

import { getPost } from "../../actions/postActions";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const defaultProps = {};

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;

    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <>
          <Row>
            <Col md={12}>
              <PostItem showActions={false} post={post} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CommentFeed postId={post._id} comments={[post.comments]} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CommentForm />
            </Col>
          </Row>
        </>
      );
    }

    return (
      <Container className="full-height">
        <Row>
          <Col md={12}>
            <Link to="/feed" as={Button}>
              Back To Feed
            </Link>
          </Col>
        </Row>
        {postContent}
      </Container>
    );
  }
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
