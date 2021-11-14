const mongoose = require("mongoose");
// isEmail is inbuilt function in validator
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema(
  /* [value, ' '] this syntax  means the value for the property is the first element in array, and second 
     parameter is the error message for validation
    */
  {
    email: {
      type: String,
      required: [true, "Please enter an Email"],
      lowercase: true,
      unique: true,
      // we cannot write this same syntax for unique property
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      minlength: [7, "The password should be of atleast 7 characters"],
      required: [true, "Please enter a Password"],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
