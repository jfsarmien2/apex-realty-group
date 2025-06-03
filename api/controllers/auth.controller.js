import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
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
    res.status(500).json({
      status: "failed",
      message: error?.message,
    });
  }
};
