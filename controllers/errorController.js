const AppError = require("../utils/appError");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  //Log to console for dev
  console.log(error);

  //Mongoose bad object ID
  if (err.name === "CastError") {
    let message;
    message = `Resource not found with id of ${err.value}`;
    // if (err.kind == "ObjectId") {
    //   message = "Profile not found";
    // }
    error = new AppError(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new AppError(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message);
    error = new AppError(message, 400);
  }

  //
  if (err.isAxiosError === true) {
    const message = `No github profile found`;
    error = new AppError(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
