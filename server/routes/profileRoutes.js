import express from "express";
import {
	getProfile,
	updateProfile,
	uploadAvatar,
	deleteAvatar,
	changePassword
} from "../controllers/profileController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProfile);
router.put("/", updateProfile);
router.post("/avatar", upload.single("avatar"), uploadAvatar);
router.delete("/avatar", deleteAvatar);
router.put("/password", changePassword);

export default router;