import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

export const sendVerificationEmail = async (email, code) => {
	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Ваш код підтвердження",
		text: `Ваш код підтвердження: ${code}`,
	});
};
