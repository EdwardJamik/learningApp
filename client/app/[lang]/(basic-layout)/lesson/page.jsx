"use client";

import './lessonStyle.scss';
import Link from 'next/link';
import { useTranslation } from '@/context/TranslationProvider';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ModalDeclineLogin from '@/app/components/Modal/ModalDeclineLogin'
import OptionTrainerModal from '@/app/components/Modal/OptionTrainerModal'

export default function Lesson() {
	const { locale } = useTranslation();
	const [levels, setLevels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { user } = useAuth();
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	// Стан для модалки
	const [showModal, setShowModal] = useState(false);
	
	useEffect(() => {
		async function fetchLevels() {
			try {
				const response = await fetch('/api/levels');
				if (!response.ok) throw new Error('Помилка завантаження даних');
				const data = await response.json();
				setLevels(data.levels || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchLevels();
	}, []);
	
	const handleLinkClick = async (e, href) => {
		e.preventDefault(); // зупиняємо стандартну навігацію
		
		if (!user) {
			setIsModalOpen(true);
			return;
		}
		
		// якщо користувач авторизований — переходимо
		window.location.href = href;
	};
	
	if (loading) {
		return (
			<section className="lessons">
				<h1 className="title">
					<div className="container">Всі рівні</div>
				</h1>
				<div className="container">
					<p>Завантаження...</p>
				</div>
			</section>
		);
	}
	
	if (error) {
		return (
			<section className="lessons">
				<h1 className="title">
					<div className="container">Всі рівні</div>
				</h1>
				<div className="container">
					<p>Помилка: {error}</p>
				</div>
			</section>
		);
	}
	
	return (
		<>
			<section className="lessons">
				<h1 className="title">
					<div className="container">Всі рівні</div>
				</h1>
				
				<div className="container">
					<div className="lesson-list">
						{levels.map((level) => {
							const href = `/${locale !== 'ru' ? `level/${level.id}` : `ru/level/${level.id}`}`;
							
							return (
								<a
									key={level.id}
									href={href}
									onClick={(e) => handleLinkClick(e, href)}
									className="lesson-item-link"
								>
									<div className="lesson-item">
										<div className="lesson-detail">
											<div className="lesson-title">{level?.level}</div>
											<div className="lesson-pre-title">{level?.title}</div>
											<div className="lesson-description">{level?.description}</div>
										</div>
									</div>
								</a>
							);
						})}
					</div>
				</div>
			</section>
			
			{showModal && (
				<div className="modal-backdrop">
					<div className="modal">
						<h2>Авторизація потрібна</h2>
						<p>Увійдіть, щоб отримати доступ до уроків.</p>
						<button onClick={() => setShowModal(false)}>Закрити</button>
					</div>
				</div>
			)}
			<ModalDeclineLogin
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
}
