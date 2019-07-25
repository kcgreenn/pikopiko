// import Post model
const Post = require("../models/Post");
// import comment validation
const validateCommentInput = require("../validation/comment");

exports.addCommenttoPost = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = ({ text, name, avatar, userId } = req.body);
      newComment.userId = req.user.id;
      //   Add to comments array
      post.comments.push(newComment);
      // Save post to db
      post
        .save()
        .then(post => res.json(post))
        .catch(error => {
          errors.post = "Could not add comment";
          res.status(400).json(errors);
        });
    })
    .catch(error => {
      errors.post = "Could not find post";
      res.status(400).json(errors);
    });
};

exports.deleteComment = (req, res) => {
  const errors = {};

  Post.findById(req.params.id)
    .then(post => {
      if (
        //   If comment is not found in comments array
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        errors.comment = "Comment not found";
        res.status(404).json(errors);
      } else if (post.comments.userId !== req.user.id) {
        errors.user = "Not authorizes to delete that comment";
        res.status(401).json(errors);
      }
      //   Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);
      //   Splice comment from array
      post.comments.splice(removeIndex, 1);
      // Save post to db
      post
        .save()
        .then(post => res.json(post))
        .catch(error => {
          errors.post = "Could not delete comment";
          res.status(400).json(errors);
        });
    })
    .catch(error => {
      errors.post = "Could not find post";
      res.status(400).json(errors);
    });
};
