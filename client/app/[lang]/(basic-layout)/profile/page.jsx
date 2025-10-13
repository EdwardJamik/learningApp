"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import './acaunt.scss';
export default function Account() {
	const { user, loading } = useAuth();
	const router = useRouter();
	
	const [profile, setProfile] = useState({
		first_name: '',
		last_name: '',
		phone: '',
		telegram: '',
		gender: 'female',
		avatar_url: ''
	});
	
	const [passwords, setPasswords] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	});
	
	const [avatarFile, setAvatarFile] = useState(null);
	const [avatarPreview, setAvatarPreview] = useState(null);
	const [message, setMessage] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	
	// Перевірка авторизації
	useEffect(() => {
		if (!loading && !user) {
			router.push('/');
		}
	}, [user, loading, router]);
	
	// Завантаження профілю
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
					credentials: 'include'
				});
				
				if (res.ok) {
					const data = await res.json();
					console.log(data)
					setProfile({
						first_name: data.user.first_name || '',
						last_name: data.user.last_name || '',
						phone: data.user.phone || '',
						telegram: data.user.telegram || '',
						gender: data.user.gender || 'female',
						avatar_url: data.user.avatar_url || ''
					});
				}
			} catch (err) {
				console.error('Failed to fetch profile:', err);
			}
		};
		
		if (user) {
			fetchProfile();
		}
	}, [user]);
	
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfile({ ...profile, [name]: value });
	};
	
	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswords({ ...passwords, [name]: value });
	};
	
	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setAvatarFile(file);
			setAvatarPreview(URL.createObjectURL(file));
		}
	};
	
	const handleProfileSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage('');
		
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(profile)
			});
			
			const data = await res.json();
			
			if (res.ok) {
				setMessage('Профіль успішно оновлено!');
				setTimeout(() => setMessage(''), 3000);
			} else {
				setMessage(data.message || 'Помилка оновлення профілю');
			}
		} catch (err) {
			console.error('Update profile error:', err);
			setMessage('Помилка з\'єднання з сервером');
		} finally {
			setIsLoading(false);
		}
	};
	
	const handleAvatarUpload = async () => {
		if (!avatarFile) return;
		
		setIsLoading(true);
		const formData = new FormData();
		formData.append('avatar', avatarFile);
		
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/avatar`, {
				method: 'POST',
				credentials: 'include',
				body: formData
			});
			
			const data = await res.json();
			
			if (res.ok) {
				setProfile({ ...profile, avatar_url: data.user.avatar_url });
				setAvatarPreview(null);
				setAvatarFile(null);
				setMessage('Аватар успішно завантажено!');
				setTimeout(() => setMessage(''), 3000);
			} else {
				setMessage(data.message || 'Помилка завантаження аватара');
			}
		} catch (err) {
			console.error('Upload avatar error:', err);
			setMessage('Помилка завантаження файлу');
		} finally {
			setIsLoading(false);
		}
	};
	
	const handleAvatarDelete = async () => {
		setIsLoading(true);
		
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/avatar`, {
				method: 'DELETE',
				credentials: 'include'
			});
			
			const data = await res.json();
			
			if (res.ok) {
				setProfile({ ...profile, avatar_url: '' });
				setAvatarPreview(null);
				setMessage('Аватар видалено!');
				setTimeout(() => setMessage(''), 3000);
			} else {
				setMessage(data.message || 'Помилка видалення аватара');
			}
		} catch (err) {
			console.error('Delete avatar error:', err);
			setMessage('Помилка з\'єднання з сервером');
		} finally {
			setIsLoading(false);
		}
	};
	
	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		
		if (passwords.newPassword !== passwords.confirmPassword) {
			setPasswordMessage('Паролі не співпадають!');
			return;
		}
		
		if (passwords.newPassword.length < 6) {
			setPasswordMessage('Пароль має бути не менше 6 символів');
			return;
		}
		
		setIsLoading(true);
		setPasswordMessage('');
		
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/password`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					oldPassword: passwords.oldPassword,
					newPassword: passwords.newPassword
				})
			});
			
			const data = await res.json();
			
			if (res.ok) {
				setPasswordMessage('Пароль успішно змінено!');
				setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
				setTimeout(() => setPasswordMessage(''), 3000);
			} else {
				setPasswordMessage(data.message || 'Помилка зміни пароля');
			}
		} catch (err) {
			console.error('Change password error:', err);
			setPasswordMessage('Помилка з\'єднання з сервером');
		} finally {
			setIsLoading(false);
		}
	};
	
	if (loading) return <div>
		{/*Завантаження...*/}
	</div>;
	if (!user) return null;
	
	const displayAvatar = avatarPreview || (profile.avatar_url ? `${process.env.NEXT_PUBLIC_API_URL}${profile.avatar_url}` : null);
	
	return (
		<section className="acaunt-section">
			<div className="acaunt-global-div">
				<div className="acaunt-div">
					
					
					
					<form onSubmit={handleProfileSubmit}>
						<div className="acaunt-flex-div">
							<div className="one-block-acaunt">
								<input
									type="file"
									id="avatarInput"
									accept="image/*"
									onChange={handleAvatarChange}
									style={{ display: 'none' }}
								/>
								
								<label htmlFor="avatarInput" style={{ cursor: 'pointer' }}>
									{displayAvatar ? (
										<img
											src={displayAvatar}
											alt="Avatar"
											style={{
												width: '150px',
												height: '150px',
												borderRadius: '50%',
												objectFit: 'cover'
											}}
										/>
									) : (
										<div style={{
											width: '150px',
											height: '150px',
											borderRadius: '50%',
											background: '#e0e0e0',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: '14px',
											textAlign: 'center',
											padding: '10px'
										}}>
											Завантажити фото
										</div>
									)}
								</label>
								
								<button
									type="button"
									className="upd-btn"
									onClick={handleAvatarUpload}
									disabled={!avatarFile || isLoading}
								>
									Зберегти
								</button>
								<button
									type="button"
									className="del-btn"
									onClick={handleAvatarDelete}
									disabled={!profile.avatar_url || isLoading}
								>
									Видалити
								</button>
								{/*{message && (*/}
								<div style={{
									width: '100%',
									padding: '10px',
									textAlign: 'center',
									opacity: message ? 1 : 0,
									background: message.includes('успішно') ? '#d4edda' : '#f8d7da',
									color: message.includes('успішно') ? '#155724' : '#721c24',
									borderRadius: '4px'
								}}
								>
									{message}
								</div>
								{/*)}*/}
							</div>
							
							<div className="flex-block">
							
								<div className="osob-inf">
									<h3 className="ac-title">Особиста інформація</h3>
									<div className="div-pols">
										<div className="div-input">
											<span className="span-div">Ваше ім'я</span>
											<input
												className="ac-input"
												name="first_name"
												type="text"
												placeholder="Ваше ім'я"
												value={profile.first_name}
												onChange={handleInputChange}
											/>
										</div>
										<div className="div-input">
											<span className="span-div">Прізвище</span>
											<input
												className="ac-input"
												name="last_name"
												type="text"
												placeholder="Прізвище"
												value={profile.last_name}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className="stat-div">
										<span className="span-div">Стать</span>
										<div className="stst-golov-div">
											<label>
												<input
													type="radio"
													name="gender"
													value="female"
													checked={profile.gender === 'female'}
													onChange={handleInputChange}
												/>
												Жіноча
											</label>
											<label>
												<input
													type="radio"
													name="gender"
													value="male"
													checked={profile.gender === 'male'}
													onChange={handleInputChange}
												/>
												Чоловіча
											</label>
										</div>
									</div>
								</div>
								
								<div className="osob-inf">
									<h3 className="ac-title">Контактні дані</h3>
									<div className="div-pols">
										<div className="div-input">
											<span className="span-div">Номер телефону</span>
											<input
												className="ac-input"
												name="phone"
												type="text"
												placeholder="Номер телефону"
												value={profile.phone}
												onChange={handleInputChange}
											/>
										</div>
										<div className="div-input">
											<span className="span-div">Електронна пошта</span>
											<input
												className="ac-input"
												type="text"
												placeholder="Електронна пошта"
												value={user.email}
												disabled
												style={{ background: '#f5f5f5', cursor: 'not-allowed' }}
											/>
										</div>
										<div className="div-input">
											<span className="span-div">Телеграм</span>
											<input
												className="ac-input"
												name="telegram"
												type="text"
												placeholder="@username"
												value={profile.telegram}
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<button
										type="submit"
										className="password-button"
										disabled={isLoading}
										style={{ marginTop: '1rem' }}
									>
										{isLoading ? 'Збереження...' : 'Зберегти зміни'}
									</button>
								</div>
								
								<div className="osob-inf">
									<h3 className="ac-title">Твій пароль</h3>
									
									{passwordMessage && (
										<div style={{
											padding: '0.5rem',
											marginBottom: '1rem',
											background: passwordMessage.includes('успішно') ? '#d4edda' : '#f8d7da',
											color: passwordMessage.includes('успішно') ? '#155724' : '#721c24',
											borderRadius: '4px',
											fontSize: '0.9rem'
										}}>
											{passwordMessage}
										</div>
									)}
									
									<div className="div-pols">
										<div className="div-input">
											<span className="span-div">Старий пароль</span>
											<input
												className="ac-input"
												name="oldPassword"
												type="password"
												placeholder="******"
												value={passwords.oldPassword}
												onChange={handlePasswordChange}
											/>
										</div>
										<div className="div-input">
											<span className="span-div">Новий пароль</span>
											<input
												className="ac-input"
												name="newPassword"
												type="password"
												placeholder="******"
												value={passwords.newPassword}
												onChange={handlePasswordChange}
											/>
										</div>
										<div className="div-input">
											<span className="span-div">Повторити новий пароль</span>
											<input
												className="ac-input"
												name="confirmPassword"
												type="password"
												placeholder="******"
												value={passwords.confirmPassword}
												onChange={handlePasswordChange}
											/>
										</div>
									</div>
									<div className="password-div">
										<button
											type="button"
											onClick={handlePasswordSubmit}
											className="password-button"
											disabled={isLoading}
										>
											{isLoading ? 'Збереження...' : 'Змінити пароль'}
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}