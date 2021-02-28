const express = require("express");

const userRouter = require("./routes/userRoutes");
const app = express();

//Middleware
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/users", userRouter);

module.exports = app;
