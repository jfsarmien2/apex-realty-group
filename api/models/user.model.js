import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://avatar.iran.liara.run/public/3",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
