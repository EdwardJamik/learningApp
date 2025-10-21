import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Отримати профіль користувача
export const getProfile = async (req, res) => {
	try {
		const token = req.cookies.authToken;
		
		if (!token) {
			return res.status(401).json({ message: "Not authenticated" });
		}
		
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const result = await pool.query(
			"SELECT id, name, first_name, last_name, email, phone, telegram, gender, avatar_url FROM users WHERE id = $1",
			[decoded.id]
		);
		
		const user = result.rows[0];
		
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		
		res.json({ user });
	} catch (err) {
		console.error("Get profile error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

// Оновити профіль користувача
export const updateProfile = async (req, res) => {
	try {
		const token = req.cookies.authToken;
		
		if (!token) {
			return res.status(401).json({ message: "Not authenticated" });
		}
		
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { name, last_name, phone, telegram, gender } = req.body;
		
		const result = await pool.query(
			`UPDATE users
       SET name = $1, last_name = $2, phone = $3, telegram = $4, gender = $5
       WHERE id = $6
       RETURNING id, name, first_name, last_name, email, phone, telegram, gender, avatar_url`,
			[name, last_name, phone, telegram, gender, decoded.id]
		);
		
		const user = result.rows[0];
		
		res.json({
			message: "Profile updated successfully",
			user
		});
	} catch (err) {
		console.error("Update profile error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

// Завантажити аватар
export const uploadAvatar = async (req, res) => {
	try {
		const token = req.cookies.authToken;
		
		if (!token) {
			return res.status(401).json({ message: "Not authenticated" });
		}
		
		if (!req.file) {
			return res.status(400).json({ message: "No file uploaded" });
		}
		
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		
		// Видаляємо старий аватар якщо є
		const oldUser = await pool.query(
			"SELECT avatar_url FROM users WHERE id = $1",
			[decoded.id]
		);
		
		if (oldUser.rows[0]?.avatar_url) {
			const oldPath = path.join(__dirname, "..", oldUser.rows[0].avatar_url);
			if (fs.existsSync(oldPath)) {
				fs.unlinkSync(oldPath);
			}
		}
		
		// Зберігаємо новий аватар
		const avatarUrl = `/uploads/${req.file.filename}`;
		
		const result = await pool.query(
			`UPDATE users
       SET avatar_url = $1
       WHERE id = $2
       RETURNING id, name, first_name, last_name, email, phone, telegram, gender, avatar_url`,
			[avatarUrl, decoded.id]
		);
		
		res.json({
			message: "Avatar uploaded successfully",
			user: result.rows[0]
		});
	} catch (err) {
		console.error("Upload avatar error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

// Видалити аватар
export const deleteAvatar = async (req, res) => {
	try {
		const token = req.cookies.authToken;
		
		if (!token) {
			return res.status(401).json({ message: "Not authenticated" });
		}
		
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		
		// Отримуємо шлях до аватара
		const userResult = await pool.query(
			"SELECT avatar_url FROM users WHERE id = $1",
			[decoded.id]
		);
		
		const avatarUrl = userResult.rows[0]?.avatar_url;
		
		if (avatarUrl) {
			const avatarPath = path.join(__dirname, "..", avatarUrl);
			if (fs.existsSync(avatarPath)) {
				fs.unlinkSync(avatarPath);
			}
		}
		
		const result = await pool.query(
			`UPDATE users
       SET avatar_url = NULL
       WHERE id = $1
       RETURNING id, name, first_name, last_name, email, phone, telegram, gender, avatar_url`,
			[decoded.id]
		);
		
		res.json({
			message: "Avatar deleted successfully",
			user: result.rows[0]
		});
	} catch (err) {
		console.error("Delete avatar error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

// Змінити пароль
export const changePassword = async (req, res) => {
	try {
		const token = req.cookies.authToken;
		
		if (!token) {
			return res.status(401).json({ message: "Not authenticated" });
		}
		
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { oldPassword, newPassword } = req.body;
		
		// Перевіряємо старий пароль
		const userResult = await pool.query(
			"SELECT password FROM users WHERE id = $1",
			[decoded.id]
		);
		
		const user = userResult.rows[0];
		const isMatch = await bcrypt.compare(oldPassword, user.password);
		
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid old password" });
		}
		
		// Хешуємо новий пароль
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		
		await pool.query(
			"UPDATE users SET password = $1 WHERE id = $2",
			[hashedPassword, decoded.id]
		);
		
		res.json({ message: "Password changed successfully" });
	} catch (err) {
		console.error("Change password error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

export const submitTestLevel = async (req, res) => {
	try {
		const token = req.cookies.authToken;
		
		if (!token) {
			return res.status(401).json({ message: "Not authenticated" });
		}
		
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { level, score } = req.body;
		
		// Валідація рівня
		const validLevels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];
		if (!validLevels.includes(level.toUpperCase())) {
			return res.status(400).json({ message: "Invalid level" });
		}
		
		const result = await pool.query(
			`UPDATE users
       SET english_level = $1, test_completed = true, test_score = $2, test_date = NOW()
       WHERE id = $3
       RETURNING id, name, first_name, last_name, email, english_level, test_completed`,
			[level.toUpperCase(), score || null, decoded.id]
		);
		
		const user = result.rows[0];
		
		res.json({
			message: "Test completed successfully",
			user
		});
	} catch (err) {
		console.error("Submit test level error:", err);
		res.status(500).json({ message: "Server error" });
	}
};

// Отримати результат тесту рівня
export const getTestLevel = async (req, res) => {
	try {
		const token = req.cookies.authToken;
		
		if (!token) {
			return res.status(401).json({ message: "Not authenticated" });
		}
		
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		
		const result = await pool.query(
			"SELECT english_level, test_completed, test_score, test_date FROM users WHERE id = $1",
			[decoded.id]
		);
		
		const testData = result.rows[0];
		
		res.json({ testData });
	} catch (err) {
		console.error("Get test level error:", err);
		res.status(500).json({ message: "Server error" });
	}
};