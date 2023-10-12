import mongoose, { mongo } from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
});

const Admins = mongoose.model("Admin", adminSchema);

export default Admins;
