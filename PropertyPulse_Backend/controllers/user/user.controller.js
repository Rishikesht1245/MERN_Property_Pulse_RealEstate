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
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
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
    console.log(updatedUser);
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    console.log("Error in User update : ", error);
    next(error);
  }
};
