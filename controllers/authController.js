const User = require("../models/User");
const jwt = require("jsonwebtoken");

//---------------HANDLE ERRORS-----------------
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((props) => {
      errors[props.properties.path] = props.properties.message;
    });
  }
  // Handle errors on logging in
  if (err.message === "Incorrect Email") {
    errors.email = "The email entered is incorrect";
  }
  if (err.message === "Incorrect Password") {
    errors.password = "The Password entered is incorrect";
  }

  return errors;
};

// -------------CREATE TOKENS ------------
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

/* ------SIGN UP ROUTE---------- */

// GET / signup
module.exports.signup_get = (req, res) => {
  res.render("signup");
};
// POST /signup
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    // console.log(errors);
    res.status(400).json({ errors });
  }
};

/* ---------LOGIN ROUTE---------- */

//GET /login
module.exports.login_get = (req, res) => {
  res.render("login");
};

// POST /login
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // send jwt token when user logs in
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // send the response
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// GET /logout
module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
