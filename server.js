const mongoose = require("mongoose");

const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception, Shutting Down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection Shutting Down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
