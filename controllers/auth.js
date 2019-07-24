const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Load Input validation
const validateRegisterInput = require("../validation/register");

// Load User Model
const User = require("../models/User");

// Register a new user
exports.registerUser = (req, res, next) => {
  // validate user inputs
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
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
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  //   Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User Not Found" });
    }
    //  use bcrypt to compare passwords
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //   if email and passwords match, send jwt

        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //  Create JWT payload
        // Sign web token
        jwt.sign(
          payload,
          process.env.SECRET_OR_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password Incorrect" });
      }
    });
  });
};
