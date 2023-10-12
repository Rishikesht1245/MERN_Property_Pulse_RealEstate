import bcrypt from "bcrypt";
import Admins from "../../models/admin.model.js";
import { errorHandler } from "../../utils/error.js";

export const createAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const adminCheck = await Admins.findOne({ email });
    if (adminCheck)
      return next(errorHandler(409, "Admin already exists, please login"));

    req.body.password = await bcrypt.hash(password, 10);

    const newAdmin = new Admins(req.body);
    await newAdmin.save();

    res.status(201).json(newAdmin);
  } catch (error) {
    console.log("Error in admin schema : ", error);
    next(error);
  }
};
