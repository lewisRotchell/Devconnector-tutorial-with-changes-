const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const gravatar = require("gravatar");

exports.register = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new AppError("User already exists", 400));
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    }),
  });
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
