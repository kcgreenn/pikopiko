// Import models
const Profile = require("../models/Profile");

// Import Validation
const validateProfileCreate = require("../validation/profileCreate");
const validateProfileUpdate = require("../validation/profileUpdate");

exports.getAllProfiles = (req, res) => {
  const errors = {};
  Profile.find()
    .populate('userId, ["name","avatar"]')
    .then(profiles => {
      if (!profiles) {
        errors.profile = "There are no profiles";
        return res.status(404).json(errors);
      } else {
        res.json(profiles);
      }
    })
    .catch(error => {
      errors.profile = "There are no profiles";
      res.status(404).json(errors);
    });
};

exports.getProfileByHandle = (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("userId", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        res.json(profile);
      }
    })
    .catch(error => {
      errors.profile = "There is no profile for this user";
      res.status(404).json(errors);
    });
};

exports.getProfileByUserId = (req, res) => {
  const errors = {};
  Profile.findOne({ userId: req.params.userId })
    .populate("userId", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        res.json(profile);
      }
    })
    .catch(error => {
      errors.db = "There is no profile for this user";
      res.status(404).json(errors);
    });
};

exports.getProfile = (req, res) => {
  let errors = {};
  Profile.findOne({ userId: req.user.id })
    .populate("users", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json({ errors });
      }
      res.json({ profile });
    })
    .catch(error => res.status(404).json({ error }));
};

exports.createProfile = (req, res) => {
  const { errors, isValid } = validateProfileCreate(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
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
  profileFields.userId = req.user.id;
  //   Split interests into array
  profileFields.interests =
    typeof profileFields.interests !== undefined
      ? profileFields.interests.split(",")
      : null;

  //   Social Links
  profileFields.social = {
    youtube,
    instagram,
    linkedin
  };
  // Check if user already has a profile
  Profile.findOne({ userId: req.user.id })
    .then(profile => {
      // If user does not have a profile, check if the handle is already being used
      if (!profile) {
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            // If the handle is being used, inform user
            if (profile) {
              errors.handle = "That handle is already in use.";
              res.status(400).json(errors);
            } else {
              // If handle is not being used, create new profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile))
                .catch(error => {
                  errors.db = "Could not create new profile in database";
                  res.status(400).json(errors);
                });
            }
          })
          .catch(error => {
            errors.db = "Error connecting to database.";
            res.status(400).json(errors);
          });
      } else {
        errors.profile = "User already has a profile";
        return res.status(400).json(errors);
      }
    })
    .catch(error => {
      errors.db = "Could not query database.";
      res.status(400).json(errors);
    });
};

exports.editProfile = (req, res) => {
  const { errors, isValid } = validateProfileUpdate(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Pull data from fields

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
    typeof interests !== "undefined" ? interests.split(",") : null;

  //   Social Links
  profileFields.social = {
    youtube,
    instagram,
    linkedin
  };
  // If profile exists, update it with altered data fields
  Profile.findOneAndUpdate(
    { userId: req.user.id },
    { $set: profileFields },
    { new: true }
  )
    .then(profile => res.json(profile))
    .catch(error => {
      errors.profile = "Could not find user profile";
      res.status(404).json(errors);
    });
};
