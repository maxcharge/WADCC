const express = require("express");
const path = require("path");
const app = express();

// Static Middleware
app.use(express.static(path.join(__dirname, "public")));

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.listen(3000, () => console.log(`Server started at port : 3000`));
