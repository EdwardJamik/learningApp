"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	
	// Перевірка авторизації при завантаженні
	const checkAuth = useCallback(async () => {
		console.log("Checking auth...");
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
				credentials: "include"
			});
			
			console.log("Auth check response:", res.status);
			
			if (res.ok) {
				const data = await res.json();
				console.log("Auth check data:", data);
				setUser(data.user);
			} else {
				console.log("Not authenticated");
				setUser(null);
			}
		} catch (error) {
			console.error("Auth check failed:", error);
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);
	
	// Вхід користувача
	const login = useCallback((userData) => {
		console.log("AuthContext: Setting user:", userData);
		setUser(userData);
		setLoading(false); // Завершуємо loading після логіну
	}, []);
	
	// Вихід користувача
	const logout = useCallback(async () => {
		console.log("Logging out...");
		try {
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
				method: "POST",
				credentials: "include"
			});
			setUser(null);
			window.location.href = "/"; // Жорсткий редірект
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}, []);
	
	// Перевірка при завантаженні
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);
	
	console.log("AuthContext state:", { user, loading });
	
	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
};