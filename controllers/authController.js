const User = require("../models/User");

//---------------HANDLE ERRORS-----------------
const handleErrors = (err) => {
  //   console.log(err.message, err.code);
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
  return errors;
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
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    // console.log(errors);
    res.status(400).json(errors);
  }
};

/* ---------LOGIN ROUTE---------- */

//GET /login
module.exports.login_get = (req, res) => {
  res.render("login");
};

// POST /login
module.exports.login_post = (req, res) => {
  console.log(req.body);
  res.send("user login");
};
