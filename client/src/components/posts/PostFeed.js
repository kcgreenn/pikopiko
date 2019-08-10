import React from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import PostItem from "./PostItem";

const propTypes = {
  posts: PropTypes.array.isRequired
};

const defaultProps = {
  posts: []
};

class PostFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { posts } = this.props;
    return (
      <Card>
        <ListGroup>
          {posts.length === 0 ? (
            <h3 className="text-center my-5 display5">
              You haven't posted anything, yet.
            </h3>
          ) : (
            posts.map(post => <PostItem key={post._id} post={post} />)
          )}
        </ListGroup>
      </Card>
    );
  }
}

PostFeed.propTypes = propTypes;
PostFeed.defaultProps = defaultProps;

export default PostFeed;
