import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deletePost, likePost } from "../../actions/postActions";

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

const propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired
};

const defaultProps = {
  showActions: true
};

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onDeleteHandler = postId => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      this.props.deletePost(postId);
    }
  };
  likePostHandler = postId => {
    this.props.likePost(postId);
  };
  render() {
    const { post, auth, showActions } = this.props;
    let postActions;
    if (showActions) {
      postActions = (
        <>
          {" "}
          <span>
            <Button
              title="Like Post"
              variant="light"
              size="sm"
              className={
                post.likes.some(post => post._id === auth.user.id)
                  ? "text-success"
                  : "text-secondary"
              }
              onClick={() => this.likePostHandler(post._id)}
            >
              <ion-icon size="small" name="thumbs-up" />
              {post.likes.length}
            </Button>
            <Link
              as={Button}
              variant="light"
              title="Comment on Post"
              to={`/post/${post._id}`}
              size="sm"
              className=" mx-1 text-info"
            >
              <ion-icon size="small" name="text" />
              {post.comments.length}
            </Link>
          </span>
          {post.userId === auth.user.id ? (
            <Button
              variant="light"
              className="text-danger"
              onClick={() => this.onDeleteHandler(post._id)}
            >
              <ion-icon size="small" name="trash" />
            </Button>
          ) : null}
        </>
      );
    } else {
      postActions = null;
    }
    return (
      <ListGroupItem>
        <img
          src="https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600w-1114445501.jpg"
          alt="User Avatar"
          className="rounded-circle"
          style={{ width: "5rem" }}
        />
        <p className="lead">{post.text}</p>
        {postActions}
      </ListGroupItem>
    );
  }
}

PostItem.propTypes = propTypes;
PostItem.defaultProps = defaultProps;

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likePost }
)(PostItem);
