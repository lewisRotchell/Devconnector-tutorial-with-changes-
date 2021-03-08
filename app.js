const express = require("express");
const morgan = require("morgan");
const authRouter = require("./routes/authRoutes");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");

const app = express();

//Middleware
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

module.exports = app;
