"use client";

import './lessonStyle.scss';
import Link from 'next/link';
import { useTranslation } from '@/context/TranslationProvider';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ModalDeclineLogin from '@/app/components/Modal/ModalDeclineLogin'
import OptionTrainerModal from '@/app/components/Modal/OptionTrainerModal'
import Loader from '@/app/components/Loader/Loader'

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
					<Loader/>
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
											<div className="lesson-title">{level?.level}
												
												{user?.level?.toLowerCase() === level?.level?.toLowerCase() &&
													<>
														<svg className="current-lesson" width="34" height="34" viewBox="0 0 30 30" fill="none"
														     xmlns="http://www.w3.org/2000/svg">
															<rect x="0.375" y="0.375" width="29.25" height="29.25" rx="14.625" fill="transparent"/>
															<rect x="0.375" y="0.375" width="29.25" height="29.25" rx="14.625" stroke="#FE502D"
															      strokeWidth="0.75"/>
															<path
																d="M15.0004 12.0003V15.0003M15.0004 18.0003H15.0079M8.88789 12.4653C8.77842 11.9722 8.79523 11.4594 8.93676 10.9746C9.07828 10.4897 9.33995 10.0484 9.69749 9.69161C10.055 9.33482 10.4969 9.07408 10.982 8.93356C11.4672 8.79305 11.98 8.77732 12.4729 8.88782C12.7442 8.46354 13.1179 8.11439 13.5596 7.87253C14.0013 7.63068 14.4968 7.50391 15.0004 7.50391C15.504 7.50391 15.9995 7.63068 16.4412 7.87253C16.8829 8.11439 17.2566 8.46354 17.5279 8.88782C18.0215 8.77683 18.5352 8.7925 19.0211 8.93335C19.5071 9.07421 19.9495 9.33567 20.3073 9.69343C20.665 10.0512 20.9265 10.4936 21.0674 10.9796C21.2082 11.4655 21.2239 11.9792 21.1129 12.4728C21.5372 12.7441 21.8863 13.1178 22.1282 13.5595C22.37 14.0012 22.4968 14.4967 22.4968 15.0003C22.4968 15.5039 22.37 15.9994 22.1282 16.4411C21.8863 16.8828 21.5372 17.2565 21.1129 17.5278C21.2234 18.0207 21.2077 18.5335 21.0671 19.0187C20.9266 19.5038 20.6659 19.9457 20.3091 20.3032C19.9523 20.6608 19.511 20.9224 19.0261 21.0639C18.5413 21.2055 18.0285 21.2223 17.5354 21.1128C17.2645 21.5387 16.8904 21.8894 16.448 22.1323C16.0055 22.3752 15.5089 22.5026 15.0041 22.5026C14.4994 22.5026 14.0028 22.3752 13.5603 22.1323C13.1178 21.8894 12.7438 21.5387 12.4729 21.1128C11.98 21.2233 11.4672 21.2076 10.982 21.0671C10.4969 20.9266 10.055 20.6658 9.69749 20.309C9.33995 19.9522 9.07828 19.5109 8.93676 19.0261C8.79523 18.5412 8.77842 18.0284 8.88789 17.5353C8.46036 17.2647 8.1082 16.8904 7.86418 16.4472C7.62015 16.004 7.49219 15.5063 7.49219 15.0003C7.49219 14.4944 7.62015 13.9966 7.86418 13.5534C8.1082 13.1102 8.46036 12.7359 8.88789 12.4653Z"
																stroke="#FE502D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
														</svg>
														<div className="current-lesson-info">
															Ви перебуваєте зараз на цьому рівні
														</div>
													</>
												}
											
											</div>
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
