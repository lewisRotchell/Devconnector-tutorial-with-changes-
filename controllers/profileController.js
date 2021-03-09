const User = require("../models/userModel");
const Profile = require("../models/Profile");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const normalizeUrl = require("normalize-url");

exports.myProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    "user",
    ["name", "avatar"]
  );
  if (!profile) {
    return next(new AppError("There is no profile for this user", 400));
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

exports.createProfile = catchAsync(async (req, res, next) => {
  const {
    website,
    skills,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body;
  const profileFields = {
    user: req.user.id,
    website:
      website && website !== ""
        ? normalizeUrl(website, { forceHTTPS: true })
        : "",
    skills: skills.split(",").map((skill) => " " + skill.trim()),
    ...req.body,
  };

  // Build socialFields object
  const socialFields = { youtube, twitter, instagram, linkedin, facebook };

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0)
      socialFields[key] = normalize(value, { forceHttps: true });
  }
  // add to profileFields
  profileFields.social = socialFields;

  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({
    success: true,
    data: profile,
  });
});
