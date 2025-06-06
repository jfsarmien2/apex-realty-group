import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// router.get("/", user);

router.put("/update/:id", verifyUser, updateUser);

export default router;
