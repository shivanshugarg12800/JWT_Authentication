const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const app = express();

// middleware
app.use(express.static("public"));
// this is used to parse all the data submitted during post request in the Javascript object attach
// with req object.
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://shivanshu:shiv1234@nodejs.a7eor.mongodb.net/JWT-auth?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);
