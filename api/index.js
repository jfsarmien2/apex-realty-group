const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.error(error);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
