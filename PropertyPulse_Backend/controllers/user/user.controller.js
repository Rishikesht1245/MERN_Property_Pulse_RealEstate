import Listing from "../../models/listing.model.js";
import User from "../../models/user.model.js";
import { errorHandler } from "../../utils/error.js";
import bcrypt from "bcrypt";

export const test = (req, res) => {
  res.send("Hello world !");
};

export const updateUser = async (req, res, next) => {
  //req.user.id is set from jwt verify user
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    // hashing the password if user is trying to update the password
    let updatedUser;
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
          // set new to true, to return the new information
        },
        { new: true }
      );
    } else {
      // password will change to " " other wise
      updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar,
          },
          // set new to true, to return the new information
        },
        { new: true }
      );
    }
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    console.log("Error in User update : ", error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token").status(200).json("User has been deleted");
  } catch (error) {
    console.log("Error in deleting User :", error);
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, "You can view your own listing"));

    const listings = await Listing.find({ userRef: req.params.id });
    return res.status(200).json(listings);
  } catch (error) {
    console.log("Error in Get listings of User : ", error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(errorHandler(404, "User not found"));
    res.status(200).json(user);
  } catch (error) {
    console.log("error in get User :", error);
    next(error);
  }
};
