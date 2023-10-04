import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  //encrypting password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();

    res.status(201).json("User Created Successfully");
  } catch (error) {
    console.log("error in user signup", error);
    next(error);
  }
};

export const singIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    // passing the custom error function to middleware
    if (!validUser) return next(errorHandler(404, "User Not Found"));

    // compare password
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));

    // avoiding password in cookies  -- ._doc contains the document details
    const { password: pass, ...rest } = validUser._doc;

    // authentication using jwt and cookie
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        //deny third party applications for security
        httpOnly: true,
        //time in seconds
        expires: new Date(Date.now() + 24 * 60 * 60),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log("error in Sign In : ", error);
    next(error);
  }
};
