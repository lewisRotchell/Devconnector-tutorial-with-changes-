const User = require("../models/userModel");
const AppError = require("../utils/appError");
const gravatar = require("gravatar");

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
