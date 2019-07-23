const express = require("express");
const mongoose = require("mongoose");

// Initialize Express as app
const app = express();

// DB Config
const db = require("./config/keys").MONGODB_URI;

// Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("Connected to mongodb"))
  .catch(error => console.error(error));

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server running on port:${port}`);
});
