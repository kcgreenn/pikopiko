// import Post model
const Post = require("../models/Post");
const Profile = require("../models/Profile");

// import post validation
const validatePostInput = require("../validation/post");

// Get All Posts
exports.getAllPosts = (req, res) => {
  const errors = {};

  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(error => {
      errors.posts = "Could not find any posts";
      res.status(404).json(errors);
    });
};

// Get Post By Id
exports.getPostById = (req, res) => {
  const errors = {};

  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(error => {
      errors.posts = "Could not find that post";
      res.status(404).json(errors);
    });
};

// Create New Post as Logged In User
exports.createPost = (req, res) => {
  // Validate post input
  const { errors, isValid } = validatePostInput(req.body);
  // If any inputs are not valid return errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //   Destructure data from req.body
  const { text, name, avatar } = req.body;
  const userId = req.user.id;
  //   Create new post
  const newPost = new Post({ text, name, avatar, userId });
  // Save post to db
  newPost
    .save()
    .then(post => res.json(post))
    .catch(error => {
      errors.post = "Could not create post";
      res.status(400).json(errors);
    });
};

// Delete a Post with the given Id
exports.deletePost = (req, res) => {
  const errors = {};
  // Find post and delete it
  Post.findById(req.params.id)
    .then(post => {
      // Check if Post Owner is Making Delete  Request
      if (post.userId.toString() !== req.user.id) {
        errors.post = "Not authorized to delete this post";
        res.status(401).json(errors);
      } else {
        post
          .remove()
          .then(() => res.json({ success: true }))
          .catch(error => {
            errors.post = "Could not delete post";
            res.status(404).json(errors);
          });
      }
    })
    .catch(error => {
      errors.post = "Could not delete post";
      res.status(400).json(errors);
    });
};

// Like or Unlike a Post with the given Id
exports.likePost = (req, res) => {
  const errors = {};
  // Find post and like or dislike
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.likes.filter(like => like._id.toString() === req.user.id).length >
        0
      ) {
        //   If user has already liked this post, remove them from like array
        const unlikeIndex = post.likes.indexOf({ userId: req.user.id });
        post.likes.splice(unlikeIndex, 1);
        post
          .save()
          .then(post => res.json(post))
          .catch(error => {
            errors.post = "Could not unlike post";
            res.status(400).json(errors);
          });
      } else {
        //   Else add userId to like array
        post.likes.push(req.user.id);
        post
          .save()
          .then(post => res.json(post))
          .catch(error => {
            errors.post = "Could not like post";
            res.status(400).json(errors);
          });
      }
    })
    .catch(error => {
      errors.post = "Could not like post";
      res.status(400).json(errors);
    });
};
