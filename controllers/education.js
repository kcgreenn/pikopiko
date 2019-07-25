// import Profile model
const Profile = require("../models/Profile");

// import validation
const validateEduInput = require("../validation/education");

exports.addEducation = (req, res) => {
  // Check validation
  const { errors, isValid } = validateEduInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ userId: req.user.id })
    .then(profile => {
      const newEdu = ({
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
      } = req.body);

      //   Add to experience array
      profile.education.unshift(newEdu);
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

exports.deleteEducation = (req, res) => {
  const errors = {};
  Profile.findOne({ userId: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
      // Splice index from exp array
      profile.education.splice(removeIndex, 1);
      // Save
      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(error => {
          errors.profile = "Could not delete education";
          res.status(404).json(errors);
        });
    })
    .catch(error => {
      errors.profile = "Could not delete education";
      res.status(400).json(errors);
    });
};
