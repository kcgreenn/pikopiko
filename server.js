const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();
const path = require("path");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

// Initialize Express as app
const app = express();

// bodyparser middleware
// parse data sent from client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = process.env.MONGODB_URI;

// Connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb"))
  .catch(error => console.error(error));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

//   Routes

// User Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Sreve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path / resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server running on port:${port}`);
});
