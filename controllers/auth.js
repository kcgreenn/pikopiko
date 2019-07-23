const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../models/User");

// Register a new user
const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  // Check if email is already registered
  User.findOne({ email: email }).then(user => {
    if (user) {
      //   Return error if email is already registered
      return res
        .status(400)
        .json({ error: "Email is already in registered on this site" });
    } else {
      //   otherwise create a new user
      //   Generate gravatar avatar
      const avatar = gravatar.url(email, {
        s: "200", // Size
        r: "pg", //Rating
        d: "mm" //Default
      });
      const newUser = new User({ name, email, avatar, password });

      // Encrypt Password before storing in database
      bcrypt.genSalt(10, (error, salt) => {
        if (error) throw error;
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json({ user });
            })
            .catch(error => console.log(error));
        });
      });
    }
  });
};

// Login an existing user and return JWT
const loginUser = (req, res) => {
  console.log(req);
};

module.exports = {
  registerUser
};
