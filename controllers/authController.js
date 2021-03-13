const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const gravatar = require("gravatar");

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new AppError("User already exists", 400));
  }

  const newUser = await User.create({
    name,
    email,
    password,
    avatar: gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    }),
  });

  sendTokenResponse(newUser, 201, res);
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email and password
  if (!email || !password) {
    return next(new AppError("please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  sendTokenResponse(user, 201, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };

  // if (process.env.NODE_ENV === "production") {
  //   options.secure = true;
  // }

  res.status(statusCode).json({
    status: true,
    token,
  });
};
