import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createListing } from "../controllers/list.controller.js";

const router = express.Router();

router.get("/", (req, res, next) => {});

router.post("/create", verifyUser, createListing);

export default router;
