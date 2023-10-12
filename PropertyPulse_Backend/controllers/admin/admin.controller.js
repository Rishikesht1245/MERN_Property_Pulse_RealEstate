import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const adminCheck = await Admins.findOne({ email });
    if (!adminCheck) return next(errorHandler(404, "Admin not found"));

    const validPassword = await bcrypt.compare(password, adminCheck.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    //removing password to be saved in browser
    const { password: pass, ...rest } = adminCheck._doc;
    const token = jwt.sign({ id: adminCheck._id }, process.env.JWT_SECRET);

    res.cookie("admin_token", token).status(200).json(rest);

    return res.status(200).json(adminCheck);
  } catch (error) {
    console.log("error in Admin sign In : ", error);
  }
};
