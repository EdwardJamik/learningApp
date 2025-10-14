import express from "express";
import {
	getProfile,
	updateProfile,
	uploadAvatar,
	deleteAvatar,
	changePassword,
	submitTestLevel,
	getTestLevel
} from "../controllers/profileController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProfile);
router.put("/", updateProfile);
router.post("/avatar", upload.single("avatar"), uploadAvatar);
router.delete("/avatar", deleteAvatar);
router.put("/password", changePassword);

// Нові маршрути для тесту рівня
router.post("/test-level", submitTestLevel);
router.get("/test-level", getTestLevel);

export default router;