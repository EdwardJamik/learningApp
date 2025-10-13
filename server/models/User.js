import pool from "../config/db.js";

export const createUser = async (name, email, passwordHash, code) => {
	const query = `
    INSERT INTO users (name, email, password, verification_code, is_verified)
    VALUES ($1, $2, $3, $4, false)
    RETURNING id, email;
  `;
	const { rows } = await pool.query(query, [name, email, passwordHash, code]);
	return rows[0];
};

export const findUserByEmail = async (email) => {
	const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
	return rows[0];
};

export const verifyUser = async (email) => {
	await pool.query("UPDATE users SET is_verified = true, verification_code = NULL WHERE email = $1", [email]);
};
