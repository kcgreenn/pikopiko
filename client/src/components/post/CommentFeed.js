import React from "react";
import PropTypes from "prop-types";

import CommentItem from "./CommentItem";

import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";

const propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

const defaultProps = {};

class CommentFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { comments, postId, loading } = this.props;
    let commentList;
    if (comments === null || loading) {
      commentList = <Spinner />;
    } else {
      commentList = comments[0].map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      ));
    }
    return <ListGroup>{commentList}</ListGroup>;
  }
}

CommentFeed.propTypes = propTypes;
CommentFeed.defaultProps = defaultProps;

export default CommentFeed;
