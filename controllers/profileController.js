const User = require("../models/userModel");
const Profile = require("../models/Profile");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const normalizeUrl = require("normalize-url");
const axios = require("axios");

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
    status,
    website,
    skills,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body;

  if (!status || !skills) {
    return next(new AppError("status and skills are required", 400));
  }

  // if (!skills) {
  //   return next(new AppError("skills are required", 400));
  // }

  const profileFields = {
    user: req.user.id,
    website:
      website && website !== ""
        ? normalizeUrl(website, { forceHttps: true })
        : "",
    skills: skills.split(",").map((skill) => " " + skill.trim()),
    ...req.body,
  };

  // Build socialFields object
  const socialFields = { youtube, twitter, instagram, linkedin, facebook };

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0)
      socialFields[key] = normalizeUrl(value, { forceHttps: true });
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

exports.getProfiles = catchAsync(async (req, res, next) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  res.status(200).json({
    success: true,
    count: profiles.length,
    data: profiles,
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.params.user_id,
  }).populate("user", ["name", "avatar"]);

  if (!profile) {
    return next(new AppError("profile does not exist"));
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  //Remove profile
  await Profile.findOneAndRemove({ user: req.user.id });
  //Remove user
  await User.findOneAndRemove({ _id: req.user.id });

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.addExperience = catchAsync(async (req, res, next) => {
  const newExp = {
    ...req.body,
  };

  const profile = await Profile.findOne({ user: req.user.id });

  profile.experience.unshift(newExp);

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

exports.deleteExperience = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  //Get remove index
  const removeIndex = profile.experience
    .map((item) => item.id)
    .indexOf(req.params.exp_id);

  if (removeIndex === -1) {
    return next(new AppError("There is no experience with this ID"));
  }

  profile.experience.splice(removeIndex, 1);

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

exports.addEducation = catchAsync(async (req, res, next) => {
  const newEd = {
    ...req.body,
  };

  const profile = await Profile.findOne({ user: req.user.id });

  profile.education.unshift(newEd);

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

exports.deleteEducation = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  //Get remove index
  const removeIndex = profile.education
    .map((item) => item.id)
    .indexOf(req.params.ed_id);

  if (removeIndex === -1) {
    return next(new AppError("There is no education with this ID"));
  }

  profile.education.splice(removeIndex, 1);

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

exports.getGithub = catchAsync(async (req, res, next) => {
  const uri = encodeURI(
    `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
  );
  const headers = {
    "user-agent": "node.js",
    Authorization: `token ${process.env.GITHUB_PAT}`,
  };

  const gitHubResponse = await axios.get(uri, { headers });

  res.status(200).json({
    success: true,
    data: gitHubResponse.data,
  });
});
