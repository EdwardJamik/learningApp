import React, { useState } from 'react'
import Image from 'next/image'
import LoginImage from '@/app/assets/Login/login-img.png'

const RegForm = ({ toggleForm }) => {
	const [formData, setFormData] = useState({ name: '', email: '', password: '', code: '' })
	const [step, setStep] = useState('register') // "register" або "verify"
	const [message, setMessage] = useState('')
	
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (step === 'register') {
			const res = await fetch('http://localhost:5000/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					password: formData.password,
				}),
			});
			const data = await res.json();
			setMessage(data.message);
			if (res.ok) setStep('verify');
		}
		else if (step === 'verify') {
			const res = await fetch('http://localhost:5000/api/auth/confirm', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: formData.email,
					code: formData.code,
				}),
			});
			const data = await res.json();
			setMessage(data.message);
			if (res.ok) toggleForm(); // після підтвердження — перейти на авторизацію
		}
	};
	
	return (
		<section className="login-section">
			<div className="login-div">
				<div className="v-login-div">
					<div className="block-photos">
						<Image src={LoginImage} alt='Login image' />
					</div>
					<div className="login-form">
						<div className="text-login">
							<h1 className="login-h1">
								{step === 'register' ? 'Давай прокачаємо твій English!' : 'Підтверди email 📩'}
							</h1>
							<h3 className="login-h3">
								{step === 'register'
									? 'Заповніть форму для створення акаунту'
									: `Код відправлено на ${formData.email}`}
							</h3>
						</div>
						
						<form onSubmit={handleSubmit}>
							<div className="form-div">
								
								{step === 'register' && (
									<>
										<input
											className="login-input"
											name="name"
											type="text"
											placeholder="Ваше ім’я"
											value={formData.name}
											onChange={handleChange}
											required
										/>
										
										<input
											className="login-input"
											name="email"
											type="email"
											placeholder="E-mail"
											value={formData.email}
											onChange={handleChange}
											required
										/>
										
										<input
											className="login-input"
											name="password"
											type="password"
											placeholder="Введіть пароль"
											value={formData.password}
											onChange={handleChange}
											required
										/>
									</>
								)}
								
								{step === 'verify' && (
									<input
										className="login-input"
										name="code"
										type="text"
										placeholder="Введіть код з пошти"
										value={formData.code}
										onChange={handleChange}
										required
									/>
								)}
								
								{message && <p>{message}</p>}
								
								<div className="login-btn">
									<button className="form-login-btn active-not button-filled" type="submit">
										{step === 'register' ? 'Отримати код на пошту' : 'Підтвердити акаунт'}
									</button>
								</div>
							</div>
						</form>
						
						<button className="reg-button" onClick={toggleForm}>
							Авторизація
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default RegForm;
