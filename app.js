const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const {
  checkAuthenticated,
  checkUser,
} = require("./middleware/authMiddleware");
const app = express();

// middleware
app.use(express.static("public"));
// this is used to parse all the data submitted during post request in the Javascript object attach
// with req object.
app.use(express.json());
// middleware to use cookie
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", checkAuthenticated, (req, res) =>
  res.render("smoothies")
);
app.use(authRoutes);
