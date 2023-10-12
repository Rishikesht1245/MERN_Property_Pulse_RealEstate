import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  //encrypting password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userCheck = await User.find({ email });
  if (userCheck)
    return next(errorHandler(409, "User already exists Please login"));

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
        // //time in seconds
        // expires: new Date(Date.now() + 24 * 60 * 60),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log("error in Sign In : ", error);
    next(error);
  }
};

// firebase authentication
export const google = async (req, res, next) => {
  try {
    const { email, username, photo } = req.body;
    const user = await User.findOne({ email });
    //login
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // signup
      // creating passwords for google authentications
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatePassword, 10);
      const newUser = new User({
        username:
          username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        avatar: photo,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log("error in sign in with google", error);
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been logged out!");
  } catch (error) {
    console.log("error in signOut : ", error);
    next(error);
  }
};
