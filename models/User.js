const mongoose = require("mongoose");
// isEmail is inbuilt function in validator
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
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
//mongoose hooks

/* this function is called when a collection is created and saved in the database
 if we dont call the next(), it stays there and doesn't return any response

 userSchema.post("save", function () {
  console.log("user is created and saved in Database");
  //next();
});

*/
// this function is called at the instance when any collection is created but is not saved yet
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
