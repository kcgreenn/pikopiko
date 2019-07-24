const mongoose = require("mongoose");

// Import models
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.getProfile = (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json({ errors });
      }
      res.json({ profile });
    })
    .catch(error => res.status(404).json({ error }));
};
