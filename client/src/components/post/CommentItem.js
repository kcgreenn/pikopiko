import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

import { deleteComment } from "../../actions/postActions";

const propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const defaultProps = {};

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteCommentHandler = (postId, commentId, userId) => {
    this.props.deleteComment(postId, commentId, userId);
  };

  render() {
    const { comment, postId, auth } = this.props;
    return (
      <ListGroupItem>
        <p>{comment.text}</p>
        {auth.user.name === comment.name && (
          <Button
            onClick={() =>
              this.deleteCommentHandler(postId, comment._id, auth.user.id)
            }
            variant="danger"
            size="sm"
          >
            Delete
          </Button>
        )}
      </ListGroupItem>
    );
  }
}

CommentItem.propTypes = propTypes;
CommentItem.defaultProps = defaultProps;

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
