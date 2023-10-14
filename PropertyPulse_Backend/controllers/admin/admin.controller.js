import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admins from "../../models/admin.model.js";
import { errorHandler } from "../../utils/error.js";
import User from "../../models/user.model.js";
import Listing from "../../models/listing.model.js";

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

    res
      .cookie("admin_token", token, {
        //deny third party applications for security
        httpOnly: true,
        // //time in seconds
        // expires: new Date(Date.now() + 24 * 60 * 60),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log("error in Admin sign In : ", error);
    next(error);
  }
};

//  get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in get all users : ", error);
    next(error);
  }
};

export const blockOrUnblockUser = async (req, res, next) => {
  const { userId, action } = req.params;

  try {
    if (action !== "block" && action !== "unblock") {
      return res.status(400).json({ message: "Invalid action" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: action === "block",
      },
      { new: true }
    );

    const actionText = updatedUser.isBlocked ? "Blocked" : "Unblocked";

    res.status(200).json({
      message: `User has been ${actionText} successfully!`,
      updatedUser,
    });
  } catch (error) {
    console.log("Error in Block or Unblock User : ", error);
    next(error);
  }
};

//  get all listings
export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) {
    console.log("Error in get all users : ", error);
    next(error);
  }
};

export const blockOrUnblockListing = async (req, res, next) => {
  const { listingId, action } = req.params;

  try {
    if (action !== "block" && action !== "unblock") {
      return res.status(400).json({ message: "Invalid action" });
    }
    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      {
        isBlocked: action === "block",
      },
      { new: true }
    );

    const actionText = updatedListing.isBlocked ? "Blocked" : "Unblocked";

    res.status(200).json({
      message: `Listing has been ${actionText} successfully!`,
      updatedListing,
    });
  } catch (error) {
    console.log("Error in Block or Unblock Listing : ", error);
    next(error);
  }
};
