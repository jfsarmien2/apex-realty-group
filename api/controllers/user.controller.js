import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
  if (req?.user?.id !== req?.params?.id) {
    return next(errorHandler(401, "You can only update your own account"));
  }
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashed_password;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req?.params?.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser?._doc;
    res.status(200).json({
      success: true,
      message: "Account successfully updated",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req?.user?.id !== req?.params?.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  }
  try {
    await User.findByIdAndDelete(req?.params?.id);

    res.clearCookie("access_token");
    res
      .status(200)
      .json({ success: true, message: "Acount successfully delete" });
  } catch (error) {
    next(error);
  }
};
