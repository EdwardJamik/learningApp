"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginImage from "@/app/assets/Login/login-img.png";

const LoginForm = ({ toggleForm }) => {
	const { login, user, loading } = useAuth();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	
	useEffect(() => {
		console.log("LoginForm - User:", user, "Loading:", loading);
		if (user && !loading) {
			console.log("Redirecting to dashboard...");
			router.push("/dashboard");
		}
	}, [user, loading, router]);
	
	if (loading) {
		return <div>Завантаження...</div>;
	}
	
	if (user) {
		console.log("User already logged in, should redirect");
		return null;
	}
	
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError("");
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");
		
		console.log("Attempting login...");
		
		try {
			const res = await fetch("http://localhost:5000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify(formData),
			});
			
			console.log("Login response status:", res.status);
			const data = await res.json();
			console.log("Login response data:", data);
			
			if (res.ok) {
				console.log("Login successful, calling login() with:", data.user);
				login(data.user);
				
				// Додатковий redіrect після невеликої затримки
				setTimeout(() => {
					console.log("Executing router.push...");
					router.push("/dashboard");
				}, 100);
			} else {
				setError(data.message || "Помилка входу");
			}
		} catch (err) {
			console.error("Login error:", err);
			setError("Помилка з'єднання з сервером");
		} finally {
			setIsSubmitting(false);
		}
	};
	
	return (
		<section className="login-section">
			<div className="login-div">
				<div className="v-login-div">
					<div className="block-photos">
						<Image src={LoginImage} alt="Login image" />
					</div>
					
					<div className="login-form">
						<div className="text-login">
							<h1 className="login-h1">Повертаємось до англійської!</h1>
							<h3 className="login-h3">Увійди в акаунт 🚀</h3>
						</div>
						
						<form onSubmit={handleSubmit}>
							<div className="form-div">
								<input
									className="login-input"
									name="email"
									type="email"
									placeholder="Введіть E-mail"
									value={formData.email}
									onChange={handleChange}
									required
									disabled={isSubmitting}
								/>
								<input
									className="login-input"
									name="password"
									type="password"
									placeholder="Введіть пароль"
									value={formData.password}
									onChange={handleChange}
									required
									disabled={isSubmitting}
								/>
								{error && <p style={{ color: 'red' }}>{error}</p>}
								<div className="login-btn">
									<button
										className="form-login-btn active-not button-filled"
										type="submit"
										disabled={isSubmitting}
									>
										{isSubmitting ? "Вхід..." : "Увійти"}
									</button>
								</div>
							</div>
						</form>
						
						<button className="reg-button" onClick={toggleForm}>
							Реєстрація
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginForm;