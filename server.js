const express = require("express");

// Initialize Express as app
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server running on port:${port}`);
});
