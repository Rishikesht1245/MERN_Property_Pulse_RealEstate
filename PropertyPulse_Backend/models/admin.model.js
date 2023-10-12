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
});

const Admins = mongoose.model("Admin", adminSchema);

export default Admins;
