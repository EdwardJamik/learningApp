import express from "express";
import { register, login, confirmCode, logout, getMe } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/confirm", confirmCode);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getMe); // для перевірки поточного користувача

// Тестовий ендпоінт для перевірки cookies
router.get("/test-cookie", (req, res) => {
	console.log("Test cookie - All cookies:", req.cookies);
	res.json({ cookies: req.cookies });
});

export default router;