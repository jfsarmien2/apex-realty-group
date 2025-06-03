const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://apex-admin:gCu8R1F?&0&1@apex-realty-group-clust.ppv2dsk.mongodb.net/?retryWrites=true&w=majority&appName=apex-realty-group-cluste"
);

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
