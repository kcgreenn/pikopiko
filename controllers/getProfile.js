// Import models
const Profile = require("../models/Profile");

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
      res.json(profile);
    })
    .catch(error => res.status(404).json({ error }));
};
