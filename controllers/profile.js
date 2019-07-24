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

exports.postProfile = (req, res) => {
  const errors = {};
  // Pull data from Fields
  let profileFields = ({
    handle,
    occupation,
    bio,
    location,
    status,
    interests,
    expreience,
    education,
    social = {},
    instagram,
    linkedin,
    youtube
  } = req.body);
  console.log(profileFields);
  //   Split interests into array
  profileFields.interests =
    typeof profileFields.interests !== undefined
      ? profileFields.interests.split("")
      : null;

  //   Social Links
  profileFields.social = {
    youtube,
    instagram,
    linkedin
  };

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      // If profile does not exist
      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle })
        .then(profile => {
          errors.handle = "That handle is already in use.";
          res.status(400).json(errors);
        })
        .catch(error => {
          errors.error = error;
          res.status(404).json(errors);
        });
      // Create Profile
      new Profile(profileFields)
        .save()
        .then(profile => res.json(profile))
        .catch(error =>
          res.status(404).json({ error: "Could not create profile" })
        );
    }
  });
};

exports.putProfile = (req, res) => {
  const errors = {};
  // Pull data from fields
  const { user } = req.user.id;
  let profileFields = ({
    handle,
    occupation,
    bio,
    location,
    status,
    interests,
    expreience,
    education,
    social = {},
    instagram,
    linkedin,
    youtube
  } = req.body);
  //   Split interests into array
  profileFields.interests =
    typeof interests !== undefined ? interests.split("") : null;

  //   Social Links
  profileFields.social = {
    youtube,
    instagram,
    linkedin
  };
  Profile.findOne({ user }).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate({ user }, { $set: profileFields }, { new: true })
        .then(profile => res.json(profile))
        .catch(error =>
          res.status(404).json({ error: "Could not update profile" })
        );
    }
  });
};
