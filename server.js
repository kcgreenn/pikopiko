const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

// Initialize Express as app
const app = express();

// express middleware

// DB Config
const db = require("./config/keys").MONGODB_URI;

// Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("Connected to mongodb"))
  .catch(error => console.error(error));

//   Routes

// User Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server running on port:${port}`);
});
