import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
  forgotpasswordtoken: String,
  forgotpasswordtokkenexpiry: Date,
  verifytoken: String,
  verifytokenexpiry: Date,
});

const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;
