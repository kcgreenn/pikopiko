// import Post model
const Post = require("../models/Post");

// import post validation
const validatePostInput = require("../validation/post");

exports.createPost = (req, res) => {
  // Validate post input
  const { errors, isValid } = validatePostInput(req.body);
  // If any inputs are not valid return errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //   Destructure data from req.body
  const { text, name, avatar, userId } = req.body;
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
