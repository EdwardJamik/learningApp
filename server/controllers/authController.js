import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { createUser, findUserByEmail, verifyUser } from "../models/User.js";
import { sendVerificationEmail } from "../utils/sendMail.js";

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const existingUser = await findUserByEmail(email);
		if (existingUser) return res.status(400).json({ message: "Email already exists" });
		
		const hashedPassword = await bcrypt.hash(password, 10);
		const code = Math.floor(100000 + Math.random() * 900000).toString();
		
		const newUser = await createUser(name, email, hashedPassword, code);
		await sendVerificationEmail(email, code);
		
		res.status(201).json({ message: "Verification code sent to email" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

export const confirmCode = async (req, res) => {
	try {
		const { email, code } = req.body;
		const user = await findUserByEmail(email);
		
		if (!user || user.verification_code !== code)
			return res.status(400).json({ message: "Invalid code" });
		
		await verifyUser(email);
		res.json({ message: "Account verified successfully" });
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log("Login attempt for:", email);
		
		const user = await findUserByEmail(email);
		
		if (!user) return res.status(404).json({ message: "User not found" });
		if (!user.is_verified) return res.status(400).json({ message: "Email not verified" });
		
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: "Invalid password" });
		
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
		
		console.log("Setting cookie for user:", user.id);
		
		// Встановлюємо cookie з токеном
		res.cookie("authToken", token, {
			httpOnly: true,
			secure: false, // для localhost завжди false
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: "/" // явно вказуємо шлях
		});
		
		console.log("Cookie should be set now");
		
		const userData = {
			id: user.id,
			name: user.name,
			email: user.email
		};
		
		console.log("Login successful, returning user data:", userData);
		
		// Повертаємо дані користувача (без пароля)
		res.json({ user: userData });
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("authToken");
	res.json({ message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
	try {
		console.log("GetMe - All cookies:", req.cookies);
		const token = req.cookies.authToken;
		
		if (!token) {
			console.log("GetMe - No token found in cookies");
			return res.status(401).json({ message: "Not authenticated" });
		}
		
		console.log("GetMe - Token found:", token.substring(0, 20) + "...");
		
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("GetMe - Decoded token:", decoded);
		
		// Отримуємо користувача за ID
		const result = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.id]);
		const user = result.rows[0];
		
		console.log("GetMe - User from DB:", user ? { id: user.id, email: user.email } : null);
		
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		
		const userData = {
			id: user.id,
			name: user.name,
			email: user.email,
			level: user.english_level
		};
		
		console.log("GetMe - Returning user data:", userData);
		
		res.json({ user: userData });
	} catch (err) {
		console.error("GetMe error:", err);
		res.status(401).json({ message: "Invalid token" });
	}
};