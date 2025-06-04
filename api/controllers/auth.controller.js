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
      message: "Account successfully signed in,",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};
