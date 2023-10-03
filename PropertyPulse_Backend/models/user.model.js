import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
      unique: [true, "Username must be Unique"],
    },
    email: {
      type: String,
      required: [true, "email is Required"],
      unique: [true, "email must be Unique"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
