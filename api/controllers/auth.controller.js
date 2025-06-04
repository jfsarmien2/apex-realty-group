import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hash_password });
  try {
    await newUser.save();
    res
      .status(200)
      .json({ status: "success", message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validuser = await User.findOne({ email });

    if (!validuser) {
      return next(errorHandler(404, "Invalid credentials. Please try again."));
    }
    const validPassword = await bcrypt.compare(password, validuser.password);

    if (!validPassword) {
      return next(errorHandler(404, "Invalid credentials. Please try again."));
    }
    const { password: pass, ...rest } = validuser._doc;

    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Account successfully signed in.",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, photo } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        success: true,
        message: "Account successfully signed in.",
        user: rest,
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);

      const salt = await bcrypt.genSalt(10);

      const hash_password = await bcrypt.hash(generatedPassword, salt);

      const user_name =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new User({
        username: user_name,
        email: email,
        password: hash_password,
        avatar: photo,
      });

      await newUser.save();

      const { password, ...rest } = newUser._doc;

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        success: true,
        message: "Account successfully signed in.",
        user: rest,
      });
    }
  } catch (error) {
    next(error);
  }
};
