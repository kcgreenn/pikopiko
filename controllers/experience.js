// import Profile model
const Profile = require("../models/Profile");

// import validation
const validateExpInput = require("../validation/experience");

exports.addExperience = (req, res) => {
  // Check validation
  const { errors, isValid } = validateExpInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ userId: req.user.id })
    .then(profile => {
      const newExp = ({
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = req.body);

      //   Add to experience array
      profile.experience.unshift(newExp);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(error => {
          errors.profile = "No matching profile";
          res.status(400).json(errors);
        });
    })
    .catch(error => {
      errors.profile = "No matching profile";
      res.status(400).json(errors);
    });
};
